import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'HTTP - @buntal/core - Buntal JS'
  } satisfies MetaProps
}

export default function CoreHttpPage() {
  return (
    <MarkdownContent
      title="HTTP"
      content={`# HTTP

Core HTTP server functionality and request/response handling for Buntal applications.

## Overview

The HTTP module provides the foundational components for building web servers with Buntal. It includes server setup, request/response handling, routing, and cookie management.

## Components

### Core Classes

- **[Http](/docs/references/core/http/http)** - Main HTTP server class for creating and configuring web servers
- **[Req](/docs/references/core/http/req)** - Request object containing incoming HTTP request data
- **[Res](/docs/references/core/http/res)** - Response object for sending HTTP responses

### Handlers & Routing

- **[AtomicHandler](/docs/references/core/http/atomic-handler)** - Atomic request handler for processing individual requests
- **[buildRouter](/docs/references/core/http/build-router)** - Router builder for creating organized route structures

### Utilities

- **[cookie](/docs/references/core/http/cookie)** - Cookie manipulation utilities
- **[CookieOptions](/docs/references/core/http/cookie-options)** - Configuration options for cookies

## Quick Start

\`\`\`typescript
import { Http } from '@buntal/core'

const server = new Http({ port: 3000 })

server.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

server.start()
\`\`\`

## Architecture

The HTTP module follows a simple yet powerful architecture:

1. **Http Class**: The main server instance that handles configuration and routing
2. **Request/Response**: Type-safe objects for handling HTTP communication
3. **Atomic Handlers**: Composable middleware and route handlers
4. **Router Builder**: Utility for organizing routes in a modular way

## Configuration

The Http class accepts a configuration object that allows you to customize:

- **Port**: Server listening port
- **App Directory**: Location of your application files
- **WebSocket Handler**: Optional WebSocket support
- **Inject Handler**: Custom request injection logic

\`\`\`typescript
import { Http } from '@buntal/core'

const server = new Http({
  port: 3000,
  appDir: './app',
  websocket: {
    message: (ws, message) => {
      // Handle WebSocket messages
    }
  }
})
\`\`\`
`}
    />
  )
}
