export const THEME_STORAGE_KEY = 'theme'

export function getSystemTheme() {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function getStoredTheme() {
  if (typeof window === 'undefined') return null
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    if (value === 'dark' || value === 'light') return value
    return null
  } catch {
    return null
  }
}

export function getInitialTheme() {
  return getStoredTheme() ?? getSystemTheme()
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export function setTheme(theme) {
  applyTheme(theme)
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Ignora erros de storage (ex.: modo privado / cookies bloqueados)
  }
}

