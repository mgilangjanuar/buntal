import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Meta - Buntal JS'
  } satisfies MetaProps
}

export default function MetaComponentPage() {
  return (
    <ReferencePage
      headerTitle="buntal - components"
      title="Meta"
      description="HTML meta tags component for managing page metadata, SEO tags, Open Graph properties, and Twitter Card data."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/buntal/components/meta.tsx"
      typeDefinition={`function Meta(props: MetaProps): JSX.Element

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
}>`}
      parameters={[
        {
          name: 'title',
          type: 'string',
          required: false,
          description: 'Page title. Defaults to "Buntal App" if not provided'
        },
        {
          name: 'viewport',
          type: 'string',
          required: false,
          description:
            'Viewport meta tag content. Defaults to "width=device-width, initial-scale=1"'
        },
        {
          name: 'description',
          type: 'string',
          required: false,
          description: 'Page description for SEO and social sharing'
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
          description: 'Page author information'
        },
        {
          name: 'og',
          type: 'object',
          required: false,
          description: 'Open Graph properties for social media sharing'
        },
        {
          name: 'twitter',
          type: 'object',
          required: false,
          description: 'Twitter Card properties for Twitter sharing'
        }
      ]}
      properties={[
        {
          name: 'og.title',
          type: 'string',
          required: false,
          description:
            'Open Graph title. Falls back to main title if not provided'
        },
        {
          name: 'og.description',
          type: 'string',
          required: false,
          description:
            'Open Graph description. Falls back to main description if not provided'
        },
        {
          name: 'og.image',
          type: 'string',
          required: false,
          description: 'Open Graph image URL for social media previews'
        },
        {
          name: 'twitter.title',
          type: 'string',
          required: false,
          description:
            'Twitter Card title. Falls back to main title if not provided'
        },
        {
          name: 'twitter.description',
          type: 'string',
          required: false,
          description:
            'Twitter Card description. Falls back to main description if not provided'
        },
        {
          name: 'twitter.image',
          type: 'string',
          required: false,
          description: 'Twitter Card image URL'
        },
        {
          name: 'twitter.card',
          type: 'string',
          required: false,
          description:
            'Twitter Card type (e.g., "summary", "summary_large_image")'
        }
      ]}
    />
  )
}
