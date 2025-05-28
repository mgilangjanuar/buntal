import Header from '@/components/header'
import { type MetaProps } from 'buntal'

export const $ = () => ({
  _meta: {
    title: 'Full-stack Web - Buntal JS'
  } satisfies MetaProps
})

export default function HTTPPkgPage() {
  return (
    <div id="prerequisite">
      <Header title="Full-stack Web" />
      <main className="grid gap-8 xl:grid-cols-[1fr_322px] py-4">
        <div className="container ml-0 prose pb-6">
          <section></section>
          <p className="text-sm text-base-content/60 border-t border-base-content/10 pt-6 mt-12">
            Last modified: 2025-05-29
          </p>
        </div>
        <div className="xl:block hidden">
          <aside className="sticky top-18 container ml-0 text-base-content/60 text-sm space-y-3">
            <p className="font-semibold">On this page</p>
            <ul className="pl-4 space-y-2">
              <li>
                <a
                  className="hover:text-base-content hover:underline underline-offset-4"
                  href="#prerequisite"
                >
                  Prerequisite
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </main>
    </div>
  )
}
