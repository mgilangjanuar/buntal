import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'AtomicHandler - Buntal JS'
  } satisfies MetaProps
}

export default function AtomicHandlerPage() {
  return (
    <ReferencePage
      title="AtomicHandler"
      description="Type definition for request handler functions in Buntal applications."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/%40buntal/core/http/handler.ts"
      typeDefinition={`type AtomicHandler<P = Record<string, string>, T = unknown> = (
  req: Req<P, T>,
  res: Res
) => Response | Promise<Response> | void | Promise<void>`}
      parameters={[
        {
          name: 'P',
          type: 'Record<string, string>',
          required: false,
          default: 'Record<string, string>',
          description: 'Type for route parameters'
        },
        {
          name: 'T',
          type: 'unknown',
          required: false,
          default: 'unknown',
          description: 'Type for request context data'
        }
      ]}
    />
  )
}
