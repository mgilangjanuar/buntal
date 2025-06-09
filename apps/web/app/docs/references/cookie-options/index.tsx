import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'CookieOptions Type - Buntal JS'
  } satisfies MetaProps
}

export default function CookieOptionsPage() {
  return (
    <MarkdownContent
      title="CookieOptions Type"
      content={`# CookieOptions Type

Configuration options for HTTP cookies in Buntal applications.

## Type Definition

\`\`\`typescript
import { cookie } from '@buntal/core'

type CookieOptions = {
  maxAge?: number
  expires?: Date
  path?: string
  domain?: string
  secure?: boolean
  httpOnly?: boolean
  sameSite?: 'Strict' | 'Lax' | 'None'
}
\`\`\`

## Properties

### maxAge?: number

Sets the cookie's maximum age in seconds.

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| \`maxAge\` | \`number\` | Cookie lifetime in seconds | \`3600\` (1 hour) |

**Example:**
\`\`\`typescript
// Cookie expires in 24 hours
{ maxAge: 86400 }

// Session cookie (expires when browser closes)
// Don't set maxAge or expires
\`\`\`

### expires?: Date

Sets the cookie's expiration date.

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| \`expires\` | \`Date\` | Specific expiration date | \`new Date('2024-12-31')\` |

**Example:**
\`\`\`typescript
// Cookie expires at specific date
{
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
}

// Cookie expires at end of year
{
  expires: new Date('2024-12-31T23:59:59Z')
}
\`\`\`

**Note:** If both \`maxAge\` and \`expires\` are set, \`maxAge\` takes precedence.

### path?: string

Restricts the cookie to a specific path.

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| \`path\` | \`string\` | URL path where cookie is valid | \`'/'\` |

**Examples:**
\`\`\`typescript
// Cookie available site-wide
{ path: '/' }

// Cookie only available under /api
{ path: '/api' }

// Cookie only available for specific page
{ path: '/dashboard' }
\`\`\`

### domain?: string

Restricts the cookie to a specific domain.

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| \`domain\` | \`string\` | Domain where cookie is valid | \`'.example.com'\` |

**Examples:**
\`\`\`typescript
// Cookie available to all subdomains
{ domain: '.example.com' }

// Cookie only available to specific subdomain
{ domain: 'api.example.com' }
\`\`\`

**Security Note:** Be careful with domain settings to prevent cookie leakage.

### secure?: boolean

Ensures the cookie is only sent over HTTPS connections.

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| \`secure\` | \`boolean\` | HTTPS-only transmission | \`false\` |

**Examples:**
\`\`\`typescript
// Production: Always use secure cookies
{
  secure: process.env.NODE_ENV === 'production'
}

// HTTPS-only cookie
{ secure: true }
\`\`\`

### httpOnly?: boolean

Prevents client-side JavaScript from accessing the cookie.

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| \`httpOnly\` | \`boolean\` | Server-side only access | \`false\` |

**Security Benefits:**
- Prevents XSS attacks
- Protects authentication tokens
- Secures sensitive session data

**Examples:**
\`\`\`typescript
// Secure session cookie
{
  httpOnly: true,
  secure: true
}

// Public preference cookie (accessible via JavaScript)
{ httpOnly: false }
\`\`\`

### sameSite?: 'Strict' | 'Lax' | 'None'

Controls cross-site request behavior.

| Value | Description | Use Case |
|-------|-------------|----------|
| \`'Strict'\` | Never sent with cross-site requests | Maximum security |
| \`'Lax'\` | Sent with top-level navigation | Good balance |
| \`'None'\` | Always sent (requires \`secure: true\`) | Cross-origin APIs |

**Examples:**
\`\`\`typescript
// Maximum protection
{ sameSite: 'Strict' }

// Balanced protection (default)
{ sameSite: 'Lax' }

// Cross-origin API (requires secure)
{
  sameSite: 'None',
  secure: true
}
\`\`\`

## Usage Examples

### Basic Cookie Setting

\`\`\`typescript
import { Http, cookie } from '@buntal/core'

const app = new Http()

app.post('/auth/login', async (req, res) => {
  const { email, password } = await req.json()

  // Validate credentials...
  const user = await validateUser(email, password)

  if (user) {
    // Set simple session cookie
    cookie.set(res, 'session_id', user.sessionId, {
      maxAge: 3600,    // 1 hour
      httpOnly: true,  // Security
      secure: true     // HTTPS only
    })

    return res.json({ success: true })
  }

  return res.status(401).json({ error: 'Invalid credentials' })
})
\`\`\`

### Secure Authentication Cookie

\`\`\`typescript
app.post('/auth/login', async (req, res) => {
  const { email, password } = await req.json()

  const user = await authenticateUser(email, password)
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  // Generate JWT token
  const token = generateJWT(user)

  // Set secure authentication cookie
  cookie.set(res, 'auth_token', token, {
    maxAge: 24 * 60 * 60,  // 24 hours
    httpOnly: true,        // Prevent XSS
    secure: process.env.NODE_ENV === 'production', // HTTPS in prod
    sameSite: 'Strict',    // CSRF protection
    path: '/'              // Site-wide access
  })

  return res.json({
    success: true,
    user: { id: user.id, email: user.email }
  })
})
\`\`\`

### User Preferences Cookie

\`\`\`typescript
app.post('/api/preferences', (req, res) => {
  const { theme, language, timezone } = req.body

  const preferences = JSON.stringify({
    theme,
    language,
    timezone,
    updatedAt: new Date().toISOString()
  })

  // Set long-lived preference cookie
  cookie.set(res, 'user_preferences', preferences, {
    maxAge: 365 * 24 * 60 * 60, // 1 year
    httpOnly: false,            // Allow JavaScript access
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    path: '/'
  })

  return res.json({ success: true })
})
\`\`\`

### Shopping Cart Cookie

\`\`\`typescript
app.post('/api/cart/add', (req, res) => {
  const { productId, quantity } = req.body

  // Get existing cart from cookie
  const existingCart = cookie.get(req, 'cart')
  const cart = existingCart ? JSON.parse(existingCart) : { items: [] }

  // Add item to cart
  cart.items.push({ productId, quantity, addedAt: Date.now() })

  // Update cart cookie
  cookie.set(res, 'cart', JSON.stringify(cart), {
    maxAge: 7 * 24 * 60 * 60, // 7 days
    httpOnly: false,          // Allow JavaScript access
    secure: false,            // Allow HTTP for shopping
    sameSite: 'Lax',
    path: '/'
  })

  return res.json({ success: true, cart })
})
\`\`\`

### Multi-Domain Cookie

\`\`\`typescript
app.post('/api/sso/login', async (req, res) => {
  const { email, password } = await req.json()

  const user = await authenticateUser(email, password)
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const ssoToken = generateSSOToken(user)

  // Set cookie for main domain and all subdomains
  cookie.set(res, 'sso_token', ssoToken, {
    maxAge: 8 * 60 * 60,      // 8 hours
    httpOnly: true,
    secure: true,
    sameSite: 'None',         // Allow cross-origin
    domain: '.example.com',   // Available to all subdomains
    path: '/'
  })

  return res.json({ success: true })
})
\`\`\`

### Cookie with Expiration Date

\`\`\`typescript
app.post('/api/trial/start', (req, res) => {
  const trialEnd = new Date()
  trialEnd.setDate(trialEnd.getDate() + 14) // 14 days from now

  const trialData = {
    userId: req.user.id,
    startDate: new Date().toISOString(),
    endDate: trialEnd.toISOString()
  }

  cookie.set(res, 'trial_info', JSON.stringify(trialData), {
    expires: trialEnd,        // Expires at trial end
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    path: '/'
  })

  return res.json({ trialStarted: true, expiresAt: trialEnd })
})
\`\`\`

### Cookie Deletion

\`\`\`typescript
app.post('/auth/logout', (req, res) => {
  // Delete authentication cookie
  cookie.delete(res, 'auth_token')

  // Or set with maxAge: 0
  cookie.set(res, 'session_id', '', {
    maxAge: 0,
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    path: '/'
  })

  return res.json({ message: 'Logged out successfully' })
})
\`\`\`

### Environment-Based Configuration

\`\`\`typescript
function getCookieOptions(type: 'auth' | 'session' | 'preference'): CookieOptions {
  const isProduction = process.env.NODE_ENV === 'production'

  const baseOptions: CookieOptions = {
    secure: isProduction,
    path: '/'
  }

  switch (type) {
    case 'auth':
      return {
        ...baseOptions,
        maxAge: 24 * 60 * 60,   // 24 hours
        httpOnly: true,
        sameSite: 'Strict'
      }

    case 'session':
      return {
        ...baseOptions,
        maxAge: 60 * 60,        // 1 hour
        httpOnly: true,
        sameSite: 'Lax'
      }

    case 'preference':
      return {
        ...baseOptions,
        maxAge: 365 * 24 * 60 * 60, // 1 year
        httpOnly: false,
        sameSite: 'Lax'
      }

    default:
      return baseOptions
  }
}

// Usage
app.post('/login', (req, res) => {
  // ...authentication logic...

  cookie.set(res, 'auth_token', token, getCookieOptions('auth'))
  return res.json({ success: true })
})
\`\`\`

## Security Best Practices

### Authentication Cookies

\`\`\`typescript
// ✅ Good: Secure authentication cookie
cookie.set(res, 'auth_token', token, {
  httpOnly: true,      // Prevent XSS
  secure: true,        // HTTPS only
  sameSite: 'Strict',  // CSRF protection
  maxAge: 3600         // Limited lifetime
})

// ❌ Bad: Insecure authentication cookie
cookie.set(res, 'auth_token', token, {
  httpOnly: false,     // Vulnerable to XSS
  secure: false,       // Can be intercepted
  sameSite: 'None'     // CSRF vulnerable
})
\`\`\`

### Sensitive Data

\`\`\`typescript
// ✅ Good: Don't store sensitive data in cookies
cookie.set(res, 'session_id', sessionId, {
  httpOnly: true,
  secure: true
})

// ❌ Bad: Storing sensitive data in cookies
cookie.set(res, 'user_data', JSON.stringify({
  password: hashedPassword,  // Never store passwords
  ssn: userSSN,             // Never store sensitive data
  creditCard: cardNumber    // Never store payment info
}))
\`\`\`

### Size Limitations

\`\`\`typescript
// ✅ Good: Keep cookie data small
const preferences = JSON.stringify({
  theme: 'dark',
  lang: 'en'
})

if (preferences.length < 4000) { // 4KB limit
  cookie.set(res, 'prefs', preferences)
}

// ❌ Bad: Large cookie data
const largeData = JSON.stringify(massiveObject) // Could exceed limits
\`\`\`

## Browser Support

### SameSite Attribute

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 51+ | Full support |
| Firefox | 60+ | Full support |
| Safari | 12+ | Full support |
| Edge | 16+ | Full support |

### Secure Attribute

All modern browsers support the \`secure\` attribute. It's ignored on HTTP connections.

## Related Types

- [\`Req\` class](/docs/references/req-class) - Request object with cookie reading methods
- [\`Res\` class](/docs/references/res-class) - Response object with cookie setting methods
- [\`AuthOptions\`](/docs/references/auth-options) - Authentication middleware that uses cookies
- [\`Http\` class](/docs/references/http-class) - Main server class for handling cookie-based requests`}
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
          id: 'security-best-practices',
          title: 'Security Best Practices',
          level: 1,
          offset: 72
        },
        {
          id: 'browser-support',
          title: 'Browser Support',
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
