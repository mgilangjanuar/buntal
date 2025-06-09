import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Server Router Types - Buntal JS'
  } satisfies MetaProps
}

export default function ServerRouterTypesPage() {
  return (
    <MarkdownContent
      title="Server Router Types"
      content={`# Server Router Types

Type definitions for server-side route configuration and SSR.

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

### Properties

| Property | Type | Description |
|----------|------|-------------|
| \`regex\` | \`string\` | Regular expression pattern for route matching |
| \`ssr\` | \`boolean\` | Whether the route uses server-side rendering |
| \`data\` | \`object\` | Static data passed to the route component |
| \`element\` | \`function\` | React component function for the route |
| \`layouts\` | \`array\` | Array of layout components wrapping the route |

### Layout Object Properties

| Property | Type | Description |
|----------|------|-------------|
| \`element\` | \`function\` | React component function for the layout |
| \`ssr\` | \`boolean\` | Whether the layout uses server-side rendering |
| \`data\` | \`object\` | Static data passed to the layout component |

## Usage

ServerRouterType is used internally by Buntal's routing system to configure server-side routes. It's typically generated from your file-based routing structure.

\`\`\`typescript
import { App, type ServerRouterType } from 'buntal'

const routes: ServerRouterType[] = [
  {
    regex: '^/$',
    ssr: true,
    element: HomePage,
    layouts: [
      {
        element: RootLayout,
        ssr: false,
        data: { title: 'My App' }
      }
    ]
  }
]

function MyApp() {
  return (
    <App
      routes={routes}
      rootLayout={{ element: RootLayout }}
    />
  )
}
\`\`\`

## Related Types

- [Router Types](/docs/references/router-types) - Client-side navigation types
- [MetaProps](/docs/references/component-props) - Used in ServerRouterType data objects
- [Page & Layout Types](/docs/references/page-layout-types) - Components receive data from ServerRouterType
- [App Component](/docs/references/buntal#app) - Uses ServerRouterType[] for routes configuration`}
      tableOfContents={[
        {
          id: 'serverroutertype',
          title: 'ServerRouterType',
          level: 1,
          offset: 72
        },
        {
          id: 'properties',
          title: 'Properties',
          level: 2,
          offset: 72
        },
        {
          id: 'layout-object-properties',
          title: 'Layout Object Properties',
          level: 2,
          offset: 72
        },
        {
          id: 'usage',
          title: 'Usage',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
