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
      headerTitle="@buntal/http/middlewares"
      title="auth"
      description="JWT-based authentication middleware for Buntal applications that validates tokens from cookies or headers. Tokens are verified with HS256 only, and the decoded payload is set on req.context. Missing or invalid tokens get 401; OPTIONS preflight requests pass through. Throws at startup if the secret is empty. Use jwt(secret).sign(payload, { expiresIn }) to issue tokens."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/%40buntal/http/middlewares/auth/index.ts"
      typeDefinition={`function auth<T = unknown>(options?: AuthOptions<T>): AtomicHandler<Record<string, string>, T>

type AuthOptions<T = unknown> = {
  secret: string
  strategy?: Strategy | Strategy[]
  cookie?: { key: string }
  header?: { key: string }
  onVerified?: (req: Req<Record<string, string>, T>, res: Res, decoded: T) => void | Response | Promise<void | Response>
}

type Strategy = 'cookie' | 'header' | 'both'`}
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
          description:
            'Secret key for JWT verification. Must be non-empty, e.g. process.env.JWT_SECRET'
        },
        {
          name: 'strategy',
          type: 'Strategy | Strategy[]',
          required: false,
          default: 'header',
          description:
            'Where to read the token from. An array tries each strategy in order'
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
          description:
            'Header configuration for token extraction. A Bearer prefix is optional and case-insensitive'
        },
        {
          name: 'onVerified',
          type: 'function',
          required: false,
          description:
            'Called after successful verification with the decoded payload. Return a Response to reject the request'
        }
      ]}
      lastModified="2026-10-02"
    />
  )
}
