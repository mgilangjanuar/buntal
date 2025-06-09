import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'JWT Function - Buntal JS'
  } satisfies MetaProps
}

export default function JWTFunctionPage() {
  return (
    <MarkdownContent
      title="JWT Function"
      content={`# JWT Function

Utility function for JSON Web Token (JWT) operations including signing and verification in Buntal applications.

## Function Definition

\`\`\`typescript
import { jwt } from '@buntal/core/security'

function jwt(secret: string): {
  sign: (payload: any, options?: { expiresIn?: string }) => string
  verify: <T = any>(token: string) => T
}
\`\`\`

## Parameters

### secret: string

The secret key used for signing and verifying JWT tokens.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`secret\` | \`string\` | ✅ | Secret key for JWT operations |

**Security Note:** Use a strong, randomly generated secret in production.

## Return Object

The JWT function returns an object with two methods:

### sign(payload, options?)

Creates and signs a JWT token with the provided payload.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`payload\` | \`any\` | ✅ | Data to encode in the token |
| \`options\` | \`object\` | ❌ | Additional JWT options |
| \`options.expiresIn\` | \`string\` | ❌ | Token expiration time |

**Returns:** \`string\` - The signed JWT token

### verify<T>(token)

Verifies and decodes a JWT token.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`token\` | \`string\` | ✅ | JWT token to verify |

**Returns:** \`T\` - The decoded payload
**Throws:** Error if token is invalid or expired

## Usage Examples

### Basic Token Operations

\`\`\`typescript
import { jwt } from '@buntal/core/security'

// Initialize JWT with secret
const jwtUtil = jwt(process.env.JWT_SECRET || 'your-secret-key')

// Sign a token
const payload = { userId: 123, email: 'user@example.com' }
const token = jwtUtil.sign(payload)

console.log('Generated token:', token)
// Output: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Verify and decode token
const decoded = jwtUtil.verify(token)
console.log('Decoded payload:', decoded)
// Output: { userId: 123, email: 'user@example.com' }
\`\`\`

### Token with Expiration

\`\`\`typescript
const jwtUtil = jwt('my-secret-key')

// Create token that expires in 1 hour
const token = jwtUtil.sign(
  { userId: 456, role: 'admin' },
  { expiresIn: '1h' }
)

// Create token that expires in 7 days
const refreshToken = jwtUtil.sign(
  { userId: 456, type: 'refresh' },
  { expiresIn: '7d' }
)

// Verify tokens
try {
  const payload = jwtUtil.verify<{ userId: number; role: string }>(token)
  console.log('Token valid:', payload)
} catch (error) {
  console.error('Token expired or invalid:', error.message)
}
\`\`\`

### Authentication Middleware

\`\`\`typescript
import { Http, type Req, type Res } from '@buntal/core'
import { jwt } from '@buntal/core/security'

const app = new Http()
const jwtUtil = jwt(process.env.JWT_SECRET!)

// Login endpoint
app.post('/auth/login', async (req, res) => {
  const { email, password } = await req.json()

  // Validate credentials (implement your logic)
  const user = await validateUser(email, password)
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  // Generate access token (short-lived)
  const accessToken = jwtUtil.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role
    },
    { expiresIn: '15m' }
  )

  // Generate refresh token (long-lived)
  const refreshToken = jwtUtil.sign(
    {
      userId: user.id,
      type: 'refresh'
    },
    { expiresIn: '7d' }
  )

  return res.json({
    accessToken,
    refreshToken,
    user: { id: user.id, email: user.email }
  })
})

// Protected route
app.get('/api/profile', (req, res) => {
  const authHeader = req.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing token' })
  }

  const token = authHeader.slice(7)

  try {
    const payload = jwtUtil.verify<{
      userId: number
      email: string
      role: string
    }>(token)

    return res.json({
      message: 'Profile data',
      user: payload
    })
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
})
\`\`\`

### Token Refresh Flow

\`\`\`typescript
// Refresh token endpoint
app.post('/auth/refresh', async (req, res) => {
  const { refreshToken } = await req.json()

  try {
    // Verify refresh token
    const payload = jwtUtil.verify<{
      userId: number
      type: string
    }>(refreshToken)

    if (payload.type !== 'refresh') {
      throw new Error('Invalid token type')
    }

    // Get user data
    const user = await getUserById(payload.userId)
    if (!user) {
      throw new Error('User not found')
    }

    // Generate new access token
    const newAccessToken = jwtUtil.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      { expiresIn: '15m' }
    )

    return res.json({ accessToken: newAccessToken })

  } catch (error) {
    return res.status(401).json({ error: 'Invalid refresh token' })
  }
})
\`\`\`

### Custom JWT Middleware

\`\`\`typescript
interface UserPayload {
  userId: number
  email: string
  role: 'user' | 'admin' | 'moderator'
}

function createAuthMiddleware(secret: string) {
  const jwtUtil = jwt(secret)

  return function authMiddleware(req: Req, res: Res, next: () => void) {
    const authHeader = req.headers.get('Authorization')

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization header required' })
    }

    const token = authHeader.slice(7)

    try {
      const payload = jwtUtil.verify<UserPayload>(token)

      // Attach user to request context
      req.context = payload

      // Continue to next middleware/handler
      next()

    } catch (error) {
      return res.status(401).json({
        error: 'Invalid or expired token',
        details: error.message
      })
    }
  }
}

// Use the middleware
const authMiddleware = createAuthMiddleware(process.env.JWT_SECRET!)

app.use('/api/protected', authMiddleware)

app.get('/api/protected/data', (req, res) => {
  // req.context now contains the user payload
  const user = req.context as UserPayload

  return res.json({
    message: \`Hello \${user.email}!\`,
    role: user.role
  })
})
\`\`\`

### Role-Based Access Control

\`\`\`typescript
function requireRole(allowedRoles: string[]) {
  const jwtUtil = jwt(process.env.JWT_SECRET!)

  return function roleMiddleware(req: Req, res: Res, next: () => void) {
    const authHeader = req.headers.get('Authorization')

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization required' })
    }

    try {
      const payload = jwtUtil.verify<UserPayload>(authHeader.slice(7))

      if (!allowedRoles.includes(payload.role)) {
        return res.status(403).json({
          error: 'Insufficient permissions',
          required: allowedRoles,
          current: payload.role
        })
      }

      req.context = payload
      next()

    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' })
    }
  }
}

// Admin-only endpoint
app.get('/api/admin/users', requireRole(['admin']), (req, res) => {
  return res.json({ users: getAllUsers() })
})

// Moderator or admin endpoint
app.delete('/api/posts/:id', requireRole(['admin', 'moderator']), (req, res) => {
  const postId = req.params.id
  return res.json({ message: \`Post \${postId} deleted\` })
})
\`\`\`

## Security Best Practices

### Strong Secrets

\`\`\`typescript
// ✅ Good: Use environment variables
const jwtUtil = jwt(process.env.JWT_SECRET!)

// ✅ Good: Generate strong secrets
// openssl rand -base64 32
const secret = 'your-32-char-random-secret-here'

// ❌ Bad: Weak or hardcoded secrets
const jwtUtil = jwt('123456') // Too weak
const jwtUtil = jwt('secret') // Predictable
\`\`\`

### Token Expiration

\`\`\`typescript
// ✅ Good: Short-lived access tokens
const accessToken = jwtUtil.sign(payload, { expiresIn: '15m' })

// ✅ Good: Longer-lived refresh tokens
const refreshToken = jwtUtil.sign(payload, { expiresIn: '7d' })

// ❌ Bad: No expiration
const token = jwtUtil.sign(payload) // Never expires

// ❌ Bad: Very long expiration for access tokens
const token = jwtUtil.sign(payload, { expiresIn: '30d' }) // Too long
\`\`\`

### Error Handling

\`\`\`typescript
function verifyToken(token: string) {
  try {
    const payload = jwtUtil.verify(token)
    return { success: true, payload }
  } catch (error) {
    // Log security events
    console.warn('JWT verification failed:', {
      error: error.message,
      timestamp: new Date().toISOString(),
      token: token.substring(0, 20) + '...' // Partial token for debugging
    })

    return { success: false, error: 'Token verification failed' }
  }
}
\`\`\`

## Expiration Time Formats

The \`expiresIn\` option supports various time formats:

| Format | Description | Example |
|--------|-------------|---------|
| \`'1h'\` | Hours | 1 hour |
| \`'30m'\` | Minutes | 30 minutes |
| \`'7d'\` | Days | 7 days |
| \`'2w'\` | Weeks | 2 weeks |
| \`'1y'\` | Years | 1 year |
| \`3600\` | Seconds (number) | 1 hour |

## Related Types

- [\`AuthOptions\`](/docs/references/auth-options) - Authentication middleware configuration that uses JWT
- [\`Req\` class](/docs/references/req-class) - Request object for extracting JWT tokens
- [\`Res\` class](/docs/references/res-class) - Response object for sending JWT tokens
- [\`Hash\` function](/docs/references/hash-function) - Password hashing utilities for authentication`}
      tableOfContents={[
        {
          id: 'function-definition',
          title: 'Function Definition',
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
          id: 'return-object',
          title: 'Return Object',
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
          id: 'security-best-practices',
          title: 'Security Best Practices',
          level: 1,
          offset: 72
        },
        {
          id: 'expiration-time-formats',
          title: 'Expiration Time Formats',
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
