import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Res Class - Buntal JS'
  } satisfies MetaProps
}

export default function ResClassPage() {
  return (
    <MarkdownContent
      title="Res Class"
      content={`# Res Class

The \`Res\` class provides a fluent API for building HTTP responses with status codes, headers, cookies, and various content types.

## Import

\`\`\`typescript
import { Res } from '@buntal/core'
\`\`\`

## Type Definition

\`\`\`typescript
class Res {
  status(status: number): Res
  headers(headers: Record<string, string>): Res
  cookie(name: string, value?: string | null, options?: CookieOptions): Res
  redirect(url: string, status?: number): Response
  send(data?: BodyInit): Response
  json(data: unknown): Response
  html(data: string | ReadableStream<Uint8Array>): Response
  text(data: string): Response
}
\`\`\`

## Methods

### status(status: number): Res

Sets the HTTP status code for the response.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`status\` | \`number\` | ✅ | HTTP status code (e.g., 200, 404, 500) |

**Returns:** \`Res\` - The same instance for method chaining

### headers(headers: Record<string, string>): Res

Sets multiple headers for the response.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`headers\` | \`Record<string, string>\` | ✅ | Object containing header key-value pairs |

**Returns:** \`Res\` - The same instance for method chaining

### cookie(name: string, value?: string | null, options?: CookieOptions): Res

Sets a cookie in the response.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`name\` | \`string\` | ✅ | Cookie name |
| \`value\` | \`string \\| null\` | ❌ | Cookie value. Pass \`null\` to delete the cookie |
| \`options\` | \`CookieOptions\` | ❌ | Cookie configuration options |

**Returns:** \`Res\` - The same instance for method chaining

### redirect(url: string, status?: number): Response

Creates a redirect response.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| \`url\` | \`string\` | ✅ | - | URL to redirect to |
| \`status\` | \`number\` | ❌ | \`302\` | HTTP redirect status code |

**Returns:** \`Response\` - Final response object

### send(data?: BodyInit): Response

Sends response with arbitrary body data.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`data\` | \`BodyInit\` | ❌ | Response body data |

**Returns:** \`Response\` - Final response object

### json(data: unknown): Response

Sends a JSON response.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`data\` | \`unknown\` | ✅ | Data to serialize as JSON |

**Returns:** \`Response\` - Final response object with \`application/json\` content type

### html(data: string | ReadableStream<Uint8Array>): Response

Sends an HTML response.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`data\` | \`string \\| ReadableStream<Uint8Array>\` | ✅ | HTML content as string or stream |

**Returns:** \`Response\` - Final response object with \`text/html\` content type

### text(data: string): Response

Sends a plain text response.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`data\` | \`string\` | ✅ | Text content |

**Returns:** \`Response\` - Final response object with \`text/plain\` content type

## Usage Examples

### Basic JSON Response

\`\`\`typescript
import { Http, Res } from '@buntal/core'

const app = new Http({})

app.get('/api/users', (req, res: Res) => {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ]

  return res.json(users)
})
\`\`\`

### Response with Status Code

\`\`\`typescript
app.post('/api/users', (req, res: Res) => {
  // Create user logic...
  const newUser = { id: 3, name: 'New User' }

  return res
    .status(201)
    .json({ success: true, user: newUser })
})
\`\`\`

### Custom Headers

\`\`\`typescript
app.get('/api/download', (req, res: Res) => {
  const fileData = 'Some file content...'

  return res
    .headers({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename="data.txt"',
      'Cache-Control': 'no-cache'
    })
    .send(fileData)
})
\`\`\`

### Setting Cookies

\`\`\`typescript
app.post('/auth/login', (req, res: Res) => {
  // Authentication logic...
  const sessionToken = 'abc123'

  return res
    .cookie('session_id', sessionToken, {
      httpOnly: true,
      secure: true,
      maxAge: 86400000, // 24 hours
      sameSite: 'strict'
    })
    .json({ success: true, message: 'Logged in successfully' })
})
\`\`\`

### Deleting Cookies

\`\`\`typescript
app.post('/auth/logout', (req, res: Res) => {
  return res
    .cookie('session_id', null) // Delete cookie
    .json({ success: true, message: 'Logged out successfully' })
})
\`\`\`

### HTML Response

\`\`\`typescript
app.get('/welcome', (req, res: Res) => {
  const htmlContent = \`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Welcome</title>
      </head>
      <body>
        <h1>Welcome to Buntal!</h1>
        <p>This is a server-rendered page.</p>
      </body>
    </html>
  \`

  return res.html(htmlContent)
})
\`\`\`

### Redirects

\`\`\`typescript
// Temporary redirect (302)
app.get('/old-page', (req, res: Res) => {
  return res.redirect('/new-page')
})

// Permanent redirect (301)
app.get('/moved-permanently', (req, res: Res) => {
  return res.redirect('/new-location', 301)
})
\`\`\`

### Error Responses

\`\`\`typescript
app.get('/api/users/:id', (req, res: Res) => {
  const userId = req.params.id

  if (!userId || isNaN(Number(userId))) {
    return res
      .status(400)
      .json({ error: 'Invalid user ID' })
  }

  // Find user logic...
  const user = findUserById(userId)

  if (!user) {
    return res
      .status(404)
      .json({ error: 'User not found' })
  }

  return res.json(user)
})
\`\`\`

### Method Chaining

\`\`\`typescript
app.get('/api/data', (req, res: Res) => {
  const data = { message: 'Hello World', timestamp: new Date().toISOString() }

  return res
    .status(200)
    .headers({
      'X-API-Version': '1.0',
      'X-Request-ID': crypto.randomUUID()
    })
    .cookie('last_visit', new Date().toISOString(), {
      maxAge: 86400000
    })
    .json(data)
})
\`\`\`

### Streaming HTML Response

\`\`\`typescript
app.get('/stream', (req, res: Res) => {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode('<html><body>'))
      controller.enqueue(new TextEncoder().encode('<h1>Streaming Content</h1>'))

      // Simulate streaming data
      setTimeout(() => {
        controller.enqueue(new TextEncoder().encode('<p>More content...</p>'))
        controller.enqueue(new TextEncoder().encode('</body></html>'))
        controller.close()
      }, 1000)
    }
  })

  return res.html(stream)
})
\`\`\`

### File Download

\`\`\`typescript
app.get('/download/:filename', (req, res: Res) => {
  const filename = req.params.filename
  const fileContent = getFileContent(filename) // Your file reading logic

  return res
    .headers({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': \`attachment; filename="\${filename}"\`,
      'Content-Length': fileContent.length.toString()
    })
    .send(fileContent)
})
\`\`\`

### API Versioning with Headers

\`\`\`typescript
app.get('/api/data', (req, res: Res) => {
  const version = req.headers.get('Accept-Version') || 'v1'

  const data = version === 'v2'
    ? { newFormat: true, data: 'v2 data' }
    : { legacy: true, data: 'v1 data' }

  return res
    .headers({
      'API-Version': version,
      'Cache-Control': 'public, max-age=300'
    })
    .json(data)
})
\`\`\`

## Best Practices

### Always Return Response

Make sure to return the response object from your handlers:

\`\`\`typescript
// Good
app.get('/users', (req, res: Res) => {
  return res.json(users) // Return the response
})

// Bad
app.get('/users', (req, res: Res) => {
  res.json(users) // Missing return statement
})
\`\`\`

### Use Method Chaining

Take advantage of the fluent API for cleaner code:

\`\`\`typescript
// Good: Method chaining
return res
  .status(201)
  .headers({ 'X-Created': 'true' })
  .json(newUser)

// Works but less clean
res.status(201)
res.headers({ 'X-Created': 'true' })
return res.json(newUser)
\`\`\`

### Proper Status Codes

Use appropriate HTTP status codes:

\`\`\`typescript
// 200 for successful GET
return res.json(data)

// 201 for successful creation
return res.status(201).json(newResource)

// 204 for successful deletion
return res.status(204).send()

// 400 for client errors
return res.status(400).json({ error: 'Invalid input' })

// 404 for not found
return res.status(404).json({ error: 'Resource not found' })

// 500 for server errors
return res.status(500).json({ error: 'Internal server error' })
\`\`\`

### Security Headers

Include security headers in sensitive endpoints:

\`\`\`typescript
app.get('/api/sensitive', (req, res: Res) => {
  return res
    .headers({
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    })
    .json(sensitiveData)
})
\`\`\`

## Related Types

- [CookieOptions](/docs/references/cookie-options) - Cookie configuration options
- [Req Class](/docs/references/req-class) - Request class for handling HTTP requests
- [AtomicHandler](/docs/references/atomic-handler) - Request handler function type
- [Http Class](/docs/references/http-class) - Main HTTP server class`}
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
