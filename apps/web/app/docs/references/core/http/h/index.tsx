import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'h - Buntal JS'
  } satisfies MetaProps
}

export default function HPage() {
  return (
    <ReferencePage
      headerTitle="@buntal/core - Http"
      title="h"
      description="Higher-order function for composing and chaining AtomicHandler functions in Buntal applications."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/%40buntal/core/http/handler.ts"
      typeDefinition={`function h<P = Record<string, string>, T = unknown>(
  ...handlers: AtomicHandler<P, T>[]
): AtomicHandler<P, T, Response | Promise<Response>>`}
      parameters={[
        {
          name: 'handlers',
          type: 'AtomicHandler<P, T>[]',
          required: true,
          description:
            'One or more handler functions to compose and execute in sequence'
        }
      ]}
      methods={[
        {
          name: 'h',
          description:
            'Composes multiple AtomicHandler functions into a single handler that executes them sequentially. If any handler returns a Response, execution stops and that Response is returned. If no handler returns a Response, a 204 No Content response is returned.',
          parameters: [
            {
              name: '...handlers',
              type: 'AtomicHandler<P, T>[]',
              required: true,
              description:
                'Variable number of handler functions to execute in order'
            }
          ],
          returns: 'AtomicHandler<P, T, Response | Promise<Response>>'
        }
      ]}
    />
  )
}
