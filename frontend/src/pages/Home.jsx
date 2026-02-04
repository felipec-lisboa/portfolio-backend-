import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import ProjectCard from '../components/ProjectCard'
import { PROFILE } from '../data/profile'
import { PROJECTS } from '../data/projects'
import { SKILL_SECTIONS } from '../data/skills'
import { cn } from '../lib/cn'

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-zinc-200/60 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40">
      <div className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        {value}
      </div>
      <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{label}</div>
    </div>
  )
}

function SocialLink({ href, label, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-50 dark:hover:bg-zinc-950 dark:focus-visible:ring-offset-zinc-950',
      )}
      aria-label={label}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">{label}</span>
    </a>
  )
}

function SkillPill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-300">
      {children}
    </span>
  )
}

export default function Home() {
  useEffect(() => {
    document.title = `Início | ${PROFILE.displayName}`
  }, [])

  const stacksCount = useMemo(() => {
    const all = PROJECTS.flatMap((p) => p.tech ?? [])
    return new Set(all).size
  }, [])

  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {PROFILE.available ? (
            <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200/60 bg-white/70 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40 dark:text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Disponível para oportunidades
            </p>
          ) : null}

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Olá, eu sou{' '}
            <span className="bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
              {PROFILE.displayName}
            </span>
            .
          </h1>

          <p className="mt-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {PROFILE.role}
            {PROFILE.location ? ` · ${PROFILE.location}` : ''}
          </p>

          <p className="mt-4 max-w-prose text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {PROFILE.tagline} Este site também serve como laboratório para
            analytics dos meus projetos (GitHub + uso do portfólio).
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/projetos"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white dark:focus-visible:ring-offset-zinc-950"
            >
              Ver projetos <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-50 dark:hover:bg-zinc-950 dark:focus-visible:ring-offset-zinc-950"
            >
              Entrar em contato
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <SocialLink
              href={PROFILE.socials.github}
              label="GitHub"
              icon={Github}
            />
            <SocialLink
              href={PROFILE.socials.linkedin}
              label="LinkedIn"
              icon={Linkedin}
            />
            <SocialLink
              href={`mailto:${PROFILE.email}`}
              label="Email"
              icon={Mail}
            />
          </div>
        </motion.section>

        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="grid gap-3"
        >
          <Stat label="Projetos publicados" value={`${PROJECTS.length}+`} />
          <Stat label="Stacks exploradas" value={`${stacksCount}+`} />
          <Stat label="Insights e métricas" value="GitHub + Web" />

          <div className="rounded-2xl border border-zinc-200/60 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              Próximo passo
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Conectar o portfólio ao backend Java para CRUD de projetos e
              coleta de métricas (eventos do site e dados do GitHub).
            </p>
          </div>
        </motion.aside>
      </div>

      <section className="mt-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Projetos em destaque
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Uma seleção rápida para você explorar. No detalhe, eu explico
              decisões técnicas e próximos passos.
            </p>
          </div>
          <Link
            to="/projetos"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-sm font-semibold text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-50 dark:hover:bg-zinc-950 dark:focus-visible:ring-offset-zinc-950"
          >
            Ver todos <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-6 grid gap-4">
          {PROJECTS.slice(0, 2).map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Skills
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Minhas áreas de foco hoje (e o que eu gosto de estudar).
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_SECTIONS.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-zinc-200/60 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40"
            >
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                {section.title}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {section.items.map((item) => (
                  <SkillPill key={item}>{item}</SkillPill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  )
}

