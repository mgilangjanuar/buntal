import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'buntal API Reference - Buntal JS'
  } satisfies MetaProps
}

export default function BuntalAPIReferencePage() {
  return (
    <MarkdownContent
      title="buntal"
      content={`# buntal

The main package for building full-stack web applications with Buntal JS, providing React components, hooks, and utilities for client-side functionality.

## Configuration

### BuntalConfig

Configuration type for Buntal applications.

\`\`\`typescript
type BuntalConfig = {
  env?: 'development' | 'production'
  appDir?: string
  outDir?: string
  staticDir?: string
  config?: Partial<Bun.BuildConfig>
}
\`\`\`

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`env\` | \`'development' \\| 'production'\` | \`'development'\` | Environment mode |
| \`appDir\` | \`string\` | \`'./app'\` | Application directory path |
| \`outDir\` | \`string\` | \`'.buntal'\` | Build output directory |
| \`staticDir\` | \`string\` | \`'./public'\` | Static files directory |
| \`config\` | \`Partial<Bun.BuildConfig>\` | \`{}\` | Bun build configuration |

**Example:**

\`\`\`typescript
// buntal.config.ts
import type { BuntalConfig } from 'buntal'

const config = {
  env: 'development',
  appDir: './src',
  outDir: './dist',
  staticDir: './assets',
  config: {
    splitting: false,
    minify: true
  }
} satisfies BuntalConfig

export default config
\`\`\`

## Components

### App

Root application component that sets up routing and layouts.

\`\`\`typescript
function App(props: {
  routes: ServerRouterType[]
  rootLayout: {
    element: (data: any) => ReactNode
    ssr?: boolean
    data?: unknown
  }
  notFound?: ReactNode
}): JSX.Element
\`\`\`

| Property | Type | Description |
|----------|------|-------------|
| \`routes\` | \`ServerRouterType[]\` | Array of application routes |
| \`rootLayout\` | \`object\` | Root layout configuration |
| \`notFound\` | \`ReactNode\` | Custom 404 component |

### Meta

Component for managing HTML document head metadata.

\`\`\`typescript
function Meta(props: MetaProps): JSX.Element
\`\`\`

#### MetaProps

| Property | Type | Description |
|----------|------|-------------|
| \`title\` | \`string\` | Page title |
| \`viewport\` | \`string\` | Viewport meta tag content |
| \`description\` | \`string\` | Page description |
| \`keywords\` | \`string\` | SEO keywords |
| \`author\` | \`string\` | Page author |
| \`og\` | \`object\` | Open Graph metadata |
| \`twitter\` | \`object\` | Twitter Card metadata |

**Example:**

\`\`\`tsx
// app/layout.tsx
import { Meta, type MetaProps } from 'buntal'

export default function RootLayout({ children, data }: {
  children: React.ReactNode
  data?: { _meta: MetaProps }
}) {
  return (
    <html>
      <head>
        <Meta
          title="My App"
          description="A modern web application"
          og={{
            title: "My App",
            description: "A modern web application",
            image: "/banner.png"
          }}
          twitter={{
            card: "summary_large_image"
          }}
          {...(data?._meta || {})}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
\`\`\`

### Link

Client-side navigation component with enhanced functionality.

\`\`\`typescript
function Link(props: {
  href: string
  ref?: React.Ref<HTMLAnchorElement>
  children: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>): JSX.Element
\`\`\`

| Property | Type | Description |
|----------|------|-------------|
| \`href\` | \`string\` | Navigation target URL |
| \`children\` | \`ReactNode\` | Link content |

**Special href values:**
- \`-1\` - Navigate back in history
- \`#selector\` - Scroll to element with smooth behavior
- \`#selector:offset\` - Scroll to element with custom top offset

**Example:**

\`\`\`tsx
import { Link } from 'buntal'

function Navigation() {
  return (
    <nav>
      <Link href="/home">Home</Link>
      <Link href="/about">About</Link>
      <Link href="-1">Back</Link>
      <Link href="#top">Scroll to Top</Link>
      <Link href="#section:100">Scroll to Section (100px offset)</Link>
    </nav>
  )
}
\`\`\`

### Script

Component for dynamically loading and managing external scripts.

\`\`\`typescript
function Script(props: {
  src: string
  ref?: React.Ref<HTMLScriptElement>
} & React.ScriptHTMLAttributes<HTMLScriptElement>): JSX.Element
\`\`\`

| Property | Type | Description |
|----------|------|-------------|
| \`src\` | \`string\` | Script source URL |

**Features:**
- Automatic cleanup on component unmount
- Prevents duplicate script loading
- Supports all standard script attributes

**Example:**

\`\`\`tsx
import { Script } from 'buntal'

function Analytics() {
  return (
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
      async
    />
  )
}
\`\`\`

### Svg

Component for rendering inline SVG content.

\`\`\`typescript
function Svg(props: {
  src: string
  className?: string
}): JSX.Element
\`\`\`

| Property | Type | Description |
|----------|------|-------------|
| \`src\` | \`string\` | SVG source content |
| \`className\` | \`string\` | CSS classes to apply |

**Example:**

\`\`\`tsx
import { Svg } from 'buntal'
import Logo from './logo.svg' with { type: 'text' }

function Header() {
  return (
    <div>
      <Svg src={Logo} className="w-8 h-8" />
    </div>
  )
}
\`\`\`

### Notfound

Default 404 error page component.

\`\`\`typescript
function Notfound(): JSX.Element
\`\`\`

## Hooks

### useRouter

Hook for accessing routing functionality and navigation state.

\`\`\`typescript
function useRouter(): RouterType
\`\`\`

#### RouterType

| Property | Type | Description |
|----------|------|-------------|
| \`pathname\` | \`string\` | Current URL pathname |
| \`search\` | \`string\` | Current URL search string |
| \`href\` | \`string\` | Complete current URL |
| \`protocol\` | \`string\` | URL protocol (http/https) |
| \`hostname\` | \`string\` | Current hostname |
| \`hash\` | \`string\` | URL hash fragment |
| \`push(url)\` | \`function\` | Navigate to URL (adds to history) |
| \`replace(url)\` | \`function\` | Replace current URL (no history) |
| \`back()\` | \`function\` | Navigate back in history |
| \`reload()\` | \`function\` | Reload current page |

**Example:**

\`\`\`tsx
import { useRouter } from 'buntal'

function NavigationComponent() {
  const router = useRouter()

  const handleNavigation = () => {
    router.push('/dashboard')
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div>
      <p>Current path: {router.pathname}</p>
      <p>Search params: {router.search}</p>
      <button onClick={handleNavigation}>Go to Dashboard</button>
      <button onClick={handleBack}>Go Back</button>
    </div>
  )
}
\`\`\`

## File-Based Routing

Buntal uses Next.js-style file-based routing with these conventions:

### Route Files

| File Path | Route | Description |
|-----------|-------|-------------|
| \`app/index.tsx\` | \`/\` | Home page |
| \`app/about.tsx\` | \`/about\` | About page |
| \`app/users/index.tsx\` | \`/users\` | Users index |
| \`app/users/[id].tsx\` | \`/users/:id\` | Dynamic user page |
| \`app/users/[...slug].tsx\` | \`/users/*\` | Catch-all route |
| \`app/layout.tsx\` | - | Layout component |

### Page Components

Page components can export a default component and optional metadata:

\`\`\`tsx
// app/about.tsx
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'About Us',
    description: 'Learn more about our company'
  } satisfies MetaProps
}

export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Welcome to our website!</p>
    </div>
  )
}
\`\`\`

### Dynamic Routes

Access route parameters through the component props:

\`\`\`tsx
// app/users/[id].tsx
export default function UserPage({
  params,
  query
}: {
  params: { id: string }
  query: Record<string, string>
}) {
  return (
    <div>
      <h1>User ID: {params.id}</h1>
      <p>Search: {query.search}</p>
    </div>
  )
}
\`\`\`

### Layouts

Layout components wrap page content and can be nested:

\`\`\`tsx
// app/layout.tsx (Root layout)
import { Meta, type MetaProps } from 'buntal'

export default function RootLayout({
  children,
  data
}: {
  children: React.ReactNode
  data?: { _meta: MetaProps }
}) {
  return (
    <html>
      <head>
        <Meta title="My App" {...(data?._meta || {})} />
      </head>
      <body>
        <nav>{/* Navigation */}</nav>
        <main>{children}</main>
        <footer>{/* Footer */}</footer>
      </body>
    </html>
  )
}
\`\`\`

## Types

### ServerRouterType

Type definition for server-side route configuration.

\`\`\`typescript
type ServerRouterType = {
  regex: string
  ssr?: boolean
  data?: {
    _meta?: MetaProps
    [key: string]: any
  }
  element: (data: any) => ReactNode
  layouts: {
    element: (data: any) => ReactNode
    ssr?: boolean
    data?: {
      _meta?: MetaProps
      [key: string]: any
    }
  }[]
}
\`\`\`

## Best Practices

### 1. Project Structure

\`\`\`
my-app/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── index.tsx        # Home page
│   ├── about.tsx        # About page
│   └── users/
│       ├── index.tsx    # Users list
│       └── [id].tsx     # User detail
├── public/
│   ├── favicon.svg
│   └── globals.css
├── buntal.config.ts     # Configuration
└── package.json
\`\`\`

### 2. SEO Optimization

Use the \`Meta\` component in layouts and pages for proper SEO:

\`\`\`tsx
export const $ = {
  _meta: {
    title: 'Product Name | My Store',
    description: 'Product description for SEO',
    og: {
      image: '/product-image.jpg'
    }
  }
}
\`\`\`

### 3. Type Safety

Leverage TypeScript for route parameters:

\`\`\`tsx
type UserParams = { id: string }

export default function UserPage({
  params
}: {
  params: UserParams
}) {
  // params.id is properly typed
}
\`\`\`

### 4. Navigation

Use the \`Link\` component for client-side navigation:

\`\`\`tsx
import { Link } from 'buntal'

// ✅ Good - client-side navigation
<Link href="/about">About</Link>

// ❌ Avoid - full page refresh
<a href="/about">About</a>
\`\`\`

### 5. Asset Imports

Import SVGs and other assets with proper typing:

\`\`\`tsx
import Logo from './logo.svg' with { type: 'text' }
import { Svg } from 'buntal'

<Svg src={Logo} className="w-8 h-8" />
\`\`\``}
      tableOfContents={[
        {
          id: 'configuration',
          title: 'Configuration',
          level: 1,
          offset: 72,
          children: [
            { id: 'buntalconfig', title: 'BuntalConfig', level: 2, offset: 72 }
          ]
        },
        {
          id: 'components',
          title: 'Components',
          level: 1,
          offset: 72,
          children: [
            { id: 'app', title: 'App', level: 2, offset: 72 },
            { id: 'meta', title: 'Meta', level: 2, offset: 72 },
            { id: 'link', title: 'Link', level: 2, offset: 72 },
            { id: 'script', title: 'Script', level: 2, offset: 72 },
            { id: 'svg', title: 'Svg', level: 2, offset: 72 },
            { id: 'notfound', title: 'Notfound', level: 2, offset: 72 }
          ]
        },
        {
          id: 'hooks',
          title: 'Hooks',
          level: 1,
          offset: 72,
          children: [
            { id: 'userouter', title: 'useRouter', level: 2, offset: 72 }
          ]
        },
        {
          id: 'file-based-routing',
          title: 'File-Based Routing',
          level: 1,
          offset: 72,
          children: [
            { id: 'route-files', title: 'Route Files', level: 2, offset: 72 },
            {
              id: 'page-components',
              title: 'Page Components',
              level: 2,
              offset: 72
            },
            {
              id: 'dynamic-routes',
              title: 'Dynamic Routes',
              level: 2,
              offset: 72
            },
            { id: 'layouts', title: 'Layouts', level: 2, offset: 72 }
          ]
        },
        {
          id: 'types',
          title: 'Types',
          level: 1,
          offset: 72,
          children: [
            {
              id: 'serverroutertype',
              title: 'ServerRouterType',
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
              id: '-project-structure',
              title: '1. Project Structure',
              level: 2,
              offset: 72
            },
            {
              id: '-seo-optimization',
              title: '2. SEO Optimization',
              level: 2,
              offset: 72
            },
            {
              id: '-type-safety',
              title: '3. Type Safety',
              level: 2,
              offset: 72
            },
            { id: '-navigation', title: '4. Navigation', level: 2, offset: 72 },
            {
              id: '-asset-imports',
              title: '5. Asset Imports',
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
