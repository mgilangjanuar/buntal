import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: '@buntal/core - Buntal JS'
  } satisfies MetaProps
}

export default function CorePackagePage() {
  return (
    <MarkdownContent
      title="@buntal/core"
      content={`# @buntal/core

Core utilities and HTTP functionality for Buntal applications.

## Overview

The \`@buntal/core\` package provides essential utilities for building HTTP servers and handling requests in Buntal applications. It includes HTTP primitives, security utilities, and middleware functions.

## Modules

### HTTP

Core HTTP server functionality and request/response handling.

- **Http** - Main HTTP server class
- **Req** - Request object
- **Res** - Response object
- **AtomicHandler** - Atomic request handler
- **buildRouter** - Router builder
- **cookie** - Cookie utilities

### Security

Security utilities for authentication and data protection.

- **jwt** - JSON Web Token utilities
- **hash** - Hashing functions

### Middleware

Built-in middleware functions for common use cases.

- **auth** - Authentication middleware
- **cors** - CORS middleware
- **logger** - Request logging`}
      tableOfContents={[
        {
          id: '@buntal/core',
          title: '@buntal/core',
          level: 1,
          offset: 72
        },
        {
          id: 'overview',
          title: 'Overview',
          level: 2,
          offset: 72
        },
        {
          id: 'modules',
          title: 'Modules',
          level: 2,
          offset: 72
        },
        {
          id: 'http',
          title: 'HTTP',
          level: 3,
          offset: 72
        },
        {
          id: 'security',
          title: 'Security',
          level: 3,
          offset: 72
        },
        {
          id: 'middleware',
          title: 'Middleware',
          level: 3,
          offset: 72
        }
      ]}
    />
  )
}
