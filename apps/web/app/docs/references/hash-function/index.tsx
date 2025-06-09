import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Hash Function - Buntal JS'
  } satisfies MetaProps
}

export default function HashFunctionPage() {
  return (
    <MarkdownContent
      title="Hash Function"
      content={`# Hash Function

Secure password hashing and comparison utility function using bcrypt algorithm in Buntal applications.

## Function Definition

\`\`\`typescript
import { hash } from '@buntal/core/security'

function hash(password: string): {
  hash: () => Promise<string>
  compare: (hashedPassword: string) => Promise<boolean>
}
\`\`\`

## Parameters

### password: string

The plain text password to hash or compare.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`password\` | \`string\` | ✅ | Plain text password |

## Return Object

The hash function returns an object with two async methods:

### hash()

Generates a secure hash of the password.

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| \`hash()\` | None | \`Promise<string>\` | Hashed password string |

**Security Features:**
- Uses bcrypt algorithm
- Automatically generates salt
- Configurable rounds (default: 10)

### compare(hashedPassword)

Compares a plain text password with a hashed password.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`hashedPassword\` | \`string\` | ✅ | Previously hashed password |

**Returns:** \`Promise<boolean>\` - True if passwords match

## Usage Examples

### Basic Password Hashing

\`\`\`typescript
import { hash } from '@buntal/core/security'

async function createUser(email: string, plainPassword: string) {
  // Hash the password
  const hashedPassword = await hash(plainPassword).hash()

  // Store user in database
  const user = await db.users.create({
    email,
    password: hashedPassword
  })

  console.log('User created with hashed password')
  return user
}

// Usage
await createUser('user@example.com', 'mySecurePassword123')
\`\`\`

### Password Verification

\`\`\`typescript
async function verifyPassword(email: string, plainPassword: string) {
  // Get user from database
  const user = await db.users.findUnique({ where: { email } })
  if (!user) {
    return false
  }

  // Compare password with stored hash
  const isValid = await hash(plainPassword).compare(user.password)

  return isValid
}

// Usage
const isValid = await verifyPassword('user@example.com', 'mySecurePassword123')
console.log('Password valid:', isValid) // true or false
\`\`\`

### User Registration Endpoint

\`\`\`typescript
import { Http } from '@buntal/core'
import { hash } from '@buntal/core/security'

const app = new Http()

app.post('/auth/register', async (req, res) => {
  try {
    const { email, password, name } = await req.json()

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({
        error: 'Email, password, and name are required'
      })
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters long'
      })
    }

    // Check if user already exists
    const existingUser = await db.users.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(409).json({
        error: 'User with this email already exists'
      })
    }

    // Hash password
    const hashedPassword = await hash(password).hash()

    // Create user
    const user = await db.users.create({
      data: {
        email,
        name,
        password: hashedPassword,
        createdAt: new Date()
      }
    })

    // Return user without password
    const { password: _, ...userWithoutPassword } = user

    return res.status(201).json({
      message: 'User created successfully',
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Registration error:', error)
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
})
\`\`\`

### Login Endpoint with Password Verification

\`\`\`typescript
import { jwt } from '@buntal/core/security'

const jwtUtil = jwt(process.env.JWT_SECRET!)

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = await req.json()

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required'
      })
    }

    // Get user from database
    const user = await db.users.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials'
      })
    }

    // Verify password
    const isPasswordValid = await hash(password).compare(user.password)
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid credentials'
      })
    }

    // Generate JWT token
    const token = jwtUtil.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      { expiresIn: '1h' }
    )

    // Update last login
    await db.users.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    })

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
})
\`\`\`

### Password Change Endpoint

\`\`\`typescript
app.put('/auth/change-password', authenticateUser, async (req, res) => {
  try {
    const { currentPassword, newPassword } = await req.json()
    const userId = req.context.userId // From auth middleware

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: 'Current and new passwords are required'
      })
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        error: 'New password must be at least 8 characters long'
      })
    }

    // Get user
    const user = await db.users.findUnique({ where: { id: userId } })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Verify current password
    const isCurrentPasswordValid = await hash(currentPassword).compare(user.password)
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        error: 'Current password is incorrect'
      })
    }

    // Hash new password
    const newHashedPassword = await hash(newPassword).hash()

    // Update password
    await db.users.update({
      where: { id: userId },
      data: {
        password: newHashedPassword,
        passwordChangedAt: new Date()
      }
    })

    return res.json({
      message: 'Password changed successfully'
    })

  } catch (error) {
    console.error('Password change error:', error)
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
})
\`\`\`

### User Authentication Service

\`\`\`typescript
class AuthService {
  static async hashPassword(plainPassword: string): Promise<string> {
    return await hash(plainPassword).hash()
  }

  static async verifyPassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await hash(plainPassword).compare(hashedPassword)
  }

  static async createUser(userData: {
    email: string
    password: string
    name: string
  }) {
    const hashedPassword = await this.hashPassword(userData.password)

    return await db.users.create({
      data: {
        ...userData,
        password: hashedPassword
      }
    })
  }

  static async authenticateUser(email: string, password: string) {
    const user = await db.users.findUnique({ where: { email } })
    if (!user) {
      throw new Error('User not found')
    }

    const isValid = await this.verifyPassword(password, user.password)
    if (!isValid) {
      throw new Error('Invalid password')
    }

    return user
  }

  static async changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string
  ) {
    const user = await db.users.findUnique({ where: { id: userId } })
    if (!user) {
      throw new Error('User not found')
    }

    const isCurrentValid = await this.verifyPassword(currentPassword, user.password)
    if (!isCurrentValid) {
      throw new Error('Current password is incorrect')
    }

    const newHashedPassword = await this.hashPassword(newPassword)

    return await db.users.update({
      where: { id: userId },
      data: { password: newHashedPassword }
    })
  }
}

// Usage in routes
app.post('/auth/register', async (req, res) => {
  try {
    const userData = await req.json()
    const user = await AuthService.createUser(userData)
    const { password: _, ...userWithoutPassword } = user

    return res.status(201).json({
      message: 'User created successfully',
      user: userWithoutPassword
    })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})
\`\`\`

### Password Strength Validation

\`\`\`typescript
function validatePasswordStrength(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (!/\\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

app.post('/auth/register', async (req, res) => {
  const { email, password, name } = await req.json()

  // Validate password strength
  const passwordValidation = validatePasswordStrength(password)
  if (!passwordValidation.isValid) {
    return res.status(400).json({
      error: 'Password does not meet requirements',
      details: passwordValidation.errors
    })
  }

  // Proceed with registration...
  const hashedPassword = await hash(password).hash()
  // ... rest of registration logic
})
\`\`\`

## Security Best Practices

### Password Hashing Guidelines

\`\`\`typescript
// ✅ Good: Always hash passwords before storing
const hashedPassword = await hash(plainPassword).hash()
await db.users.create({ email, password: hashedPassword })

// ❌ Bad: Never store plain text passwords
await db.users.create({ email, password: plainPassword })

// ✅ Good: Use the same hash function for comparison
const isValid = await hash(plainPassword).compare(storedHash)

// ❌ Bad: Never compare plain text passwords
const isValid = plainPassword === storedPassword
\`\`\`

### Error Handling

\`\`\`typescript
async function authenticateUser(email: string, password: string) {
  try {
    const user = await db.users.findUnique({ where: { email } })

    // Don't reveal whether user exists
    if (!user) {
      await hash('dummy-password').hash() // Prevent timing attacks
      throw new Error('Invalid credentials')
    }

    const isValid = await hash(password).compare(user.password)
    if (!isValid) {
      throw new Error('Invalid credentials')
    }

    return user

  } catch (error) {
    // Log for security monitoring
    console.warn('Authentication attempt failed:', {
      email,
      timestamp: new Date().toISOString(),
      error: error.message
    })

    // Return generic error message
    throw new Error('Invalid credentials')
  }
}
\`\`\`

### Rate Limiting for Authentication

\`\`\`typescript
const attemptCounts = new Map<string, { count: number; lastAttempt: number }>()

function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const record = attemptCounts.get(identifier)

  if (!record) {
    attemptCounts.set(identifier, { count: 1, lastAttempt: now })
    return true
  }

  // Reset count after 15 minutes
  if (now - record.lastAttempt > 15 * 60 * 1000) {
    attemptCounts.set(identifier, { count: 1, lastAttempt: now })
    return true
  }

  // Allow up to 5 attempts per 15 minutes
  if (record.count >= 5) {
    return false
  }

  record.count++
  record.lastAttempt = now
  return true
}

app.post('/auth/login', async (req, res) => {
  const { email, password } = await req.json()

  // Check rate limit
  if (!checkRateLimit(email)) {
    return res.status(429).json({
      error: 'Too many login attempts. Please try again later.'
    })
  }

  // Proceed with authentication...
})
\`\`\`

## Performance Considerations

### Bcrypt Rounds

The hash function uses bcrypt with a default of 10 rounds. Higher rounds provide better security but take more time:

| Rounds | Time (approx) | Security Level |
|--------|---------------|----------------|
| 10 | ~100ms | Good for most applications |
| 12 | ~400ms | High security |
| 14 | ~1.6s | Very high security |

### Async Processing

\`\`\`typescript
// ✅ Good: Use async/await
const hashedPassword = await hash(password).hash()

// ❌ Bad: Blocking operation
// bcrypt.hashSync() blocks the event loop

// ✅ Good: Handle multiple operations concurrently
const users = await Promise.all(
  userInputs.map(async (userData) => ({
    ...userData,
    password: await hash(userData.password).hash()
  }))
)
\`\`\`

## Related Types

- [\`JWT\` function](/docs/references/jwt-function) - Token generation for authenticated users
- [\`AuthOptions\`](/docs/references/auth-options) - Authentication middleware configuration
- [\`Req\` class](/docs/references/req-class) - Request object for handling authentication data
- [\`Res\` class](/docs/references/res-class) - Response object for authentication responses`}
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
          id: 'performance-considerations',
          title: 'Performance Considerations',
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
