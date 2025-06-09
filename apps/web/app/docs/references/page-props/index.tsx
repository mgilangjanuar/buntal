import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'PageProps - Buntal JS'
  } satisfies MetaProps
}

export default function PagePropsPage() {
  return (
    <MarkdownContent
      title="PageProps"
      content={`# PageProps

Type definition for page component properties.

## Type Definition

PageProps is a conceptual interface for page component props, not directly exported.

\`\`\`typescript
interface PageProps<T = any> {
  params: Record<string, string>
  query: Record<string, string>
  data?: T & { _meta?: MetaProps }
}
\`\`\`

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| \`params\` | \`Record<string, string>\` | ✅ | Dynamic route parameters extracted from URL |
| \`query\` | \`Record<string, string>\` | ✅ | Query string parameters from URL |
| \`data\` | \`T & { _meta?: MetaProps }\` | ❌ | Server-side data with optional metadata |

## Usage

\`\`\`typescript
import { type MetaProps } from 'buntal'

// Basic page component
export default function HomePage({ params, query, data }: PageProps) {
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <p>Query params: {JSON.stringify(query)}</p>
    </div>
  )
}

// Dynamic route page with typed parameters
interface UserPageParams {
  id: string
}

interface UserData {
  name: string
  email: string
}

export default function UserPage({
  params,
  query,
  data
}: PageProps<UserData> & { params: UserPageParams }) {
  return (
    <div>
      <h1>User: {params.id}</h1>
      <p>Name: {data?.name}</p>
      <p>Email: {data?.email}</p>
      <p>Search: {query.search}</p>
    </div>
  )
}

// Page with server-side data
export const $ = async (req: Req) => {
  const user = await fetchUser(req.params.id)
  return {
    name: user.name,
    email: user.email,
    _meta: {
      title: \`\${user.name} - User Profile\`,
      description: \`Profile page for \${user.name}\`
    } satisfies MetaProps
  }
}

// Catch-all route page
export default function CatchAllPage({
  params,
  query
}: PageProps & { params: { slug: string[] } }) {
  return (
    <div>
      <h1>Dynamic Page</h1>
      <p>Slug parts: {params.slug?.join('/')}</p>
      <p>Query: {JSON.stringify(query)}</p>
    </div>
  )
}
\`\`\`

## Server-Side Data Fetching

Pages can export a function named \`$\` to fetch data on the server:

\`\`\`typescript
// Export data fetching function
export const $ = async (req: Req): Promise<UserData> => {
  const response = await fetch(\`https://api.example.com/users/\${req.params.id}\`)
  const user = await response.json()

  return {
    name: user.name,
    email: user.email,
    _meta: {
      title: \`\${user.name} - User Profile\`,
      description: \`View \${user.name}'s profile and information\`
    }
  }
}

// Page component receives the data
export default function UserPage({ data }: PageProps<UserData>) {
  return (
    <div>
      <h1>{data?.name}</h1>
      <p>{data?.email}</p>
    </div>
  )
}
\`\`\`

## Route Parameters

Dynamic route segments are passed as \`params\`:

\`\`\`typescript
// File: app/users/[id]/posts/[postId]/index.tsx
// URL: /users/123/posts/456?category=tech

interface PostPageParams {
  id: string      // "123"
  postId: string  // "456"
}

export default function PostPage({ params, query }: PageProps) {
  const { id, postId } = params        // { id: "123", postId: "456" }
  const { category } = query           // { category: "tech" }

  return (
    <div>
      <h1>Post {postId} by User {id}</h1>
      <p>Category: {category}</p>
    </div>
  )
}
\`\`\`

## Related Types

- [MetaProps](/docs/references/meta-props) - Used in PageProps data for metadata
- [LayoutProps](/docs/references/layout-props) - Similar interface for layout components
- [RouterType](/docs/references/router-types) - Provides params and query for client-side routing
- [Req](/docs/references/http-core#req-class) - Server request type for data fetching function`}
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
          id: 'server-side-data-fetching',
          title: 'Server-Side Data Fetching',
          level: 1,
          offset: 72
        },
        {
          id: 'route-parameters',
          title: 'Route Parameters',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
