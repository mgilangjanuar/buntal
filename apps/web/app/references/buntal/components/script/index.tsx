import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Script - Buntal JS'
  } satisfies MetaProps
}

export default function ScriptComponentPage() {
  return (
    <ReferencePage
      headerTitle="buntal - components"
      title="Script"
      description="External script loader component that dynamically loads JavaScript files and manages script lifecycle with automatic cleanup."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/buntal/components/script.tsx"
      typeDefinition={`function Script({
  src,
  ref,
  ...props
}: {
  src: string
  ref?: React.Ref<HTMLScriptElement>
} & React.ScriptHTMLAttributes<HTMLScriptElement>): JSX.Element`}
      parameters={[
        {
          name: 'src',
          type: 'string',
          required: true,
          description: 'URL of the JavaScript file to load'
        },
        {
          name: 'ref',
          type: 'React.Ref<HTMLScriptElement>',
          required: false,
          description: 'Reference to the script element'
        },
        {
          name: '...props',
          type: 'React.ScriptHTMLAttributes<HTMLScriptElement>',
          required: false,
          description:
            'Additional HTML script element attributes (async, defer, etc.)'
        }
      ]}
      lastModified="2025-06-10"
    />
  )
}
