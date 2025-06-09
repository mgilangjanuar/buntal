import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Link - Buntal JS'
  } satisfies MetaProps
}

export default function LinkComponentPage() {
  return (
    <ReferencePage
      title="Link"
      description="Client-side navigation component that handles internal routing, hash navigation, and history management without full page reloads."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/buntal/components/link.tsx"
      typeDefinition={`function Link({
  href,
  ref,
  children,
  ...props
}: {
  href: string
  ref?: React.Ref<HTMLAnchorElement>
} & React.AnchorHTMLAttributes<HTMLAnchorElement>): JSX.Element`}
      parameters={[
        {
          name: 'href',
          type: 'string',
          required: true,
          description:
            'The URL to navigate to. Supports internal routes, hash navigation (#element), and back navigation (-1)'
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLAnchorElement>',
          required: false,
          description: 'Reference to the underlying anchor element'
        },
        {
          name: 'children',
          type: 'ReactNode',
          required: false,
          description: 'Content to display inside the link'
        },
        {
          name: '...props',
          type: 'React.AnchorHTMLAttributes<HTMLAnchorElement>',
          required: false,
          description: 'Additional HTML anchor element attributes'
        }
      ]}
      properties={[
        {
          name: 'href',
          type: 'string',
          required: true,
          description:
            'The destination URL or path for the link. Supports internal routes, hash navigation (#element), and back navigation (-1)'
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLAnchorElement>',
          required: false,
          description: 'Reference to the underlying anchor element'
        },
        {
          name: 'children',
          type: 'ReactNode',
          required: false,
          description: 'Content to display inside the link'
        },
        {
          name: '...props',
          type: 'React.AnchorHTMLAttributes<HTMLAnchorElement>',
          required: false,
          description:
            'Additional HTML anchor element attributes (className, style, onClick, etc.)'
        }
      ]}
    />
  )
}
