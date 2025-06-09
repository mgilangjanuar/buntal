import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'auth - Buntal JS'
  } satisfies MetaProps
}

export default function AuthPage() {
  return (
    <ReferencePage
      title="auth"
      description="JWT-based authentication middleware for Buntal applications that validates tokens from cookies or headers."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/%40buntal/core/middlewares/auth.ts"
      typeDefinition={`function auth<T = unknown>(options?: AuthOptions<T>): AtomicHandler<Record<string, string>, T>

type AuthOptions<T = unknown> = {
  secret: string
  strategy?: 'cookie' | 'header' | 'both'
  cookie?: { key: string }
  header?: { key: string }
  onVerified?: (req: Req<Record<string, string>, T>, res: Res, decoded: T) => void | Response | Promise<void | Response>
}`}
      parameters={[
        {
          name: 'options',
          type: 'AuthOptions<T>',
          required: false,
          description: 'Authentication configuration options'
        }
      ]}
      properties={[
        {
          name: 'secret',
          type: 'string',
          required: true,
          default: 'process.env.JWT_SECRET',
          description: 'Secret key for JWT verification'
        },
        {
          name: 'strategy',
          type: "'cookie' | 'header' | 'both'",
          required: false,
          default: 'header',
          description: 'Token extraction strategy'
        },
        {
          name: 'cookie',
          type: '{ key: string }',
          required: false,
          default: '{ key: "access_token" }',
          description: 'Cookie configuration for token extraction'
        },
        {
          name: 'header',
          type: '{ key: string }',
          required: false,
          default: '{ key: "Authorization" }',
          description: 'Header configuration for token extraction'
        },
        {
          name: 'onVerified',
          type: 'function',
          required: false,
          description:
            'Callback function called after successful token verification'
        }
      ]}
    />
  )
}
