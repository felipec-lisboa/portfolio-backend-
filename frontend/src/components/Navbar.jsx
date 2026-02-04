import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { PROFILE } from '../data/profile'
import { cn } from '../lib/cn'
import Container from './Container'
import ThemeToggle from './ThemeToggle'

function NavItem({ to, label, end, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-offset-zinc-950',
          isActive
            ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950'
            : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900/60 dark:hover:text-zinc-50',
        )
      }
    >
      {label}
    </NavLink>
  )
}

export default function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const initial = (PROFILE.displayName?.trim()?.[0] ?? 'P').toUpperCase()

  const links = useMemo(
    () => [
      { to: '/', label: 'Início', end: true },
      { to: '/projetos', label: 'Projetos' },
      { to: '/insights', label: 'Insights' },
      { to: '/contato', label: 'Contato' },
    ],
    [],
  )

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!mobileOpen) return
    function onKeyDown(e) {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/70 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/60">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-offset-zinc-950"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white shadow-sm">
              {initial}
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-semibold leading-4 text-zinc-900 dark:text-zinc-50">
                {PROFILE.displayName}
              </span>
              <span className="block text-xs text-zinc-600 dark:text-zinc-400">
                Portfólio
              </span>
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
          {links.map((l) => (
            <NavItem key={l.to} {...l} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white/80 p-2 text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-50 dark:hover:bg-zinc-950 dark:focus-visible:ring-offset-zinc-950 md:hidden"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="border-t border-zinc-200/60 bg-white/80 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/60 md:hidden"
          >
            <Container className="flex flex-col gap-2 py-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium tracking-wide text-zinc-600 dark:text-zinc-400">
                  Menu
                </span>
                <ThemeToggle />
              </div>
              <div className="grid gap-1">
                {links.map((l) => (
                  <NavItem
                    key={l.to}
                    {...l}
                    onClick={() => setMobileOpen(false)}
                  />
                ))}
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

