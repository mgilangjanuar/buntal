import { buildPrompt, USE_CASES } from '@/lib/ai-prompts'
import { cn } from '@/lib/utils'
import { Link } from 'buntal'
import { useEffect, useState } from 'react'

export default function AiPrompts() {
  const [selected, setSelected] = useState(USE_CASES[0]!.id)
  const [copied, setCopied] = useState(false)
  const useCase = USE_CASES.find((u) => u.id === selected) ?? USE_CASES[0]!
  const prompt = buildPrompt(useCase)

  useEffect(() => setCopied(false), [selected])

  const copy = async () => {
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="build-with-ai" className="w-full relative scroll-mt-24">
      <div className="container mx-auto px-4 pb-20 lg:pb-40 max-w-5xl">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight">
            Build anything with your AI agent
          </h2>
          <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto">
            Pick what you want to build, copy the prompt, and paste it into
            Claude Code, Cursor, Copilot or any coding agent. Every prompt
            points the agent at{' '}
            <a href="/llms.txt" className="link link-hover font-mono text-sm">
              /llms.txt
            </a>{' '}
            so it writes real Buntal code.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Use cases"
          className="flex flex-wrap justify-center gap-2 mb-6"
        >
          {USE_CASES.map((u) => (
            <button
              key={u.id}
              role="tab"
              type="button"
              aria-selected={u.id === selected}
              aria-controls="ai-prompt-panel"
              onClick={() => setSelected(u.id)}
              className={cn(
                'btn btn-sm rounded-full',
                u.id === selected ? 'btn-primary' : 'btn-ghost border-base-300'
              )}
            >
              {u.title}
            </button>
          ))}
        </div>

        <div
          id="ai-prompt-panel"
          role="tabpanel"
          className="card bg-base-200/60 border border-base-300 shadow-sm"
        >
          <div className="card-body gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
              <div>
                <h3 className="card-title">{useCase.title}</h3>
                <p className="text-sm text-base-content/70">
                  {useCase.summary}
                </p>
              </div>
              <button
                type="button"
                onClick={copy}
                className="btn btn-primary btn-soft shrink-0"
                aria-live="polite"
              >
                {copied ? 'Copied!' : 'Copy prompt'}
              </button>
            </div>
            <ul className="text-sm space-y-1.5 list-disc pl-5 text-base-content/80">
              {useCase.requirements.map((r) => (
                <li key={r}>{r.replace(/`/g, '')}</li>
              ))}
            </ul>
            <details className="group">
              <summary className="cursor-pointer text-sm text-base-content/60 hover:text-base-content select-none">
                Show full prompt
              </summary>
              <pre className="mt-3 max-h-96 overflow-auto rounded-md bg-base-100 p-4 text-xs leading-relaxed whitespace-pre-wrap font-mono">
                {prompt}
              </pre>
            </details>
          </div>
        </div>

        <p className="text-center text-sm text-base-content/60 mt-6">
          More prompts and tips in the{' '}
          <Link href="/docs/guides/ai" className="link link-hover font-medium">
            Build with AI guide
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
