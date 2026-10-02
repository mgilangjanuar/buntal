import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'secureHeaders - Buntal JS'
  } satisfies MetaProps
}

export default function SecureHeadersPage() {
  return (
    <ReferencePage
      headerTitle="@buntal/http/middlewares"
      title="secureHeaders"
      description="Middleware that adds common security headers to every response. X-Content-Type-Options: nosniff and Cross-Origin-Opener-Policy: same-origin are always set. Pass false to any option to turn that header off."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/%40buntal/http/middlewares/secure-headers.ts"
      typeDefinition={`function secureHeaders(options?: SecureHeadersOptions): AtomicHandler

type SecureHeadersOptions = {
  contentSecurityPolicy?: string | false
  frameOptions?: 'DENY' | 'SAMEORIGIN' | false
  hsts?: string | false
  referrerPolicy?: string | false
  permissionsPolicy?: string | false
}`}
      parameters={[
        {
          name: 'options',
          type: 'SecureHeadersOptions',
          required: false,
          description: 'Header values to override'
        }
      ]}
      properties={[
        {
          name: 'contentSecurityPolicy',
          type: 'string | false',
          required: false,
          default: 'false',
          description:
            'Content-Security-Policy value. Off by default because every app needs its own policy'
        },
        {
          name: 'frameOptions',
          type: "'DENY' | 'SAMEORIGIN' | false",
          required: false,
          default: 'SAMEORIGIN',
          description: 'X-Frame-Options value, to prevent clickjacking'
        },
        {
          name: 'hsts',
          type: 'string | false',
          required: false,
          default: 'max-age=15552000; includeSubDomains',
          description:
            'Strict-Transport-Security value. Only sent over https or when x-forwarded-proto is https'
        },
        {
          name: 'referrerPolicy',
          type: 'string | false',
          required: false,
          default: 'strict-origin-when-cross-origin',
          description: 'Referrer-Policy value'
        },
        {
          name: 'permissionsPolicy',
          type: 'string | false',
          required: false,
          default: 'camera=(), microphone=(), geolocation=()',
          description: 'Permissions-Policy value'
        }
      ]}
      lastModified="2026-10-02"
    />
  )
}
