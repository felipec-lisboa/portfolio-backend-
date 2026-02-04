import { useEffect, useState } from 'react'
import { listProjects } from '../api/projects'
import Container from '../components/Container'
import ProjectCard from '../components/ProjectCard'
import { PROFILE } from '../data/profile'

export default function Projects() {
  const [projects, setProjects] = useState(null) // null = carregando

  useEffect(() => {
    document.title = `Projetos | ${PROFILE.displayName}`
  }, [])

  useEffect(() => {
    let cancelled = false
    setProjects(null)
    listProjects()
      .then((data) => {
        if (!cancelled) setProjects(data)
      })
      .catch(() => {
        if (!cancelled) setProjects([])
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Container>
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Projetos
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Uma seleção de projetos com foco em engenharia, produto e aprendizado.
        </p>
      </header>

      <section className="mt-8 grid gap-4">
        {projects === null ? (
          <>
            <div className="h-36 animate-pulse rounded-2xl border border-zinc-200/60 bg-white/70 dark:border-zinc-800/60 dark:bg-zinc-950/40" />
            <div className="h-36 animate-pulse rounded-2xl border border-zinc-200/60 bg-white/70 dark:border-zinc-800/60 dark:bg-zinc-950/40" />
            <div className="h-36 animate-pulse rounded-2xl border border-zinc-200/60 bg-white/70 dark:border-zinc-800/60 dark:bg-zinc-950/40" />
          </>
        ) : projects.length ? (
          projects.map((p) => <ProjectCard key={p.slug} project={p} />)
        ) : (
          <div className="rounded-2xl border border-zinc-200/60 bg-white/70 p-8 text-sm text-zinc-600 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40 dark:text-zinc-400">
            Nenhum projeto encontrado.
          </div>
        )}
      </section>
    </Container>
  )
}

