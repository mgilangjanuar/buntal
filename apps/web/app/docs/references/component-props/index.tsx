import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Component Props - Buntal JS'
  } satisfies MetaProps
}

export default function ComponentPropsPage() {
  return (
    <MarkdownContent
      title="Component Props"
      content={`# Component Props

Type definitions for React component properties.

## MetaProps

\`\`\`typescript
export type { MetaProps } from 'buntal'
\`\`\`

\`\`\`typescript
type MetaProps = Partial<{
  title: string
  viewport: string
  description: string
  keywords: string
  author: string
  og: {
    title?: string
    description?: string
    image?: string
  }
  twitter: {
    title?: string
    description?: string
    image?: string
    card?: string
  }
}>
\`\`\`

## LinkProps

\`\`\`typescript
export { Link } from 'buntal'
\`\`\`

LinkProps are passed to the Link component but not exported as a separate type.

\`\`\`typescript
type LinkProps = {
  href: string
  children: React.ReactNode
  className?: string
  target?: string
  rel?: string
}
\`\`\`

## ScriptProps

\`\`\`typescript
export { Script } from 'buntal'
\`\`\`

ScriptProps are passed to the Script component but not exported as a separate type.

\`\`\`typescript
type ScriptProps = {
  src?: string
  children?: string
  async?: boolean
  defer?: boolean
  type?: string
}
\`\`\`

## SvgProps

\`\`\`typescript
export { Svg } from 'buntal'
\`\`\`

SvgProps are passed to the Svg component but not exported as a separate type.

\`\`\`typescript
type SvgProps = {
  src: string
  className?: string
}
\`\`\`

## AppProps

\`\`\`typescript
export { App } from 'buntal'
\`\`\`

\`\`\`typescript
type AppProps = {
  routes: ServerRouterType[]
  rootLayout: {
    element: (data: any) => ReactNode
    ssr?: boolean
    data?: unknown
  }
  notFound?: ReactNode
}
\`\`\`

## Related Types

- [ServerRouterType](/docs/references/router-types) - Used in AppProps for routes configuration
- [Page & Layout Types](/docs/references/page-layout-types) - LayoutProps and PageProps use MetaProps
- [Hook Types](/docs/references/hook-types) - Component functions return JSX.Element`}
      tableOfContents={[
        {
          id: 'metaprops',
          title: 'MetaProps',
          level: 1,
          offset: 72
        },
        {
          id: 'linkprops',
          title: 'LinkProps',
          level: 1,
          offset: 72
        },
        {
          id: 'scriptprops',
          title: 'ScriptProps',
          level: 1,
          offset: 72
        },
        {
          id: 'svgprops',
          title: 'SvgProps',
          level: 1,
          offset: 72
        },
        {
          id: 'appprops',
          title: 'AppProps',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
