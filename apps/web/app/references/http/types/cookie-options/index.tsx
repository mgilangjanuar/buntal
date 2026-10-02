import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'CookieOptions - Buntal JS'
  } satisfies MetaProps
}

export default function CookieOptionsPage() {
  return (
    <ReferencePage
      headerTitle="@buntal/http/cookie"
      title="CookieOptions"
      description="Configuration options for HTTP cookies in Buntal applications."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/%40buntal/http/app/cookie.ts"
      typeDefinition={`type CookieOptions = {
  maxAge?: number
  expires?: Date
  path?: string
  domain?: string
  secure?: boolean
  httpOnly?: boolean
  sameSite?: 'Strict' | 'Lax' | 'None'
}`}
      properties={[
        {
          name: 'maxAge',
          type: 'number',
          required: false,
          description:
            'Cookie lifetime in seconds. 0 expires the cookie immediately'
        },
        {
          name: 'expires',
          type: 'Date',
          required: false,
          description: 'Expiration date for the cookie'
        },
        {
          name: 'path',
          type: 'string',
          required: false,
          description:
            'URL path where the cookie is valid. Not set unless given (delete defaults to /). Must not contain ; or spaces'
        },
        {
          name: 'domain',
          type: 'string',
          required: false,
          description:
            'Domain where the cookie is valid. Must not contain ; or spaces'
        },
        {
          name: 'secure',
          type: 'boolean',
          required: false,
          default: 'false',
          description:
            'Whether cookie should only be sent over HTTPS. Always added when sameSite is None'
        },
        {
          name: 'httpOnly',
          type: 'boolean',
          required: false,
          default: 'false',
          description: 'Whether cookie should be inaccessible to JavaScript'
        },
        {
          name: 'sameSite',
          type: "'Strict' | 'Lax' | 'None'",
          required: false,
          description:
            'Controls cross-site request behavior. Not set unless given (browsers then treat it as Lax). Lax is recommended for sessions'
        }
      ]}
      lastModified="2026-10-02"
    />
  )
}
