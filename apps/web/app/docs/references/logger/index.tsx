import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'logger - Buntal JS'
  } satisfies MetaProps
}

export default function LoggerPage() {
  return (
    <ReferencePage
      title="logger"
      description="HTTP request logging middleware for Buntal applications that logs request details."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/%40buntal/core/middlewares/logger.ts"
      typeDefinition={`function logger(): AtomicHandler`}
      examples={[
        `import { Http } from '@buntal/core'
import { logger } from '@buntal/core/middlewares'

const app = new Http({ port: 3000 })

// Add request logging
app.use(logger())

app.get('/hello', (req, res) => {
  return res.text('Hello, World!')
})

// Console output:
// GET /hello - 200 OK (12ms)`,
        `// Combine with other middleware
import { cors, auth, logger } from '@buntal/core/middlewares'

const app = new Http({ port: 3000 })

// Order matters: logger should be first to capture all requests
app.use(logger())
app.use(cors())
app.use(auth({ secret: 'secret' }))

app.get('/api/data', (req, res) => {
  return res.json({ data: 'example' })
})`
      ]}
    />
  )
}
