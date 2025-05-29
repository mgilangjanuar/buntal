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
            <p>
              Buntal uses <code>@buntal/core</code> under the hood to handle all
              requests and render the selected page based on the pathname. So,
              your web will always be hydrated by returning an exact same HTML
              page from the server, which is great for SEO and performance.
            </p>
            <p>
              After initializing a project with a template using this command:
            </p>
            <SyntaxHighlighter
              language="sh"
              style={theme === 'dark' ? atomOneDark : atomOneLight}
              customStyle={{ padding: '12px 16px' }}
            >
              {`bun create buntal@latest my-app`}
            </SyntaxHighlighter>
            <p>
              You will have Tailwind CSS and minimal dependencies to build your
              web project. Here is the project structure:
            </p>
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
            <p>
              Seems familiar, right? The main modules are located in the{' '}
              <code>app</code> directory, which contains the main entry
              point/page at <code>index.tsx</code>, <code>globals.css</code>,
              and a layout file at <code>layout.tsx</code>. You can create a new
              page such as <code>about/index.tsx</code> in the <code>app</code>{' '}
              directory, and it will be automatically available at{' '}
              <code>/about</code>.
            </p>
            <p>
              Run the development server using <code>bun dev</code>, and the
              output will look like this:
            </p>
            <SyntaxHighlighter
              language="sh"
              style={theme === 'dark' ? atomOneDark : atomOneLight}
              customStyle={{ padding: '12px 16px' }}
            >
              {`  -... ..- -. - .- .-..
  Local:        http://localhost:3000
  Network:      http://192.168.18.121:3000

Done in 12ms`}
            </SyntaxHighlighter>
            <p>
              Explore the full example on{' '}
              <a
                href="https://github.com/mgilangjanuar/buntal/tree/main/examples/hello-world"
                className="underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              .
            </p>
          </section>
          <section id="layout.tsx">
            <h2>layout.tsx</h2>
          </section>
          <section id="index.tsx">
            <h2>index.tsx</h2>
          </section>
          <section id="$">
            <h2>$</h2>
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
              <li>
                <a
                  className="hover:text-base-content hover:underline underline-offset-4"
                  href="#layout.tsx"
                >
                  layout.tsx
                </a>
              </li>
              <li>
                <a
                  className="hover:text-base-content hover:underline underline-offset-4"
                  href="#index.tsx"
                >
                  index.tsx
                </a>
              </li>
              <li>
                <a
                  className="hover:text-base-content hover:underline underline-offset-4"
                  href="#$"
                >
                  $
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </main>
    </div>
  )
}
