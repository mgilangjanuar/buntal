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
- **[CookieOptions](/docs/references/core/http/cookie-options)** - Configuration options for cookies`}
    />
  )
}
