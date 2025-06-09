import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Http Class - Buntal JS'
  } satisfies MetaProps
}

export default function HttpClassPage() {
  return (
    <MarkdownContent
      title="Http Class"
      content={`# Http Class

The main HTTP server class for creating and configuring HTTP servers.

## Type Definition

\`\`\`typescript
export { Http } from '@buntal/core'
\`\`\`

\`\`\`typescript
class Http {
  constructor(config: Config)
  start(cb?: (server: Bun.Server) => void): Bun.Server
  use(handler: AtomicHandler): void
  get<R extends string, P = ExtractRouteParams<R>>(route: R, ...handlers: AtomicHandler<P>[]): void
  post<R extends string, P = ExtractRouteParams<R>>(route: R, ...handlers: AtomicHandler<P>[]): void
  put<R extends string, P = ExtractRouteParams<R>>(route: R, ...handlers: AtomicHandler<P>[]): void
  patch<R extends string, P = ExtractRouteParams<R>>(route: R, ...handlers: AtomicHandler<P>[]): void
  delete<R extends string, P = ExtractRouteParams<R>>(route: R, ...handlers: AtomicHandler<P>[]): void
  onError(handler: (error: Error) => Response): void
  onNotFound(handler: AtomicHandler): void
}
\`\`\`

## Constructor

\`\`\`typescript
new Http(config: Config)
\`\`\`

### Configuration

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| \`port\` | \`number\` | ✅ | The port number to listen on |
| \`appDir\` | \`string\` | ❌ | Directory path for file-based routing |
| \`websocket\` | \`WebSocketHandler\` | ❌ | WebSocket handler from Bun |
| \`injectHandler\` | \`function\` | ❌ | Middleware injection handler |

## Methods

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

## Usage

\`\`\`typescript
import { Http } from '@buntal/core'

// Create server instance
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

app.post('/users', async (req, res) => {
  const userData = await req.json()
  // Create user logic
  return res.status(201).json({ message: 'User created' })
})

// Error handling
app.onError((error) => {
  console.error('Server error:', error)
  return new Response('Internal Server Error', { status: 500 })
})

// 404 handler
app.onNotFound((req, res) => {
  return res.status(404).json({ error: 'Route not found' })
})

// Start server
app.start((server) => {
  console.log(\`Server running on port \${server.port}\`)
})
\`\`\`

## Route Registration

Register routes for different HTTP methods:

\`\`\`typescript
// GET route
app.get('/api/users', getAllUsers)
app.get('/api/users/:id', getUserById)

// POST route
app.post('/api/users', createUser)

// PUT route (full update)
app.put('/api/users/:id', updateUser)

// PATCH route (partial update)
app.patch('/api/users/:id', partialUpdateUser)

// DELETE route
app.delete('/api/users/:id', deleteUser)
\`\`\`

## Middleware

Add middleware that runs on all routes:

\`\`\`typescript
// Logging middleware
app.use((req, res) => {
  console.log(\`\${new Date().toISOString()} - \${req.method} \${req.url}\`)
})

// Authentication middleware
app.use((req, res) => {
  const token = req.headers.get('authorization')
  if (!token && req.url.startsWith('/api/protected')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
})

// CORS middleware
app.use((req, res) => {
  res.headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  })
})
\`\`\`

## Error Handling

Set up global error handling:

\`\`\`typescript
// Global error handler
app.onError((error) => {
  console.error('Unhandled error:', error)

  // Return appropriate error response
  if (error.name === 'ValidationError') {
    return new Response(
      JSON.stringify({ error: 'Invalid input' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  return new Response('Internal Server Error', { status: 500 })
})

// Custom 404 handler
app.onNotFound((req, res) => {
  return res.status(404).json({
    error: 'Not Found',
    message: \`Route \${req.method} \${req.url} not found\`,
    timestamp: new Date().toISOString()
  })
})
\`\`\`

## Advanced Configuration

\`\`\`typescript
import { Http } from '@buntal/core'

const app = new Http({
  port: process.env.PORT || 3000,

  // File-based routing
  appDir: './src/routes',

  // WebSocket support
  websocket: {
    message(ws, message) {
      ws.send(\`Echo: \${message}\`)
    },
    open(ws) {
      console.log('WebSocket connected')
    },
    close(ws, code, message) {
      console.log('WebSocket disconnected')
    }
  },

  // Request injection
  injectHandler: async ({ req, match, handler }) => {
    // Custom request processing
    req.startTime = Date.now()

    // Call the actual handler
    const response = await handler(req)

    // Add response time header
    if (response) {
      const duration = Date.now() - req.startTime
      response.headers.set('X-Response-Time', \`\${duration}ms\`)
    }

    return response
  }
})
\`\`\`

## Related Types

- [Config](/docs/references/http-config#config) - Server configuration
- [AtomicHandler](/docs/references/atomic-handler) - Request handler function
- [ExtractRouteParams](/docs/references/extract-route-params) - Route parameter extraction
- [Req](/docs/references/req-class) - Request class
- [Res](/docs/references/res-class) - Response class`}
      tableOfContents={[
        {
          id: 'type-definition',
          title: 'Type Definition',
          level: 1,
          offset: 72
        },
        {
          id: 'constructor',
          title: 'Constructor',
          level: 1,
          offset: 72
        },
        {
          id: 'configuration',
          title: 'Configuration',
          level: 2,
          offset: 72
        },
        {
          id: 'methods',
          title: 'Methods',
          level: 1,
          offset: 72
        },
        {
          id: 'usage',
          title: 'Usage',
          level: 1,
          offset: 72
        },
        {
          id: 'route-registration',
          title: 'Route Registration',
          level: 1,
          offset: 72
        },
        {
          id: 'middleware',
          title: 'Middleware',
          level: 1,
          offset: 72
        },
        {
          id: 'error-handling',
          title: 'Error Handling',
          level: 1,
          offset: 72
        },
        {
          id: 'advanced-configuration',
          title: 'Advanced Configuration',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
