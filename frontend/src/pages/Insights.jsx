import { BarChart3, GitCommit, MousePointerClick } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { getInsights } from '../api/insights'
import Container from '../components/Container'
import { PROFILE } from '../data/profile'

function InsightCard({ title, value, icon: Icon, hint }) {
  return (
    <div className="rounded-2xl border border-zinc-200/60 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {title}
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {value}
          </p>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-zinc-900 text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-950">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      {hint ? (
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export default function Insights() {
  const [insights, setInsights] = useState(null)

  useEffect(() => {
    document.title = `Insights | ${PROFILE.displayName}`
  }, [])

  useEffect(() => {
    let cancelled = false
    setInsights(null)
    getInsights()
      .then((data) => {
        if (!cancelled) setInsights(data)
      })
      .catch(() => {
        if (!cancelled) setInsights({})
      })
    return () => {
      cancelled = true
    }
  }, [])

  const viewValue = useMemo(() => {
    const n = Number(insights?.pageviews7d ?? 0)
    if (!n) return '—'
    if (n >= 1000) return `${Math.round((n / 1000) * 10) / 10}k`
    return String(n)
  }, [insights])

  const clickValue = useMemo(() => {
    const n = Number(insights?.demoClicks7d ?? 0)
    if (!n) return '—'
    if (n >= 1000) return `${Math.round((n / 1000) * 10) / 10}k`
    return String(n)
  }, [insights])

  const commitValue = useMemo(() => {
    const n = Number(insights?.commits30d ?? 0)
    if (!n) return '—'
    if (n >= 1000) return `${Math.round((n / 1000) * 10) / 10}k`
    return String(n)
  }, [insights])

  return (
    <Container>
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Insights
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Dashboard com métricas do GitHub e analytics do site. Por enquanto os
          números são mock — depois conectamos ao backend Java.
        </p>
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <InsightCard
          title="Pageviews (7 dias)"
          value={insights === null ? '...' : viewValue}
          icon={BarChart3}
          hint="Eventos agregados do portfólio (visitas por página)."
        />
        <InsightCard
          title="Cliques em demo (7 dias)"
          value={insights === null ? '...' : clickValue}
          icon={MousePointerClick}
          hint="Ajuda a entender quais projetos chamam mais atenção."
        />
        <InsightCard
          title="Commits (30 dias)"
          value={insights === null ? '...' : commitValue}
          icon={GitCommit}
          hint="Atividade combinada dos repositórios no GitHub."
        />
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200/60 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            GitHub
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Coleta via API do GitHub com snapshots (stars, forks, issues, PRs,
            commits por período) para comparar evolução ao longo do tempo.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200/60 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Site Analytics
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Eventos minimalistas e focados em privacidade (pageview/click),
            com rate-limit e sem armazenar dados sensíveis.
          </p>
        </div>
      </section>
    </Container>
  )
}

