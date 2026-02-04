import { apiRequest } from './client'

export async function sendContactMessage(payload) {
  try {
    await apiRequest('/api/contact', { method: 'POST', body: payload })
    return { ok: true, delivered: true }
  } catch {
    // Fallback: sem backend configurado, o usuário ainda pode enviar via mailto.
    return { ok: true, delivered: false }
  }
}

