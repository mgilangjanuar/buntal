import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Req Class - Buntal JS'
  } satisfies MetaProps
}

export default function ReqClassPage() {
  return (
    <MarkdownContent
      title="Req Class"
      content={`# Req Class

The \`Req\` class extends the standard Web API \`Request\` object with additional properties and functionality specific to Buntal's routing and middleware system.

## Import

\`\`\`typescript
import { type Req } from '@buntal/core'
\`\`\`

## Type Definition

\`\`\`typescript
class Req<P = Record<string, string>, T = unknown> extends Request {
  params: P
  query?: Record<string, string>
  context?: T
  readonly cookies: Record<string, string>
}
\`\`\`

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| \`params\` | \`P\` | ✅ | Route parameters extracted from the URL path. Type is inferred from route definition. |
| \`query\` | \`Record<string, string>\` | ❌ | Query string parameters from the URL. |
| \`context\` | \`T\` | ❌ | Custom context data that can be set by middleware handlers. |
| \`cookies\` | \`Record<string, string>\` | ✅ | Read-only object containing parsed cookies from the request. |

## Generic Type Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| \`P\` | \`Record<string, string>\` | Type of route parameters, automatically inferred from route pattern |
| \`T\` | \`unknown\` | Type of custom context data |

## Usage Examples

### Basic Request Handling

\`\`\`typescript
import { Http, type Req } from '@buntal/core'

const app = new Http({})

app.get('/users/:id', (req: Req<{ id: string }>) => {
  // req.params is typed as { id: string }
  const userId = req.params.id

  return new Response(\`User ID: \${userId}\`)
})
\`\`\`

### Query Parameters

\`\`\`typescript
app.get('/search', (req: Req) => {
  const searchTerm = req.query?.q
  const limit = req.query?.limit ? parseInt(req.query.limit) : 10

  return new Response(\`Searching for: \${searchTerm}, limit: \${limit}\`)
})

// Usage: GET /search?q=buntal&limit=20
\`\`\`

### Reading Cookies

\`\`\`typescript
app.get('/profile', (req: Req) => {
  const sessionId = req.cookies.session_id
  const theme = req.cookies.theme || 'light'

  if (!sessionId) {
    return new Response('Unauthorized', { status: 401 })
  }

  return new Response(\`Session: \${sessionId}, Theme: \${theme}\`)
})
\`\`\`

### Custom Context with Middleware

\`\`\`typescript
interface UserContext {
  user: { id: string; name: string }
  isAuthenticated: boolean
}

// Authentication middleware
app.use((req: Req<any, UserContext>, res, next) => {
  const token = req.headers.get('Authorization')

  if (token) {
    req.context = {
      user: { id: '123', name: 'John Doe' },
      isAuthenticated: true
    }
  } else {
    req.context = {
      user: null,
      isAuthenticated: false
    }
  }

  return next()
})

// Route handler with typed context
app.get('/dashboard', (req: Req<any, UserContext>) => {
  if (!req.context?.isAuthenticated) {
    return new Response('Unauthorized', { status: 401 })
  }

  return new Response(\`Welcome, \${req.context.user.name}!\`)
})
\`\`\`

### Complex Route Parameters

\`\`\`typescript
// Route with multiple parameters
app.get('/users/:userId/posts/:postId', (req: Req<{ userId: string; postId: string }>) => {
  const { userId, postId } = req.params

  return new Response(\`User \${userId}, Post \${postId}\`)
})

// Route with optional parameters
app.get('/api/:version?/users', (req: Req<{ version?: string }>) => {
  const version = req.params.version || 'v1'

  return new Response(\`API version: \${version}\`)
})
\`\`\`

### Request Body Access

\`\`\`typescript
app.post('/users', async (req: Req) => {
  try {
    const userData = await req.json()

    // Process user data
    console.log('Creating user:', userData)

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response('Invalid JSON', { status: 400 })
  }
})
\`\`\`

### File Upload Handling

\`\`\`typescript
app.post('/upload', async (req: Req) => {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) {
    return new Response('No file uploaded', { status: 400 })
  }

  console.log(\`Uploaded file: \${file.name}, size: \${file.size} bytes\`)

  return new Response('File uploaded successfully')
})
\`\`\`

## Inherited Properties

Since \`Req\` extends the standard \`Request\` object, all Web API Request properties and methods are available:

| Property/Method | Type | Description |
|-----------------|------|-------------|
| \`method\` | \`string\` | HTTP method (GET, POST, etc.) |
| \`url\` | \`string\` | Full request URL |
| \`headers\` | \`Headers\` | Request headers |
| \`body\` | \`ReadableStream\` | Request body stream |
| \`json()\` | \`Promise<any>\` | Parse request body as JSON |
| \`text()\` | \`Promise<string>\` | Parse request body as text |
| \`formData()\` | \`Promise<FormData>\` | Parse request body as form data |
| \`arrayBuffer()\` | \`Promise<ArrayBuffer>\` | Parse request body as array buffer |

## Best Practices

### Type Safety

Always specify the route parameter types for better type safety:

\`\`\`typescript
// Good: Explicit typing
app.get('/users/:id', (req: Req<{ id: string }>) => {
  // req.params.id is properly typed
})

// Better: Let TypeScript infer from route
app.get('/users/:id', (req, res) => {
  // TypeScript automatically infers { id: string }
})
\`\`\`

### Context Usage

Use context for sharing data between middleware and route handlers:

\`\`\`typescript
interface AppContext {
  startTime: number
  requestId: string
}

app.use((req: Req<any, AppContext>, res, next) => {
  req.context = {
    startTime: Date.now(),
    requestId: crypto.randomUUID()
  }
  return next()
})
\`\`\`

### Error Handling

Always validate and handle potential undefined values:

\`\`\`typescript
app.get('/search', (req: Req) => {
  const query = req.query?.q

  if (!query) {
    return new Response('Query parameter "q" is required', { status: 400 })
  }

  // Process search...
})
\`\`\`

## Related Types

- [AtomicHandler](/docs/references/atomic-handler) - Request handler function type that receives Req
- [Res Class](/docs/references/res-class) - Response class for creating HTTP responses
- [Http Class](/docs/references/http-class) - Main HTTP server class
- [ExtractRouteParams](/docs/references/extract-route-params) - Utility type for extracting route parameters`}
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
          id: 'generic-type-parameters',
          title: 'Generic Type Parameters',
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
          id: 'inherited-properties',
          title: 'Inherited Properties',
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
