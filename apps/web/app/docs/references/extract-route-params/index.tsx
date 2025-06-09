import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'ExtractRouteParams - Buntal JS'
  } satisfies MetaProps
}

export default function ExtractRouteParamsPage() {
  return (
    <MarkdownContent
      title="ExtractRouteParams"
      content={`# ExtractRouteParams

Utility type that automatically extracts route parameters from path strings.

## Type Definition

\`\`\`typescript
// ExtractRouteParams is used internally by Http class methods
import { Http } from '@buntal/core'
\`\`\`

\`\`\`typescript
type ExtractRouteParams<Path extends string> =
  Path extends \`\${string}/:\${infer Param}/\${infer Rest}\`
    ? { [K in Param | keyof ExtractRouteParams<\`/\${Rest}\`>]: string }
    : Path extends \`\${string}/:\${infer Param}\`
      ? { [K in Param]: string }
      : {}
\`\`\`

## Type Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| \`Path\` | \`string\` | Route path string with parameter placeholders |

## Return Type

Returns an object type where keys are parameter names and values are strings.

## Usage Examples

\`\`\`typescript
// Single parameter
type UserRoute = ExtractRouteParams<'/users/:id'>
// Result: { id: string }

// Multiple parameters
type PostRoute = ExtractRouteParams<'/users/:userId/posts/:postId'>
// Result: { userId: string, postId: string }

// No parameters
type HomeRoute = ExtractRouteParams<'/'>
// Result: {}

// Complex nested parameters
type NestedRoute = ExtractRouteParams<'/api/v1/users/:id/posts/:postId/comments/:commentId'>
// Result: { id: string, postId: string, commentId: string }
\`\`\`

## Automatic Type Inference

The Http class methods automatically use ExtractRouteParams for type safety:

\`\`\`typescript
import { Http } from '@buntal/core'

const app = new Http({ port: 3000 })

// TypeScript automatically infers parameter types
app.get('/users/:id', (req, res) => {
  // req.params is automatically typed as { id: string }
  const { id } = req.params  // ✅ TypeScript knows id is string
  return res.json({ userId: id })
})

app.get('/users/:userId/posts/:postId', (req, res) => {
  // req.params is automatically typed as { userId: string, postId: string }
  const { userId, postId } = req.params  // ✅ Fully typed
  return res.json({ userId, postId })
})

// No parameters - empty object
app.get('/health', (req, res) => {
  // req.params is automatically typed as {}
  return res.json({ status: 'ok' })
})
\`\`\`

## With AtomicHandler

You can explicitly type handlers using ExtractRouteParams:

\`\`\`typescript
import { type AtomicHandler } from '@buntal/core'

// Explicitly typed handler
type UserParams = ExtractRouteParams<'/users/:id/settings/:setting'>

const userSettingsHandler: AtomicHandler<UserParams> = (req, res) => {
  const { id, setting } = req.params  // ✅ Typed as { id: string, setting: string }

  return res.json({
    userId: id,
    settingName: setting
  })
}

app.get('/users/:id/settings/:setting', userSettingsHandler)
\`\`\`

## Custom Route Patterns

ExtractRouteParams works with various route patterns:

\`\`\`typescript
// File-based routing patterns
type FileRoute = ExtractRouteParams<'/files/:folder/:filename'>
// Result: { folder: string, filename: string }

// API versioning
type APIRoute = ExtractRouteParams<'/api/v:version/users/:id'>
// Result: { version: string, id: string }

// Optional segments (handled as regular parameters)
type OptionalRoute = ExtractRouteParams<'/products/:category/:subcategory'>
// Result: { category: string, subcategory: string }
\`\`\`

## Type Safety Benefits

\`\`\`typescript
// ✅ Correct usage
app.get('/users/:id', (req, res) => {
  const userId = req.params.id  // Works
  return res.json({ userId })
})

// ❌ TypeScript error - 'name' doesn't exist in params
app.get('/users/:id', (req, res) => {
  const userName = req.params.name  // Error: Property 'name' does not exist
  return res.json({ userName })
})

// ✅ Correct parameter access
app.get('/posts/:postId/comments/:commentId', (req, res) => {
  const { postId, commentId } = req.params  // Both typed as string
  return res.json({ postId, commentId })
})
\`\`\`

## Advanced Usage

Combine with custom types for enhanced type safety:

\`\`\`typescript
// Define route parameter constraints
interface ProductParams {
  category: 'electronics' | 'clothing' | 'books'
  id: string
}

// Use intersection type for enhanced typing
type TypedProductHandler = AtomicHandler<
  ExtractRouteParams<'/products/:category/:id'> & ProductParams
>

const productHandler: TypedProductHandler = (req, res) => {
  // req.params.category is typed as the union type
  const { category, id } = req.params

  return res.json({ category, id })
}
\`\`\`

## Related Types

- [AtomicHandler](/docs/references/atomic-handler) - Uses extracted parameters as type P
- [Http](/docs/references/http-core#http-class) - HTTP server methods use this for route typing
- [Req](/docs/references/http-core#req-class) - Request class that contains the typed params`}
      tableOfContents={[
        {
          id: 'type-definition',
          title: 'Type Definition',
          level: 1,
          offset: 72
        },
        {
          id: 'type-parameters',
          title: 'Type Parameters',
          level: 1,
          offset: 72
        },
        {
          id: 'return-type',
          title: 'Return Type',
          level: 1,
          offset: 72
        },
        {
          id: 'usage-examples',
          title: 'Usage Examples',
          level: 1,
          offset: 72
        },
        {
          id: 'automatic-type-inference',
          title: 'Automatic Type Inference',
          level: 1,
          offset: 72
        },
        {
          id: 'with-atomichandler',
          title: 'With AtomicHandler',
          level: 1,
          offset: 72
        },
        {
          id: 'custom-route-patterns',
          title: 'Custom Route Patterns',
          level: 1,
          offset: 72
        },
        {
          id: 'type-safety-benefits',
          title: 'Type Safety Benefits',
          level: 1,
          offset: 72
        },
        {
          id: 'advanced-usage',
          title: 'Advanced Usage',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
