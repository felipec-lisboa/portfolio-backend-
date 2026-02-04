import Container from './Container'
import { PROFILE } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200/60 py-10 dark:border-zinc-800/60">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          © {new Date().getFullYear()} {PROFILE.displayName}. Todos os direitos
          reservados.
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Feito com React + Tailwind.
        </p>
      </Container>
    </footer>
  )
}

