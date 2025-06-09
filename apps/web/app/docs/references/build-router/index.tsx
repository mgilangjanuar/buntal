import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'buildRouter - Buntal JS'
  } satisfies MetaProps
}

export default function BuildRouterPage() {
  return (
    <ReferencePage
      title="buildRouter"
      description="Function that creates a file system router for Buntal applications using Bun's built-in router."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/%40buntal/core/http/router.ts"
      typeDefinition={`function buildRouter(dir: string): Bun.FileSystemRouter`}
      parameters={[
        {
          name: 'dir',
          type: 'string',
          required: true,
          description: 'Directory path containing route files'
        }
      ]}
      examples={[
        `import { buildRouter } from '@buntal/core'

const router = buildRouter('./app')

// Router can match requests to files
const match = router.match(new Request('http://localhost/users/123'))
// Returns match object with file path and parameters`,
        `// Directory structure:
// app/
//   index.ts         -> /
//   users/
//     index.ts       -> /users
//     [id].ts        -> /users/:id
//   api/
//     posts/
//       [slug].ts    -> /api/posts/:slug

const router = buildRouter('./app')
console.log(router.routes) // Shows all available routes`
      ]}
    />
  )
}
