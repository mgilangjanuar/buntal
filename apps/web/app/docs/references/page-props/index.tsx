import ReferencePage from '@/components/docs/reference-page'

export default function PagePropsReference() {
  return (
    <ReferencePage
      title="PageProps"
      description="Base properties interface for page components in Buntal applications, providing access to route parameters, query strings, and request context."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/@buntal/core/types/page.ts"
      typeDefinition={`interface PageProps<
  TParams = Record<string, string>,
  TQuery = Record<string, string | string[]>
> {
  params: TParams;
  searchParams: TQuery;
  headers: Record<string, string>;
  cookies: Record<string, string>;
  url: URL;
  method: string;
}`}
      properties={[
        {
          name: 'params',
          type: 'TParams',
          required: true,
          description:
            "Dynamic route parameters extracted from the URL path (e.g., { id: '123' } for /users/123)"
        },
        {
          name: 'searchParams',
          type: 'TQuery',
          required: true,
          description:
            "Query string parameters from the URL (e.g., { filter: 'active', page: '2' })"
        },
        {
          name: 'headers',
          type: 'Record<string, string>',
          required: true,
          description: 'HTTP request headers'
        },
        {
          name: 'cookies',
          type: 'Record<string, string>',
          required: true,
          description: 'HTTP cookies from the request'
        },
        {
          name: 'url',
          type: 'URL',
          required: true,
          description: 'Complete URL object of the current request'
        },
        {
          name: 'method',
          type: 'string',
          required: true,
          description: 'HTTP method of the request (GET, POST, etc.)'
        }
      ]}
    />
  )
}
