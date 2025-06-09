import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Hook Types - Buntal JS'
  } satisfies MetaProps
}

export default function HookTypesPage() {
  return (
    <MarkdownContent
      title="Hook Types"
      content={`# Hook Types

Type definitions for React hooks and their return values.

## useRouter

\`\`\`typescript
export { useRouter } from 'buntal'
\`\`\`

\`\`\`typescript
function useRouter(): RouterType
\`\`\`

Returns a \`RouterType\` object with navigation methods and current route information.

## Component Functions

\`\`\`typescript
export { Meta, Link, Script, Svg, App, Notfound } from 'buntal'
\`\`\`

\`\`\`typescript
function Meta(props: MetaProps): JSX.Element
function Link(props: LinkProps): JSX.Element
function Script(props: ScriptProps): JSX.Element
function Svg(props: SvgProps): JSX.Element
function App(props: AppProps): JSX.Element
function Notfound(): JSX.Element
\`\`\`

## Related Types

- [RouterType](/docs/references/router-types) - Return type of useRouter hook
- [Component Props](/docs/references/component-props) - Props types for all component functions
- [Page & Layout Types](/docs/references/page-layout-types) - Page and layout components use these functions`}
      tableOfContents={[
        {
          id: 'userouter',
          title: 'useRouter',
          level: 1,
          offset: 72
        },
        {
          id: 'component-functions',
          title: 'Component Functions',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
