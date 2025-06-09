import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'cors - Buntal JS'
  } satisfies MetaProps
}

export default function CorsPage() {
  return (
    <ReferencePage
      title="cors"
      description="CORS (Cross-Origin Resource Sharing) middleware for handling cross-origin requests in Buntal applications."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/%40buntal/core/middlewares/cors.ts"
      typeDefinition={`function cors(options?: CorsOptions): AtomicHandler

type CorsOptions = {
  origin?: string | string[]
  methods?: string | string[]
  allowedHeaders?: string | string[]
  exposedHeaders?: string | string[]
  maxAge?: number
  credentials?: boolean
}`}
      parameters={[
        {
          name: 'options',
          type: 'CorsOptions',
          required: false,
          description: 'CORS configuration options'
        }
      ]}
      properties={[
        {
          name: 'origin',
          type: 'string | string[]',
          required: false,
          default: '*',
          description: 'Allowed origins for cross-origin requests'
        },
        {
          name: 'methods',
          type: 'string | string[]',
          required: false,
          default: 'GET, HEAD, PUT, PATCH, POST, DELETE',
          description: 'Allowed HTTP methods'
        },
        {
          name: 'allowedHeaders',
          type: 'string | string[]',
          required: false,
          default: 'Content-Type, Authorization, X-Requested-With',
          description: 'Allowed request headers'
        },
        {
          name: 'exposedHeaders',
          type: 'string | string[]',
          required: false,
          default: '',
          description: 'Headers exposed to the client'
        },
        {
          name: 'maxAge',
          type: 'number',
          required: false,
          default: '600',
          description: 'Preflight request cache duration in seconds'
        },
        {
          name: 'credentials',
          type: 'boolean',
          required: false,
          default: 'true',
          description: 'Whether to include credentials in CORS requests'
        }
      ]}
      examples={[
        `import { Http } from '@buntal/core'
import { cors } from '@buntal/core/middlewares'

const app = new Http({ port: 3000 })

// Basic CORS (allows all origins)
app.use(cors())`,
        `// Restrict to specific origins
app.use(cors({
  origin: ['https://myapp.com', 'https://admin.myapp.com']
}))`,
        `// Development configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))`,
        `// Production API configuration
app.use(cors({
  origin: ['https://app.example.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
  maxAge: 3600, // 1 hour
  credentials: true
}))`,
        `// Route-specific CORS
app.use('/api/*', cors({
  origin: ['https://trusted-app.com'],
  credentials: true
}))

app.use('/public/*', cors({
  origin: '*',
  credentials: false
}))`
      ]}
    />
  )
}
