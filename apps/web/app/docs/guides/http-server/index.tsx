import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'HTTP Server - Buntal JS'
  } satisfies MetaProps
}

export default function HTTPPkgPage() {
  return (
    <MarkdownContent
      title="HTTP Server"
      content={`## Quick Start

Here is a simple example of how to create an HTTP server using Buntal JS. This example demonstrates how to set up a basic server with file-based routing, middleware, a declarative router, and type-safe request parameters.

\`\`\`typescript
import { Http } from '@buntal/http'
import { cors, logger, secureHeaders } from '@buntal/http/middlewares'

// initialize the HTTP server
const app = new Http({
  port: 4001,
  appDir: './app' // Enable file-based routing!
})

// add middlewares
app.use(logger())
app.use(secureHeaders())
app.use(cors({ origin: ['http://localhost:3000'] }))

// define a simple GET endpoint with a type-safe params
app.get('/hello/:name', (req, res) => {
  return res.json({
    hello: \`Hello \${req.params.name}\`
  })
})

// start the server!
app.start((server) => {
  console.log(\`Server running at http://localhost:\${server.port}\`)
})
\`\`\`

And here is a simple example of a ping endpoint in the \`./app/ping.ts\` file that is automatically loaded into the app.

\`\`\`typescript
import { h } from '@buntal/http'

export const GET = h(
  (req, res) => res.json({
    pong: 1
  })
)
\`\`\`

Explore the full example on [GitHub](https://github.com/mgilangjanuar/buntal/tree/main/examples/simple-api).

## Http

The \`Http\` class is the main entry point for creating an HTTP server in Buntal JS. It provides a simple and intuitive API for defining routes, adding middleware, and starting the server.

#### \`Options: { port: number, appDir?: string }\`

The \`Http\` constructor takes an options object with the following properties:

- \`port\`: The port number on which the server will listen. This is a required property. Use \`0\` for a random free port (handy in tests).
- \`appDir\`: An optional property that specifies the directory where the app files are located. If provided, the server will automatically load routes from this directory.
- \`websocket\`, \`options\`: passed through to \`Bun.serve\`.

#### Routes

Register handlers with \`get\`, \`post\`, \`put\`, \`patch\`, \`delete\` and \`options\`, or \`route(method, path, ...handlers)\`. Different methods on the same path are all kept. Path params such as \`:id\` are typed on \`req.params\`.

\`\`\`typescript
app.get('/todos/:id', (req, res) => res.json({ id: req.params.id }))
app.put('/todos/:id', updateTodo)
app.route('DELETE', '/todos/:id', deleteTodo)
\`\`\`

In file routes, export one function per method: \`GET\`, \`POST\`, \`PUT\`, \`PATCH\`, \`DELETE\`, \`OPTIONS\` or \`HEAD\`. \`HEAD\` falls back to \`GET\`, and any other method gets a 404.

#### Errors and not found

\`\`\`typescript
app.onNotFound((req, res) => res.status(404).json({ error: 'Not found' }))
app.onError((error) => Response.json({ error: 'Something went wrong' }, { status: 500 }))
\`\`\`

Without \`onError\`, unhandled errors return 500 with the message and stack in development, and only \`{ "error": "Internal Server Error" }\` when \`NODE_ENV=production\`.

## h

The \`h\` function is everything you need to create a type-safe HTTP handler. It receives a chain of \`AtomicHandler\` functions and returns a function that can be used as an HTTP handler.

It's a basic [higher-order function](https://en.wikipedia.org/wiki/Higher-order_function) pattern, and here is the \`AtomicHandler\` type definition:

### AtomicHandler

This is a function that takes a \`Req\` and a \`Res\` object, and returns a response. As you can see in the example above:

> \`\`\`typescript
> (req, res) => res.json({
>   pong: 1
> })
> \`\`\`

The first parameter is the \`Req\` object, which contains the request parameters, query parameters, and other information. The second parameter is the \`Res\` object, which is used to send the response back to the client.

The pattern is similar to [Express.js](https://expressjs.com/) or other Node.js HTTP libraries, so the learning curve is minimal if you are familiar with those libraries.

### Middleware

Middleware actually is same as the \`AtomicHandler\` function, but it is used to modify the request or response before it reaches the final handler. You can use middleware to add authorization, logging, or any other functionality that you want to apply to all/some requests.

Register it for every route with \`app.use()\`, or for one route by passing it before the handler. Headers and cookies a middleware sets on \`res\` are kept even when a later handler returns its own \`Response\`.

Built-in middlewares from \`@buntal/http/middlewares\`:

- [\`auth\`](/references/http/middlewares/auth): verify a JWT from a header or cookie and put the payload on \`req.context\`.
- [\`cors\`](/references/http/middlewares/cors): CORS headers and preflight responses, with an origin allow list.
- [\`secureHeaders\`](/references/http/middlewares/secure-headers): \`nosniff\`, frame options, referrer policy, HSTS and an optional CSP.
- [\`logger\`](/references/http/middlewares/logger): one log line per request.

See the [Security guide](/docs/guides/security) for how to combine them.

Here is an example of how to build your own middleware:

\`\`\`typescript
export const GET = h(
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
)
\`\`\`

### Req

The \`Req\` object is a native [undici](https://github.com/nodejs/undici) request with extended properties, including \`params\`, \`query\`, \`context\`, and more.

#### params

Get the request parameters from the URL path.

For example, if the URL is \`/hello/:name\`, you can access the \`req.params.name\` to get the value of the \`:name\` parameter. If you have app routing enabled, you can access the parameters from the file name in either of the following locations: \`./app/hello/[name].ts\` or \`./app/hello/[name]/index.ts\`.

#### query

Get the query parameters from the URL.

For example, if the URL is \`/hello?name=John\`, you can access the \`req.query.name\` to get the value of the \`name\` query parameter.

#### headers

Get the request headers by using the \`get\` method to retrieve a specific header by name. For example, you can access the \`req.headers.get('Authorization')\` to get the value of the \`Authorization\` header.

#### context

Context is a generic type that can be used to pass data between middleware and handlers.

Here is an example of how to use context in a handler:

\`\`\`typescript
type User = {
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
    name: req.context?.name  // access a type-safe context
  })
)
\`\`\`

#### cookies

All request cookies as an object, for example \`req.cookies.access_token\`. Values are URL-decoded.

### Res

Helper object for creating responses. This object has several methods for sending different types of responses.

#### send → Http.Response

Send a response with the given data. It can be a string, a \`ReadableStream\`, or any other type that can be used as a response body.

#### json → Http.Response

Send a JSON response with the given data. It automatically sets the \`Content-Type\` header to \`application/json\`.

#### text → Http.Response

Send a plain text response with the given data. It automatically sets the \`Content-Type\` header to \`text/plain\`.

#### html → Http.Response

Send an HTML string or stream with \`Content-Type: text/html\`.

#### redirect → Http.Response

Redirect to another URL: \`res.redirect('/login')\` (302 by default) or \`res.redirect('/new', 301)\`.

#### status → Res

Set the HTTP status code for the response. This method is chainable, allowing you to set headers and then send the response.

Here is an example of how to set the status code and send a response:

\`\`\`typescript
export const GET = h((req, res) => res
  .status(400)
  .json({ error: 'Bad Request' })
)
\`\`\`

#### headers → Res

Set custom headers for the response. This method is also chainable, allowing you to set multiple headers before sending the response.

Here is an example of how to set a custom header in the response:

\`\`\`typescript
export const GET = h((req, res) => res
  .headers({
    'Cache-Control': 'no-cache',
    'X-Custom-Header': 'MyValue',
  })
  .json({ message: 'Hello, World!' })
)
\`\`\`

#### cookie → Res

Set a cookie in the response. If the \`value\` is \`null\`, it deletes the cookie (pass the same \`path\`/\`domain\` you set it with). Otherwise, it sets the cookie with the given name and value. Calling it several times sends several cookies.

Here is an example of how to set a cookie in the response:

\`\`\`typescript
res.cookie('access_token', token, {
  maxAge: 60 * 60 * 2,  // 2 hours
  httpOnly: true,
  secure: true,
  sameSite: 'Lax',
  path: '/'
})
\`\`\`
`}
      tableOfContents={[
        {
          id: 'quick-start',
          title: 'Quick Start',
          level: 1,
          offset: 72
        },
        {
          id: 'http',
          title: 'Http',
          level: 1,
          offset: 72
        },
        {
          id: 'h',
          title: 'h',
          level: 1,
          offset: 72,
          children: [
            {
              id: 'atomichandler',
              title: 'AtomicHandler',
              level: 2,
              offset: 72
            },
            {
              id: 'middleware',
              title: 'Middleware',
              level: 2,
              offset: 72
            },
            {
              id: 'req',
              title: 'Req',
              level: 2,
              offset: 72
            },
            {
              id: 'res',
              title: 'Res',
              level: 2,
              offset: 72
            }
          ]
        }
      ]}
      lastModified="2026-10-02"
    />
  )
}
