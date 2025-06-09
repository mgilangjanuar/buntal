import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'HTTP Core Types - Buntal JS'
  } satisfies MetaProps
}

export default function HTTPCoreTypesPage() {
  return (
    <MarkdownContent
      title="HTTP Core Types"
      content={`# HTTP Core Types

Core class definitions for Buntal's HTTP server functionality.

## Http Class

\`\`\`typescript
export { Http } from '@buntal/core'
\`\`\`

\`\`\`typescript
class Http {
  constructor(config: Config)
  start(cb?: (server: Bun.Server) => void): Bun.Server
  use(handler: AtomicHandler): void
  get<R extends string, P = ExtractRouteParams<R>>(route: R, ...handlers: AtomicHandler<P>[]): void
  post<R extends string, P = ExtractRouteParams<R>>(route: R, ...handlers: AtomicHandler<P>[]): void
  put<R extends string, P = ExtractRouteParams<R>>(route: R, ...handlers: AtomicHandler<P>[]): void
  patch<R extends string, P = ExtractRouteParams<R>>(route: R, ...handlers: AtomicHandler<P>[]): void
  delete<R extends string, P = ExtractRouteParams<R>>(route: R, ...handlers: AtomicHandler<P>[]): void
  onError(handler: (error: Error) => Response): void
  onNotFound(handler: AtomicHandler): void
}
\`\`\`

**Related Types:**
- [Config](/docs/references/http-config#config) - Server configuration
- [AtomicHandler](/docs/references/handler-types#atomichandler-p-t-r-) - Request handler function
- [ExtractRouteParams](/docs/references/handler-types#extractrouteparams-path-) - Route parameter extraction

## Req Class

\`\`\`typescript
export type { Req } from '@buntal/core'
\`\`\`

\`\`\`typescript
class Req<P = Record<string, string>, T = unknown> extends Request {
  params: P
  query?: Record<string, string>
  context?: T
  readonly cookies: Record<string, string>
}
\`\`\`

## Res Class

\`\`\`typescript
export { Res } from '@buntal/core'
\`\`\`

\`\`\`typescript
class Res {
  status(status: number): Res
  headers(headers: Record<string, string>): Res
  cookie(name: string, value?: string | null, options?: CookieOptions): Res
  redirect(url: string, status?: number): Response
  send(data?: BodyInit): Response
  json(data: unknown): Response
  html(data: string | ReadableStream<Uint8Array>): Response
  text(data: string): Response
}
\`\`\`

**Related Types:**
- [CookieOptions](/docs/references/cookie-types#cookieoptions) - Cookie configuration options`}
      tableOfContents={[
        {
          id: 'http-class',
          title: 'Http Class',
          level: 1,
          offset: 72
        },
        {
          id: 'req-class',
          title: 'Req Class',
          level: 1,
          offset: 72
        },
        {
          id: 'res-class',
          title: 'Res Class',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
