import Header from '@/components/header'
import { Script, type MetaProps } from 'buntal'

export const $ = () => ({
  _meta: {
    title: 'Docs - Buntal JS'
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
            documentation and examples provided. {new Date().getTime()}
          </p>
          <blockquote
            className="bluesky-embed"
            data-bluesky-uri="at://did:plc:3n5xhy6vl7smssmwxq5wgqa6/app.bsky.feed.post/3lpyjfo62a22n"
            data-bluesky-cid="bafyreidbkgxvrrp6y4enprw3o4txwzuybrt72n3xyvwruaurwvx4l3r4ai"
            data-bluesky-embed-color-mode="light"
          >
            <p lang="en">
              Honestly I learned the most (and became a much better dev) when I
              reinvented the wheel. Built a (simple) ORM instead of just using
              NHibernate (was a mistake.) Implemented own sorting algo thinking
              it would do better than built in (it did not.) Built own charting
              library. Etc All were worth it!!
              <br />
              <br />
              <a href="https://bsky.app/profile/did:plc:3n5xhy6vl7smssmwxq5wgqa6/post/3lpyjfo62a22n?ref_src=embed">
                [image or embed]
              </a>
            </p>
            &mdash; Gergely Orosz (
            <a href="https://bsky.app/profile/did:plc:3n5xhy6vl7smssmwxq5wgqa6?ref_src=embed">
              @gergely.pragmaticengineer.com
            </a>
            ){' '}
            <a href="https://bsky.app/profile/did:plc:3n5xhy6vl7smssmwxq5wgqa6/post/3lpyjfo62a22n?ref_src=embed">
              May 25, 2025 at 6:07 PM
            </a>
          </blockquote>
          <h3>Installation</h3>
          <p>To install Buntal JS, run:</p>
          <pre>
            <code>npm install buntal</code>
          </pre>
          <h3>Usage</h3>
          <p>Import Buntal in your project:</p>
          <pre>
            <code>import {`{ Buntal }`} from 'buntal'</code>
          </pre>
        </div>
        <div className="xl:block hidden">
          <aside className="sticky top-18 container ml-0 text-base-content/60 text-sm space-y-3">
            <p className="font-semibold">On this page</p>
            <ul className="pl-4 space-y-2 [&>li]:hover:text-base-content [&>li]:hover:underline [&>li]:underline-offset-4">
              <li>
                <a href="/docs/getting-started">Getting Started</a>
              </li>
              <li>
                <a href="/docs/api-reference">API Reference</a>
              </li>
              <li>
                <a href="/docs/examples">Examples</a>
              </li>
            </ul>
          </aside>
        </div>
      </main>
      <Script src="https://embed.bsky.app/static/embed.js" async />
    </div>
  )
}
