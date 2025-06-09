import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Middleware - @buntal/core - Buntal JS'
  } satisfies MetaProps
}

export default function CoreMiddlewarePage() {
  return (
    <MarkdownContent
      title="Middleware"
      content={`# Middleware

Built-in middleware functions for common use cases in Buntal applications.

## Overview

The Middleware module provides pre-built middleware functions that can be easily integrated into your Buntal applications to handle common concerns like authentication, CORS, and logging.

## Components

### Authentication & Security

- **[auth](/docs/references/core/middleware/auth)** - Authentication middleware for protecting routes
- **[cors](/docs/references/core/middleware/cors)** - Cross-Origin Resource Sharing (CORS) middleware

### Development & Debugging

- **[logger](/docs/references/core/middleware/logger)** - Request logging middleware for debugging and monitoring

## Quick Start

### Using Authentication Middleware

\`\`\`typescript
import { Http, auth } from '@buntal/core'

const app = new Http({ port: 3000 })

// Apply auth middleware to protect routes
app.use(auth({
  secret: 'your-jwt-secret',
  excludePaths: ['/login', '/register']
}))

app.get('/protected', (req, res) => {
  // This route is now protected
  res.json({ user: req.user })
})
\`\`\`

### Using CORS Middleware

\`\`\`typescript
import { Http, cors } from '@buntal/core'

const app = new Http({ port: 3000 })

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}))
\`\`\`

### Using Logger Middleware

\`\`\`typescript
import { Http, logger } from '@buntal/core'

const app = new Http({ port: 3000 })

// Log all requests
app.use(logger())
\`\`\`
`}
    />
  )
}
