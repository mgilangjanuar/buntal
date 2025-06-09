import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'HTTP Configuration Types - Buntal JS'
  } satisfies MetaProps
}

export default function HTTPConfigTypesPage() {
  return (
    <MarkdownContent
      title="HTTP Configuration Types"
      content={`# HTTP Configuration Types

Configuration type definitions for Buntal's HTTP server and application setup.

## Config

\`\`\`typescript
// Config is an internal type from Http constructor
import { Http } from '@buntal/core'
\`\`\`

\`\`\`typescript
type Config = {
  port: number
  appDir?: string
  websocket?: WebSocketHandler
  injectHandler?: (payload: {
    req: Req
    match: Bun.MatchedRoute
    handler: any
  }) => Promise<Response | void>
}
\`\`\`

**Related Types:**
- [Req](/docs/references/http-core#req-class) - Request class used in injectHandler
- [Http](/docs/references/http-core#http-class) - Main HTTP server class that uses this config

## BuntalConfig

\`\`\`typescript
export type { BuntalConfig } from 'buntal'
\`\`\`

\`\`\`typescript
type BuntalConfig = {
  env?: 'development' | 'production'
  appDir?: string
  outDir?: string
  staticDir?: string
  config?: Partial<Bun.BuildConfig>
}
\`\`\`

**Related Types:**
- [Server Functions](/docs/references/server-types#server-functions) - Functions that use this configuration`}
      tableOfContents={[
        {
          id: 'config',
          title: 'Config',
          level: 1,
          offset: 72
        },
        {
          id: 'buntalconfig',
          title: 'BuntalConfig',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
