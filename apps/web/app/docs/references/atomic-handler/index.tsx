import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'AtomicHandler - Buntal JS'
  } satisfies MetaProps
}

export default function AtomicHandlerPage() {
  return (
    <ReferencePage
      title="AtomicHandler"
      description="Type definition for request handler functions in Buntal applications."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/%40buntal/core/http/handler.ts"
      typeDefinition={`type AtomicHandler<P = Record<string, string>, T = unknown> = (
  req: Req<P, T>,
  res: Res
) => Response | Promise<Response> | void | Promise<void>`}
      parameters={[
        {
          name: 'P',
          type: 'Record<string, string>',
          required: false,
          default: 'Record<string, string>',
          description: 'Type for route parameters'
        },
        {
          name: 'T',
          type: 'unknown',
          required: false,
          default: 'unknown',
          description: 'Type for request context data'
        }
      ]}
      examples={[
        `// Basic handler
const handler: AtomicHandler = (req, res) => {
  return res.json({ message: 'Hello' })
}`,
        `// Handler with typed parameters
const getUserHandler: AtomicHandler<{ id: string }> = (req, res) => {
  const userId = req.params.id // Typed as string
  return res.json({ userId })
}`,
        `// Handler with context type
interface UserContext {
  user: { id: string; name: string }
}

const protectedHandler: AtomicHandler<{}, UserContext> = (req, res) => {
  const user = req.context?.user // Typed as UserContext['user']
  return res.json({ user })
}`,
        `// Async handler
const asyncHandler: AtomicHandler = async (req, res) => {
  const data = await fetchData()
  return res.json(data)
}`,
        `// Middleware handler (no return)
const loggingMiddleware: AtomicHandler = (req, res) => {
  console.log(\`\${req.method} \${req.url}\`)
  // No return statement - passes to next handler
}`
      ]}
    />
  )
}
