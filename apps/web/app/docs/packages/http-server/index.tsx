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
    title: 'HTTP Server - Buntal JS'
  } satisfies MetaProps
})

export default function HTTPPkgPage() {
  const { theme } = useTheme()

  return (
    <div id="quick-start">
      <Header title="HTTP Server" />
      <main className="grid gap-8 xl:grid-cols-[1fr_322px] py-4">
        <div className="container ml-0 prose pb-6 grid grid-cols-1">
          <section>
            <h2 className="mt-0">Quick Start</h2>
            <p>
              Here is a simple example of how to create an HTTP server using
              Buntal JS. This example demonstrates how to set up a basic server
              with file-based routing, middleware, a declarative router, and
              type-safe request parameters.
            </p>
            <SyntaxHighlighter
              language="typescript"
              style={theme === 'dark' ? atomOneDark : atomOneLight}
              customStyle={{ padding: '12px 16px' }}
            >
              {`import { Http } from '@buntal/core'
import { cors, logger } from '@buntal/core/middlewares'

// Initialize the HTTP server
const app = new Http({
  port: 4001,
  appDir: './app' // Enable file-based routing!
})

// Add middlewares
app.use(cors())
app.use(logger())

// Define a simple GET endpoint with a type-safe params
app.get('/hello/:name', (req, res) => {
  return res.json({
    hello: \`Hello \${req.params.name}\`
  })
})

// Start the server!
app.start((server) => {
  console.log(\`Server running at http://localhost:\${server.port}\`)
})`}
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
