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

### [HTTP](/docs/references/core/http)

Core HTTP server functionality and request/response handling.

- **[Http](/docs/references/core/http/http)** - Main HTTP server class
- **[h](/docs/references/core/http/h)** - Handler composition function
- **[Req](/docs/references/core/http/req)** - Request object
- **[Res](/docs/references/core/http/res)** - Response object
- **[AtomicHandler](/docs/references/core/http/atomic-handler)** - Atomic request handler
- **[buildRouter](/docs/references/core/http/build-router)** - Router builder
- **[cookie](/docs/references/core/http/cookie)** - Cookie utilities
- **[CookieOptions](/docs/references/core/http/cookie-options)** - Cookie options interface

### [Security](/docs/references/core/security)

Security utilities for authentication and data protection.

- **[jwt](/docs/references/core/security/jwt)** - JSON Web Token utilities
- **[hash](/docs/references/core/security/hash)** - Hashing functions

### [Types](/docs/references/core/types)

TypeScript utility types for type-safe development.

- **[ExtractRouteParams](/docs/references/core/types/extract-route-params)** - Route parameter extraction

### [Middleware](/docs/references/core/middleware)

Built-in middleware functions for common use cases.

- **[auth](/docs/references/core/middleware/auth)** - Authentication middleware
- **[cors](/docs/references/core/middleware/cors)** - CORS middleware
- **[logger](/docs/references/core/middleware/logger)** - Request logging`}
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
          id: 'types',
          title: 'Types',
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
