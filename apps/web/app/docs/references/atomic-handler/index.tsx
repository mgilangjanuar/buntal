import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'AtomicHandler - Buntal JS'
  } satisfies MetaProps
}

export default function AtomicHandlerPage() {
  return (
    <MarkdownContent
      title="AtomicHandler"
      content={`# AtomicHandler

Type definition for HTTP request handler functions.

## Type Definition

\`\`\`typescript
export type { AtomicHandler } from '@buntal/core'
\`\`\`

\`\`\`typescript
type AtomicHandler<
  P = Record<string, string>,
  T = unknown,
  R = Response | void | undefined | Promise<Response | void | undefined>
> = (req: Req<P, T>, res: Res) => R
\`\`\`

## Type Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| \`P\` | \`Record<string, string>\` | Route parameters type (extracted from URL path) |
| \`T\` | \`unknown\` | Request context type for additional data |
| \`R\` | \`Response \\| void \\| Promise<...>\` | Return type (response or void) |

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| \`req\` | \`Req<P, T>\` | Extended request object with params, query, and context |
| \`res\` | \`Res\` | Response builder with chainable methods |

## Usage

\`\`\`typescript
import { Http, type AtomicHandler } from '@buntal/core'

const app = new Http({ port: 3000 })

// Basic handler
const homeHandler: AtomicHandler = (req, res) => {
  return res.json({ message: 'Welcome to home page' })
}

// Handler with typed route parameters
const userHandler: AtomicHandler<{ id: string }> = (req, res) => {
  const { id } = req.params  // TypeScript knows id is a string
  return res.json({ userId: id })
}

// Handler with context type
interface AuthContext {
  userId: string
  role: string
}

const protectedHandler: AtomicHandler<{}, AuthContext> = (req, res) => {
  const { userId, role } = req.context!
  return res.json({
    message: \`Hello user \${userId} with role \${role}\`
  })
}

// Async handler
const asyncHandler: AtomicHandler = async (req, res) => {
  const data = await fetchDataFromAPI()
  return res.json(data)
}

// Register handlers
app.get('/', homeHandler)
app.get('/users/:id', userHandler)
app.get('/protected', protectedHandler)
app.get('/async', asyncHandler)
\`\`\`

## Middleware Pattern

AtomicHandlers can be used as middleware by not returning a response:

\`\`\`typescript
// Authentication middleware
const authMiddleware: AtomicHandler = (req, res) => {
  const token = req.headers.get('authorization')

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // Verify token and add user to context
  const user = verifyToken(token)
  req.context = { userId: user.id, role: user.role }

  // Don't return anything to continue to next handler
}

// Logging middleware
const logMiddleware: AtomicHandler = (req, res) => {
  console.log(\`\${req.method} \${req.url}\`)
  // Continue to next handler
}

// Use middleware
app.use(logMiddleware)
app.use('/api/*', authMiddleware)

// Protected route handler
app.get('/api/profile', (req, res) => {
  return res.json({ user: req.context })
})
\`\`\`

## Handler Composition

Multiple handlers can be composed using the \`h\` function:

\`\`\`typescript
import { h } from '@buntal/core'

const validateInput: AtomicHandler = (req, res) => {
  const { email } = req.query
  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }
}

const createUser: AtomicHandler = async (req, res) => {
  const user = await createUserInDB(req.query.email)
  return res.json(user)
}

// Compose handlers
app.post('/users', h(validateInput, createUser))
\`\`\`

## Error Handling

Handlers can throw errors or return error responses:

\`\`\`typescript
const errorProneHandler: AtomicHandler = async (req, res) => {
  try {
    const result = await riskyOperation()
    return res.json(result)
  } catch (error) {
    console.error('Handler error:', error)
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
}

// Global error handler
app.onError((error) => {
  console.error('Global error:', error)
  return new Response('Something went wrong', { status: 500 })
})
\`\`\`

## Type Safety with Routes

AtomicHandler provides type safety for route parameters:

\`\`\`typescript
// Type-safe route parameters
app.get('/users/:id/posts/:postId', (req, res) => {
  // TypeScript automatically infers:
  // req.params: { id: string, postId: string }
  const { id, postId } = req.params

  return res.json({
    userId: id,
    postId: postId
  })
})
\`\`\`

## Related Types

- [Req](/docs/references/http-core#req-class) - Request parameter type
- [Res](/docs/references/http-core#res-class) - Response parameter type
- [Http](/docs/references/http-core#http-class) - HTTP server class that uses handlers
- [ExtractRouteParams](/docs/references/extract-route-params) - Utility for extracting route parameter types`}
      tableOfContents={[
        {
          id: 'type-definition',
          title: 'Type Definition',
          level: 1,
          offset: 72
        },
        {
          id: 'type-parameters',
          title: 'Type Parameters',
          level: 1,
          offset: 72
        },
        {
          id: 'parameters',
          title: 'Parameters',
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
          id: 'middleware-pattern',
          title: 'Middleware Pattern',
          level: 1,
          offset: 72
        },
        {
          id: 'handler-composition',
          title: 'Handler Composition',
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
          id: 'type-safety-with-routes',
          title: 'Type Safety with Routes',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
