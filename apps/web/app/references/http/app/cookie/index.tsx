import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Cookie - Buntal JS'
  } satisfies MetaProps
}

export default function CookiePage() {
  return (
    <ReferencePage
      headerTitle="@buntal/http/app"
      title="Cookie"
      description="Utility object for managing HTTP cookies in Buntal applications."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/%40buntal/http/app/cookie.ts"
      typeDefinition={`const cookie = {
  get: (req: Req, name: string) => string | null
  getAll: (req: Req) => Record<string, string>
  set: (res: Res, name: string, value: string, options?: CookieOptions) => string
  delete: (res: Res, name: string) => string
}`}
      methods={[
        {
          name: 'get',
          description: 'Retrieves a specific cookie value from the request.',
          parameters: [
            {
              name: 'req',
              type: 'Req',
              required: true,
              description: 'Request object'
            },
            {
              name: 'name',
              type: 'string',
              required: true,
              description: 'Cookie name'
            }
          ],
          returns: 'string | null'
        },
        {
          name: 'getAll',
          description: 'Retrieves all cookies from the request as an object.',
          parameters: [
            {
              name: 'req',
              type: 'Req',
              required: true,
              description: 'Request object'
            }
          ],
          returns: 'Record<string, string>'
        },
        {
          name: 'set',
          description: 'Sets a cookie in the response.',
          parameters: [
            {
              name: 'res',
              type: 'Res',
              required: true,
              description: 'Response object'
            },
            {
              name: 'name',
              type: 'string',
              required: true,
              description: 'Cookie name'
            },
            {
              name: 'value',
              type: 'string',
              required: true,
              description: 'Cookie value'
            },
            {
              name: 'options',
              type: 'CookieOptions',
              required: false,
              description: 'Cookie configuration options'
            }
          ],
          returns: 'string'
        },
        {
          name: 'delete',
          description: 'Deletes a cookie by setting its expiry to the past.',
          parameters: [
            {
              name: 'res',
              type: 'Res',
              required: true,
              description: 'Response object'
            },
            {
              name: 'name',
              type: 'string',
              required: true,
              description: 'Cookie name to delete'
            }
          ],
          returns: 'string'
        }
      ]}
      lastModified="2025-06-10"
    />
  )
}
