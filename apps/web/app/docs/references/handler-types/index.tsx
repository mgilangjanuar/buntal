import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Handler Types - Buntal JS'
  } satisfies MetaProps
}

export default function HandlerTypesPage() {
  return (
    <MarkdownContent
      title="Handler Types"
      content={`# Handler Types

Type definitions for HTTP request handlers and route parameter extraction.

## AtomicHandler<P, T, R>

\`\`\`typescript
type AtomicHandler<
  P = Record<string, string>,
  T = unknown,
  R = Response | void | undefined | Promise<Response | void | undefined>
> = (req: Req<P, T>, res: Res) => R
\`\`\`

**Related Types:**
- [Req](/docs/references/http-core#req-class) - Request class parameter
- [Res](/docs/references/http-core#res-class) - Response class parameter
- [Http](/docs/references/http-core#http-class) - HTTP server class that uses handlers

## ExtractRouteParams<Path>

\`\`\`typescript
type ExtractRouteParams<Path extends string> =
  Path extends \`\${string}/:\${infer Param}/\${infer Rest}\`
    ? { [K in Param | keyof ExtractRouteParams<\`/\${Rest}\`>]: string }
    : Path extends \`\${string}/:\${infer Param}\`
      ? { [K in Param]: string }
      : {}
\`\`\`

**Related Types:**
- [AtomicHandler](#atomichandler-p-t-r-) - Uses extracted parameters as type P
- [Http](/docs/references/http-core#http-class) - HTTP server methods use this for route typing`}
      tableOfContents={[
        {
          id: 'atomichandler-p-t-r-',
          title: 'AtomicHandler<P, T, R>',
          level: 1,
          offset: 72
        },
        {
          id: 'extractrouteparams-path-',
          title: 'ExtractRouteParams<Path>',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
