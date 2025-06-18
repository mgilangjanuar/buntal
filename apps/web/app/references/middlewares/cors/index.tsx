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
      headerTitle="@buntal/middlewares"
      title="cors"
      description="CORS (Cross-Origin Resource Sharing) middleware for handling cross-origin requests in Buntal applications."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/%40buntal/middlewares/cors/index.ts"
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
      lastModified="2025-06-10"
    />
  )
}
