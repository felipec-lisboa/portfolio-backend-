import { ExternalLink, Github, ChevronLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProject } from '../api/projects'
import Container from '../components/Container'
import { PROFILE } from '../data/profile'

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-300">
      {children}
    </span>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const [project, setProject] = useState(undefined) // undefined = carregando

  useEffect(() => {
    if (project === undefined) {
      document.title = `Carregando... | ${PROFILE.displayName}`
      return
    }
    document.title =
      project === null
        ? `Projeto não encontrado | ${PROFILE.displayName}`
        : `${project.title} | Projetos | ${PROFILE.displayName}`
  }, [project])

  useEffect(() => {
    let cancelled = false
    setProject(undefined)
    getProject(slug)
      .then((data) => {
        if (!cancelled) setProject(data)
      })
      .catch(() => {
        if (!cancelled) setProject(null)
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  if (project === undefined) {
    return (
      <Container>
        <div className="grid gap-4">
          <div className="h-10 w-36 animate-pulse rounded-full border border-zinc-200/60 bg-white/70 dark:border-zinc-800/60 dark:bg-zinc-950/40" />
          <div className="h-10 w-2/3 animate-pulse rounded-2xl border border-zinc-200/60 bg-white/70 dark:border-zinc-800/60 dark:bg-zinc-950/40" />
          <div className="h-24 animate-pulse rounded-2xl border border-zinc-200/60 bg-white/70 dark:border-zinc-800/60 dark:bg-zinc-950/40" />
        </div>
      </Container>
    )
  }

  if (project === null) {
    return (
      <Container>
        <div className="rounded-2xl border border-zinc-200/60 bg-white/70 p-8 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            Projeto não encontrado
          </p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Verifique o link ou volte para a lista de projetos.
          </p>
          <Link
            to="/projetos"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white dark:focus-visible:ring-offset-zinc-950"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Voltar para projetos
          </Link>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <Link
        to="/projetos"
        className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-300 dark:hover:bg-zinc-950 dark:focus-visible:ring-offset-zinc-950"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        Projetos
      </Link>

      <header className="mt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {project.summary}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-sm font-semibold text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-50 dark:hover:bg-zinc-950 dark:focus-visible:ring-offset-zinc-950"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              Repo
            </a>
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white dark:focus-visible:ring-offset-zinc-950"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Demo
            </a>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </header>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-2xl border border-zinc-200/60 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Visão geral
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {project.description}
          </p>

          {project.highlights?.length ? (
            <>
              <h3 className="mt-6 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Destaques
              </h3>
              <ul className="mt-3 grid gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        <aside className="grid gap-3">
          <div className="rounded-2xl border border-zinc-200/60 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              Métricas (em breve)
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Aqui vou exibir dados do GitHub (stars, commits, issues) e eventos
              do site (cliques, visitas) integrados ao backend.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200/60 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              Stack
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </Container>
  )
}

