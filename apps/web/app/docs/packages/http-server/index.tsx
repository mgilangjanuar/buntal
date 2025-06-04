import Code from '@/components/code'
import Header from '@/components/docs/header'
import { Link, type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'HTTP Server - Buntal JS'
  } satisfies MetaProps
}

export default function HTTPPkgPage() {
  return (
    <div>
      <Header title="HTTP Server" />
      <main className="grid gap-8 xl:grid-cols-[1fr_322px] py-4">
        <div className="container ml-0 prose pb-6 grid grid-cols-1">
          <section id="quick-start">
            <h2 className="mt-0">Quick Start</h2>
            <p>
              Here is a simple example of how to create an HTTP server using
              Buntal JS. This example demonstrates how to set up a basic server
              with file-based routing, middleware, a declarative router, and
              type-safe request parameters.
            </p>
            <Code language="typescript">
              {`import { Http } from '@buntal/core'
import { cors, logger } from '@buntal/core/middlewares'

// initialize the HTTP server
const app = new Http({
  port: 4001,
  appDir: './app' // Enable file-based routing!
})

// add middlewares
app.use(cors())
app.use(logger())

// define a simple GET endpoint with a type-safe params
app.get('/hello/:name', (req, res) => {
  return res.json({
    hello: \`Hello \${req.params.name}\`
  })
})

// start the server!
app.start((server) => {
  console.log(\`Server running at http://localhost:\${server.port}\`)
})`}
            </Code>
            <p>
              And here is a simple example of a ping endpoint in the{' '}
              <code>./app/ping.ts</code> file that is automatically loaded into
              the app.
            </p>
            <Code language="typescript">
              {`import { h } from '@buntal/core'

export const GET = h(
  (req, res) => res.json({
    pong: 1
  })
)`}
            </Code>
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
          <section id="http">
            <h2>Http</h2>
            <p>
              The <code>Http</code> class is the main entry point for creating
              an HTTP server in Buntal JS. It provides a simple and intuitive
              API for defining routes, adding middleware, and starting the
              server.
            </p>
            <h4>
              <code>{`Options: { port: number, appDir?: string }`}</code>
            </h4>
            <p>
              The <code>Http</code> constructor takes an options object with the
              following properties:
            </p>
            <ul>
              <li>
                <code>port</code>: The port number on which the server will
                listen. This is a required property.
              </li>
              <li>
                <code>appDir</code>: An optional property that specifies the
                directory where the app files are located. If provided, the
                server will automatically load routes from this directory.
              </li>
            </ul>
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
              <Code language="typescript">
                {`(req, res) => res.json({
  pong: 1
})`}
              </Code>
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
          <section id="middleware">
            <h3>Middleware</h3>
            <p>
              Middleware actually is same as the <code>AtomicHandler</code>{' '}
              function, but it is used to modify the request or response before
              it reaches the final handler. You can use middleware to add
              authorization, logging, or any other functionality that you want
              to apply to all/some requests.
            </p>
            <p>Here is an example of how to build your own middleware:</p>
            <Code language="typescript">
              {`export const GET = h(
  (req, res) => {
    console.log('Hi, this is a middleware!')

    if (req.query.name !== 'John') {
      return res.status(403).json({
        error: 'Forbidden'
      })
    }
  },
  (req, res) => res.json({
    pong: 1
  })
)`}
            </Code>
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
              <code>query</code>, <code>context</code>, and more.
            </p>
            <h4>params</h4>
            <p>Get the request parameters from the URL path.</p>
            <p>
              For example, if the URL is <code>/hello/:name</code>, you can
              access the <code>req.params.name</code> to get the value of the{' '}
              <code>:name</code> parameter. If you have app routing enabled, you
              can access the parameters from the file name in either of the
              following locations: <code>./app/hello/[name].ts</code> or{' '}
              <code>./app/hello/[name]/index.ts</code>.
            </p>
            <h4>query</h4>
            <p>Get the query parameters from the URL.</p>
            <p>
              For example, if the URL is <code>/hello?name=John</code>, you can
              access the <code>req.query.name</code> to get the value of the
              <code>name</code> query parameter.
            </p>
            <h4>headers</h4>
            <p>
              Get the request headers by using the <code>get</code> method to
              retrieve a specific header by name. For example, you can access
              the <code>req.headers.get('Authorization')</code> to get the value
              of the <code>Authorization</code> header.
            </p>
            <h4>context</h4>
            <p>
              Context is a generic type that can be used to pass data between
              middleware and handlers.
            </p>
            <p>Here is an example of how to use context in a handler:</p>
            <Code language="typescript">
              {`type User = {
  id: string
  name: string
}

export const GET = h<{}, User>(
  (req, res) => {
    if (!req.headers.get('Authorization')) {  // simulate authorization check
      return res.status(401).json({
        error: 'Unauthorized'
      })
    }

    req.context = {   // simulate fetching user data & setting context
      id: '123',
      name: 'John Doe'
    }
  },
  (req, res) => res.json({
    name: req.context?.user.name  // access a type-safe context
  })
)`}
            </Code>
            <h4>cookies</h4>
            <p>
              Get a cookie by name from the request with{' '}
              <code>req.cookies</code>.
            </p>
          </section>
          <section id="res">
            <h3>Res</h3>
            <p>
              Helper object for creating responses. This object has several
              methods for sending different types of responses.
            </p>
            <h4>send {'→'} Http.Response</h4>
            <p>
              Send a response with the given data. It can be a string, a
              <code>ReadableStream</code>, or any other type that can be used as
              a response body.
            </p>
            <h4>json {'→'} Http.Response</h4>
            <p>
              Send a JSON response with the given data. It automatically sets
              the
              <code>Content-Type</code> header to <code>application/json</code>.
            </p>
            <h4>text {'→'} Http.Response</h4>
            <p>
              Send a plain text response with the given data. It automatically
              sets the
              <code>Content-Type</code> header to <code>text/plain</code>.
            </p>
            <h4>status {'→'} Res</h4>
            <p>
              Set the HTTP status code for the response. This method is
              chainable, allowing you to set headers and then send the response.
            </p>
            <p>
              Here is an example of how to set the status code and send a
              response:
            </p>
            <Code language="typescript">
              {`export const GET = h((req, res) => res
  .status(400)
  .json({ error: 'Bad Request' })
)`}
            </Code>
            <h4>headers {'→'} Res</h4>
            <p>
              Set custom headers for the response. This method is also
              chainable, allowing you to set multiple headers before sending the
              response.
            </p>
            <p>
              Here is an example of how to set a custom header in the response:
            </p>
            <Code language="typescript">
              {`export const GET = h((req, res) => res
  .headers({
    'Cache-Control': 'no-cache',
    'X-Custom-Header': 'MyValue',
  })
  .json({ message: 'Hello, World!' })
)`}
            </Code>
            <h4>cookie {'→'} Res</h4>
            <p>
              Set a cookie in the response. If the <code>value</code> is{' '}
              <code>null</code>, it deletes the cookie. Otherwise, it sets the
              cookie with the given name and value.
            </p>
            <p>Here is an example of how to set a cookie in the response:</p>
            <Code language="typescript">
              {`import { cookie } from '@buntal/core'

cookie.set(res, 'access_token', token, {
  maxAge: 60 * 60 * 2,  // 2 hours
  httpOnly: true,
  path: '/'
})`}
            </Code>
          </section>
          <p className="text-sm text-base-content/60 border-t border-base-content/10 pt-6 mt-12">
            Last modified: 2025-06-04
          </p>
        </div>
        <div className="xl:block hidden">
          <aside className="sticky top-18 container ml-0 text-base-content/60 text-sm space-y-2 border-l border-base-content/5">
            <ul className="pl-4 py-4 space-y-2">
              <li>
                <Link
                  className="hover:text-base-content hover:underline underline-offset-4"
                  href="#quick-start:72"
                >
                  Quick Start
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-base-content hover:underline underline-offset-4"
                  href="#http:24"
                >
                  Http
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-base-content hover:underline underline-offset-4"
                  href="#h:24"
                >
                  h
                </Link>
                <ul className="pl-4 pt-2 space-y-2">
                  <li>
                    <Link
                      className="hover:text-base-content hover:underline underline-offset-4"
                      href="#atomic-handler:40"
                    >
                      AtomicHandler
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:text-base-content hover:underline underline-offset-4"
                      href="#middleware:40"
                    >
                      Middleware
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:text-base-content hover:underline underline-offset-4"
                      href="#req:40"
                    >
                      Req
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:text-base-content hover:underline underline-offset-4"
                      href="#res:40"
                    >
                      Res
                    </Link>
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
