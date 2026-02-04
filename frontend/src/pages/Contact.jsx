import { Mail, Send } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { sendContactMessage } from '../api/contact'
import Container from '../components/Container'
import { PROFILE } from '../data/profile'

function Field({ label, children, hint }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
        {label}
      </span>
      {children}
      {hint ? (
        <span className="text-xs text-zinc-600 dark:text-zinc-400">{hint}</span>
      ) : null}
    </label>
  )
}

export default function Contact() {
  useEffect(() => {
    document.title = `Contato | ${PROFILE.displayName}`
  }, [])

  const email = PROFILE.email

  const [name, setName] = useState('')
  const [from, setFrom] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [delivered, setDelivered] = useState(false)

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`Contato pelo portfólio — ${name || 'Olá'}`)
    const body = encodeURIComponent(
      `Nome: ${name || '-'}\nEmail: ${from || '-'}\n\nMensagem:\n${message || '-'}`,
    )
    return `mailto:${email}?subject=${subject}&body=${body}`
  }, [email, name, from, message])

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await sendContactMessage({ name, email: from, message })
      setDelivered(Boolean(res?.delivered))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <Container>
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Contato
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Quer conversar sobre um projeto, vaga ou colaboração? Me mande uma
          mensagem.
        </p>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.6fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-zinc-200/60 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40"
        >
          <div className="grid gap-4">
            <Field label="Nome">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 rounded-xl border-zinc-200 bg-white/80 px-4 text-sm text-zinc-900 shadow-sm outline-none ring-indigo-500/30 placeholder:text-zinc-400 focus:ring-4 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-50 dark:placeholder:text-zinc-500"
                placeholder="Seu nome"
                autoComplete="name"
              />
            </Field>

            <Field label="Email" hint="Só para eu conseguir te responder.">
              <input
                type="email"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="h-11 rounded-xl border-zinc-200 bg-white/80 px-4 text-sm text-zinc-900 shadow-sm outline-none ring-indigo-500/30 placeholder:text-zinc-400 focus:ring-4 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-50 dark:placeholder:text-zinc-500"
                placeholder="voce@exemplo.com"
                autoComplete="email"
                inputMode="email"
              />
            </Field>

            <Field label="Mensagem">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-32 resize-y rounded-xl border-zinc-200 bg-white/80 px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none ring-indigo-500/30 placeholder:text-zinc-400 focus:ring-4 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-50 dark:placeholder:text-zinc-500"
                placeholder="Escreva sua mensagem..."
              />
            </Field>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white dark:focus-visible:ring-offset-zinc-950"
                disabled={status === 'sending'}
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {status === 'sending' ? 'Enviando...' : 'Enviar'}
              </button>

              <a
                href={mailtoHref}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-50 dark:hover:bg-zinc-950 dark:focus-visible:ring-offset-zinc-950"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Abrir no email
              </a>
            </div>

            {status === 'sent' ? (
              <div className="mt-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-100">
                {delivered
                  ? 'Mensagem enviada com sucesso.'
                  : 'Backend ainda não configurado — use o botão “Abrir no email” para enviar.'}
              </div>
            ) : status === 'error' ? (
              <div className="mt-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-100">
                Não foi possível enviar agora. Tente “Abrir no email”.
              </div>
            ) : null}
          </div>
        </form>

        <aside className="grid gap-3">
          <div className="rounded-2xl border border-zinc-200/60 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              Email direto
            </h2>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              <a
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-cyan-300 dark:hover:text-cyan-200"
                href={`mailto:${email}`}
              >
                {email}
              </a>
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200/60 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              Privacidade
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Quando o backend estiver pronto, este formulário vai usar rate
              limit e validação para evitar spam, sem armazenar informações
              sensíveis além do necessário para resposta.
            </p>
          </div>
        </aside>
      </div>
    </Container>
  )
}

