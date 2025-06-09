import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Page & Layout Types - Buntal JS'
  } satisfies MetaProps
}

export default function PageLayoutTypesPage() {
  return (
    <MarkdownContent
      title="Page & Layout Types"
      content={`# Page & Layout Types

Type definitions for page components and layout components.

## PageProps<T>

PageProps is a conceptual interface for page component props, not directly exported.

\`\`\`typescript
interface PageProps<T = any> {
  params: Record<string, string>
  query?: Record<string, string>
  data?: T & { _meta?: MetaProps }
}
\`\`\`

## LayoutProps<T>

LayoutProps is a conceptual interface for layout component props, not directly exported.

\`\`\`typescript
interface LayoutProps<T = any> {
  children: React.ReactNode
  data?: T & { _meta?: MetaProps }
}
\`\`\`

## Related Types

- [MetaProps](/docs/references/component-props) - Used in both PageProps and LayoutProps data
- [RouterType](/docs/references/router-types) - Provides params and query data to PageProps
- [Server Types](/docs/references/server-types) - ServerContext provides similar interface for server-side`}
      tableOfContents={[
        {
          id: 'pageprops-t-',
          title: 'PageProps<T>',
          level: 1,
          offset: 72
        },
        {
          id: 'layoutprops-t-',
          title: 'LayoutProps<T>',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
