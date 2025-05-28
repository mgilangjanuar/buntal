import Header from '@/components/header'
import type { MetaProps } from 'buntal'

export const $ = () => ({
  _meta: {
    title: 'Docs - Buntal JS',
  } satisfies MetaProps
})

export default function DocsPage() {
  return (
    <div>
      <Header title="Get Started" />
      <main className="grid gap-16 xl:grid-cols-[1fr_322px] py-4">
        <div className="container prose ml-0">
          <p>
            Welcome to Buntal JS! This is a lightweight alternative to Next.js
            without the bloatware. To get started, you can check out the
            documentation and examples provided.
          </p>
          <h3>Installation</h3>
          <p>To install Buntal JS, run:</p>
          <pre><code>npm install buntal</code></pre>
          <h3>Usage</h3>
          <p>Import Buntal in your project:</p>
          <pre><code>import {`{ Buntal }`} from 'buntal'</code></pre>
        </div>
        <div className="xl:block hidden">
          <aside className="sticky top-14 container ml-0 text-base-content/60 text-sm space-y-3">
            <p className="font-semibold">On this page</p>
            <ul className="pl-4 space-y-2 [&>li]:hover:text-base-content [&>li]:hover:underline [&>li]:underline-offset-4">
              <li><a href="/docs/getting-started">Getting Started</a></li>
              <li><a href="/docs/api-reference">API Reference</a></li>
              <li><a href="/docs/examples">Examples</a></li>
            </ul>
          </aside>
        </div>
      </main>
    </div>
  )
}
