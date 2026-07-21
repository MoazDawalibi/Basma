import { createHmac, createHash, timingSafeEqual } from 'node:crypto'

const sessionLifetimeSeconds = 8 * 60 * 60

type SessionPayload = {
  sub: string
  iat: number
  exp: number
}

function authConfig() {
  const email = (process.env.ADMIN_EMAIL ?? 'admin@basma.com').trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD ?? ''
  const sessionSecret = process.env.SESSION_SECRET ?? ''

  if (!password || !sessionSecret) {
    throw new Error('Dashboard authentication is not configured.')
  }

  return { email, password, sessionSecret }
}

function secureEqual(left: string, right: string) {
  const leftDigest = createHash('sha256').update(left).digest()
  const rightDigest = createHash('sha256').update(right).digest()
  return timingSafeEqual(leftDigest, rightDigest)
}

function signature(value: string, secret: string) {
  return createHmac('sha256', secret).update(value).digest('base64url')
}

export function authenticateAdmin(email: string, password: string) {
  const config = authConfig()
  return secureEqual(email.trim().toLowerCase(), config.email)
    && secureEqual(password, config.password)
}

export function createAdminSession() {
  const config = authConfig()
  const issuedAt = Math.floor(Date.now() / 1000)
  const payload: SessionPayload = {
    sub: config.email,
    iat: issuedAt,
    exp: issuedAt + sessionLifetimeSeconds,
  }
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url')

  return {
    token: `${encodedPayload}.${signature(encodedPayload, config.sessionSecret)}`,
    user: { email: config.email, name: 'Basma Admin' },
    expiresAt: new Date(payload.exp * 1000).toISOString(),
  }
}

export function verifyAdminSession(token: string) {
  const config = authConfig()
  const [encodedPayload, suppliedSignature, ...extraParts] = token.split('.')

  if (!encodedPayload || !suppliedSignature || extraParts.length) {
    return undefined
  }

  if (!secureEqual(suppliedSignature, signature(encodedPayload, config.sessionSecret))) {
    return undefined
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as SessionPayload
    const now = Math.floor(Date.now() / 1000)

    if (payload.sub !== config.email || !Number.isInteger(payload.exp) || payload.exp <= now) {
      return undefined
    }

    return {
      email: config.email,
      name: 'Basma Admin',
      expiresAt: new Date(payload.exp * 1000).toISOString(),
    }
  } catch {
    return undefined
  }
}
