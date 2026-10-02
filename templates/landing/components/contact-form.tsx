import { cn } from '@/lib/utils'
import { useState, type FormEvent } from 'react'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>
type Status = 'idle' | 'sending' | 'sent' | 'error'

const field =
  'w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-950 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('sending')
    setErrors({})
    const resp = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    }).catch(() => null)
    if (resp?.ok) {
      form.reset()
      setStatus('sent')
      return
    }
    const body = (await resp?.json().catch(() => null)) as {
      details?: Errors
    } | null
    setErrors(body?.details ?? {})
    setStatus('error')
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium">
          Name
          <input
            name="name"
            autoComplete="name"
            required
            aria-invalid={!!errors.name}
            className={field}
          />
          {errors.name && <span className="text-red-600">{errors.name}</span>}
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={!!errors.email}
            className={field}
          />
          {errors.email && <span className="text-red-600">{errors.email}</span>}
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-medium">
        Project details
        <textarea
          name="message"
          rows={5}
          required
          aria-invalid={!!errors.message}
          className={field}
        />
        {errors.message && (
          <span className="text-red-600">{errors.message}</span>
        )}
      </label>
      <label className="hidden" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-full bg-indigo-600 px-6 py-2.5 font-medium text-white hover:bg-indigo-500 disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <p
          aria-live="polite"
          className={cn(
            'text-sm',
            status === 'sent' ? 'text-emerald-600' : 'text-red-600'
          )}
        >
          {status === 'sent' &&
            'Thanks! We will reply within two working days.'}
          {status === 'error' &&
            !Object.keys(errors).length &&
            'Something went wrong. Please try again.'}
        </p>
      </div>
    </form>
  )
}
