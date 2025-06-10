import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Security - @buntal/core - Buntal JS'
  } satisfies MetaProps
}

export default function CoreSecurityPage() {
  return (
    <MarkdownContent
      title="@buntal/core"
      content={`# Security

Security utilities for authentication and data protection in Buntal applications.

## Overview

The Security module provides essential security functions for protecting your Buntal applications. It includes utilities for JSON Web Token (JWT) handling and secure password hashing.

## Components

### Authentication

- **[jwt](/docs/references/core/security/jwt)** - JSON Web Token utilities for creating and verifying tokens
- **[hash](/docs/references/core/security/hash)** - Secure password hashing functions using bcrypt


`}
    />
  )
}
