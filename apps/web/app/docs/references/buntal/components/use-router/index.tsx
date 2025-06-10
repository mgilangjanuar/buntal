import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'useRouter - Buntal JS'
  } satisfies MetaProps
}

export default function UseRouterPage() {
  return (
    <ReferencePage
      headerTitle="buntal - components"
      title="useRouter"
      description="React hook that provides access to router state and navigation methods in Buntal applications."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/buntal/components/hooks/use-router.tsx"
      typeDefinition={`function useRouter(): {
  pathname: string
  search: string
  href: string
  protocol: string
  hostname: string
  hash: string
  push: (url: string) => void
  replace: (url: string) => void
  back: () => void
  reload: () => void
}`}
      properties={[
        {
          name: 'pathname',
          type: 'string',
          required: true,
          description: 'Current pathname of the URL'
        },
        {
          name: 'search',
          type: 'string',
          required: true,
          description: 'Query string portion of the URL'
        },
        {
          name: 'href',
          type: 'string',
          required: true,
          description: 'Complete URL including protocol, host, and path'
        },
        {
          name: 'protocol',
          type: 'string',
          required: true,
          description: 'Protocol portion of the URL (http:, https:, etc.)'
        },
        {
          name: 'hostname',
          type: 'string',
          required: true,
          description: 'Hostname portion of the URL'
        },
        {
          name: 'hash',
          type: 'string',
          required: true,
          description: 'Hash fragment portion of the URL'
        }
      ]}
      methods={[
        {
          name: 'push',
          description:
            'Navigate to a new URL and add it to the browser history',
          parameters: [
            {
              name: 'url',
              type: 'string',
              required: true,
              description: 'URL to navigate to'
            }
          ],
          returns: 'void'
        },
        {
          name: 'replace',
          description:
            'Navigate to a new URL and replace the current entry in browser history',
          parameters: [
            {
              name: 'url',
              type: 'string',
              required: true,
              description: 'URL to navigate to'
            }
          ],
          returns: 'void'
        },
        {
          name: 'back',
          description: 'Navigate back to the previous page in browser history',
          parameters: [],
          returns: 'void'
        },
        {
          name: 'reload',
          description: 'Reload the current page',
          parameters: [],
          returns: 'void'
        }
      ]}
    />
  )
}
