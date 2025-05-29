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
            <p>
              And here is a simple example of a ping endpoint in the{' '}
              <code>./app/ping.ts</code> file that is automatically loaded into
              the app.
            </p>
            <SyntaxHighlighter
              language="typescript"
              style={theme === 'dark' ? atomOneDark : atomOneLight}
              customStyle={{ padding: '12px 16px' }}
            >
              {`import { h } from '@buntal/core'

export const GET = h(
  (_, res) => res.json({
    pong: 1
  })
)`}
            </SyntaxHighlighter>
            <p>
              Explore the full example on{' '}
              <a
                href="https://github.com/mgilangjanuar/buntal/tree/main/examples/simple-api"
                className="underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              .
            </p>
          </section>
          <section id="h">
            <h2>h</h2>
            <p>
              The <code>h</code> function is everything you need to create a
              type-safe HTTP handler. It receives a chain of{' '}
              <code>AtomicHandler</code> functions and returns a function that
              can be used as an HTTP handler.
            </p>
            <p>
              It's a basic{' '}
              <a
                href="https://en.wikipedia.org/wiki/Higher-order_function"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4"
              >
                higher-order function
              </a>{' '}
              pattern, and here is the <code>AtomicHandler</code> type
              definition:
            </p>
          </section>
          <section id="atomic-handler">
            <h3>AtomicHandler</h3>
            <p>
              This is a function that takes a <code>Req</code> and a{' '}
              <code>Res</code> object, and returns a response. As you can see in
              the example above:
            </p>
            <blockquote>
              <SyntaxHighlighter
                language="typescript"
                style={theme === 'dark' ? atomOneDark : atomOneLight}
                customStyle={{ padding: '12px 16px' }}
              >
                {`(_, res) => res.json({
  pong: 1
})`}
              </SyntaxHighlighter>
            </blockquote>
            <p>
              The first parameter is the <code>Req</code> object, which contains
              the request parameters, query parameters, and other information.
              The second parameter is the <code>Res</code> object, which is used
              to send the response back to the client.
            </p>
            <p>
              The pattern is similar to{' '}
              <a
                href="https://expressjs.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4"
              >
                Express.js
              </a>{' '}
              or other Node.js HTTP libraries, so the learning curve is minimal
              if you are familiar with those libraries.
            </p>
          </section>
          <section id="req">
            <h3>Req</h3>
            <p>
              The <code>Req</code> object is a native{' '}
              <a
                href="https://github.com/nodejs/undici"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4"
              >
                undici
              </a>{' '}
              request with extended properties, including <code>params</code>,{' '}
              <code>query</code>, and <code>context</code>.
            </p>
          </section>
          <section id="res">
            <h3>Res</h3>
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
                  href="#h"
                >
                  h
                </a>
                <ul className="pl-4 pt-2 space-y-2">
                  <li>
                    <a
                      className="hover:text-base-content hover:underline underline-offset-4"
                      href="#atomic-handler"
                    >
                      AtomicHandler
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-base-content hover:underline underline-offset-4"
                      href="#req"
                    >
                      Req
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-base-content hover:underline underline-offset-4"
                      href="#res"
                    >
                      Res
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </aside>
        </div>
      </main>
    </div>
  )
}
