import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: '@buntal/core API Reference - Buntal JS'
  } satisfies MetaProps
}

export default function CoreAPIReferencePage() {
  return (
    <MarkdownContent
      title="@buntal/core"
      content={`# @buntal/core

The core HTTP server package for Buntal JS, providing low-level APIs for building HTTP servers and handling requests/responses.

## Classes

### Http

The main HTTP server class for creating and configuring HTTP servers.

#### Constructor

\`\`\`typescript
new Http(config: Config)
\`\`\`

#### Configuration

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| \`port\` | \`number\` | ✅ | The port number to listen on |
| \`appDir\` | \`string\` | ❌ | Directory path for file-based routing |
| \`websocket\` | \`WebSocketHandler\` | ❌ | WebSocket handler from Bun |
| \`injectHandler\` | \`function\` | ❌ | Middleware injection handler |

#### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| \`start(cb?)\` | \`cb?: (server: Bun.Server) => void\` | \`Bun.Server\` | Starts the HTTP server |
| \`use(handler)\` | \`handler: AtomicHandler\` | \`void\` | Adds middleware to all routes |
| \`get(route, ...handlers)\` | \`route: string, handlers: AtomicHandler[]\` | \`void\` | Registers GET route |
| \`post(route, ...handlers)\` | \`route: string, handlers: AtomicHandler[]\` | \`void\` | Registers POST route |
| \`put(route, ...handlers)\` | \`route: string, handlers: AtomicHandler[]\` | \`void\` | Registers PUT route |
| \`patch(route, ...handlers)\` | \`route: string, handlers: AtomicHandler[]\` | \`void\` | Registers PATCH route |
| \`delete(route, ...handlers)\` | \`route: string, handlers: AtomicHandler[]\` | \`void\` | Registers DELETE route |
| \`onError(handler)\` | \`handler: (error: Error) => Response\` | \`void\` | Sets global error handler |
| \`onNotFound(handler)\` | \`handler: AtomicHandler\` | \`void\` | Sets 404 handler |

**Example Usage:**

\`\`\`typescript
const app = new Http({ port: 3000 })

// Middleware
app.use((req, res) => {
  console.log(\`\${req.method} \${req.url}\`)
})

// Routes with type-safe parameters
app.get('/users/:id', (req, res) => {
  const { id } = req.params // TypeScript knows this is a string
  return res.json({ userId: id })
})

// Error handling
app.onError((error) => {
  return new Response('Internal Server Error', { status: 500 })
})

app.start((server) => {
  console.log(\`Server running on port \${server.port}\`)
})
\`\`\`

### Req<P, T>

Extended Request class with additional properties for route parameters and context.

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| \`params\` | \`P\` | Route parameters extracted from URL |
| \`query\` | \`Record<string, string>\` | Query string parameters |
| \`context\` | \`T\` | Additional context data |
| \`cookies\` | \`Record<string, string>\` | All cookies from request (getter) |

**Example:**

\`\`\`typescript
// Route: /users/:id?page=1&limit=10
app.get('/users/:id', (req, res) => {
  const { id } = req.params        // "123"
  const { page, limit } = req.query // { page: "1", limit: "10" }
  const sessionId = req.cookies.session // Cookie value
})
\`\`\`

### Res

Response class for building HTTP responses with method chaining.

#### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| \`status(code)\` | \`code: number\` | \`Res\` | Sets HTTP status code |
| \`headers(headers)\` | \`headers: Record<string, string>\` | \`Res\` | Sets response headers |
| \`cookie(name, value, options?)\` | \`name: string, value?: string, options?: CookieOptions\` | \`Res\` | Sets or deletes cookie |
| \`redirect(url, status?)\` | \`url: string, status?: number\` | \`Response\` | Redirects to URL |
| \`send(data?)\` | \`data?: BodyInit\` | \`Response\` | Sends response with data |
| \`json(data)\` | \`data: unknown\` | \`Response\` | Sends JSON response |
| \`html(data)\` | \`data: string \\| ReadableStream\` | \`Response\` | Sends HTML response |
| \`text(data)\` | \`data: string\` | \`Response\` | Sends plain text response |

**Example:**

\`\`\`typescript
app.get('/api/user', (req, res) => {
  return res
    .status(200)
    .headers({ 'X-Custom': 'value' })
    .cookie('session', 'abc123', { httpOnly: true })
    .json({ user: 'John Doe' })
})

app.get('/redirect', (req, res) => {
  return res.redirect('/dashboard', 302)
})
\`\`\`

## Handler Functions

### h(...handlers)

Handler composition function that chains multiple handlers together.

\`\`\`typescript
const authMiddleware = (req: Req, res: Res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

const getUserHandler = (req: Req, res: Res) => {
  return res.json({ user: 'John Doe' })
}

app.get('/protected', h(authMiddleware, getUserHandler))
\`\`\`

### AtomicHandler<P, T, R>

Handler function type for processing requests.

\`\`\`typescript
type AtomicHandler<
  P = Record<string, string>,  // Route parameters
  T = unknown,                 // Context type
  R = Response | void | Promise<Response | void>
> = (req: Req<P, T>, res: Res) => R
\`\`\`

## File-Based Routing

### buildRouter(dir)

Creates a file system router for the specified directory using Next.js-style conventions.

| Parameter | Type | Description |
|-----------|------|-------------|
| \`dir\` | \`string\` | Directory path containing route files |

**Returns:** \`Bun.FileSystemRouter\`

**File Naming Conventions:**
- \`index.ts\` → \`/\`
- \`users.ts\` → \`/users\`
- \`users/[id].ts\` → \`/users/:id\`
- \`users/[...slug].ts\` → \`/users/*\`

### ExtractRouteParams<Path>

Utility type that automatically extracts route parameters from path strings.

\`\`\`typescript
type UserRoute = ExtractRouteParams<'/users/:id/posts/:postId'>
// Result: { id: string, postId: string }
\`\`\`

## Cookie Management

### Cookie Utilities

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| \`cookie.get(req, name)\` | \`req: Req, name: string\` | \`string \\| null\` | Gets specific cookie value |
| \`cookie.getAll(req)\` | \`req: Req\` | \`Record<string, string>\` | Gets all cookies |
| \`cookie.set(res, name, value, options?)\` | \`res: Res, name: string, value: string, options?: CookieOptions\` | \`string\` | Sets cookie |
| \`cookie.delete(res, name)\` | \`res: Res, name: string\` | \`string\` | Deletes cookie |

### CookieOptions

| Property | Type | Description |
|----------|------|-------------|
| \`maxAge\` | \`number\` | Cookie lifetime in seconds |
| \`expires\` | \`Date\` | Expiration date |
| \`path\` | \`string\` | Cookie path |
| \`domain\` | \`string\` | Cookie domain |
| \`secure\` | \`boolean\` | HTTPS only flag |
| \`httpOnly\` | \`boolean\` | HTTP only (not accessible via JS) |
| \`sameSite\` | \`'Strict' \\| 'Lax' \\| 'None'\` | SameSite attribute |

**Example:**

\`\`\`typescript
import { cookie } from '@buntal/core'

app.get('/login', (req, res) => {
  const sessionId = cookie.get(req, 'session')
  if (!sessionId) {
    cookie.set(res, 'session', 'new-session-id', {
      httpOnly: true,
      maxAge: 3600
    })
  }
  return res.json({ loggedIn: !!sessionId })
})

app.post('/logout', (req, res) => {
  cookie.delete(res, 'session')
  return res.json({ message: 'Logged out' })
})
\`\`\`

## Constants

### ALLOWED_METHODS

\`\`\`typescript
const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'] as const
\`\`\``}
      tableOfContents={[
        {
          id: 'classes',
          title: 'Classes',
          level: 1,
          offset: 72,
          children: [
            { id: 'http', title: 'Http', level: 2, offset: 72 },
            { id: 'req-p-t-', title: 'Req<P, T>', level: 2, offset: 72 },
            { id: 'res', title: 'Res', level: 2, offset: 72 }
          ]
        },
        {
          id: 'handler-functions',
          title: 'Handler Functions',
          level: 1,
          offset: 72,
          children: [
            {
              id: 'h-handlers-',
              title: 'h(...handlers)',
              level: 2,
              offset: 72
            },
            {
              id: 'atomichandler-p-t-r-',
              title: 'AtomicHandler<P, T, R>',
              level: 2,
              offset: 72
            }
          ]
        },
        {
          id: 'file-based-routing',
          title: 'File-Based Routing',
          level: 1,
          offset: 72,
          children: [
            {
              id: 'buildrouter-dir-',
              title: 'buildRouter(dir)',
              level: 2,
              offset: 72
            },
            {
              id: 'extractrouteparams-path-',
              title: 'ExtractRouteParams<Path>',
              level: 2,
              offset: 72
            }
          ]
        },
        {
          id: 'cookie-management',
          title: 'Cookie Management',
          level: 1,
          offset: 72,
          children: [
            {
              id: 'cookie-utilities',
              title: 'Cookie Utilities',
              level: 2,
              offset: 72
            },
            {
              id: 'cookieoptions',
              title: 'CookieOptions',
              level: 2,
              offset: 72
            }
          ]
        },
        {
          id: 'constants',
          title: 'Constants',
          level: 1,
          offset: 72,
          children: [
            {
              id: 'allowed_methods',
              title: 'ALLOWED_METHODS',
              level: 2,
              offset: 72
            }
          ]
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
