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
      title="@buntal/core"
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


`}
    />
  )
}
