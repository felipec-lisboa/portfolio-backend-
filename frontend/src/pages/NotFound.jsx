import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import { PROFILE } from '../data/profile'

export default function NotFound() {
  useEffect(() => {
    document.title = `Página não encontrada | ${PROFILE.displayName}`
  }, [])

  return (
    <Container>
      <div className="rounded-2xl border border-zinc-200/60 bg-white/70 p-10 text-center shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40">
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          404
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Página não encontrada
        </h1>
        <p className="mx-auto mt-3 max-w-prose text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          O link que você acessou não existe ou foi movido.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white dark:focus-visible:ring-offset-zinc-950"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </Container>
  )
}

