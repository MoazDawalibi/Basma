import { randomUUID } from 'node:crypto'
import { mkdir, readFile, rename, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { BlobPreconditionFailedError, get, put } from '@vercel/blob'
import type { BasmaContent, ContactSubmission } from './types.js'
import { seedContent } from './seed.js'

type Database = {
  content: BasmaContent
  contactSubmissions: ContactSubmission[]
}

const dataDir = path.resolve(process.cwd(), 'data')
const databasePath = path.join(dataDir, 'database.json')
const blobDatabasePath = 'basma/data/database.json'
const useBlobStorage = Boolean(process.env.BLOB_READ_WRITE_TOKEN)
let initialization: Promise<void> | undefined
let mutationQueue: Promise<void> = Promise.resolve()
let activeRead: Promise<Database> | undefined
let databaseCache: { database: Database; modifiedAt: number } | undefined
let blobDatabaseCache: { database: Database; etag?: string; expiresAt: number } | undefined
let lastCacheValidationAt = 0

async function ensureDatabase() {
  initialization ??= (async () => {
    await mkdir(dataDir, { recursive: true })

    try {
      await readFile(databasePath, 'utf8')
    } catch {
      await writeDatabase({
        content: seedContent,
        contactSubmissions: [],
      })
    }
  })()

  await initialization
}

async function readDatabase(): Promise<Database> {
  if (useBlobStorage) {
    return (await readBlobDatabase()).database
  }

  await ensureDatabase()
  const now = Date.now()

  if (databaseCache && now - lastCacheValidationAt < 250) {
    return databaseCache.database
  }

  if (activeRead) {
    return activeRead
  }

  const databaseStats = await stat(databasePath)

  if (databaseCache?.modifiedAt === databaseStats.mtimeMs) {
    lastCacheValidationAt = now
    return databaseCache.database
  }

  activeRead = (async () => {
    const rawDatabase = await readFile(databasePath, 'utf8')
    const database = JSON.parse(rawDatabase) as Partial<Database> & { content?: unknown }

    if (!database.content || typeof database.content !== 'object' || !('hero' in database.content)) {
      const migratedDatabase: Database = {
        content: seedContent,
        contactSubmissions: database.contactSubmissions ?? [],
      }
      await writeDatabase(migratedDatabase)
      return migratedDatabase
    }

    const currentStats = await stat(databasePath)
    databaseCache = {
      database: database as Database,
      modifiedAt: currentStats.mtimeMs,
    }
    lastCacheValidationAt = Date.now()
    return database as Database
  })()

  try {
    return await activeRead
  } finally {
    activeRead = undefined
  }
}

async function readBlobDatabase(forceFresh = false): Promise<{ database: Database; etag?: string }> {
  if (!forceFresh && blobDatabaseCache && blobDatabaseCache.expiresAt > Date.now()) {
    return blobDatabaseCache
  }

  const result = await get(blobDatabasePath, { access: 'private', useCache: false })

  if (!result || result.statusCode !== 200) {
    const emptyDatabase = {
      database: { content: seedContent, contactSubmissions: [] },
      expiresAt: Date.now() + 5000,
    }
    blobDatabaseCache = emptyDatabase
    return emptyDatabase
  }

  const database = JSON.parse(await new Response(result.stream).text()) as Partial<Database> & { content?: unknown }
  const normalizedDatabase: Database = database.content
    && typeof database.content === 'object'
    && 'hero' in database.content
    ? database as Database
    : { content: seedContent, contactSubmissions: database.contactSubmissions ?? [] }

  const cachedDatabase = {
    database: normalizedDatabase,
    etag: result.blob.etag,
    expiresAt: Date.now() + 5000,
  }
  blobDatabaseCache = cachedDatabase
  return cachedDatabase
}

async function writeDatabase(database: Database) {
  await mkdir(dataDir, { recursive: true })
  const temporaryPath = `${databasePath}.${process.pid}.${randomUUID()}.tmp`

  try {
    await writeFile(temporaryPath, `${JSON.stringify(database, null, 2)}\n`)
    await rename(temporaryPath, databasePath)
    const databaseStats = await stat(databasePath)
    databaseCache = {
      database,
      modifiedAt: databaseStats.mtimeMs,
    }
    lastCacheValidationAt = Date.now()
  } catch (error) {
    await rm(temporaryPath, { force: true })
    throw error
  }
}

function mutateDatabase<Result>(
  mutation: (database: Database) => Promise<{ database: Database; result: Result }> | { database: Database; result: Result },
) {
  if (useBlobStorage) {
    return mutateBlobDatabase(mutation)
  }

  const operation = mutationQueue.then(async () => {
    const currentDatabase = await readDatabase()
    const { database, result } = await mutation(currentDatabase)
    await writeDatabase(database)
    return result
  })

  mutationQueue = operation.then(
    () => undefined,
    () => undefined,
  )

  return operation
}

async function mutateBlobDatabase<Result>(
  mutation: (database: Database) => Promise<{ database: Database; result: Result }> | { database: Database; result: Result },
) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const current = await readBlobDatabase(true)
    const { database, result } = await mutation(current.database)

    try {
      const savedBlob = await put(blobDatabasePath, `${JSON.stringify(database, null, 2)}\n`, {
        access: 'private',
        allowOverwrite: Boolean(current.etag),
        contentType: 'application/json',
        cacheControlMaxAge: 60,
        ...(current.etag ? { ifMatch: current.etag } : {}),
      })
      blobDatabaseCache = {
        database,
        etag: savedBlob.etag,
        expiresAt: Date.now() + 5000,
      }
      return result
    } catch (error) {
      if (!(error instanceof BlobPreconditionFailedError) || attempt === 4) {
        throw error
      }
    }
  }

  throw new Error('Could not save database after multiple concurrent updates.')
}

export async function getContent() {
  const database = await readDatabase()
  return database.content
}

export async function updateContent(content: BasmaContent) {
  return mutateDatabase((database) => {
    const nextDatabase = { ...database, content }
    return { database: nextDatabase, result: nextDatabase.content }
  })
}

export async function patchContent(contentPatch: Partial<BasmaContent>) {
  return mutateDatabase((database) => {
    const nextContent = {
      ...database.content,
      ...contentPatch,
    }

    return {
      database: { ...database, content: nextContent },
      result: nextContent,
    }
  })
}

export async function getContactSubmissions() {
  const database = await readDatabase()
  return database.contactSubmissions
}

export async function addContactSubmission(submission: ContactSubmission) {
  return mutateDatabase((database) => ({
    database: {
      ...database,
      contactSubmissions: [submission, ...database.contactSubmissions],
    },
    result: submission,
  }))
}

export async function updateContactSubmissionStatus(
  id: string,
  status: ContactSubmission['status'],
) {
  return mutateDatabase((database) => {
    let updatedSubmission: ContactSubmission | undefined

    const nextSubmissions = database.contactSubmissions.map((submission) => {
      if (submission.id !== id) {
        return submission
      }

      updatedSubmission = { ...submission, status }
      return updatedSubmission
    })

    return {
      database: updatedSubmission
        ? { ...database, contactSubmissions: nextSubmissions }
        : database,
      result: updatedSubmission,
    }
  })
}
