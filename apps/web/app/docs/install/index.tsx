import Header from '@/components/header'
import { type MetaProps } from 'buntal'

export const $ = () => ({
  _meta: {
    title: 'Installation - Buntal JS'
  } satisfies MetaProps
})

export default function InstallPage() {
  return (
    <div id="prerequisite">
      <Header title="Installation" />
      <main className="grid gap-8 xl:grid-cols-[1fr_322px] py-4">
        <div className="container ml-0 prose pb-6">
          <section>
            <h2 className="mt-0">Prerequisite</h2>
            <p>
              Before you start using Buntal JS, ensure you have the following
              prerequisites installed on your system:
            </p>
            <ul>
              <li>
                <strong>Bun</strong> ^1.2.14 - Buntal JS is built on top of the
                Bun runtime and API, so you need to have it installed. You can
                download it from the{' '}
                <a href="https://bun.sh" className="underline-offset-4">
                  Bun website
                </a>
                .
              </li>
            </ul>
          </section>
          <p className="text-sm text-base-content/60 border-t border-base-content/10 pt-6 mt-12">
            Last modified: 2025-05-28
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
