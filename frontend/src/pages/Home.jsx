import { motion } from 'framer-motion'
import { ArrowRight, Cloud, Code2, Coffee, Cpu, Database, Github, Linkedin, Mail, Workflow } from 'lucide-react'
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
    <span className="inline-flex items-center rounded-full border border-zinc-200/70 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm transition hover:bg-white dark:border-zinc-800/70 dark:bg-zinc-950/40 dark:text-zinc-300 dark:hover:bg-zinc-950">
      {children}
    </span>
  )
}

const LEVEL_META = {
  Avançado: {
    score: 4,
    pill: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-100',
  },
  Sólido: {
    score: 3,
    pill: 'border-indigo-200 bg-indigo-50 text-indigo-900 dark:border-indigo-900/40 dark:bg-indigo-950/30 dark:text-indigo-100',
  },
  'Em desenvolvimento': {
    score: 2,
    pill: 'border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-100',
  },
  'Em evolução': {
    score: 2,
    pill: 'border-sky-200 bg-sky-50 text-sky-950 dark:border-sky-900/40 dark:bg-sky-950/30 dark:text-sky-100',
  },
}

const SKILL_META = {
  python: { Icon: Code2, gradient: 'from-indigo-500 to-cyan-400' },
  dataeng: { Icon: Workflow, gradient: 'from-violet-500 to-fuchsia-400' },
  cloud: { Icon: Cloud, gradient: 'from-orange-500 to-amber-400' },
  data: { Icon: Database, gradient: 'from-emerald-500 to-teal-400' },
  cpp: { Icon: Cpu, gradient: 'from-fuchsia-500 to-pink-400' },
  java: { Icon: Coffee, gradient: 'from-amber-500 to-orange-400' },
}

const PROGRESS_WIDTH = {
  4: 'w-full',
  3: 'w-3/4',
  2: 'w-1/2',
  1: 'w-1/4',
  0: 'w-0',
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
            Competências
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            O que eu uso no dia a dia e o que estou evoluindo.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_SECTIONS.map((section, idx) => {
            const meta = SKILL_META[section.id] ?? SKILL_META.python
            const levelMeta = LEVEL_META[section.level] ?? LEVEL_META['Em evolução']
            const widthClass = PROGRESS_WIDTH[levelMeta.score] ?? PROGRESS_WIDTH[0]
            const Icon = meta.Icon

            return (
              <motion.div
                key={section.id ?? section.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.28, delay: Math.min(idx * 0.05, 0.25) }}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/60 dark:bg-zinc-950/40 dark:hover:border-zinc-700"
              >
                <div className={cn('absolute inset-x-0 top-0 h-1 bg-gradient-to-r', meta.gradient)} />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        'grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br text-white shadow-sm ring-1 ring-black/5',
                        meta.gradient,
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>

                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        {section.title}
                      </h3>
                      {section.description ? (
                        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {section.description}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {section.level ? (
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold',
                        levelMeta.pill,
                      )}
                    >
                      {section.level}
                    </span>
                  ) : null}
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                    <span>Proficiência</span>
                    <span>{levelMeta.score}/4</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-zinc-200/70 dark:bg-zinc-800/70">
                    <div className={cn('h-2 rounded-full bg-gradient-to-r', meta.gradient, widthClass)} />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {section.items.map((item) => (
                    <SkillPill key={item}>{item}</SkillPill>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>
    </Container>
  )
}

