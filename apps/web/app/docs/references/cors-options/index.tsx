import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'CORSOptions Type - Buntal JS'
  } satisfies MetaProps
}

export default function CORSOptionsPage() {
  return (
    <MarkdownContent
      title="CORSOptions Type"
      content={`# CORSOptions Type

Configuration options for Cross-Origin Resource Sharing (CORS) middleware in Buntal applications.

## Type Definition

\`\`\`typescript
import { cors } from '@buntal/core/middlewares'

type CORSOptions = {
  origin?: string | string[]
  methods?: string | string[]
  allowedHeaders?: string | string[]
  exposedHeaders?: string | string[]
  maxAge?: number
  credentials?: boolean
}
\`\`\`

## Properties

### origin?: string | string[]

Configures the Access-Control-Allow-Origin CORS header.

| Type | Description | Example |
|------|-------------|---------|
| \`string\` | Single allowed origin | \`'https://example.com'\` |
| \`string[]\` | Multiple allowed origins | \`['https://app.com', 'https://web.com']\` |
| \`'*'\` | Allow all origins (not secure) | \`'*'\` |

**Default:** \`'*'\`

**Security Note:** Using \`'*'\` with \`credentials: true\` is not allowed by browsers.

### methods?: string | string[]

Configures the Access-Control-Allow-Methods CORS header.

| Type | Description | Example |
|------|-------------|---------|
| \`string\` | Single method or comma-separated | \`'GET, POST, PUT'\` |
| \`string[]\` | Array of HTTP methods | \`['GET', 'POST', 'DELETE']\` |

**Default:** \`'GET,HEAD,PUT,PATCH,POST,DELETE'\`

### allowedHeaders?: string | string[]

Configures the Access-Control-Allow-Headers CORS header.

| Type | Description | Example |
|------|-------------|---------|
| \`string\` | Single header or comma-separated | \`'Content-Type, Authorization'\` |
| \`string[]\` | Array of header names | \`['Content-Type', 'X-Requested-With']\` |

**Default:** Reflects the headers specified in the request's Access-Control-Request-Headers header.

### exposedHeaders?: string | string[]

Configures the Access-Control-Expose-Headers CORS header.

| Type | Description | Example |
|------|-------------|---------|
| \`string\` | Single header or comma-separated | \`'X-Total-Count, X-Page-Count'\` |
| \`string[]\` | Array of header names | \`['X-Custom-Header', 'X-Response-Time']\` |

**Default:** \`undefined\` (no headers exposed)

### maxAge?: number

Configures the Access-Control-Max-Age CORS header.

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| \`maxAge\` | \`number\` | Cache duration for preflight in seconds | \`86400\` (24 hours) |

**Default:** \`undefined\` (browser default)

### credentials?: boolean

Configures the Access-Control-Allow-Credentials CORS header.

| Property | Type | Description | Use Case |
|----------|------|-------------|----------|
| \`credentials\` | \`boolean\` | Allow cookies and auth headers | Authentication with CORS |

**Default:** \`false\`

**Security Note:** When \`true\`, \`origin\` cannot be \`'*'\`.

## Usage Examples

### Basic CORS Setup

\`\`\`typescript
import { Http, cors } from '@buntal/core'

const app = new Http()

// Allow requests from specific origins
app.use(cors({
  origin: 'https://myapp.com',
  methods: ['GET', 'POST'],
  credentials: false
}))

app.get('/api/data', (req, res) => {
  return res.json({ message: 'CORS enabled!' })
})
\`\`\`

### Multiple Origins

\`\`\`typescript
// Allow multiple trusted origins
app.use(cors({
  origin: [
    'https://app.example.com',
    'https://admin.example.com',
    'https://mobile.example.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))
\`\`\`

### Development Configuration

\`\`\`typescript
// Permissive CORS for development
const isDevelopment = process.env.NODE_ENV === 'development'

app.use(cors({
  origin: isDevelopment ? '*' : 'https://myproductionapp.com',
  methods: '*',
  allowedHeaders: '*',
  credentials: !isDevelopment, // Only in production
  maxAge: isDevelopment ? 0 : 86400 // Cache in production only
}))
\`\`\`

### API with Custom Headers

\`\`\`typescript
// API that exposes custom response headers
app.use(cors({
  origin: 'https://client.example.com',
  exposedHeaders: [
    'X-Total-Count',      // Pagination info
    'X-Rate-Limit',       // Rate limiting info
    'X-Response-Time'     // Performance metrics
  ],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'X-Client-Version'
  ]
}))

app.get('/api/users', (req, res) => {
  const users = getUsersFromDB()

  return res
    .headers({
      'X-Total-Count': users.length.toString(),
      'X-Rate-Limit': '100',
      'X-Response-Time': '150ms'
    })
    .json(users)
})
\`\`\`

### Conditional CORS

\`\`\`typescript
// Different CORS policies for different routes
app.use('/api/public', cors({
  origin: '*',
  methods: ['GET'],
  credentials: false
}))

app.use('/api/private', cors({
  origin: ['https://trusted-app.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  maxAge: 3600
}))

app.use('/api/admin', cors({
  origin: 'https://admin.example.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Token'],
  credentials: true,
  maxAge: 7200
}))
\`\`\`

### Preflight Optimization

\`\`\`typescript
// Optimize preflight requests with caching
app.use(cors({
  origin: 'https://spa-app.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  maxAge: 86400, // Cache preflight for 24 hours
  credentials: true
}))
\`\`\`

## Best Practices

### Security Considerations

\`\`\`typescript
// ✅ Good: Specific origins with credentials
app.use(cors({
  origin: ['https://app.example.com', 'https://mobile.example.com'],
  credentials: true,
  maxAge: 3600
}))

// ❌ Bad: Wildcard with credentials (won't work)
app.use(cors({
  origin: '*',
  credentials: true // This combination is invalid
}))

// ✅ Good: Wildcard without credentials for public APIs
app.use(cors({
  origin: '*',
  credentials: false,
  methods: ['GET']
}))
\`\`\`

### Environment-Based Configuration

\`\`\`typescript
const corsOptions: CORSOptions = {
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: process.env.NODE_ENV === 'production',
  maxAge: process.env.NODE_ENV === 'production' ? 86400 : 0
}

app.use(cors(corsOptions))
\`\`\`

### Dynamic Origin Validation

\`\`\`typescript
// Custom origin validation logic
const allowedOrigins = [
  'https://app.example.com',
  'https://admin.example.com',
  /^https:\\/\\/.*\\.example\\.com$/
]

function isOriginAllowed(origin: string): boolean {
  return allowedOrigins.some(allowed => {
    if (typeof allowed === 'string') {
      return allowed === origin
    }
    return allowed.test(origin)
  })
}

// Note: For complex origin validation, you might need
// to implement custom CORS logic instead of using the middleware
\`\`\`

## Related Types

- [\`Http\` class](/docs/references/http-class) - Main HTTP server class that uses CORS middleware
- [\`Req\` class](/docs/references/req-class) - Request object for handling CORS requests
- [\`Res\` class](/docs/references/res-class) - Response object for setting CORS headers
- [\`AuthOptions\`](/docs/references/auth-options) - Authentication middleware that works with CORS`}
      tableOfContents={[
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
        },
        {
          id: 'related-types',
          title: 'Related Types',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
