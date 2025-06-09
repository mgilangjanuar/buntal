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
      examples={[
        {
          title: 'Basic SEO Meta Tags',
          code: `import { Meta } from '@buntal/core';

export default function HomePage() {
  return (
    <>
      <Meta
        title="My Awesome Website"
        description="A description of my awesome website for search engines"
        keywords="buntal, web framework, typescript"
        author="Your Name"
      />
      <h1>Welcome to my website</h1>
    </>
  );
}`
        },
        {
          title: 'Open Graph and Social Media',
          code: `import { Meta } from '@buntal/core';

export default function BlogPost() {
  return (
    <>
      <Meta
        title="How to Build Fast Web Apps"
        description="Learn how to build lightning-fast web applications"
        property="og:title"
        content="How to Build Fast Web Apps"
      />
      <Meta
        property="og:description"
        content="Learn how to build lightning-fast web applications"
      />
      <Meta
        property="og:image"
        content="https://example.com/blog-image.jpg"
      />
      <Meta
        property="og:type"
        content="article"
      />
    </>
  );
}`
        },
        {
          title: 'Responsive Viewport',
          code: `import { Meta } from '@buntal/core';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Meta
        charset="utf-8"
        viewport="width=device-width, initial-scale=1.0"
      />
      {children}
    </>
  );
}`
        }
      ]}
    />
  )
}
