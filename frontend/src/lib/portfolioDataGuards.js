function normalize(value) {
  return String(value || '').trim()
}

export function hasMeaningfulUrl(url) {
  const raw = normalize(url)
  if (!raw || raw === '#') return false

  try {
    const parsed = new URL(raw)
    if (!['http:', 'https:'].includes(parsed.protocol)) return false

    const host = parsed.hostname.toLowerCase()
    const path = parsed.pathname || '/'
    const isRootPath = path === '/'

    if (host === 'github.com' && isRootPath) return false
    if (host === 'www.linkedin.com' && isRootPath) return false
    if (host.endsWith('example.com') || host.endsWith('exemplo.com')) return false

    return true
  } catch {
    return false
  }
}

export function hasMeaningfulEmail(email) {
  const raw = normalize(email)
  if (!raw.includes('@')) return false

  const lowered = raw.toLowerCase()
  if (lowered.includes('seuemail@')) return false
  if (lowered.endsWith('@example.com')) return false
  if (lowered.endsWith('@exemplo.com')) return false

  return true
}
