import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'LayoutProps - Buntal JS'
  } satisfies MetaProps
}

export default function LayoutPropsPage() {
  return (
    <MarkdownContent
      title="LayoutProps"
      content={`# LayoutProps

Type definition for layout component properties.

## Type Definition

LayoutProps is a conceptual interface for layout component props, not directly exported.

\`\`\`typescript
interface LayoutProps<T = any> {
  children: React.ReactNode
  params: Record<string, string>
  query: Record<string, string>
  data?: T & { _meta?: MetaProps }
}
\`\`\`

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| \`children\` | \`React.ReactNode\` | ✅ | Child components to render inside the layout |
| \`params\` | \`Record<string, string>\` | ✅ | Dynamic route parameters from current route |
| \`query\` | \`Record<string, string>\` | ✅ | Query string parameters from current URL |
| \`data\` | \`T & { _meta?: MetaProps }\` | ❌ | Server-side data with optional metadata |

## Usage

\`\`\`typescript
import { Meta, type MetaProps } from 'buntal'

// Root layout
export default function RootLayout({
  children,
  data
}: LayoutProps) {
  return (
    <html>
      <head>
        <Meta
          title="My App"
          description="A modern web application"
          {...(data?._meta || {})}
        />
        <link rel="stylesheet" href="/globals.css" />
      </head>
      <body>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}

// Nested layout with navigation
export default function MainLayout({
  children,
  params,
  query
}: LayoutProps) {
  const isActive = (path: string) => {
    // Access current route via params/query if needed
    return window.location.pathname === path
  }

  return (
    <div className="min-h-screen">
      <header>
        <nav>
          <a href="/" className={isActive('/') ? 'active' : ''}>
            Home
          </a>
          <a href="/about" className={isActive('/about') ? 'active' : ''}>
            About
          </a>
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>&copy; 2024 My App</p>
      </footer>
    </div>
  )
}

// Layout with typed data
interface DashboardData {
  user: {
    name: string
    role: string
  }
}

export default function DashboardLayout({
  children,
  data
}: LayoutProps<DashboardData>) {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Welcome, {data?.user?.name}</h2>
        <p>Role: {data?.user?.role}</p>
        <nav>
          <a href="/dashboard">Overview</a>
          <a href="/dashboard/settings">Settings</a>
        </nav>
      </aside>
      <div className="content">
        {children}
      </div>
    </div>
  )
}
\`\`\`

## Server-Side Data Fetching

Layouts can export a function named \`$\` to fetch data on the server:

\`\`\`typescript
// Export data fetching function for layout
export const $ = async (req: Req) => {
  const user = await getCurrentUser(req)

  return {
    user: {
      name: user.name,
      role: user.role
    },
    _meta: {
      title: \`Dashboard - \${user.name}\`,
      description: 'User dashboard with personalized content'
    }
  }
}

// Layout component receives the data
export default function UserLayout({ children, data }: LayoutProps) {
  return (
    <div>
      <header>
        <h1>Hello, {data?.user?.name}!</h1>
      </header>
      <main>
        {children}
      </main>
    </div>
  )
}
\`\`\`

## Nested Layouts

Layouts can be nested to create complex page structures:

\`\`\`typescript
// app/layout.tsx (Root layout)
export default function RootLayout({ children }: LayoutProps) {
  return (
    <html>
      <head>
        <title>My App</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}

// app/dashboard/layout.tsx (Dashboard layout)
export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="dashboard">
      <nav>Dashboard Nav</nav>
      <main>
        {children}
      </main>
    </div>
  )
}

// app/dashboard/users/layout.tsx (Users section layout)
export default function UsersLayout({ children }: LayoutProps) {
  return (
    <div className="users-section">
      <h2>Users Management</h2>
      <div className="users-content">
        {children}
      </div>
    </div>
  )
}
\`\`\`

## Conditional Rendering

Layouts can conditionally render content based on route parameters:

\`\`\`typescript
export default function ConditionalLayout({
  children,
  params,
  query
}: LayoutProps) {
  const showSidebar = params.section !== 'fullscreen'
  const theme = query.theme || 'light'

  return (
    <div className={\`app \${theme}\`}>
      {showSidebar && (
        <aside className="sidebar">
          <nav>Navigation</nav>
        </aside>
      )}
      <main className={showSidebar ? 'with-sidebar' : 'fullwidth'}>
        {children}
      </main>
    </div>
  )
}
\`\`\`

## Related Types

- [MetaProps](/docs/references/meta-props) - Used in LayoutProps data for metadata
- [PageProps](/docs/references/page-props) - Similar interface for page components
- [AppProps](/docs/references/app-props) - Root layout configuration in App component
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
          id: 'nested-layouts',
          title: 'Nested Layouts',
          level: 1,
          offset: 72
        },
        {
          id: 'conditional-rendering',
          title: 'Conditional Rendering',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
