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
      examples={[
        {
          title: 'External Script Loading',
          code: `import { Script } from '@buntal/core';

export default function AnalyticsPage() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Google Analytics loaded');
        }}
      />

      <h1>Page with Analytics</h1>
    </>
  );
}`
        },
        {
          title: 'Inline Script',
          code: `import { Script } from '@buntal/core';

export default function ConfigPage() {
  return (
    <>
      <Script strategy="beforeInteractive">
        {
          \`window.APP_CONFIG = {
            apiUrl: 'https://api.example.com',
            version: '1.0.0'
          };\`
        }
      </Script>

      <div>App content here</div>
    </>
  );
}`
        },
        {
          title: 'Third-party Widget',
          code: `import { Script } from '@buntal/core';

export default function WidgetPage() {
  const handleWidgetLoad = () => {
    // Initialize widget after it loads
    if (window.ThirdPartyWidget) {
      window.ThirdPartyWidget.init({
        containerId: 'widget-container'
      });
    }
  };

  return (
    <>
      <Script
        src="https://widget.example.com/widget.js"
        strategy="lazyOnload"
        onLoad={handleWidgetLoad}
        onError={() => console.error('Widget failed to load')}
      />

      <div id="widget-container"></div>
    </>
  );
}`
        }
      ]}
    />
  )
}
