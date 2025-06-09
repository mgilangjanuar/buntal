import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Res - Buntal JS'
  } satisfies MetaProps
}

export default function ResPage() {
  return (
    <ReferencePage
      title="Res"
      description="Response class that provides methods for sending HTTP responses with various formats and status codes."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/%40buntal/core/http/response.ts"
      typeDefinition={`class Res {
  status(status: number): Res
  headers(headers: Record<string, string>): Res
  redirect(url: string, status?: number): Response
  send(data?: BodyInit): Response
  json(data: unknown): Response
  html(data: string | ReadableStream<Uint8Array>): Response
  text(data: string): Response
  cookie(name: string, value?: string | null, options?: CookieOptions): Res
}`}
      methods={[
        {
          name: 'status',
          description: 'Sets the HTTP status code for the response.',
          parameters: [
            {
              name: 'status',
              type: 'number',
              required: true,
              description: 'HTTP status code (e.g., 200, 404, 500)'
            }
          ],
          returns: 'Res'
        },
        {
          name: 'headers',
          description: 'Sets multiple response headers.',
          parameters: [
            {
              name: 'headers',
              type: 'Record<string, string>',
              required: true,
              description: 'Object with header key-value pairs'
            }
          ],
          returns: 'Res'
        },
        {
          name: 'redirect',
          description: 'Sends a redirect response to the specified URL.',
          parameters: [
            {
              name: 'url',
              type: 'string',
              required: true,
              description: 'URL to redirect to'
            },
            {
              name: 'status',
              type: 'number',
              required: false,
              default: '302',
              description: 'HTTP redirect status code'
            }
          ],
          returns: 'Response'
        },
        {
          name: 'send',
          description: 'Sends a response with the specified data.',
          parameters: [
            {
              name: 'data',
              type: 'BodyInit',
              required: false,
              description: 'Response body data'
            }
          ],
          returns: 'Response'
        },
        {
          name: 'json',
          description: 'Sends a JSON response.',
          parameters: [
            {
              name: 'data',
              type: 'unknown',
              required: true,
              description: 'Data to serialize as JSON'
            }
          ],
          returns: 'Response'
        },
        {
          name: 'html',
          description: 'Sends an HTML response.',
          parameters: [
            {
              name: 'data',
              type: 'string | ReadableStream<Uint8Array>',
              required: true,
              description: 'HTML content to send'
            }
          ],
          returns: 'Response'
        },
        {
          name: 'text',
          description: 'Sends a plain text response.',
          parameters: [
            {
              name: 'data',
              type: 'string',
              required: true,
              description: 'Text content to send'
            }
          ],
          returns: 'Response'
        },
        {
          name: 'cookie',
          description: 'Sets or deletes a cookie.',
          parameters: [
            {
              name: 'name',
              type: 'string',
              required: true,
              description: 'Cookie name'
            },
            {
              name: 'value',
              type: 'string | null',
              required: false,
              description: 'Cookie value (null to delete)'
            },
            {
              name: 'options',
              type: 'CookieOptions',
              required: false,
              description: 'Cookie configuration options'
            }
          ],
          returns: 'Res'
        }
      ]}
    />
  )
}
