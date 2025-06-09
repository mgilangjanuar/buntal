import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Config Type - Buntal JS'
  } satisfies MetaProps
}

export default function ConfigTypePage() {
  return (
    <MarkdownContent
      title="Config Type"
      content={`# Config Type

Internal configuration type for the HTTP server class constructor.

## Import

\`\`\`typescript
// Config is an internal type used by Http constructor
import { Http } from '@buntal/core'
\`\`\`

## Type Definition

\`\`\`typescript
type Config = {
  port: number
  appDir?: string
  websocket?: WebSocketHandler
  injectHandler?: (payload: {
    req: Req
    match: Bun.MatchedRoute
    handler: any
  }) => Promise<Response | void>
}
\`\`\`

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| \`port\` | \`number\` | ✅ | Port number for the HTTP server to listen on |
| \`appDir\` | \`string\` | ❌ | Directory containing application routes and files for file-based routing |
| \`websocket\` | \`WebSocketHandler\` | ❌ | WebSocket handler configuration for real-time connections |
| \`injectHandler\` | \`Function\` | ❌ | Custom handler injection function for middleware processing |

## Property Details

### port: number

The port number on which the HTTP server will listen for incoming requests.

**Example:**
\`\`\`typescript
const config = {
  port: 3000
}
\`\`\`

### appDir?: string

Optional directory path containing application routes and files. When provided, enables file-based routing similar to Next.js.

**Example:**
\`\`\`typescript
const config = {
  port: 3000,
  appDir: './app' // Enable file-based routing
}
\`\`\`

### websocket?: WebSocketHandler

Optional WebSocket handler for enabling real-time bidirectional communication.

**Type Definition:**
\`\`\`typescript
interface WebSocketHandler {
  message(ws: ServerWebSocket, message: string | Buffer): void | Promise<void>
  open?(ws: ServerWebSocket): void | Promise<void>
  close?(ws: ServerWebSocket, code: number, reason: string): void | Promise<void>
  drain?(ws: ServerWebSocket): void | Promise<void>
}
\`\`\`

**Example:**
\`\`\`typescript
const config = {
  port: 3000,
  websocket: {
    message(ws, message) {
      console.log('Received:', message)
      ws.send('Echo: ' + message)
    },
    open(ws) {
      console.log('WebSocket connection opened')
    },
    close(ws, code, reason) {
      console.log('WebSocket connection closed:', code, reason)
    }
  }
}
\`\`\`

### injectHandler?: Function

Optional function for injecting custom logic into request handling pipeline. This allows for advanced middleware processing and request/response manipulation.

**Function Signature:**
\`\`\`typescript
(payload: {
  req: Req
  match: Bun.MatchedRoute
  handler: any
}) => Promise<Response | void>
\`\`\`

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| \`payload.req\` | \`Req\` | Enhanced request object with params, query, etc. |
| \`payload.match\` | \`Bun.MatchedRoute\` | Route matching information from Bun's router |
| \`payload.handler\` | \`any\` | The matched route handler function |

**Return Value:**
- \`Promise<Response>\` - Return a Response to short-circuit normal handling
- \`Promise<void>\` - Return void to continue with normal request processing

**Example:**
\`\`\`typescript
const config = {
  port: 3000,
  injectHandler: async ({ req, match, handler }) => {
    // Add request timing
    const startTime = Date.now()

    // Add custom headers or authentication
    if (req.url.includes('/api/')) {
      const authHeader = req.headers.get('Authorization')
      if (!authHeader) {
        return new Response('Unauthorized', { status: 401 })
      }
    }

    // Log request info
    console.log(\`\${req.method} \${req.url} - Handler: \${match.filePath}\`)

    // Continue with normal processing
    return undefined
  }
}
\`\`\`

## Usage Examples

### Basic HTTP Server

\`\`\`typescript
import { Http } from '@buntal/core'

const config = {
  port: 3000
}

const app = new Http(config)

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World' })
})

app.start()
\`\`\`

### File-Based Routing

\`\`\`typescript
import { Http } from '@buntal/core'

const config = {
  port: 3000,
  appDir: './app' // Enable file-based routing
}

const app = new Http(config)
app.start()

// Routes are now automatically loaded from ./app directory
// ./app/index.ts -> GET /
// ./app/users/[id].ts -> GET /users/:id
\`\`\`

### WebSocket Support

\`\`\`typescript
import { Http } from '@buntal/core'

const config = {
  port: 3000,
  websocket: {
    message(ws, message) {
      // Broadcast to all connected clients
      ws.publish('chat', message)
    },
    open(ws) {
      ws.subscribe('chat')
      ws.send('Welcome to the chat!')
    }
  }
}

const app = new Http(config)
app.start()
\`\`\`

### Advanced Middleware Injection

\`\`\`typescript
import { Http } from '@buntal/core'

const config = {
  port: 3000,
  appDir: './app',
  injectHandler: async ({ req, match, handler }) => {
    // Authentication for protected routes
    if (match.filePath.includes('/protected/')) {
      const token = req.headers.get('Authorization')?.replace('Bearer ', '')

      if (!token || !isValidToken(token)) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      // Add user info to request context
      req.context = await getUserFromToken(token)
    }

    // Request timing middleware
    const startTime = Date.now()
    req.startTime = startTime

    // Continue processing
    return undefined
  }
}

const app = new Http(config)
app.start()
\`\`\`

### Development vs Production

\`\`\`typescript
import { Http } from '@buntal/core'

const isDev = process.env.NODE_ENV === 'development'

const config = {
  port: parseInt(process.env.PORT || '3000'),
  appDir: './app',
  websocket: isDev ? {
    // Hot reload support in development
    message(ws, message) {
      if (message === 'ping') {
        ws.send('pong')
      }
    }
  } : undefined,
  injectHandler: isDev ? async ({ req }) => {
    // Extra logging in development
    console.log(\`\${new Date().toISOString()} - \${req.method} \${req.url}\`)
    return undefined
  } : undefined
}

const app = new Http(config)
app.start((server) => {
  console.log(\`Server running on port \${server.port}\`)
})
\`\`\`

## Best Practices

### Port Configuration

Use environment variables for port configuration:

\`\`\`typescript
const config = {
  port: parseInt(process.env.PORT || '3000')
}
\`\`\`

### Error Handling in injectHandler

Always handle errors gracefully in inject handlers:

\`\`\`typescript
const config = {
  port: 3000,
  injectHandler: async ({ req, match, handler }) => {
    try {
      // Your injection logic
      await someAsyncOperation()
      return undefined
    } catch (error) {
      console.error('Inject handler error:', error)
      return new Response('Internal Server Error', { status: 500 })
    }
  }
}
\`\`\`

### WebSocket Resource Management

Properly manage WebSocket connections:

\`\`\`typescript
const activeConnections = new Set()

const config = {
  port: 3000,
  websocket: {
    open(ws) {
      activeConnections.add(ws)
    },
    close(ws) {
      activeConnections.delete(ws)
    },
    message(ws, message) {
      // Handle messages efficiently
    }
  }
}
\`\`\`

### Type Safety

Extend types for better development experience:

\`\`\`typescript
import { Http, type Req } from '@buntal/core'

interface CustomContext {
  user?: { id: string; name: string }
  startTime: number
}

const config = {
  port: 3000,
  injectHandler: async ({ req }: { req: Req<any, CustomContext> }) => {
    req.context = {
      startTime: Date.now()
    }
    return undefined
  }
}
\`\`\`

## Related Types

- [Http Class](/docs/references/http-class) - Main HTTP server class that uses this configuration
- [Req Class](/docs/references/req-class) - Request class used in injectHandler
- [Res Class](/docs/references/res-class) - Response class for creating HTTP responses
- [BuntalConfig](/docs/references/buntal-config) - Higher-level application configuration`}
      tableOfContents={[
        {
          id: 'import',
          title: 'Import',
          level: 1,
          offset: 72
        },
        {
          id: 'type-definition',
          title: 'Type Definition',
          level: 1,
          offset: 72
        },
        {
          id: 'properties',
          title: 'Properties',
          level: 1,
          offset: 72
        },
        {
          id: 'property-details',
          title: 'Property Details',
          level: 1,
          offset: 72
        },
        {
          id: 'usage-examples',
          title: 'Usage Examples',
          level: 1,
          offset: 72
        },
        {
          id: 'best-practices',
          title: 'Best Practices',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
