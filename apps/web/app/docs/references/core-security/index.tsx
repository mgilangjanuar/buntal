import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: '@buntal/core/security API Reference - Buntal JS'
  } satisfies MetaProps
}

export default function CoreSecurityAPIReferencePage() {
  return (
    <MarkdownContent
      title="@buntal/core/security"
      content={`# @buntal/core/security

Security utilities for Buntal JS, providing JWT token management and password hashing functionality.

## Functions

### jwt(secret)

Creates a JWT utility object for signing and verifying JSON Web Tokens using the HS256 algorithm.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`secret\` | \`string\` | ✅ | Secret key for signing and verifying tokens |

#### Returns

Object with \`sign\` and \`verify\` methods.

#### Methods

##### sign(payload, options?)

Signs a JWT token with the provided payload.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| \`payload\` | \`Record<string, unknown>\` | ✅ | - | The data to encode in the token |
| \`options\` | \`{ expiresIn?: string \\| number \\| Date }\` | ❌ | \`{ expiresIn: '2h' }\` | Token expiration options |

**Returns:** \`Promise<string>\` - The signed JWT token

##### verify<T>(token)

Verifies and decodes a JWT token.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`token\` | \`string\` | ✅ | The JWT token to verify |

**Returns:** \`Promise<T>\` - The decoded payload

**Throws:** Error if token is invalid or expired

**Example Usage:**

\`\`\`typescript
import { jwt } from '@buntal/core/security'

const jwtUtil = jwt('your-secret-key')

// Sign a token
const token = await jwtUtil.sign(
  { userId: '123', role: 'admin' },
  { expiresIn: '24h' }
)

// Verify a token
try {
  const payload = await jwtUtil.verify<{ userId: string, role: string }>(token)
  console.log('User ID:', payload.userId) // "123"
  console.log('Role:', payload.role)      // "admin"
} catch (error) {
  console.error('Invalid token:', error.message)
}

// Different expiration formats
await jwtUtil.sign({ data: 'value' }, { expiresIn: '1h' })     // 1 hour
await jwtUtil.sign({ data: 'value' }, { expiresIn: 3600 })     // 3600 seconds
await jwtUtil.sign({ data: 'value' }, { expiresIn: new Date(Date.now() + 3600000) }) // Date object
\`\`\`

### hash(password)

Hashes a password using bcrypt with automatic salt generation.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`password\` | \`string\` | ✅ | The plain text password to hash |

#### Returns

\`string\` - The hashed password with salt

#### Static Methods

##### hash.compare(password, hashed)

Compares a plain text password with a hashed password.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`password\` | \`string\` | ✅ | The plain text password |
| \`hashed\` | \`string\` | ✅ | The hashed password to compare against |

**Returns:** \`boolean\` - True if passwords match, false otherwise

**Example Usage:**

\`\`\`typescript
import { hash } from '@buntal/core/security'

// Hash a password
const plainPassword = 'user123password'
const hashedPassword = hash(plainPassword)
console.log('Hashed:', hashedPassword) // $2a$10$...

// Verify a password
const isValid = hash.compare('user123password', hashedPassword)
console.log('Password is valid:', isValid) // true

const isInvalid = hash.compare('wrongpassword', hashedPassword)
console.log('Wrong password:', isInvalid) // false

// Complete authentication example
function authenticateUser(inputPassword: string, storedHash: string) {
  return hash.compare(inputPassword, storedHash)
}

// Registration flow
function registerUser(password: string) {
  const hashedPassword = hash(password)
  // Save hashedPassword to database
  return hashedPassword
}
\`\`\`

## Authentication Flow Example

Here's a complete example combining JWT and password hashing for user authentication:

\`\`\`typescript
import { Http } from '@buntal/core'
import { jwt, hash } from '@buntal/core/security'

const app = new Http({ port: 3000 })
const jwtUtil = jwt('your-secret-key')

// User registration
app.post('/register', async (req, res) => {
  const body = await req.json()
  const { email, password } = body

  // Hash the password
  const hashedPassword = hash(password)

  // Save user to database (pseudo-code)
  const user = await saveUser({ email, password: hashedPassword })

  return res.json({ message: 'User created successfully' })
})

// User login
app.post('/login', async (req, res) => {
  const body = await req.json()
  const { email, password } = body

  // Get user from database (pseudo-code)
  const user = await getUserByEmail(email)

  if (!user || !hash.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  // Generate JWT token
  const token = await jwtUtil.sign(
    { userId: user.id, email: user.email },
    { expiresIn: '24h' }
  )

  return res.json({ token })
})

// Protected route
app.get('/profile', async (req, res) => {
  const authHeader = req.headers.get('Authorization')
  const token = authHeader?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const payload = await jwtUtil.verify<{ userId: string, email: string }>(token)

    // Get user profile (pseudo-code)
    const user = await getUserById(payload.userId)

    return res.json({ user: { id: user.id, email: user.email } })
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
})

app.start()
\`\`\`

## Security Best Practices

### JWT Security

- **Secret Management**: Use a strong, randomly generated secret key and store it securely (environment variables)
- **Token Expiration**: Set appropriate expiration times - shorter for sensitive operations
- **Algorithm**: The package uses HS256 (HMAC with SHA-256) which is secure for most use cases
- **Payload Size**: Keep JWT payloads small to reduce token size

### Password Hashing

- **Salt Generation**: The \`hash\` function automatically generates unique salts for each password
- **Bcrypt Strength**: Uses bcryptjs with default work factor (10 rounds) which is secure for most applications
- **Never Store Plain Text**: Always hash passwords before storing them
- **Timing Attacks**: The \`hash.compare\` function is resistant to timing attacks

### Example Environment Configuration

\`\`\`bash
# .env file
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
NODE_ENV=production
\`\`\`

\`\`\`typescript
// Use environment variables for production
const jwtUtil = jwt(process.env.JWT_SECRET || 'fallback-dev-secret')
\`\`\`

## Error Handling

Both JWT and hash functions can throw errors that should be handled appropriately:

\`\`\`typescript
// JWT error handling
try {
  const payload = await jwtUtil.verify(token)
  // Token is valid
} catch (error) {
  if (error.code === 'ERR_JWT_EXPIRED') {
    // Token has expired
    return res.status(401).json({ error: 'Token expired' })
  } else if (error.code === 'ERR_JWT_INVALID') {
    // Token is malformed
    return res.status(401).json({ error: 'Invalid token' })
  } else {
    // Other JWT errors
    return res.status(401).json({ error: 'Token verification failed' })
  }
}

// Hash comparison is safe and won't throw
const isValid = hash.compare(inputPassword, storedHash) // Always returns boolean
\`\`\`

## Dependencies

This package uses the following underlying libraries:

- **[jose](https://github.com/panva/jose)**: Modern JWT implementation with strong security defaults
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)**: Pure JavaScript bcrypt implementation, no native dependencies

Both are battle-tested libraries widely used in production applications.`}
      tableOfContents={[
        {
          id: 'functions',
          title: 'Functions',
          level: 1,
          offset: 72,
          children: [
            {
              id: 'jwt-secret-',
              title: 'jwt(secret)',
              level: 2,
              offset: 72
            },
            {
              id: 'hash-password-',
              title: 'hash(password)',
              level: 2,
              offset: 72
            }
          ]
        },
        {
          id: 'authentication-flow-example',
          title: 'Authentication Flow Example',
          level: 1,
          offset: 72
        },
        {
          id: 'security-best-practices',
          title: 'Security Best Practices',
          level: 1,
          offset: 72,
          children: [
            {
              id: 'jwt-security',
              title: 'JWT Security',
              level: 2,
              offset: 72
            },
            {
              id: 'password-hashing',
              title: 'Password Hashing',
              level: 2,
              offset: 72
            }
          ]
        },
        {
          id: 'error-handling',
          title: 'Error Handling',
          level: 1,
          offset: 72
        },
        {
          id: 'dependencies',
          title: 'Dependencies',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
