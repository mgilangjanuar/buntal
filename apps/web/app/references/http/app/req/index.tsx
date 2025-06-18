import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Req - Buntal JS'
  } satisfies MetaProps
}

export default function ReqPage() {
  return (
    <ReferencePage
      headerTitle="@buntal/http/app"
      title="Req"
      description="Request class that extends the standard Request interface with additional properties for Buntal applications."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/%40buntal/core/http/request.ts"
      typeDefinition={`class Req<P = Record<string, string>, T = unknown> extends Request {
  public params: P
  public query?: Record<string, string>
  public context?: T
  get cookies(): Record<string, string>
}`}
      properties={[
        {
          name: 'params',
          type: 'P (default: Record<string, string>)',
          required: true,
          description:
            'Route parameters extracted from URL patterns like /users/:id'
        },
        {
          name: 'query',
          type: 'Record<string, string>',
          required: false,
          description: 'Query string parameters parsed from the URL'
        },
        {
          name: 'context',
          type: 'T (default: unknown)',
          required: false,
          description: 'Custom context data that can be attached by middleware'
        },
        {
          name: 'cookies',
          type: 'Record<string, string>',
          required: true,
          description:
            'Getter that returns all cookies from the request as an object'
        }
      ]}
      lastModified="2025-06-10"
    />
  )
}
