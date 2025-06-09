import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: '@buntal/core/middlewares API Reference - Buntal JS'
  } satisfies MetaProps
}

export default function CoreMiddlewaresAPIReferencePage() {
  return (
    <MarkdownContent
      title="@buntal/core/middlewares"
      content={`# @buntal/core/middlewares

Built-in middleware collection for Buntal JS HTTP servers, providing common functionality like authentication, CORS handling, and request logging.

## Middleware Functions

### auth(options?)

JWT-based authentication middleware that validates tokens from cookies or headers.

#### Parameters

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| \`secret\` | \`string\` | ✅ | \`process.env.JWT_SECRET\` | Secret key for JWT verification |
| \`strategy\` | \`Strategy\` | ❌ | \`'header'\` | Token extraction strategy |
| \`cookie\` | \`{key: string}\` | ❌ | \`{key: 'access_token'}\` | Cookie configuration |
| \`header\` | \`{key: string}\` | ❌ | \`{key: 'Authorization'}\` | Header configuration |
| \`onVerified\` | \`function\` | ❌ | \`undefined\` | Callback after successful verification |

#### Strategy Types

| Value | Description |
|-------|-------------|
| \`'cookie'\` | Extract token from cookie only |
| \`'header'\` | Extract token from Authorization header only |
| \`'both'\` | Try cookie first, then header as fallback |

#### Options Type

\`\`\`typescript
type Options<T = unknown> = {
  secret: string
  strategy?: 'cookie' | 'header' | 'both'
  cookie?: {
    key: string
  }
  header?: {
    key: string
  }
  onVerified?: (
    req: Req<Record<string, string>, T>,
    res: Res,
    decoded: T
  ) => void | Response | Promise<void | Response>
}
\`\`\`

**Example Usage:**

\`\`\`typescript
import { Http } from '@buntal/core'
import { auth } from '@buntal/core/middlewares'

const app = new Http({ port: 3000 })

// Basic authentication with default settings
app.use(auth({
  secret: 'your-secret-key'
}))

// Authentication with custom cookie strategy
app.use(auth({
  secret: 'your-secret-key',
  strategy: 'cookie',
  cookie: { key: 'session_token' }
}))

// Authentication with both strategies and verification callback
app.use(auth<{ userId: string, role: string }>({
  secret: 'your-secret-key',
  strategy: 'both',
  onVerified: async (req, res, decoded) => {
    // Add user info to request context
    req.context = decoded

    // Optional: Return early response for unauthorized roles
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' })
    }
  }
}))

// Protected route
app.get('/profile', (req, res) => {
  // Token is automatically verified at this point
  return res.json({ message: 'Access granted' })
})
\`\`\`

**Behavior:**
- Automatically returns \`401 Unauthorized\` if no token is found
- Automatically returns \`401 Unauthorized\` if token verification fails
- For header strategy, expects \`Authorization: Bearer <token>\` format
- For cookie strategy, reads token from specified cookie name
- For both strategy, tries cookie first, then falls back to header

### cors(options?)

Cross-Origin Resource Sharing (CORS) middleware for handling cross-origin requests.

#### Parameters

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`origin\` | \`string \\| string[]\` | \`'*'\` | Allowed origins |
| \`methods\` | \`string \\| string[]\` | \`'GET, HEAD, PUT, PATCH, POST, DELETE'\` | Allowed HTTP methods |
| \`allowedHeaders\` | \`string \\| string[]\` | \`'Content-Type, Authorization, X-Requested-With'\` | Allowed request headers |
| \`exposedHeaders\` | \`string \\| string[]\` | \`''\` | Headers exposed to client |
| \`maxAge\` | \`number\` | \`600\` | Preflight cache duration (seconds) |
| \`credentials\` | \`boolean\` | \`true\` | Allow credentials in requests |

#### Options Type

\`\`\`typescript
type Options = {
  origin?: string | string[]
  methods?: string | string[]
  allowedHeaders?: string | string[]
  exposedHeaders?: string | string[]
  maxAge?: number
  credentials?: boolean
}
\`\`\`

**Example Usage:**

\`\`\`typescript
import { Http } from '@buntal/core'
import { cors } from '@buntal/core/middlewares'

const app = new Http({ port: 3000 })

// Basic CORS with default settings (allows all origins)
app.use(cors())

// Restrict to specific origins
app.use(cors({
  origin: ['https://myapp.com', 'https://admin.myapp.com']
}))

// Custom configuration for API
app.use(cors({
  origin: 'https://frontend.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  exposedHeaders: ['X-Total-Count'],
  maxAge: 3600, // 1 hour
  credentials: true
}))

// Different CORS settings for different routes
app.use('/api/*', cors({
  origin: ['https://app.com'],
  credentials: true
}))

app.use('/public/*', cors({
  origin: '*',
  credentials: false
}))
\`\`\`

**Behavior:**
- Sets appropriate CORS headers on all responses
- Handles preflight OPTIONS requests automatically
- String arrays are joined with \`, \` (comma-space)
- Works with both simple and complex CORS requests

### logger()

Request logging middleware that outputs HTTP request information to the console.

#### Parameters

This middleware takes no parameters.

**Example Usage:**

\`\`\`typescript
import { Http } from '@buntal/core'
import { logger } from '@buntal/core/middlewares'

const app = new Http({ port: 3000 })

// Add request logging to all routes
app.use(logger())

app.get('/users/:id', (req, res) => {
  return res.json({ user: 'John Doe' })
})

app.start()
// Console output: [14:32:15] > GET /users/123
\`\`\`

**Output Format:**
\`\`\`
[HH:MM:SS] > METHOD /path
\`\`\`

**Examples:**
- \`[09:15:30] > GET /api/users\`
- \`[14:22:45] > POST /auth/login\`
- \`[16:45:12] > PUT /users/123\`

**Behavior:**
- Logs timestamp in \`HH:MM:SS\` format (24-hour)
- Includes HTTP method and pathname (query parameters excluded)
- Uses \`console.log()\` for output
- Non-blocking - doesn't affect request processing

## Middleware Composition

All middlewares can be combined and used together:

\`\`\`typescript
import { Http } from '@buntal/core'
import { logger, cors, auth } from '@buntal/core/middlewares'

const app = new Http({ port: 3000 })

// Apply middlewares in order
app.use(logger())              // Log all requests
app.use(cors())                // Handle CORS for all routes
app.use('/api/*', auth({       // Protect API routes
  secret: 'your-secret-key'
}))

// Public routes (no auth required)
app.get('/health', (req, res) => {
  return res.json({ status: 'ok' })
})

// Protected routes (auth required)
app.get('/api/profile', (req, res) => {
  return res.json({ user: 'authenticated user' })
})
\`\`\`
`}
      tableOfContents={[
        {
          id: 'middleware-functions',
          title: 'Middleware Functions',
          level: 1,
          offset: 72,
          children: [
            {
              id: 'auth-options-',
              title: 'auth(options?)',
              level: 2,
              offset: 72
            },
            {
              id: 'cors-options-',
              title: 'cors(options?)',
              level: 2,
              offset: 72
            },
            { id: 'logger-', title: 'logger()', level: 2, offset: 72 }
          ]
        },
        {
          id: 'middleware-composition',
          title: 'Middleware Composition',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
