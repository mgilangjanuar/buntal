import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Cookie Types - Buntal JS'
  } satisfies MetaProps
}

export default function CookieTypesPage() {
  return (
    <MarkdownContent
      title="Cookie Types"
      content={`# Cookie Types

Type definitions for cookie management and options.

## CookieOptions

\`\`\`typescript
export { cookie } from '@buntal/core'
\`\`\`

\`\`\`typescript
type CookieOptions = {
  maxAge?: number
  expires?: Date
  path?: string
  domain?: string
  secure?: boolean
  httpOnly?: boolean
  sameSite?: 'Strict' | 'Lax' | 'None'
}
\`\`\`

## Constants

\`\`\`typescript
export { ALLOWED_METHODS } from '@buntal/core'
\`\`\`

\`\`\`typescript
const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'] as const
\`\`\`

## Related Types

- [Req and Res classes](/docs/references/http-core) - For cookie manipulation in handlers
- [Security Types](/docs/references/security-types) - Auth options use CookieOptions
- [Handler Types](/docs/references/handler-types) - AtomicHandler uses cookie utilities`}
      tableOfContents={[
        {
          id: 'cookieoptions',
          title: 'CookieOptions',
          level: 1,
          offset: 72
        },
        {
          id: 'constants',
          title: 'Constants',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
