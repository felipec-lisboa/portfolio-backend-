import { ExternalLink, Github } from 'lucide-react'
import { Link } from 'react-router-dom'
import { hasMeaningfulUrl } from '../lib/portfolioDataGuards'

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-300">
      {children}
    </span>
  )
}

export default function ProjectCard({ project }) {
  const hasRepo = hasMeaningfulUrl(project.links?.repo)
  const hasDemo = hasMeaningfulUrl(project.links?.demo)

  return (
    <div className="group rounded-2xl border border-zinc-200/60 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:shadow-md dark:border-zinc-800/60 dark:bg-zinc-950/40">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            <Link
              to={`/projetos/${project.slug}`}
              className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-offset-zinc-950"
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {project.summary}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {hasRepo ? (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white/70 p-2 text-zinc-900 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-50 dark:hover:bg-zinc-950 dark:focus-visible:ring-offset-zinc-950"
              aria-label="Abrir repositório"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : null}

          {hasDemo ? (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white/70 p-2 text-zinc-900 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-50 dark:hover:bg-zinc-950 dark:focus-visible:ring-offset-zinc-950"
              aria-label="Abrir demo"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>

      {project.tech?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      ) : null}
    </div>
  )
}

