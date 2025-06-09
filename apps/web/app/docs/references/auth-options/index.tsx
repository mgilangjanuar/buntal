import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'AuthOptions Type - Buntal JS'
  } satisfies MetaProps
}

export default function AuthOptionsPage() {
  return (
    <MarkdownContent
      title="AuthOptions Type"
      content={`# AuthOptions Type

Configuration options for JWT-based authentication middleware in Buntal JS.

## Import

\`\`\`typescript
import { auth } from '@buntal/core/middlewares'
\`\`\`

## Type Definition

\`\`\`typescript
type AuthOptions<T = unknown> = {
  secret: string
  strategy?: 'cookie' | 'header' | 'both'
  cookie?: { key: string }
  header?: { key: string }
  onVerified?: (
    req: Req<Record<string, string>, T>,
    res: Res,
    decoded: T
  ) => void | Response | Promise<void | Response>
}
\`\`\`

## Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| \`secret\` | \`string\` | ✅ | \`process.env.JWT_SECRET\` | Secret key for JWT verification |
| \`strategy\` | \`Strategy\` | ❌ | \`'header'\` | Token extraction strategy |
| \`cookie\` | \`{key: string}\` | ❌ | \`{key: 'access_token'}\` | Cookie configuration |
| \`header\` | \`{key: string}\` | ❌ | \`{key: 'Authorization'}\` | Header configuration |
| \`onVerified\` | \`function\` | ❌ | \`undefined\` | Callback after successful verification |

## Generic Type Parameter

| Parameter | Default | Description |
|-----------|---------|-------------|
| \`T\` | \`unknown\` | Type of the decoded JWT payload |

## Property Details

### secret: string

The secret key used to verify JWT tokens. This should be a strong, randomly generated string stored securely.

**Security Notes:**
- Use environment variables in production
- Minimum recommended length: 32 characters
- Should be unique per application
- Never expose in client-side code

**Example:**
\`\`\`typescript
const options = {
  secret: process.env.JWT_SECRET || 'dev-secret-key'
}
\`\`\`

### strategy?: 'cookie' | 'header' | 'both'

Determines where to look for the JWT token in incoming requests.

| Strategy | Description | Use Case |
|----------|-------------|----------|
| \`'cookie'\` | Extract token from cookies only | Traditional web apps, SSR |
| \`'header'\` | Extract token from Authorization header only | APIs, SPAs, mobile apps |
| \`'both'\` | Try cookie first, fallback to header | Hybrid applications |

**Default:** \`'header'\`

**Examples:**
\`\`\`typescript
// API-only application
{ strategy: 'header' }

// Traditional web application
{ strategy: 'cookie' }

// Hybrid application supporting both
{ strategy: 'both' }
\`\`\`

### cookie?: { key: string }

Configuration for cookie-based token extraction.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`key\` | \`string\` | \`'access_token'\` | Name of the cookie containing the JWT |

**Example:**
\`\`\`typescript
const options = {
  strategy: 'cookie',
  cookie: { key: 'session_token' }
}

// Looks for JWT in cookie named 'session_token'
\`\`\`

### header?: { key: string }

Configuration for header-based token extraction.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`key\` | \`string\` | \`'Authorization'\` | Name of the header containing the JWT |

**Header Format:** \`Bearer <token>\`

**Example:**
\`\`\`typescript
const options = {
  strategy: 'header',
  header: { key: 'X-Access-Token' }
}

// Looks for JWT in 'X-Access-Token' header
// Format: X-Access-Token: Bearer <token>
\`\`\`

### onVerified?: function

Optional callback function executed after successful JWT verification. Allows for additional authorization logic and request context modification.

**Function Signature:**
\`\`\`typescript
(
  req: Req<Record<string, string>, T>,
  res: Res,
  decoded: T
) => void | Response | Promise<void | Response>
\`\`\`

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| \`req\` | \`Req<Record<string, string>, T>\` | Enhanced request object |
| \`res\` | \`Res\` | Response object for creating responses |
| \`decoded\` | \`T\` | Decoded JWT payload |

**Return Values:**
- \`void\` - Continue with normal request processing
- \`Response\` - Short-circuit and return this response immediately
- \`Promise<void>\` - Async version of void
- \`Promise<Response>\` - Async version of Response

**Example:**
\`\`\`typescript
const options = {
  secret: 'secret-key',
  onVerified: async (req, res, decoded) => {
    // Add user data to request context
    req.context = decoded

    // Optional: Additional authorization
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }

    // Continue processing
    return undefined
  }
}
\`\`\`

## Usage Examples

### Basic Authentication

\`\`\`typescript
import { Http } from '@buntal/core'
import { auth } from '@buntal/core/middlewares'

const app = new Http({ port: 3000 })

// Basic JWT authentication
app.use(auth({
  secret: 'your-secret-key'
}))

app.get('/protected', (req, res) => {
  return res.json({ message: 'Access granted' })
})
\`\`\`

### Cookie-Based Authentication

\`\`\`typescript
// Web application with cookie authentication
app.use(auth({
  secret: process.env.JWT_SECRET,
  strategy: 'cookie',
  cookie: { key: 'session_id' }
}))

app.get('/dashboard', (req, res) => {
  return res.json({ dashboard: 'data' })
})
\`\`\`

### API with Custom Headers

\`\`\`typescript
// API using custom authorization header
app.use(auth({
  secret: process.env.API_SECRET,
  strategy: 'header',
  header: { key: 'X-API-Token' }
}))

app.get('/api/data', (req, res) => {
  return res.json({ data: 'sensitive information' })
})
\`\`\`

### Hybrid Strategy with Verification

\`\`\`typescript
interface UserPayload {
  userId: string
  role: 'user' | 'admin' | 'moderator'
  permissions: string[]
}

app.use(auth<UserPayload>({
  secret: process.env.JWT_SECRET,
  strategy: 'both', // Try cookie first, then header
  cookie: { key: 'auth_token' },
  header: { key: 'Authorization' },
  onVerified: async (req, res, decoded) => {
    // Add full user context
    req.context = {
      ...decoded,
      authenticatedAt: new Date()
    }

    // Log authentication
    console.log(\`User \${decoded.userId} authenticated\`)

    // Continue processing
    return undefined
  }
}))
\`\`\`

### Role-Based Access Control

\`\`\`typescript
function requireRole(allowedRoles: string[]) {
  return auth<{ userId: string; role: string }>({
    secret: process.env.JWT_SECRET,
    onVerified: async (req, res, decoded) => {
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({
          error: 'Insufficient permissions',
          required: allowedRoles,
          current: decoded.role
        })
      }

      req.context = decoded
      return undefined
    }
  })
}

// Admin-only route
app.use('/admin/*', requireRole(['admin']))

// Admin and moderator route
app.use('/moderation/*', requireRole(['admin', 'moderator']))
\`\`\`

### Route-Specific Authentication

\`\`\`typescript
// Different auth configs for different routes
app.use('/api/public', auth({
  secret: process.env.PUBLIC_SECRET,
  strategy: 'header'
}))

app.use('/api/internal', auth({
  secret: process.env.INTERNAL_SECRET,
  strategy: 'both',
  onVerified: async (req, res, decoded) => {
    // Additional validation for internal APIs
    if (!decoded.internalAccess) {
      return res.status(403).json({ error: 'Internal access required' })
    }
  }
}))
\`\`\`

### Custom Token Validation

\`\`\`typescript
interface CustomPayload {
  userId: string
  sessionId: string
  permissions: string[]
  exp: number
}

app.use(auth<CustomPayload>({
  secret: process.env.JWT_SECRET,
  onVerified: async (req, res, decoded) => {
    // Check if session is still valid in database
    const isValidSession = await validateSession(decoded.sessionId)
    if (!isValidSession) {
      return res.status(401).json({ error: 'Session expired' })
    }

    // Check specific permissions for the requested resource
    const requiredPermission = getRequiredPermission(req.url)
    if (requiredPermission && !decoded.permissions.includes(requiredPermission)) {
      return res.status(403).json({ error: 'Missing permission: ' + requiredPermission })
    }

    // Add enriched context
    req.context = {
      ...decoded,
      validatedAt: new Date(),
      ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
    }
  }
}))
\`\`\`

### Multi-Tenant Authentication

\`\`\`typescript
interface TenantPayload {
  userId: string
  tenantId: string
  role: string
}

app.use(auth<TenantPayload>({
  secret: process.env.JWT_SECRET,
  onVerified: async (req, res, decoded) => {
    // Extract tenant from URL or headers
    const requestedTenant = req.params.tenantId || req.headers.get('x-tenant-id')

    // Verify user belongs to requested tenant
    if (decoded.tenantId !== requestedTenant) {
      return res.status(403).json({ error: 'Access denied for this tenant' })
    }

    req.context = decoded
  }
}))

app.get('/tenants/:tenantId/data', (req, res) => {
  const { tenantId } = req.context
  return res.json({ tenant: tenantId, data: 'tenant-specific data' })
})
\`\`\`

## Best Practices

### Secret Management

Use environment variables and never hardcode secrets:

\`\`\`typescript
// Good
const options = {
  secret: process.env.JWT_SECRET
}

// Bad
const options = {
  secret: 'hardcoded-secret'
}
\`\`\`

### Strategy Selection

Choose the appropriate strategy based on your application type:

\`\`\`typescript
// API/SPA applications
{ strategy: 'header' }

// Traditional web applications
{ strategy: 'cookie' }

// Universal applications
{ strategy: 'both' }
\`\`\`

### Error Handling

Handle authentication errors gracefully:

\`\`\`typescript
const options = {
  secret: process.env.JWT_SECRET,
  onVerified: async (req, res, decoded) => {
    try {
      // Your verification logic
      await validateUser(decoded.userId)
    } catch (error) {
      console.error('User validation failed:', error)
      return res.status(401).json({ error: 'Authentication failed' })
    }
  }
}
\`\`\`

### Type Safety

Use TypeScript generics for better type safety:

\`\`\`typescript
interface MyUserPayload {
  userId: string
  email: string
  role: string
}

app.use(auth<MyUserPayload>({
  secret: process.env.JWT_SECRET,
  onVerified: (req, res, decoded) => {
    // decoded is now typed as MyUserPayload
    console.log(decoded.email) // Type-safe access
  }
}))
\`\`\`

### Performance Optimization

Cache validation results when possible:

\`\`\`typescript
const userCache = new Map()

const options = {
  secret: process.env.JWT_SECRET,
  onVerified: async (req, res, decoded) => {
    // Cache user validation
    if (!userCache.has(decoded.userId)) {
      const user = await fetchUser(decoded.userId)
      userCache.set(decoded.userId, user)
    }

    req.context = { ...decoded, user: userCache.get(decoded.userId) }
  }
}
\`\`\`

## Related Types

- [Req Class](/docs/references/req-class) - Request object used in onVerified callback
- [Res Class](/docs/references/res-class) - Response object used in onVerified callback
- [JWT Functions](/docs/references/jwt-functions) - JWT utility functions for token creation/verification
- [CookieOptions](/docs/references/cookie-options) - Cookie configuration for token storage`}
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
