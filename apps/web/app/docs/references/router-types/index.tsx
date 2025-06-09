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

Type definitions for client-side routing and navigation.

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

### Properties

| Property | Type | Description |
|----------|------|-------------|
| \`pathname\` | \`string\` | Current URL pathname |
| \`search\` | \`string\` | Current URL search string |
| \`href\` | \`string\` | Complete current URL |
| \`protocol\` | \`string\` | URL protocol (http/https) |
| \`hostname\` | \`string\` | Current hostname |
| \`hash\` | \`string\` | URL hash fragment |

### Methods

| Method | Type | Description |
|--------|------|-------------|
| \`push(url)\` | \`(url: string) => void\` | Navigate to URL (adds to history) |
| \`replace(url)\` | \`(url: string) => void\` | Replace current URL (no history) |
| \`back()\` | \`() => void\` | Navigate back in history |
| \`reload()\` | \`() => void\` | Reload current page |

## Usage

\`\`\`typescript
import { useRouter } from 'buntal'

function MyComponent() {
  const router = useRouter()

  const handleNavigation = () => {
    router.push('/dashboard')
  }

  return (
    <div>
      <p>Current path: {router.pathname}</p>
      <button onClick={handleNavigation}>Go to Dashboard</button>
    </div>
  )
}
\`\`\`

## Related Types

- [useRouter](/docs/references/hook-types) - Hook that returns RouterType
- [Server Router Types](/docs/references/server-router-types) - Server-side route configuration types`}
      tableOfContents={[
        {
          id: 'routertype',
          title: 'RouterType',
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
          id: 'methods',
          title: 'Methods',
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
