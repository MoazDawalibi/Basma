import type { BasmaContent, ContactSubmission, MediaLibraryItem } from './types'

const defaultApiBaseUrl = 'http://localhost:4000'

export const apiBaseUrl = (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? defaultApiBaseUrl : '')).replace(/\/$/, '')
export const websiteBaseUrl = (import.meta.env.VITE_WEBSITE_URL || (import.meta.env.DEV ? 'http://localhost:5173' : '')).replace(/\/$/, '')

export type AdminUser = {
  email: string
  name: string
  expiresAt?: string
}

export type AdminSession = {
  token: string
  user: AdminUser
  expiresAt: string
}

export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message)
  }
}

function apiUrl(path: string) {
  if (!apiBaseUrl) {
    throw new ApiError('VITE_API_URL is not configured for this dashboard deployment.', 503)
  }

  return `${apiBaseUrl}${path}`
}

async function parseResponse<ResponseBody>(response: Response): Promise<ResponseBody> {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: 'Request failed.' }))
    throw new ApiError(errorBody.message ?? 'Request failed.', response.status)
  }

  return response.json() as Promise<ResponseBody>
}

function headers(token: string) {
  return token ? { Authorization: `Bearer ${token}` } : undefined
}

export async function login(email: string, password: string) {
  const response = await fetch(apiUrl('/api/auth/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return parseResponse<AdminSession>(response)
}

export async function getSession(token: string) {
  const response = await fetch(apiUrl('/api/auth/session'), { headers: headers(token) })
  return parseResponse<{ user: AdminUser }>(response)
}

export async function logout(token: string) {
  await fetch(apiUrl('/api/auth/logout'), { method: 'POST', headers: headers(token) })
}

export async function getContent() {
  const response = await fetch(apiUrl('/api/content'))
  return parseResponse<BasmaContent>(response)
}

export async function saveContent(content: BasmaContent, token: string) {
  const response = await fetch(apiUrl('/api/content'), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...headers(token),
    },
    body: JSON.stringify(content),
  })

  return parseResponse<BasmaContent>(response)
}

export async function uploadImage(file: File, token: string) {
  const formData = new FormData()
  formData.append('image', file)

  const response = await fetch(apiUrl('/api/media'), {
    method: 'POST',
    headers: headers(token),
    body: formData,
  })

  return parseResponse<{ url: string; originalName: string }>(response)
}

export async function getMedia(token: string) {
  const response = await fetch(apiUrl('/api/media'), { headers: headers(token) })
  return parseResponse<MediaLibraryItem[]>(response)
}

export async function deleteMedia(name: string, token: string) {
  const response = await fetch(apiUrl(`/api/media/${encodeURIComponent(name)}`), {
    method: 'DELETE',
    headers: headers(token),
  })
  return parseResponse<{ ok: true }>(response)
}

export async function getContactSubmissions(token: string) {
  const response = await fetch(apiUrl('/api/contact-submissions'), {
    headers: headers(token),
  })

  return parseResponse<ContactSubmission[]>(response)
}

export async function updateContactStatus(
  id: string,
  status: ContactSubmission['status'],
  token: string,
) {
  const response = await fetch(apiUrl(`/api/contact-submissions/${id}`), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...headers(token),
    },
    body: JSON.stringify({ status }),
  })

  return parseResponse<ContactSubmission>(response)
}
