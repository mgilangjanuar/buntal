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
      title="@buntal/core"
      content={`# HTTP

HTTP server and client utilities for building web applications with Buntal.

## Overview

The HTTP module provides the core HTTP functionality for Buntal applications, including server creation, request handling, and HTTP utilities. It offers a simple yet powerful API for building web servers and handling HTTP requests and responses.

## Components

### Server

- **[Http](/docs/references/core/http/http)** - Main HTTP server class for creating web applications

### Handlers

- **[h](/docs/references/core/http/h)** - Higher-order function for composing AtomicHandler functions
- **[AtomicHandler](/docs/references/core/http/atomic-handler)** - Type definition for request handler functions

### Utilities

- **[Body](/docs/references/core/http/body)** - Request body parsing utilities
- **[Cookie](/docs/references/core/http/cookie)** - Cookie handling utilities for requests and responses
- **[Req](/docs/references/core/http/req)** - Enhanced request object with additional utilities
- **[Res](/docs/references/core/http/res)** - Enhanced response object with additional utilities
`}
    />
  )
}
