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
    title: 'Starter templates - Buntal JS',
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
      className="card card-border border-base-300 group bg-base-200/40 text-left transition hover:border-base-content/30 hover:bg-base-200/70 focus-visible:outline-2 focus-visible:outline-primary"
    >
      <figure className="px-5 pt-5">
        <div className="aspect-[16/10] w-full overflow-hidden rounded-field border border-base-300 bg-base-200">
          <img
            src={shot(template.name, cover, scheme)}
            alt=""
            width={1280}
            height={800}
            loading="lazy"
            className="size-full object-cover object-top transition duration-300 group-hover:scale-[1.03]"
          />
        </div>
      </figure>
      <div className="card-body p-5 gap-1.5">
        <h2 className="card-title text-lg truncate">{template.title}</h2>
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
    <div className="grid gap-6 lg:gap-8 lg:grid-cols-[3fr_2fr] items-start">
      <div className="space-y-3 min-w-0">
        <div className="mockup-browser border border-base-300 bg-base-200">
          <div className="mockup-browser-toolbar">
            <div className="input text-xs truncate">
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
          <div
            role="tablist"
            aria-label="Pages"
            className="flex flex-wrap gap-2"
          >
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

      <div className="space-y-5 min-w-0">
        <div>
          <div className="flex flex-wrap items-center gap-2 pr-8">
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
        <p className="text-sm text-base-content/60 flex flex-wrap gap-x-2 gap-y-1">
          Routes:
          {template.pages.map((p) => (
            <code key={p} className="text-xs">
              {p}
            </code>
          ))}
        </p>
        <Code
          language="sh"
          className="text-sm [&_pre]:pr-10! [&_pre]:whitespace-pre-wrap! [&_code]:whitespace-pre-wrap! [&_code]:break-normal!"
        >
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

const TAGS = [...new Set(TEMPLATES.flatMap((t) => t.tags))].sort()

const matches = (t: TemplateInfo, query: string, tags: string[]) => {
  const q = query.trim().toLowerCase()
  const text = [t.title, t.summary, t.name, ...t.tags, ...t.features]
    .join(' ')
    .toLowerCase()
  return (!q || text.includes(q)) && tags.every((tag) => t.tags.includes(tag))
}

function Filters({
  selected,
  onToggle
}: {
  selected: string[]
  onToggle: (tag: string) => void
}) {
  return (
    <fieldset className="fieldset gap-2">
      <legend className="fieldset-legend text-base pt-0">
        Filter Templates
      </legend>
      <div className="flex flex-wrap gap-2 lg:flex-col">
        {TAGS.map((tag) => (
          <label
            key={tag}
            className="label gap-3 rounded-field border border-base-300 bg-base-200/60 px-3 py-2 text-sm text-base-content cursor-pointer transition hover:border-base-content/30 has-checked:border-primary/60 lg:py-2.5"
          >
            <input
              type="checkbox"
              checked={selected.includes(tag)}
              onChange={() => onToggle(tag)}
              className="checkbox checkbox-sm"
            />
            {tag}
          </label>
        ))}
      </div>
    </fieldset>
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
  const [query, setQuery] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const shown = TEMPLATES.filter((t) => matches(t, query, tags))
  const toggle = (tag: string) =>
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (active && !el.open) {
      el.showModal()
      el.querySelector<HTMLElement>('.modal-box')?.focus()
    }
    if (!active && el.open) el.close()
  }, [active])

  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-16 lg:py-28 max-w-7xl">
        <header className="max-w-3xl space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight">
            Buntal starter templates
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

        <label className="input input-lg w-full mt-10 mb-10 lg:mb-14">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-5 opacity-50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates..."
            aria-label="Search templates"
          />
        </label>

        <div className="grid gap-10 lg:gap-12 lg:grid-cols-[15rem_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Filters selected={tags} onToggle={toggle} />
          </aside>
          <section aria-live="polite" className="min-w-0">
            {shown.length > 0 ? (
              <div className="grid gap-6 lg:gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {shown.map((t) => (
                  <TemplateTile
                    key={t.name}
                    template={t}
                    onOpen={() => setHash(`#${t.name}`)}
                  />
                ))}
              </div>
            ) : (
              <p className="py-16 text-center text-base-content/60">
                No templates match your search.
              </p>
            )}
          </section>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="modal"
        aria-labelledby="template-title"
        onClose={() => setHash('')}
      >
        <div
          tabIndex={-1}
          className="modal-box w-11/12 max-w-6xl max-h-[90svh] p-5 pt-12 sm:p-8 sm:pt-12 outline-none"
        >
          <form method="dialog">
            <button
              type="submit"
              aria-label="Close"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10"
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
