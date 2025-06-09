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

## Related Types

- [RouterType](/docs/references/router-types#routertype) - Return type of useRouter hook`}
      tableOfContents={[
        {
          id: 'userouter',
          title: 'useRouter',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
