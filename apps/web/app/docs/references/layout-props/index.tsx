import ReferencePage from '@/components/docs/reference-page'

export default function LayoutPropsReference() {
  return (
    <ReferencePage
      title="LayoutProps"
      description="Properties interface for layout components in Buntal applications, providing structure and shared functionality across multiple pages."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/@buntal/core/types/layout.ts"
      typeDefinition={`interface LayoutProps {
  children: React.ReactNode;
  pathname: string;
  searchParams: Record<string, string | string[]>;
  params: Record<string, string>;
  headers: Record<string, string>;
  cookies: Record<string, string>;
  metadata?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
}`}
      properties={[
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Page content to be rendered within the layout'
        },
        {
          name: 'pathname',
          type: 'string',
          required: true,
          description: 'Current pathname of the route'
        },
        {
          name: 'searchParams',
          type: 'Record<string, string | string[]>',
          required: true,
          description: 'Query string parameters from the URL'
        },
        {
          name: 'params',
          type: 'Record<string, string>',
          required: true,
          description: 'Dynamic route parameters extracted from the URL path'
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
          name: 'metadata',
          type: 'object',
          required: false,
          description:
            'Optional metadata for the page (title, description, keywords)'
        }
      ]}
    />
  )
}
