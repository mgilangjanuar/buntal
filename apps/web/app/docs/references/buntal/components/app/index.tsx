import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'App - Buntal JS'
  } satisfies MetaProps
}

export default function AppComponentPage() {
  return (
    <ReferencePage
      title="App"
      description="Root application component that manages routing, layouts, and provides the foundation for Buntal applications."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/buntal/components/app.tsx"
      typeDefinition={`function App({
  rootLayout,
  routes,
  notFound
}: {
  routes: ServerRouterType[]
  rootLayout: {
    element: (data: any) => ReactNode
    ssr?: boolean
    data?: unknown
  }
  notFound?: ReactNode
}): JSX.Element`}
      parameters={[
        {
          name: 'rootLayout',
          type: 'object',
          required: true,
          description:
            'Root layout configuration containing the layout component and its properties'
        },
        {
          name: 'routes',
          type: 'ServerRouterType[]',
          required: true,
          description: 'Array of route configurations for the application'
        },
        {
          name: 'notFound',
          type: 'ReactNode',
          required: false,
          description: 'Component to render when no route matches (404 page)'
        }
      ]}
      properties={[
        {
          name: 'rootLayout.element',
          type: '(data: any) => ReactNode',
          required: true,
          description: 'Function that returns the root layout component'
        },
        {
          name: 'rootLayout.ssr',
          type: 'boolean',
          required: false,
          description: 'Whether the root layout supports server-side rendering'
        },
        {
          name: 'rootLayout.data',
          type: 'unknown',
          required: false,
          description: 'Data to pass to the root layout component'
        }
      ]}
    />
  )
}
