export const API_BASE_URL = String(import.meta.env.VITE_API_URL || '').replace(
  /\/$/,
  '',
)

export function hasApiConfigured() {
  return Boolean(API_BASE_URL)
}

export class ApiError extends Error {
  constructor(message, { status, url, body } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.url = url
    this.body = body
  }
}

export async function apiRequest(path, options = {}) {
  if (!API_BASE_URL) {
    throw new ApiError('VITE_API_URL não configurada', { status: 0, url: path })
  }

  const url = `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`
  const method = options.method || 'GET'
  const headers = new Headers(options.headers || {})

  let body = options.body
  if (body && typeof body === 'object' && !(body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
    body = JSON.stringify(body)
  }

  const res = await fetch(url, { ...options, method, headers, body })
  if (res.status === 204) return null

  const contentType = res.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const payload = isJson ? await res.json().catch(() => null) : await res.text()

  if (!res.ok) {
    throw new ApiError('Erro na API', { status: res.status, url, body: payload })
  }

  return payload
}

