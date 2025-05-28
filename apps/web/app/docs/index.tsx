import Header from '@/components/header'
import { Link, Script, type MetaProps } from 'buntal'

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
          <div id="contributors">
            <h1>Buntal JS</h1>
            <div>
              <a
                href="https://github.com/mgilangjanuar/buntal/graphs/contributors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://contrib.rocks/image?repo=mgilangjanuar/teledrive"
                  className="w-full"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="xl:block hidden">
          <aside className="sticky top-18 container ml-0 text-base-content/60 text-sm space-y-3">
            <p className="font-semibold">On this page</p>
            <ul className="pl-4 space-y-2 [&>li]:hover:text-base-content [&>li]:hover:underline [&>li]:underline-offset-4">
              <li>
                <Link href="/docs#introduction">Introduction</Link>
              </li>
              <li>
                <Link href="/docs#motivation">Motivation</Link>
              </li>
              <li>
                <Link href="/docs#features">Features</Link>
              </li>
              <li>
                <Link href="/docs#contributors">Contributors</Link>
              </li>
            </ul>
          </aside>
        </div>
      </main>
      <Script src="https://embed.bsky.app/static/embed.js" async />
    </div>
  )
}
