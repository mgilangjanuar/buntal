import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'buntal/server API Reference - Buntal JS'
  } satisfies MetaProps
}

export default function BuntalServerAPIReferencePage() {
  return (
    <MarkdownContent
      title="buntal/server"
      content={`# buntal/server

The server-side package for Buntal JS applications, providing full-stack web application capabilities with server-side rendering, bundling, and development tools.

## Functions

### runServer(config?)

Main function to start a Buntal server with full-stack capabilities including SSR, bundling, and file-based routing.

\`\`\`typescript
function runServer(config?: BuntalConfig): Promise<void>
\`\`\`

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| \`config\` | \`BuntalConfig\` | Optional server configuration |

#### BuntalConfig Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`env\` | \`'development' \\| 'production'\` | Auto-detected | Environment mode |
| \`appDir\` | \`string\` | \`'./app'\` | Application directory with routes |
| \`outDir\` | \`string\` | \`'.buntal'\` | Build output directory |
| \`staticDir\` | \`string\` | \`'./public'\` | Static files directory |
| \`config\` | \`Partial<Bun.BuildConfig>\` | \`{}\` | Bun bundler configuration |

**Features:**
- **SSR**: Server-side rendering for React components
- **File-based routing**: Automatic route generation from file structure
- **Hot reloading**: Development mode with automatic refresh
- **Static file serving**: Serves files from public directory
- **Build optimization**: Production bundling and minification
- **TypeScript support**: Built-in TypeScript compilation

**Example:**

\`\`\`typescript
// index.ts
import { runServer } from 'buntal/server'

runServer({
  env: 'development',
  appDir: './src/app',
  staticDir: './public',
  config: {
    splitting: false,
    minify: true
  }
})
\`\`\`

**With configuration file:**

\`\`\`typescript
// buntal.config.ts
import type { BuntalConfig } from 'buntal'

const config = {
  appDir: './src/app',
  staticDir: './assets',
  config: {
    splitting: false
  }
} satisfies BuntalConfig

export default config
\`\`\`

\`\`\`typescript
// index.ts
import { runServer } from 'buntal/server'
import config from './buntal.config'

runServer(config)
\`\`\`

## Server Architecture

### File-Based Routing

The server automatically generates routes based on your file structure:

\`\`\`
app/
├── index.tsx           → /
├── about.tsx           → /about
├── layout.tsx          → Wraps all routes
├── users/
│   ├── index.tsx       → /users
│   ├── [id].tsx        → /users/:id
│   ├── [id]/edit.tsx   → /users/:id/edit
│   └── [...slug].tsx   → /users/* (catch-all)
└── api/
    ├── hello.ts        → /api/hello
    └── users/
        └── [id].ts     → /api/users/:id
\`\`\`

### Server-Side Rendering (SSR)

Pages and layouts support server-side rendering for improved SEO and performance:

\`\`\`tsx
// app/users/[id].tsx
import { type MetaProps } from 'buntal'

// Server-side data fetching
export const $ = async (context: {
  params: { id: string }
  query: Record<string, string>
  request: Request
}) => {
  const user = await fetchUser(context.params.id)

  return {
    _meta: {
      title: \`\${user.name} - User Profile\`,
      description: \`Profile page for \${user.name}\`
    } satisfies MetaProps,
    user
  }
}

// Client component
export default function UserPage({
  params,
  data
}: {
  params: { id: string }
  data?: { user: User; _meta: MetaProps }
}) {
  const user = data?.user

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  )
}
\`\`\`

### Layout Components

Layouts can also use server-side rendering and data fetching:

\`\`\`tsx
// app/layout.tsx
import { Meta, type MetaProps } from 'buntal'

// Server-side layout data
export const $ = async () => {
  const siteConfig = await getSiteConfig()

  return {
    _meta: {
      title: siteConfig.defaultTitle,
      description: siteConfig.defaultDescription
    } satisfies MetaProps,
    navigation: await getNavigationItems()
  }
}

export default function RootLayout({
  children,
  data
}: {
  children: React.ReactNode
  data?: {
    _meta: MetaProps
    navigation: NavigationItem[]
  }
}) {
  return (
    <html>
      <head>
        <Meta {...(data?._meta || {})} />
        <link rel="stylesheet" href="/globals.css" />
      </head>
      <body>
        <nav>
          {data?.navigation?.map(item => (
            <a key={item.href} href={item.href}>
              {item.title}
            </a>
          ))}
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
\`\`\`

### API Routes

Create API endpoints using the same file-based routing:

\`\`\`typescript
// app/api/users/[id].ts
import { Res } from '@buntal/core'

export async function GET(
  req: Request & { params: { id: string } },
  res: Res
) {
  const user = await getUserById(req.params.id)

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  return res.json({ user })
}

export async function PUT(
  req: Request & { params: { id: string } },
  res: Res
) {
  const body = await req.json()
  const updatedUser = await updateUser(req.params.id, body)

  return res.json({ user: updatedUser })
}

export async function DELETE(
  req: Request & { params: { id: string } },
  res: Res
) {
  await deleteUser(req.params.id)
  return res.status(204).send()
}
\`\`\`

## Development Features

### Hot Reloading

In development mode, the server provides:
- **File watching**: Automatic restart on server-side changes
- **Live reload**: Browser refresh on client-side changes
- **Error overlay**: Detailed error information in the browser

### Build Process

The server handles the complete build pipeline:

1. **Route Discovery**: Scans app directory for route files
2. **Bundle Generation**: Creates optimized client-side bundles
3. **Asset Processing**: Handles CSS, images, and other assets
4. **SSR Preparation**: Prepares server-side rendering context

## Static File Serving

The server automatically serves static files from the configured directory:

\`\`\`
public/
├── favicon.ico         → /favicon.ico
├── robots.txt          → /robots.txt
├── images/
│   └── logo.png        → /images/logo.png
└── styles/
    └── custom.css      → /styles/custom.css
\`\`\`

Files are served with appropriate MIME types and caching headers.

## Environment Modes

### Development Mode

\`\`\`typescript
runServer({ env: 'development' })
\`\`\`

**Features:**
- Hot reloading and file watching
- Detailed error messages
- Source maps for debugging
- WebSocket connection for live updates

### Production Mode

\`\`\`typescript
runServer({ env: 'production' })
\`\`\`

**Features:**
- Optimized bundles with minification
- Compressed assets
- Efficient caching strategies
- Error boundary handling

## Command Line Interface

When using the Buntal CLI, the server integrates with these commands:

### Development Server

\`\`\`bash
bun dev
# or
bunx buntal dev
\`\`\`

Starts the development server with hot reloading.

### Build for Production

\`\`\`bash
bun build
# or
bunx buntal build
\`\`\`

Creates an optimized production build.

### Start Production Server

\`\`\`bash
bun start
# or
bunx buntal start
\`\`\`

Runs the production server from the built assets.

## Integration with @buntal/core

The server package builds on top of \`@buntal/core\` HTTP server capabilities:

\`\`\`typescript
// Internally, runServer creates an Http instance:
import { Http } from '@buntal/core'

const app = new Http({
  port: 3000,
  appDir: './app',
  injectHandler: customHandler
})

// Adds middleware for:
app.use(logger())              // Request logging
app.onNotFound(notFoundHandler) // 404 handling
app.start()                    // Server startup
\`\`\`

## Error Handling

### Development Error Pages

In development, detailed error information is displayed:
- Stack traces with source code context
- File locations and line numbers
- Suggestions for common issues

### Production Error Handling

In production, user-friendly error pages are shown:
- Custom 404 pages
- Generic error messages
- Error logging for debugging

### Custom Error Pages

Create custom error pages in your app directory:

\`\`\`tsx
// app/404.tsx
export default function NotFoundPage() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  )
}
\`\`\`

## Performance Optimizations

### Code Splitting

Automatic code splitting for optimal loading:
- Route-based splitting
- Dynamic imports
- Shared chunk optimization

### Caching Strategies

Built-in caching for better performance:
- Static asset caching
- Bundle fingerprinting
- HTTP cache headers

### Bundle Optimization

Production builds include:
- Tree shaking for unused code elimination
- Minification for smaller file sizes
- Compression for faster delivery

## Best Practices

### 1. Project Structure

Organize your files for optimal routing:

\`\`\`
app/
├── layout.tsx          # Root layout
├── index.tsx           # Home page
├── about/
│   ├── layout.tsx      # About section layout
│   ├── index.tsx       # About page
│   └── team.tsx        # About team page
├── blog/
│   ├── index.tsx       # Blog list
│   └── [slug].tsx      # Blog post
└── api/
    ├── auth/
    │   ├── login.ts    # POST /api/auth/login
    │   └── logout.ts   # POST /api/auth/logout
    └── posts/
        ├── index.ts    # GET /api/posts
        └── [id].ts     # GET/PUT/DELETE /api/posts/:id
\`\`\`

### 2. Data Fetching

Use server-side data fetching for better SEO:

\`\`\`tsx
// ✅ Good - Server-side data fetching
export const $ = async ({ params }) => {
  const data = await fetchData(params.id)
  return { data }
}

// ❌ Avoid - Client-side only fetching
useEffect(() => {
  fetchData().then(setData)
}, [])
\`\`\`

### 3. Configuration Management

Use environment variables and config files:

\`\`\`typescript
// buntal.config.ts
const config = {
  env: process.env.NODE_ENV,
  appDir: process.env.APP_DIR || './app',
  staticDir: process.env.STATIC_DIR || './public'
} satisfies BuntalConfig
\`\`\`

### 4. Error Boundaries

Implement proper error handling:

\`\`\`tsx
// app/layout.tsx
import { ErrorBoundary } from 'react'

export default function RootLayout({ children }) {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      {children}
    </ErrorBoundary>
  )
}
\`\`\`

### 5. Type Safety

Leverage TypeScript for route parameters:

\`\`\`tsx
// Define types for better type safety
type UserPageProps = {
  params: { id: string }
  data?: {
    user: User
    _meta: MetaProps
  }
}

export default function UserPage({ params, data }: UserPageProps) {
  // Fully typed props
}
\`\`\``}
      tableOfContents={[
        {
          id: 'functions',
          title: 'Functions',
          level: 1,
          offset: 72,
          children: [
            {
              id: 'runserver-config-',
              title: 'runServer(config?)',
              level: 2,
              offset: 72
            }
          ]
        },
        {
          id: 'server-architecture',
          title: 'Server Architecture',
          level: 1,
          offset: 72,
          children: [
            {
              id: 'file-based-routing',
              title: 'File-Based Routing',
              level: 2,
              offset: 72
            },
            {
              id: 'server-side-rendering-ssr-',
              title: 'Server-Side Rendering (SSR)',
              level: 2,
              offset: 72
            },
            {
              id: 'layout-components',
              title: 'Layout Components',
              level: 2,
              offset: 72
            },
            { id: 'api-routes', title: 'API Routes', level: 2, offset: 72 }
          ]
        },
        {
          id: 'development-features',
          title: 'Development Features',
          level: 1,
          offset: 72,
          children: [
            {
              id: 'hot-reloading',
              title: 'Hot Reloading',
              level: 2,
              offset: 72
            },
            {
              id: 'build-process',
              title: 'Build Process',
              level: 2,
              offset: 72
            }
          ]
        },
        {
          id: 'static-file-serving',
          title: 'Static File Serving',
          level: 1,
          offset: 72
        },
        {
          id: 'environment-modes',
          title: 'Environment Modes',
          level: 1,
          offset: 72,
          children: [
            {
              id: 'development-mode',
              title: 'Development Mode',
              level: 2,
              offset: 72
            },
            {
              id: 'production-mode',
              title: 'Production Mode',
              level: 2,
              offset: 72
            }
          ]
        },
        {
          id: 'command-line-interface',
          title: 'Command Line Interface',
          level: 1,
          offset: 72,
          children: [
            {
              id: 'development-server',
              title: 'Development Server',
              level: 2,
              offset: 72
            },
            {
              id: 'build-for-production',
              title: 'Build for Production',
              level: 2,
              offset: 72
            },
            {
              id: 'start-production-server',
              title: 'Start Production Server',
              level: 2,
              offset: 72
            }
          ]
        },
        {
          id: 'integration-with-buntal-core',
          title: 'Integration with @buntal/core',
          level: 1,
          offset: 72
        },
        {
          id: 'error-handling',
          title: 'Error Handling',
          level: 1,
          offset: 72,
          children: [
            {
              id: 'development-error-pages',
              title: 'Development Error Pages',
              level: 2,
              offset: 72
            },
            {
              id: 'production-error-handling',
              title: 'Production Error Handling',
              level: 2,
              offset: 72
            },
            {
              id: 'custom-error-pages',
              title: 'Custom Error Pages',
              level: 2,
              offset: 72
            }
          ]
        },
        {
          id: 'performance-optimizations',
          title: 'Performance Optimizations',
          level: 1,
          offset: 72,
          children: [
            {
              id: 'code-splitting',
              title: 'Code Splitting',
              level: 2,
              offset: 72
            },
            {
              id: 'caching-strategies',
              title: 'Caching Strategies',
              level: 2,
              offset: 72
            },
            {
              id: 'bundle-optimization',
              title: 'Bundle Optimization',
              level: 2,
              offset: 72
            }
          ]
        },
        {
          id: 'best-practices',
          title: 'Best Practices',
          level: 1,
          offset: 72,
          children: [
            {
              id: '1-project-structure',
              title: '1. Project Structure',
              level: 2,
              offset: 72
            },
            {
              id: '2-data-fetching',
              title: '2. Data Fetching',
              level: 2,
              offset: 72
            },
            {
              id: '3-configuration-management',
              title: '3. Configuration Management',
              level: 2,
              offset: 72
            },
            {
              id: '4-error-boundaries',
              title: '4. Error Boundaries',
              level: 2,
              offset: 72
            },
            {
              id: '5-type-safety',
              title: '5. Type Safety',
              level: 2,
              offset: 72
            }
          ]
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
