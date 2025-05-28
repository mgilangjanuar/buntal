import Header from '@/components/header'
import { type MetaProps } from 'buntal'

export const $ = () => ({
  _meta: {
    title: 'Get Started - Buntal JS'
  } satisfies MetaProps
})

export default function DocsPage() {
  return (
    <div>
      <Header title="Get Started" />
      <main className="grid gap-8 xl:grid-cols-[1fr_322px] py-4">
        <div className="container ml-0">
          <section id="introduction" className="prose">
            <div role="alert" className="alert alert-warning items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>
                Warning: This is an early development stage, expect breaking
                changes and missing features.
              </span>
            </div>
            <p>
              <strong>Buntal JS</strong> is a lightweight, modern JavaScript
              framework designed to simplify web development. Next.js-like file
              system routing, type-safe APIs, and focus on performance. Leverage
              the{' '}
              <a
                href="https://bun.sh"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                Bun
              </a>{' '}
              ecosystem, the fastest runtime ever.
            </p>
          </section>
          <section id="features"></section>
          <section id="roadmap"></section>
        </div>
        <div className="xl:block hidden">
          <aside className="sticky top-18 container ml-0 text-base-content/60 text-sm space-y-3">
            <p className="font-semibold">On this page</p>
            <ul className="pl-4 space-y-2 [&>li]:hover:text-base-content [&>li]:hover:underline [&>li]:underline-offset-4">
              <li>
                <a href="#introduction">Introduction</a>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#roadmap">Roadmap</a>
              </li>
            </ul>
          </aside>
        </div>
      </main>
    </div>
  )
}
