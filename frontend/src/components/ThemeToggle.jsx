import { Moon, Sun } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn } from '../lib/cn'
import { setTheme as persistTheme } from '../lib/theme'

function getIsDarkFromDom() {
  if (typeof document === 'undefined') return false
  return document.documentElement.classList.contains('dark')
}

export default function ThemeToggle({ className }) {
  const [isDark, setIsDark] = useState(getIsDarkFromDom)

  const Icon = useMemo(() => (isDark ? Sun : Moon), [isDark])
  const label = isDark ? 'Trocar para tema claro' : 'Trocar para tema escuro'

  function handleToggle() {
    const nextIsDark = !isDark
    setIsDark(nextIsDark)
    persistTheme(nextIsDark ? 'dark' : 'light')
  }

  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-50 dark:hover:bg-zinc-950 dark:focus-visible:ring-offset-zinc-950',
        className,
      )}
      aria-label={label}
      onClick={handleToggle}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">{isDark ? 'Claro' : 'Escuro'}</span>
    </button>
  )
}

