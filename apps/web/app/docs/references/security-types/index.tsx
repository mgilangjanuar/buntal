import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Security Types - Buntal JS'
  } satisfies MetaProps
}

export default function SecurityTypesPage() {
  return (
    <MarkdownContent
      title="Security Types"
      content={`# Security Types

Type definitions for authentication, authorization, and security utilities.

## Auth Options

\`\`\`typescript
export { auth } from '@buntal/core/middlewares'
\`\`\`

\`\`\`typescript
type AuthOptions<T = unknown> = {
  secret: string
  strategy?: 'cookie' | 'header' | 'both'
  cookie?: { key: string }
  header?: { key: string }
  onVerified?: (req: Req<Record<string, string>, T>, res: Res, decoded: T) => void | Response | Promise<void | Response>
}
\`\`\`

## CORS Options

\`\`\`typescript
export { cors } from '@buntal/core/middlewares'
\`\`\`

\`\`\`typescript
type CORSOptions = {
  origin?: string | string[]
  methods?: string | string[]
  allowedHeaders?: string | string[]
  exposedHeaders?: string | string[]
  maxAge?: number
  credentials?: boolean
}
\`\`\`

## JWT Function

\`\`\`typescript
export { jwt } from '@buntal/core/security'
\`\`\`

\`\`\`typescript
function jwt(secret: string): {
  sign: (payload: any, options?: { expiresIn?: string }) => string
  verify: <T = any>(token: string) => T
}
\`\`\`

## Hash Function

\`\`\`typescript
export { hash } from '@buntal/core/security'
\`\`\`

\`\`\`typescript
function hash(password: string): {
  hash: () => Promise<string>
  compare: (hashedPassword: string) => Promise<boolean>
}
\`\`\`

## Related Types

- [Req and Res classes](/docs/references/http-core) - Use these with Auth middleware
- [CookieOptions](/docs/references/cookie-types) - For cookie-based authentication
- [HTTP Configuration](/docs/references/http-config) - For auth middleware setup`}
      tableOfContents={[
        {
          id: 'auth-options',
          title: 'Auth Options',
          level: 1,
          offset: 72
        },
        {
          id: 'cors-options',
          title: 'CORS Options',
          level: 1,
          offset: 72
        },
        {
          id: 'jwt-function',
          title: 'JWT Function',
          level: 1,
          offset: 72
        },
        {
          id: 'hash-function',
          title: 'Hash Function',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
