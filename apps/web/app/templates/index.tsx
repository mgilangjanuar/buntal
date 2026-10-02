import Code from '@/components/code'
import Footer from '@/components/home/footer'
import Header from '@/components/home/header'
import { useTheme } from '@/hooks/use-theme'
import { shot, SHOTS, TEMPLATES, type TemplateInfo } from '@/lib/templates'
import { cn } from '@/lib/utils'
import { Link, type MetaProps } from 'buntal'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

export const $ = {
  _meta: {
    title: 'Templates - Buntal JS',
    description:
      'Starter templates for Buntal: landing page and portfolio, Markdown blog with a SQL database, and a minimal app.'
  } satisfies MetaProps
}

const SOURCE = 'https://github.com/mgilangjanuar/buntal/tree/main/templates'

function useScheme() {
  const { theme } = useTheme()
  return theme === 'dark' ? 'dark' : 'light'
}

function TemplateTile({
  template,
  onOpen
}: {
  template: TemplateInfo
  onOpen: () => void
}) {
  const scheme = useScheme()
  const cover = SHOTS[template.name][0]!.name

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="group text-left rounded-box border border-base-300 bg-base-200/40 overflow-hidden transition hover:border-primary/50 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="aspect-[16/10] overflow-hidden border-b border-base-300 bg-base-200">
        <img
          src={shot(template.name, cover, scheme)}
          alt={`${template.title} template preview`}
          width={1280}
          height={800}
          loading="lazy"
          className="w-full h-full object-cover object-top transition duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-5 space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{template.title}</h2>
          {template.database && (
            <span className="badge badge-soft badge-secondary badge-sm">
              Bun.SQL
            </span>
          )}
        </div>
        <p className="text-sm text-base-content/70 line-clamp-2">
          {template.summary}
        </p>
      </div>
    </button>
  )
}

function TemplateDetail({ template }: { template: TemplateInfo }) {
  const scheme = useScheme()
  const pages = SHOTS[template.name]
  const [page, setPage] = useState(pages[0]!.name)

  return (
    <div className="grid gap-8 lg:grid-cols-[3fr_2fr] items-start">
      <div className="space-y-3">
        <div className="mockup-browser border border-base-300 bg-base-200">
          <div className="mockup-browser-toolbar">
            <div className="input text-xs">
              localhost:3000
              {pages.find((p) => p.name === page)?.path}
            </div>
          </div>
          <img
            src={shot(template.name, page, scheme)}
            alt={`${template.title} template, ${page} page`}
            width={1280}
            height={800}
            className="w-full h-auto"
          />
        </div>
        {pages.length > 1 && (
          <div role="tablist" aria-label="Pages" className="flex gap-2">
            {pages.map((p) => (
              <button
                key={p.name}
                type="button"
                role="tab"
                aria-selected={p.name === page}
                onClick={() => setPage(p.name)}
                className={cn(
                  'btn btn-xs rounded-full',
                  p.name === page ? 'btn-primary' : 'btn-ghost'
                )}
              >
                {p.path}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex items-center gap-2 pr-8">
            <h2 id="template-title" className="text-2xl font-semibold">
              {template.title}
            </h2>
            {template.database && (
              <span className="badge badge-soft badge-secondary badge-sm">
                Bun.SQL
              </span>
            )}
          </div>
          <p className="mt-2 text-base-content/70">{template.summary}</p>
        </div>
        <ul className="space-y-1.5 text-sm list-disc pl-5 text-base-content/80">
          {template.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <p className="text-sm text-base-content/60">
          Routes:{' '}
          {template.pages.map((p) => (
            <code key={p} className="mr-2 text-xs">
              {p}
            </code>
          ))}
        </p>
        <Code language="sh" className="text-sm">
          {`bun create buntal@latest my-app --template ${template.name}`}
        </Code>
        <a
          href={`${SOURCE}/${template.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="link link-hover text-sm"
        >
          View source on GitHub
        </a>
      </div>
    </div>
  )
}

const HASH_EVENT = 'templatehash'

const subscribe = (cb: () => void) => {
  window.addEventListener('hashchange', cb)
  window.addEventListener(HASH_EVENT, cb)
  return () => {
    window.removeEventListener('hashchange', cb)
    window.removeEventListener(HASH_EVENT, cb)
  }
}

const setHash = (hash: string) => {
  history.replaceState(null, '', hash || window.location.pathname)
  window.dispatchEvent(new Event(HASH_EVENT))
}

export default function TemplatesPage() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const hash = useSyncExternalStore(
    subscribe,
    () => window.location.hash,
    () => ''
  )
  const active = TEMPLATES.find((t) => `#${t.name}` === hash) ?? null

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (active && !el.open) el.showModal()
    if (!active && el.open) el.close()
  }, [active])

  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-20 lg:py-28 max-w-6xl">
        <header className="max-w-2xl mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight">
            Templates
          </h1>
          <p className="text-lg text-base-content/70">
            Start from a working app instead of a blank page. Each template is
            type-safe, server-rendered and SEO-ready, and the ones with a
            database use Bun&apos;s built-in SQL client: SQLite by default,
            Postgres with one environment variable.
          </p>
          <p className="text-sm text-base-content/60">
            Run <code>bun create buntal@latest my-app</code> to pick one
            interactively, or ask your AI agent with a{' '}
            <Link href="/docs/guides/ai" className="link link-hover">
              ready-made prompt
            </Link>
            .
          </p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t) => (
            <TemplateTile
              key={t.name}
              template={t}
              onOpen={() => setHash(`#${t.name}`)}
            />
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="modal"
        aria-labelledby="template-title"
        onClose={() => setHash('')}
      >
        <div className="modal-box w-11/12 max-w-6xl">
          <form method="dialog">
            <button
              type="submit"
              aria-label="Close"
              className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
            >
              ✕
            </button>
          </form>
          {active && <TemplateDetail key={active.name} template={active} />}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="submit" aria-label="Close">
            close
          </button>
        </form>
      </dialog>
      <Footer />
    </main>
  )
}
