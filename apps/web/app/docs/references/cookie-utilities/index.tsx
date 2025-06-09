import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Cookie Utilities - Buntal JS'
  } satisfies MetaProps
}

export default function CookieUtilitiesPage() {
  return (
    <MarkdownContent
      title="Cookie Utilities"
      content={`# Cookie Utilities

Utility functions for managing HTTP cookies in Buntal applications.

## Cookie Object

The cookie utility provides methods for setting, getting, and deleting cookies.

\`\`\`typescript
import { cookie } from '@buntal/core'

const cookie = {
  get: (req: Req, name: string) => string | null
  getAll: (req: Req) => Record<string, string>
  set: (res: Res, name: string, value: string, options?: CookieOptions) => string
  delete: (res: Res, name: string) => string
}
\`\`\`

## Methods

### cookie.get()

Retrieves a specific cookie value from the request.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`req\` | \`Req\` | ✅ | Request object |
| \`name\` | \`string\` | ✅ | Cookie name |

**Returns:** \`string | null\` - Cookie value or null if not found

### cookie.getAll()

Retrieves all cookies from the request as an object.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`req\` | \`Req\` | ✅ | Request object |

**Returns:** \`Record<string, string>\` - Object with all cookie name-value pairs

### cookie.set()

Sets a cookie in the response.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`res\` | \`Res\` | ✅ | Response object |
| \`name\` | \`string\` | ✅ | Cookie name |
| \`value\` | \`string\` | ✅ | Cookie value |
| \`options\` | \`CookieOptions\` | ❌ | Cookie configuration |

**Returns:** \`string\` - The Set-Cookie header string

### cookie.delete()

Deletes a cookie by setting its Max-Age to 0.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`res\` | \`Res\` | ✅ | Response object |
| \`name\` | \`string\` | ✅ | Cookie name to delete |

**Returns:** \`string\` - The Set-Cookie header string for deletion

## Usage Examples

### Reading Cookies

\`\`\`typescript
import { Http, cookie } from '@buntal/core'

const app = new Http()

app.get('/api/profile', (req, res) => {
  // Get specific cookie
  const sessionId = cookie.get(req, 'session_id')

  if (!sessionId) {
    return res.status(401).json({ error: 'No session found' })
  }

  // Get all cookies
  const allCookies = cookie.getAll(req)
  console.log('All cookies:', allCookies)

  return res.json({
    sessionId,
    cookieCount: Object.keys(allCookies).length
  })
})
\`\`\`

### Setting Cookies

\`\`\`typescript
app.post('/auth/login', async (req, res) => {
  const { email, password } = await req.json()

  // Validate credentials...
  const user = await validateUser(email, password)

  if (user) {
    // Set authentication cookie
    cookie.set(res, 'auth_token', user.token, {
      maxAge: 24 * 60 * 60,  // 24 hours
      httpOnly: true,
      secure: true,
      sameSite: 'Strict'
    })

    // Set user preferences cookie
    cookie.set(res, 'user_prefs', JSON.stringify({
      theme: user.theme,
      language: user.language
    }), {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      httpOnly: false,
      secure: true,
      sameSite: 'Lax'
    })

    return res.json({ success: true })
  }

  return res.status(401).json({ error: 'Invalid credentials' })
})
\`\`\`

### Cookie-Based Session Management

\`\`\`typescript
interface SessionData {
  userId: number
  loginTime: number
  lastActivity: number
}

const sessions = new Map<string, SessionData>()

// Session middleware
function sessionMiddleware(req: Req, res: Res, next: () => void) {
  const sessionId = cookie.get(req, 'session_id')

  if (sessionId && sessions.has(sessionId)) {
    const session = sessions.get(sessionId)!

    // Check if session is still valid (30 minutes)
    if (Date.now() - session.lastActivity < 30 * 60 * 1000) {
      // Update last activity
      session.lastActivity = Date.now()
      req.context = { sessionId, ...session }

      // Extend cookie
      cookie.set(res, 'session_id', sessionId, {
        maxAge: 30 * 60,
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
      })

      return next()
    } else {
      // Session expired
      sessions.delete(sessionId)
      cookie.delete(res, 'session_id')
    }
  }

  // No valid session
  req.context = null
  next()
}

app.use(sessionMiddleware)

app.post('/auth/login', async (req, res) => {
  const { email, password } = await req.json()

  const user = await validateUser(email, password)
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  // Create new session
  const sessionId = generateSessionId()
  const sessionData: SessionData = {
    userId: user.id,
    loginTime: Date.now(),
    lastActivity: Date.now()
  }

  sessions.set(sessionId, sessionData)

  cookie.set(res, 'session_id', sessionId, {
    maxAge: 30 * 60,
    httpOnly: true,
    secure: true,
    sameSite: 'Strict'
  })

  return res.json({ success: true })
})
\`\`\`

### Multi-Value Cookie Management

\`\`\`typescript
app.post('/api/cart/add', (req, res) => {
  const { productId, quantity } = req.body

  // Get existing cart items from cookie
  const cartData = cookie.get(req, 'cart_items')
  const cartItems = cartData ? JSON.parse(cartData) : []

  // Add new item
  const newItem = {
    id: productId,
    quantity,
    addedAt: Date.now()
  }

  cartItems.push(newItem)

  // Limit cart size
  if (cartItems.length > 20) {
    cartItems.shift() // Remove oldest item
  }

  // Update cart cookie
  cookie.set(res, 'cart_items', JSON.stringify(cartItems), {
    maxAge: 7 * 24 * 60 * 60, // 7 days
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax'
  })

  return res.json({
    success: true,
    cartCount: cartItems.length
  })
})

app.get('/api/cart', (req, res) => {
  const cartData = cookie.get(req, 'cart_items')
  const cartItems = cartData ? JSON.parse(cartData) : []

  return res.json({
    items: cartItems,
    count: cartItems.length
  })
})
\`\`\`

### Cookie Cleanup

\`\`\`typescript
app.post('/auth/logout', (req, res) => {
  // Get session ID before deleting
  const sessionId = cookie.get(req, 'session_id')

  if (sessionId) {
    // Clean up server-side session data
    sessions.delete(sessionId)
  }

  // Delete all authentication-related cookies
  cookie.delete(res, 'session_id')
  cookie.delete(res, 'auth_token')
  cookie.delete(res, 'refresh_token')

  // Keep non-sensitive cookies like preferences
  const userPrefs = cookie.get(req, 'user_prefs')
  if (userPrefs) {
    // Preferences can stay
    console.log('Keeping user preferences:', userPrefs)
  }

  return res.json({ message: 'Logged out successfully' })
})
\`\`\`

### Cookie Validation and Sanitization

\`\`\`typescript
function validateCookieValue(value: string): boolean {
  // Check for valid characters (no control characters)
  return /^[\\u0020-\\u007E]*$/.test(value)
}

function sanitizeCookieName(name: string): string {
  // Remove invalid characters
  return name.replace(/[^a-zA-Z0-9_-]/g, '')
}

app.post('/api/settings/save', (req, res) => {
  const { theme, language, timezone } = req.body

  const preferences = {
    theme: theme || 'light',
    language: language || 'en',
    timezone: timezone || 'UTC'
  }

  const prefsString = JSON.stringify(preferences)

  // Validate cookie value
  if (!validateCookieValue(prefsString)) {
    return res.status(400).json({
      error: 'Invalid preference values'
    })
  }

  // Check size limit (4KB)
  if (prefsString.length > 4000) {
    return res.status(400).json({
      error: 'Preferences data too large'
    })
  }

  cookie.set(res, 'user_preferences', prefsString, {
    maxAge: 365 * 24 * 60 * 60,
    httpOnly: false,
    secure: true,
    sameSite: 'Lax'
  })

  return res.json({ success: true })
})
\`\`\`

### Cookie-Based Feature Flags

\`\`\`typescript
interface FeatureFlags {
  newUI: boolean
  betaFeatures: boolean
  experimentalAPI: boolean
}

function getFeatureFlags(req: Req): FeatureFlags {
  const flagsData = cookie.get(req, 'feature_flags')

  if (!flagsData) {
    // Default flags
    return {
      newUI: false,
      betaFeatures: false,
      experimentalAPI: false
    }
  }

  try {
    return JSON.parse(flagsData)
  } catch {
    // Invalid JSON, return defaults
    return {
      newUI: false,
      betaFeatures: false,
      experimentalAPI: false
    }
  }
}

app.post('/api/features/toggle', (req, res) => {
  const { feature, enabled } = req.body

  const currentFlags = getFeatureFlags(req)

  if (feature in currentFlags) {
    currentFlags[feature as keyof FeatureFlags] = enabled

    cookie.set(res, 'feature_flags', JSON.stringify(currentFlags), {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      httpOnly: false,
      secure: true,
      sameSite: 'Lax'
    })

    return res.json({
      success: true,
      flags: currentFlags
    })
  }

  return res.status(400).json({
    error: 'Invalid feature flag'
  })
})

app.get('/api/features', (req, res) => {
  const flags = getFeatureFlags(req)
  return res.json(flags)
})
\`\`\`

### Cookie Debugging

\`\`\`typescript
app.get('/debug/cookies', (req, res) => {
  const allCookies = cookie.getAll(req)

  const cookieInfo = Object.entries(allCookies).map(([name, value]) => ({
    name,
    value,
    size: new Blob([value]).size,
    isJSON: (() => {
      try {
        JSON.parse(value)
        return true
      } catch {
        return false
      }
    })()
  }))

  const totalSize = cookieInfo.reduce((sum, info) => sum + info.size, 0)

  return res.json({
    cookies: cookieInfo,
    totalCount: cookieInfo.length,
    totalSize,
    sizeLimit: 4096,
    remainingSize: 4096 - totalSize
  })
})
\`\`\`

## Security Considerations

### Input Validation

\`\`\`typescript
// ✅ Good: Validate cookie values
function setCookieSafely(res: Res, name: string, value: string, options?: CookieOptions) {
  // Sanitize name
  const safeName = name.replace(/[^a-zA-Z0-9_-]/g, '')

  // Validate value
  if (value.length > 4000) {
    throw new Error('Cookie value too large')
  }

  if (!/^[\\u0020-\\u007E]*$/.test(value)) {
    throw new Error('Cookie value contains invalid characters')
  }

  return cookie.set(res, safeName, value, options)
}

// ❌ Bad: No validation
cookie.set(res, userInput.name, userInput.value) // Dangerous
\`\`\`

### XSS Prevention

\`\`\`typescript
// ✅ Good: Use httpOnly for sensitive cookies
cookie.set(res, 'auth_token', token, {
  httpOnly: true,  // Prevents JavaScript access
  secure: true,
  sameSite: 'Strict'
})

// ❌ Bad: Sensitive data accessible via JavaScript
cookie.set(res, 'auth_token', token, {
  httpOnly: false  // Vulnerable to XSS
})
\`\`\`

### Size Management

\`\`\`typescript
// ✅ Good: Check cookie size
const data = JSON.stringify(userData)
if (data.length < 4000) {
  cookie.set(res, 'user_data', data)
}

// ❌ Bad: No size checking
cookie.set(res, 'large_data', hugeString) // May be rejected by browser
\`\`\`

## Related Types

- [\`CookieOptions\`](/docs/references/cookie-options) - Configuration options for cookies
- [\`Req\` class](/docs/references/req-class) - Request object with cookie reading capabilities
- [\`Res\` class](/docs/references/res-class) - Response object with cookie setting methods
- [\`AuthOptions\`](/docs/references/auth-options) - Authentication middleware using cookies`}
      tableOfContents={[
        {
          id: 'cookie-object',
          title: 'Cookie Object',
          level: 1,
          offset: 72
        },
        {
          id: 'methods',
          title: 'Methods',
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
          id: 'security-considerations',
          title: 'Security Considerations',
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
