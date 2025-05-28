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
      <main className="grid gap-4 xl:grid-cols-[1fr_300px] py-4">
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
          <aside className="sticky top-18 container ml-0 pl-8 border-l border-base-300/50">
            <h2 className="text-lg font-semibold">Documentation</h2>
            <ul className="list-disc pl-5">
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
