import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'ScriptProps - Buntal JS'
  } satisfies MetaProps
}

export default function ScriptPropsPage() {
  return (
    <MarkdownContent
      title="ScriptProps"
      content={`# ScriptProps

Type definition for Script component properties.

## Type Definition

ScriptProps are passed to the Script component but not exported as a separate type.

\`\`\`typescript
export { Script } from 'buntal'
\`\`\`

\`\`\`typescript
type ScriptProps = {
  src?: string
  children?: string
  async?: boolean
  defer?: boolean
  type?: string
}
\`\`\`

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| \`src\` | \`string\` | ❌ | External script URL to load |
| \`children\` | \`string\` | ❌ | Inline JavaScript code |
| \`async\` | \`boolean\` | ❌ | Load script asynchronously |
| \`defer\` | \`boolean\` | ❌ | Defer script execution until DOM is ready |
| \`type\` | \`string\` | ❌ | Script MIME type (default: 'text/javascript') |

## Usage

\`\`\`typescript
import { Script } from 'buntal'

// External script
function GoogleAnalytics() {
  return (
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
      async
    />
  )
}

// Inline script
function TrackingScript() {
  return (
    <Script>
      {\`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
      \`}
    </Script>
  )
}

// Deferred script
function DeferredScript() {
  return (
    <Script
      src="/analytics.js"
      defer
    />
  )
}

// Custom script type
function JSONData() {
  return (
    <Script type="application/json" id="config">
      {\`{
        "apiUrl": "https://api.example.com",
        "version": "1.0.0"
      }\`}
    </Script>
  )
}

// In layout component
export default function Layout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <Script src="/vendor.js" defer />
        <Script>
          {\`console.log('App initialized')\`}
        </Script>
      </head>
      <body>
        {children}
        <Script src="/analytics.js" async />
      </body>
    </html>
  )
}
\`\`\`

## Best Practices

- Use \`async\` for scripts that don't depend on DOM or other scripts
- Use \`defer\` for scripts that need DOM to be ready but don't need to block rendering
- Place performance-critical scripts in \`<head>\` with \`defer\`
- Place analytics and tracking scripts at the end of \`<body>\` with \`async\`
- Always validate and sanitize inline script content to prevent XSS

## Related Types

- [Script Component](/docs/references/buntal#script) - Component that uses ScriptProps
- [MetaProps](/docs/references/meta-props) - For managing other head elements`}
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
        },
        {
          id: 'best-practices',
          title: 'Best Practices',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
