import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'LinkProps - Buntal JS'
  } satisfies MetaProps
}

export default function LinkPropsPage() {
  return (
    <MarkdownContent
      title="LinkProps"
      content={`# LinkProps

Type definition for Link component properties.

## Type Definition

LinkProps are passed to the Link component but not exported as a separate type.

\`\`\`typescript
export { Link } from 'buntal'
\`\`\`

\`\`\`typescript
type LinkProps = {
  href: string
  children: React.ReactNode
  className?: string
  target?: string
  rel?: string
}
\`\`\`

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| \`href\` | \`string\` | ✅ | URL or path to navigate to |
| \`children\` | \`React.ReactNode\` | ✅ | Content to display inside the link |
| \`className\` | \`string\` | ❌ | CSS classes to apply to the link |
| \`target\` | \`string\` | ❌ | Where to open the link (e.g., '_blank', '_self') |
| \`rel\` | \`string\` | ❌ | Relationship between current and linked document |

## Usage

\`\`\`typescript
import { Link } from 'buntal'

// Basic link
function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  )
}

// Link with styling
function StyledLink() {
  return (
    <Link
      href="/dashboard"
      className="btn btn-primary"
    >
      Go to Dashboard
    </Link>
  )
}

// External link
function ExternalLink() {
  return (
    <Link
      href="https://example.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      Visit External Site
    </Link>
  )
}

// Dynamic link
function UserProfile({ userId }: { userId: string }) {
  return (
    <Link href={\`/users/\${userId}\`}>
      View Profile
    </Link>
  )
}
\`\`\`

## Behavior

- Internal links (starting with '/') trigger client-side navigation
- External links (with protocols like 'https://') behave as normal anchor tags
- The Link component automatically handles history management
- CSS classes and styles can be applied normally

## Related Types

- [Link Component](/docs/references/buntal#link) - Component that uses LinkProps
- [RouterType](/docs/references/router-types) - Router methods for programmatic navigation`}
      tableOfContents={[
        {
          id: 'type-definition',
          title: 'Type Definition',
          level: 1,
          offset: 72
        },
        {
          id: 'properties',
          title: 'Properties',
          level: 1,
          offset: 72
        },
        {
          id: 'usage',
          title: 'Usage',
          level: 1,
          offset: 72
        },
        {
          id: 'behavior',
          title: 'Behavior',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
