import ReferencePage from '@/components/docs/reference-page'

export default function ScriptPropsReference() {
  return (
    <ReferencePage
      title="ScriptProps"
      description="Properties interface for the Script component, used to load and manage JavaScript files in Buntal applications."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/@buntal/core/components/script.tsx"
      typeDefinition={`interface ScriptProps extends React.ScriptHTMLAttributes<HTMLScriptElement> {
  src?: string;
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload';
  onLoad?: () => void;
  onError?: () => void;
  onReady?: () => void;
  children?: string;
}`}
      properties={[
        {
          name: 'src',
          type: 'string',
          required: false,
          description: 'The URL of the external script to load'
        },
        {
          name: 'strategy',
          type: "'beforeInteractive' | 'afterInteractive' | 'lazyOnload'",
          required: false,
          description:
            "Loading strategy for the script (default: 'afterInteractive')"
        },
        {
          name: 'onLoad',
          type: '() => void',
          required: false,
          description:
            'Callback function executed when the script loads successfully'
        },
        {
          name: 'onError',
          type: '() => void',
          required: false,
          description:
            'Callback function executed when the script fails to load'
        },
        {
          name: 'onReady',
          type: '() => void',
          required: false,
          description:
            'Callback function executed when the script is ready to use'
        },
        {
          name: 'children',
          type: 'string',
          required: false,
          description: 'Inline JavaScript code to execute'
        }
      ]}
    />
  )
}
