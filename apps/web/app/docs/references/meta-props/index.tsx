import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'MetaProps - Buntal JS'
  } satisfies MetaProps
}

export default function MetaPropsPage() {
  return (
    <MarkdownContent
      title="MetaProps"
      content={`# MetaProps

Type definition for HTML document head metadata properties.

## Type Definition

\`\`\`typescript
export type { MetaProps } from 'buntal'
\`\`\`

\`\`\`typescript
type MetaProps = Partial<{
  title: string
  viewport: string
  description: string
  keywords: string
  author: string
  og: {
    title?: string
    description?: string
    image?: string
  }
  twitter: {
    title?: string
    description?: string
    image?: string
    card?: string
  }
}>
\`\`\`

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| \`title\` | \`string\` | ❌ | Page title displayed in browser tab |
| \`viewport\` | \`string\` | ❌ | Viewport meta tag content |
| \`description\` | \`string\` | ❌ | Page description for SEO |
| \`keywords\` | \`string\` | ❌ | SEO keywords for the page |
| \`author\` | \`string\` | ❌ | Page author information |
| \`og\` | \`object\` | ❌ | Open Graph metadata for social media |
| \`og.title\` | \`string\` | ❌ | Open Graph title |
| \`og.description\` | \`string\` | ❌ | Open Graph description |
| \`og.image\` | \`string\` | ❌ | Open Graph image URL |
| \`twitter\` | \`object\` | ❌ | Twitter Card metadata |
| \`twitter.title\` | \`string\` | ❌ | Twitter Card title |
| \`twitter.description\` | \`string\` | ❌ | Twitter Card description |
| \`twitter.image\` | \`string\` | ❌ | Twitter Card image URL |
| \`twitter.card\` | \`string\` | ❌ | Twitter Card type (e.g., 'summary_large_image') |

## Usage

\`\`\`typescript
import { Meta, type MetaProps } from 'buntal'

// In a page component
export const $ = {
  _meta: {
    title: 'About Us - My App',
    description: 'Learn more about our company and mission',
    keywords: 'about, company, mission, team',
    author: 'My Company',
    og: {
      title: 'About Us',
      description: 'Learn more about our company and mission',
      image: '/about-banner.jpg'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About Us',
      description: 'Learn more about our company and mission',
      image: '/about-banner.jpg'
    }
  } satisfies MetaProps
}

// In a layout component
export default function Layout({ children, data }: {
  children: React.ReactNode
  data?: { _meta?: MetaProps }
}) {
  return (
    <html>
      <head>
        <Meta
          title="My App"
          description="A modern web application"
          {...(data?._meta || {})}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
\`\`\`

## Related Types

- [Meta Component](/docs/references/buntal#meta) - Component that uses MetaProps
- [PageProps](/docs/references/page-props) - Page component props include MetaProps in data
- [LayoutProps](/docs/references/layout-props) - Layout component props include MetaProps in data`}
      tableOfContents={[
        {
          id: 'type-definition',
          title: 'Type Definition',
          level: 1,
          offset: 72
        },
        {
          id: 'properties',
          title: 'Properties',
          level: 1,
          offset: 72
        },
        {
          id: 'usage',
          title: 'Usage',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
