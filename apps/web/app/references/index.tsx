import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'API Reference - Buntal JS'
  } satisfies MetaProps
}

export default function ReferencePage() {
  return (
    <MarkdownContent
      title="API Reference"
      content={`# API Reference

Comprehensive documentation for all Buntal JavaScript framework APIs, components, and utilities.

## Overview

Welcome to the Buntal JS API Reference! This section provides detailed documentation for all packages, components, and utilities available in the Buntal ecosystem. Whether you're building HTTP servers, full-stack web applications, or need specific utilities, you'll find comprehensive guides and examples here.

## Main Packages

### [buntal](/references/buntal)

The main Buntal package containing React components, configuration, and TypeScript definitions for building full-stack web applications.

**Key Features:**
- React components for web applications
- Configuration management
- TypeScript type definitions
- Client-side routing utilities

**Main Modules:**
- **[Configuration](/references/buntal/configuration)** - Application configuration options
- **[Components](/references/buntal/components)** - React components and hooks

#### Components

- **[App](/references/buntal/components/app)** - Root application component for managing routing and layouts
- **[useRouter](/references/buntal/components/use-router)** - Hook for accessing router state and navigation
- **[Link](/references/buntal/components/link)** - Client-side navigation component
- **[Meta](/references/buntal/components/meta)** - HTML metadata management component
- **[Script](/references/buntal/components/script)** - External JavaScript loading component
- **[SVG](/references/buntal/components/svg)** - SVG component utilities

### [@buntal/core](/references/core)

Core utilities and server-side functionality for building HTTP servers and APIs with Buntal.

**Key Features:**
- HTTP server utilities
- Middleware system
- Security functions
- TypeScript utilities

**Main Modules:**
- **[HTTP](/references/core/http)** - HTTP server utilities and request/response handling
- **[Middleware](/references/core/middleware)** - Server middleware for authentication, CORS, logging
- **[Security](/references/core/security)** - Authentication and security utilities
- **[Types](/references/core/types)** - TypeScript utility types

#### HTTP Utilities

- **[App](/references/core/http/app)** - HTTP application builder
- **[AtomicHandler](/references/core/http/atomic-handler)** - Atomic route handler utilities
- **[BuildRouter](/references/core/http/build-router)** - Router construction utilities
- **[Cookie](/references/core/http/cookie)** - Cookie manipulation utilities
- **[CookieOptions](/references/core/http/cookie-options)** - Cookie configuration options
- **[H](/references/core/http/h)** - HTTP helper functions
- **[Req](/references/core/http/req)** - Request object utilities
- **[Res](/references/core/http/res)** - Response object utilities

#### Middleware

- **[Auth](/references/core/middleware/auth)** - Authentication middleware
- **[CORS](/references/core/middleware/cors)** - Cross-Origin Resource Sharing middleware
- **[Logger](/references/core/middleware/logger)** - Request logging middleware

#### Security

- **[Hash](/references/core/security/hash)** - Password hashing utilities using bcrypt
- **[JWT](/references/core/security/jwt)** - JSON Web Token utilities for authentication

#### Types

- **[ExtractRouteParams](/references/core/types/extract-route-params)** - Utility type for extracting route parameters from URL patterns

## Package Structure

The Buntal ecosystem is organized into focused packages:

- **\`buntal\`** - Main package for web applications with React components
- **\`@buntal/core\`** - Core utilities for HTTP servers and backend functionality

Each package is designed to work independently or together, giving you the flexibility to use only what you need for your specific project requirements.

`}
      tableOfContents={[
        {
          id: 'overview',
          title: 'Overview',
          level: 2,
          offset: 72
        },
        {
          id: 'main-packages',
          title: 'Main Packages',
          level: 2,
          offset: 72
        },
        {
          id: 'package-structure',
          title: 'Package Structure',
          level: 2,
          offset: 72
        }
      ]}
      lastModified="2025-06-10"
    />
  )
}
