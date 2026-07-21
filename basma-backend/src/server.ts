import 'dotenv/config'
import { del, get, list, put } from '@vercel/blob'
import compression from 'compression'
import cors from 'cors'
import express, { type NextFunction, type Request, type Response } from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import multer from 'multer'
import path from 'node:path'
import { ZodError } from 'zod'
import { randomUUID } from 'node:crypto'
import { mkdirSync } from 'node:fs'
import { readdir, stat, unlink } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { authenticateAdmin, createAdminSession, verifyAdminSession } from './auth.js'
import {
  addContactSubmission,
  getContactSubmissions,
  getContent,
  patchContent,
  updateContactSubmissionStatus,
  updateContent,
} from './store.js'
import {
  adminLoginSchema,
  contentPatchSchema,
  contactStatusSchema,
  contactSubmissionSchema,
  contentSchema,
} from './validation.js'

const port = Number(process.env.PORT ?? 4000)
const useBlobStorage = Boolean(process.env.BLOB_READ_WRITE_TOKEN)
const corsOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:5173,http://localhost:5174')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
const localDevOriginPattern = /^http:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0|10\.\d+\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+|192\.168\.\d+\.\d+):(417[34]|517[34])$/

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const backendRoot = path.resolve(__dirname, '..')
const projectRoot = path.resolve(backendRoot, '..')
const uploadsDir = path.join(backendRoot, 'uploads')
const websiteAssetsDir = path.join(projectRoot, 'src', 'assets')
const imageExtensionsByMimeType: Record<string, string> = {
  'image/avif': '.avif',
  'image/gif': '.gif',
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
}
const supportedImageExtensions = new Set(Object.values(imageExtensionsByMimeType))

if (!useBlobStorage) {
  mkdirSync(uploadsDir, { recursive: true })
}

const upload = multer({
  storage: useBlobStorage ? multer.memoryStorage() : multer.diskStorage({
    destination: uploadsDir,
    filename: (_request, file, callback) => {
      const extension = imageExtensionsByMimeType[file.mimetype] ?? ''
      callback(null, `${randomUUID()}${extension}`)
    },
  }),
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  fileFilter: (_request, file, callback) => {
    if (!imageExtensionsByMimeType[file.mimetype]) {
      callback(new Error('Only PNG, JPEG, WEBP, GIF, and AVIF image uploads are allowed.'))
      return
    }

    callback(null, true)
  },
})

app.use(cors({
  origin(origin, callback) {
    if (!origin || corsOrigins.includes(origin) || localDevOriginPattern.test(origin)) {
      callback(null, true)
      return
    }

    callback(new Error(`CORS blocked origin: ${origin}`))
  },
}))
app.set('trust proxy', 1)
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}))
app.use(compression())
app.use(express.json({ limit: '2mb' }))

if (!useBlobStorage) {
  app.use('/uploads', express.static(uploadsDir, {
    immutable: true,
    maxAge: '1y',
  }))
  app.use('/media', express.static(websiteAssetsDir, {
    maxAge: '1d',
  }))
}

function requireAdmin(request: Request, response: Response, next: NextFunction) {
  const authorization = request.header('authorization') ?? ''
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : ''

  try {
    const session = verifyAdminSession(token)
    if (!session) {
      response.status(401).json({ message: 'Your dashboard session is invalid or expired.' })
      return
    }

    response.locals.admin = session
    next()
  } catch {
    response.status(503).json({ message: 'Dashboard authentication is not configured.' })
  }
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Too many login attempts. Please try again in 15 minutes.' },
})

app.post('/api/auth/login', loginLimiter, (request, response, next) => {
  try {
    const credentials = adminLoginSchema.parse(request.body)
    if (!authenticateAdmin(credentials.email, credentials.password)) {
      response.status(401).json({ message: 'Invalid email or password.' })
      return
    }

    response.json(createAdminSession())
  } catch (error) {
    next(error)
  }
})

app.get('/api/auth/session', requireAdmin, (_request, response) => {
  response.json({ user: response.locals.admin })
})

app.post('/api/auth/logout', requireAdmin, (_request, response) => {
  response.status(204).end()
})

app.get('/api/media/file/:name', async (request, response, next) => {
  if (!useBlobStorage) {
    response.status(404).json({ message: 'Media file not found.' })
    return
  }

  try {
    const requestedName = Array.isArray(request.params.name) ? request.params.name[0] : request.params.name
    const name = path.basename(requestedName)
    if (name !== requestedName) {
      response.status(400).json({ message: 'Invalid media name.' })
      return
    }

    const result = await get(`basma/media/${name}`, { access: 'private' })
    if (!result || result.statusCode !== 200) {
      response.status(404).json({ message: 'Media file not found.' })
      return
    }

    response.set({
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Type': result.blob.contentType,
    })
    response.send(Buffer.from(await new Response(result.stream).arrayBuffer()))
  } catch (error) {
    next(error)
  }
})

app.get('/api/health', (_request, response) => {
  response.json({ ok: true, service: 'basma-backend' })
})

app.get('/api/content', async (_request, response, next) => {
  try {
    response.json(await getContent())
  } catch (error) {
    next(error)
  }
})

app.put('/api/content', requireAdmin, async (request, response, next) => {
  try {
    const content = contentSchema.parse(request.body)
    response.json(await updateContent(content))
  } catch (error) {
    next(error)
  }
})

app.patch('/api/content', requireAdmin, async (request, response, next) => {
  try {
    const contentPatch = contentPatchSchema.parse(request.body)
    response.json(await patchContent(contentPatch))
  } catch (error) {
    next(error)
  }
})

app.post('/api/contact-submissions', async (request, response, next) => {
  try {
    const input = contactSubmissionSchema.parse(request.body)
    const submission = await addContactSubmission({
      ...input,
      phone: input.phone || '',
      id: randomUUID(),
      status: 'new',
      createdAt: new Date().toISOString(),
    })

    response.status(201).json(submission)
  } catch (error) {
    next(error)
  }
})

app.get('/api/contact-submissions', requireAdmin, async (_request, response, next) => {
  try {
    response.json(await getContactSubmissions())
  } catch (error) {
    next(error)
  }
})

app.patch('/api/contact-submissions/:id', requireAdmin, async (request, response, next) => {
  try {
    const { status } = contactStatusSchema.parse(request.body)
    const submissionId = Array.isArray(request.params.id)
      ? request.params.id[0]
      : request.params.id
    const submission = await updateContactSubmissionStatus(submissionId, status)

    if (!submission) {
      response.status(404).json({ message: 'Contact submission not found.' })
      return
    }

    response.json(submission)
  } catch (error) {
    next(error)
  }
})

app.post('/api/media', requireAdmin, upload.single('image'), async (request, response, next) => {
  if (!request.file) {
    response.status(400).json({ message: 'Image file is required.' })
    return
  }

  try {
    if (useBlobStorage) {
      const extension = imageExtensionsByMimeType[request.file.mimetype] ?? ''
      const name = `${randomUUID()}${extension}`
      await put(`basma/media/${name}`, request.file.buffer, {
        access: 'private',
        contentType: request.file.mimetype,
        cacheControlMaxAge: 31536000,
      })
      response.status(201).json({
        url: `/api/media/file/${name}`,
        originalName: request.file.originalname,
      })
      return
    }

    response.status(201).json({
      url: `/uploads/${request.file.filename}`,
      originalName: request.file.originalname,
    })
  } catch (error) {
    next(error)
  }
})

app.get('/api/media', requireAdmin, async (_request, response, next) => {
  try {
    if (useBlobStorage) {
      const result = await list({ prefix: 'basma/media/' })
      response.json(result.blobs.map((blob) => ({
        name: path.basename(blob.pathname),
        url: `/api/media/file/${path.basename(blob.pathname)}`,
        size: blob.size,
        uploadedAt: blob.uploadedAt.toISOString(),
      })).sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt)))
      return
    }

    const files = (await readdir(uploadsDir)).filter((name) => (
      !name.startsWith('.') && supportedImageExtensions.has(path.extname(name).toLowerCase())
    ))
    const items = await Promise.all(files.map(async (name) => {
      const file = await stat(path.join(uploadsDir, name))
      return {
        name,
        url: `/uploads/${name}`,
        size: file.size,
        uploadedAt: file.mtime.toISOString(),
      }
    }))

    response.json(items.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt)))
  } catch (error) {
    next(error)
  }
})

app.delete('/api/media/:name', requireAdmin, async (request, response, next) => {
  try {
    const requestedName = Array.isArray(request.params.name) ? request.params.name[0] : request.params.name
    const name = path.basename(requestedName)

    if (name !== requestedName) {
      response.status(400).json({ message: 'Invalid media name.' })
      return
    }

    if (useBlobStorage) {
      await del(`basma/media/${name}`)
    } else {
      await unlink(path.join(uploadsDir, name))
    }
    response.json({ ok: true })
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      response.status(404).json({ message: 'Media file not found.' })
      return
    }
    next(error)
  }
})

app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  if (error instanceof ZodError) {
    response.status(422).json({
      message: 'Validation failed.',
      issues: error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    })
    return
  }

  if (error instanceof Error) {
    response.status(400).json({ message: error.message })
    return
  }

  response.status(500).json({ message: 'Unexpected server error.' })
})

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Basma backend running on http://localhost:${port}`)
  })
}

export default app
