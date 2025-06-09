import ReferencePage from '@/components/docs/reference-page'

export default function MetaPropsReference() {
  return (
    <ReferencePage
      title="MetaProps"
      description="Properties interface for the Meta component, used to define HTML meta tags for SEO and page metadata."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/@buntal/core/components/meta.tsx"
      typeDefinition={`interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  viewport?: string;
  charset?: string;
  'http-equiv'?: string;
  content?: string;
  name?: string;
  property?: string;
  [key: string]: string | undefined;
}`}
      properties={[
        {
          name: 'title',
          type: 'string',
          required: false,
          description:
            'Sets the page title (appears in browser tab and search results)'
        },
        {
          name: 'description',
          type: 'string',
          required: false,
          description: 'Page description for SEO and social media previews'
        },
        {
          name: 'keywords',
          type: 'string',
          required: false,
          description: 'Comma-separated keywords for SEO'
        },
        {
          name: 'author',
          type: 'string',
          required: false,
          description: 'Author of the page content'
        },
        {
          name: 'viewport',
          type: 'string',
          required: false,
          description: 'Viewport settings for responsive design'
        },
        {
          name: 'charset',
          type: 'string',
          required: false,
          description: 'Character encoding for the page'
        },
        {
          name: 'http-equiv',
          type: 'string',
          required: false,
          description: 'HTTP equivalent header directive'
        },
        {
          name: 'content',
          type: 'string',
          required: false,
          description: 'Content value for meta tags'
        },
        {
          name: 'name',
          type: 'string',
          required: false,
          description: 'Name attribute for meta tags'
        },
        {
          name: 'property',
          type: 'string',
          required: false,
          description: 'Property attribute for Open Graph and other meta tags'
        }
      ]}
    />
  )
}
