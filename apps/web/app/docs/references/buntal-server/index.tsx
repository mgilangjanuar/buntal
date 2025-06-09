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

Server-side package for Buntal JS applications.

## Functions

### runServer(config?)

Starts a Buntal server with SSR, bundling, and file-based routing.

\`\`\`typescript
function runServer(config?: BuntalConfig): Promise<void>
\`\`\`

## Types

### BuntalConfig

\`\`\`typescript
interface BuntalConfig {
  env?: 'development' | 'production'
  appDir?: string // default: './app'
  outDir?: string // default: '.buntal'
  staticDir?: string // default: './public'
  config?: Partial<Bun.BuildConfig>
}
\`\`\`

### ServerContext

\`\`\`typescript
interface ServerContext {
  params: Record<string, string>
  query: Record<string, string>
  request: Request
}
\`\`\`

### PageProps

\`\`\`typescript
interface PageProps<T = any> {
  params: Record<string, string>
  data?: T & { _meta?: MetaProps }
}
\`\`\`

### LayoutProps

\`\`\`typescript
interface LayoutProps<T = any> {
  children: React.ReactNode
  data?: T & { _meta?: MetaProps }
}
\`\`\`

## File Conventions

### Routes
- \`app/index.tsx\` → \`/\`
- \`app/about/index.tsx\` → \`/about\`
- \`app/users/[id]/index.tsx\` → \`/users/:id\`
- \`app/[[...slug]]/index.tsx\` → \`/*\`

### API Routes
- \`app/api/hello/index.ts\` → \`/api/hello\`
- \`app/api/users/[id]/index.ts\` → \`/api/users/:id\`

### Special Files
- \`app/layout.tsx\` - Root layout
- \`app/404.tsx\` - Custom 404 page

## Server-Side Data Fetching

\`\`\`typescript
export const $ = async (context: ServerContext) => {
  return {
    _meta: { title: 'Page Title' },
    data: await fetchData()
  }
}
\`\`\`

## API Route Methods

\`\`\`typescript
import type { Req, Res } from '@buntal/core'

export async function GET(req: Req, res: Res) { }
export async function POST(req: Req, res: Res) { }
export async function PUT(req: Req, res: Res) { }
export async function DELETE(req: Req, res: Res) { }
export async function PATCH(req: Req, res: Res) { }
\`\`\`

## CLI Commands

- \`buntal dev\` - Development server
- \`buntal build\` - Production build
- \`buntal start\` - Production server`}
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
          id: 'types',
          title: 'Types',
          level: 1,
          offset: 72,
          children: [
            {
              id: 'buntalconfig',
              title: 'BuntalConfig',
              level: 2,
              offset: 72
            },
            {
              id: 'servercontext',
              title: 'ServerContext',
              level: 2,
              offset: 72
            },
            {
              id: 'pageprops',
              title: 'PageProps',
              level: 2,
              offset: 72
            },
            {
              id: 'layoutprops',
              title: 'LayoutProps',
              level: 2,
              offset: 72
            }
          ]
        },
        {
          id: 'file-conventions',
          title: 'File Conventions',
          level: 1,
          offset: 72,
          children: [
            {
              id: 'routes',
              title: 'Routes',
              level: 2,
              offset: 72
            },
            {
              id: 'api-routes',
              title: 'API Routes',
              level: 2,
              offset: 72
            },
            {
              id: 'special-files',
              title: 'Special Files',
              level: 2,
              offset: 72
            }
          ]
        },
        {
          id: 'server-side-data-fetching',
          title: 'Server-Side Data Fetching',
          level: 1,
          offset: 72
        },
        {
          id: 'api-route-methods',
          title: 'API Route Methods',
          level: 1,
          offset: 72
        },
        {
          id: 'cli-commands',
          title: 'CLI Commands',
          level: 1,
          offset: 72
        }
      ]}
    />
  )
}
