import Header from '@/components/header'
import type { MetaProps } from 'buntal'

export const $ = () => ({
  _meta: {
    title: 'HTTP Server - Buntal JS'
  } satisfies MetaProps
})

export default function HTTPPkgPage() {
  return (
    <div>
      <Header title="HTTP Server" />
      <main className="grid gap-16 xl:grid-cols-[1fr_322px] py-4">
        <div className="container prose ml-0">
          <section id="introduction"></section>
          <section id="features"></section>
          <section id="roadmap"></section>
        </div>
        <div className="xl:block hidden">
          <aside className="sticky top-18 container ml-0 text-base-content/60 text-sm space-y-3">
            <p className="font-semibold">On this page</p>
            <ul className="pl-4 space-y-2 [&>li]:hover:text-base-content [&>li]:hover:underline [&>li]:underline-offset-4">
              <li>
                <a href="/docs#introduction">Introduction</a>
              </li>
              <li>
                <a href="/docs#features">Features</a>
              </li>
              <li>
                <a href="/docs#roadmap">Roadmap</a>
              </li>
            </ul>
          </aside>
        </div>
      </main>
    </div>
  )
}
