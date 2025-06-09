import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'AppProps - Buntal JS'
  } satisfies MetaProps
}

export default function AppPropsPage() {
  return (
    <MarkdownContent
      title="AppProps"
      content={`# AppProps

Type definition for App component properties.

## Type Definition

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

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| \`routes\` | \`ServerRouterType[]\` | ✅ | Array of application routes configuration |
| \`rootLayout\` | \`object\` | ✅ | Root layout configuration for the application |
| \`rootLayout.element\` | \`(data: any) => ReactNode\` | ✅ | Layout component function |
| \`rootLayout.ssr\` | \`boolean\` | ❌ | Whether to enable server-side rendering |
| \`rootLayout.data\` | \`unknown\` | ❌ | Static data passed to the layout |
| \`notFound\` | \`ReactNode\` | ❌ | Custom 404 not found component |

## Usage

\`\`\`typescript
import { App } from 'buntal'
import type { ServerRouterType } from 'buntal'

// Define routes
const routes: ServerRouterType[] = [
  {
    regex: '^/$',
    element: () => <HomePage />,
    layouts: [
      {
        element: ({ children }) => <MainLayout>{children}</MainLayout>,
        ssr: true
      }
    ]
  },
  {
    regex: '^/about$',
    element: () => <AboutPage />,
    layouts: [
      {
        element: ({ children }) => <MainLayout>{children}</MainLayout>,
        ssr: true
      }
    ]
  }
]

// Root layout component
function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <title>My App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}

// Custom 404 component
function NotFoundPage() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  )
}

// App configuration
function MyApp() {
  return (
    <App
      routes={routes}
      rootLayout={{
        element: RootLayout,
        ssr: true,
        data: {
          _meta: {
            title: 'My Application',
            description: 'A modern web application built with Buntal'
          }
        }
      }}
      notFound={<NotFoundPage />}
    />
  )
}
\`\`\`

## Server-Side Rendering

The \`ssr\` property controls server-side rendering behavior:

\`\`\`typescript
// Enable SSR for the root layout
const appConfig = {
  rootLayout: {
    element: RootLayout,
    ssr: true,  // Layout will be rendered on the server
    data: {
      // Static data available during SSR
      apiUrl: process.env.API_URL
    }
  }
}
\`\`\`

## Route Configuration

Routes are defined using \`ServerRouterType\` objects:

\`\`\`typescript
const routes: ServerRouterType[] = [
  {
    regex: '^/users/([^/]+)$',  // Matches /users/:id
    element: (data) => <UserPage data={data} />,
    ssr: true,
    layouts: [
      {
        element: ({ children }) => <UserLayout>{children}</UserLayout>
      }
    ]
  }
]
\`\`\`

## Related Types

- [ServerRouterType](/docs/references/server-router-types) - Route configuration type used in AppProps
- [App Component](/docs/references/buntal#app) - Component that uses AppProps
- [MetaProps](/docs/references/meta-props) - Used in layout data for metadata`}
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
          id: 'server-side-rendering',
          title: 'Server-Side Rendering',
          level: 1,
          offset: 72
        },
        {
          id: 'route-configuration',
          title: 'Route Configuration',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
