import Code from '@/components/code'
import Footer from '@/components/home/footer'
import Header from '@/components/home/header'
import { useTheme } from '@/hooks/use-theme'
import { shot, SHOTS, TEMPLATES, type TemplateInfo } from '@/lib/templates'
import { cn } from '@/lib/utils'
import { Link, type MetaProps } from 'buntal'
import { useState } from 'react'

export const $ = {
  _meta: {
    title: 'Templates - Buntal JS',
    description:
      'Starter templates for Buntal: landing page and portfolio, Markdown blog with a SQL database, and a minimal app.'
  } satisfies MetaProps
}

const SOURCE = 'https://github.com/mgilangjanuar/buntal/tree/main/templates'

function TemplateCard({ template }: { template: TemplateInfo }) {
  const { theme } = useTheme()
  const pages = SHOTS[template.name]
  const [page, setPage] = useState(pages[0]!.name)
  const scheme = theme === 'dark' ? 'dark' : 'light'

  return (
    <article
      id={template.name}
      className="scroll-mt-24 grid gap-8 lg:grid-cols-[3fr_2fr] items-start"
    >
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
            loading="lazy"
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
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">{template.title}</h2>
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
    </article>
  )
}

export default function TemplatesPage() {
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
        <div className="space-y-24">
          {TEMPLATES.map((t) => (
            <TemplateCard key={t.name} template={t} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
