import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Server Types - Buntal JS'
  } satisfies MetaProps
}

export default function ServerTypesPage() {
  return (
    <MarkdownContent
      title="Server Types"
      content={`# Server Types

Type definitions for server-side functionality and context.

## ServerContext

ServerContext is a conceptual interface for server-side context, not directly exported.

\`\`\`typescript
interface ServerContext {
  params: Record<string, string>
  query: Record<string, string>
  request: Request
}
\`\`\`

## Server Functions

\`\`\`typescript
export { runServer } from 'buntal/server'
\`\`\`

\`\`\`typescript
function runServer(config?: BuntalConfig): Promise<void>
\`\`\`

## Related Types

- [BuntalConfig](/docs/references/http-config) - Configuration passed to runServer function
- [Page & Layout Types](/docs/references/page-layout-types) - PageProps has similar interface to ServerContext
- [RouterType](/docs/references/router-types) - ServerRouterType defines server-side route structure`}
      tableOfContents={[
        {
          id: 'servercontext',
          title: 'ServerContext',
          level: 1,
          offset: 72
        },
        {
          id: 'server-functions',
          title: 'Server Functions',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
