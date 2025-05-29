import Header from '@/components/header'
import { useTheme } from '@/hooks/use-theme'
import { type MetaProps } from 'buntal'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {
  atomOneDark,
  atomOneLight
} from 'react-syntax-highlighter/dist/esm/styles/hljs'

export const $ = () => ({
  _meta: {
    title: 'Full-stack Web - Buntal JS'
  } satisfies MetaProps
})

export default function HTTPPkgPage() {
  const { theme } = useTheme()

  return (
    <div id="quick-start">
      <Header title="Full-stack Web" />
      <main className="grid gap-8 xl:grid-cols-[1fr_322px] py-4">
        <div className="container ml-0 prose pb-6 grid grid-cols-1">
          <section>
            <h2 className="mt-0">Quick Start</h2>
            <SyntaxHighlighter
              language="sh"
              style={theme === 'dark' ? atomOneDark : atomOneLight}
              customStyle={{ padding: '12px 16px' }}
            >
              {`.
├── app
│   ├── favicon.svg
│   ├── globals.css
│   ├── index.tsx
│   ├── layout.tsx
│   └── logo.svg
├── buntal.config.ts
├── custom.d.ts
├── lib
│   └── utils.ts
├── package.json
├── public
└── tsconfig.json`}
            </SyntaxHighlighter>
          </section>
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
                  href="#quick-start"
                >
                  Quick Start
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </main>
    </div>
  )
}
