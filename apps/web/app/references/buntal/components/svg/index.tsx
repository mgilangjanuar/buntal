import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Svg - Buntal JS'
  } satisfies MetaProps
}

export default function SvgComponentPage() {
  return (
    <ReferencePage
      headerTitle="buntal/components"
      title="Svg"
      description="SVG component for rendering inline SVG content from string sources with optional styling classes. Content is sanitized by default, but prefer trusted sources."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/buntal/components/svg.tsx"
      typeDefinition={`function Svg({
  src,
  className,
  unsafe
}: {
  src: string
  className?: string
  unsafe?: boolean
}): JSX.Element`}
      parameters={[
        {
          name: 'src',
          type: 'string',
          required: true,
          description: 'SVG content as a string to be rendered inline'
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'CSS class name to apply to the container div'
        },
        {
          name: 'unsafe',
          type: 'boolean',
          required: false,
          description:
            'Skip sanitization. By default scripts, event handlers, foreignObject and javascript: URLs are stripped. Only disable for trusted SVGs.'
        }
      ]}
      lastModified="2026-10-02"
    />
  )
}
