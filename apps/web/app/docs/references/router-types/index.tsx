import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Router Types - Buntal JS'
  } satisfies MetaProps
}

export default function RouterTypesPage() {
  return (
    <MarkdownContent
      title="Router Types"
      content={`# Router Types

Type definitions for client-side and server-side routing.

## RouterType

RouterType is an internal type returned by the useRouter hook, not directly exported.

\`\`\`typescript
type RouterType = {
  pathname: string
  search: string
  href: string
  protocol: string
  hostname: string
  hash: string
  push: (url: string) => void
  replace: (url: string) => void
  back: () => void
  reload: () => void
}
\`\`\`

## ServerRouterType

\`\`\`typescript
export type { ServerRouterType } from 'buntal'
\`\`\`

\`\`\`typescript
type ServerRouterType = {
  regex: string
  ssr?: boolean
  data?: {
    _meta?: MetaProps
    [key: string]: any
  }
  element: (data: any) => ReactNode
  layouts: {
    element: (data: any) => ReactNode
    ssr?: boolean
    data?: {
      _meta?: MetaProps
      [key: string]: any
    }
  }[]
}
\`\`\`

## Related Types

- [useRouter](/docs/references/hook-types) - Hook that returns RouterType
- [MetaProps](/docs/references/component-props) - Used in ServerRouterType data objects
- [Page & Layout Types](/docs/references/page-layout-types) - Components receive data from ServerRouterType
- [AppProps](/docs/references/component-props) - Uses ServerRouterType[] for routes configuration`}
      tableOfContents={[
        {
          id: 'routertype',
          title: 'RouterType',
          level: 1,
          offset: 72
        },
        {
          id: 'serverroutertype',
          title: 'ServerRouterType',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
