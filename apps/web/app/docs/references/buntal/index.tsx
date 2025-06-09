import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'buntal - Buntal JS'
  } satisfies MetaProps
}

export default function BuntalPackagePage() {
  return (
    <MarkdownContent
      title="buntal"
      content={`# buntal

Main Buntal package with configuration, types, and component props.

## Overview

The \`buntal\` package is the main framework package that provides configuration options, TypeScript types, and component prop interfaces for building full-stack web applications.

## Modules

### [Configuration](/docs/references/buntal/configuration)

Configuration options for Buntal applications.

- **[BuntalConfig](/docs/references/buntal/configuration/buntal-config)** - Main configuration interface

### [Component Props](/docs/references/buntal/component-props)

TypeScript interfaces for component properties.

- **[MetaProps](/docs/references/buntal/component-props/meta-props)** - Page metadata
- **[LinkProps](/docs/references/buntal/component-props/link-props)** - Link component
- **[ScriptProps](/docs/references/buntal/component-props/script-props)** - Script component
- **[SvgProps](/docs/references/buntal/component-props/svg-props)** - SVG component
- **[AppProps](/docs/references/buntal/component-props/app-props)** - App component
- **[PageProps](/docs/references/buntal/component-props/page-props)** - Page component
- **[LayoutProps](/docs/references/buntal/component-props/layout-props)** - Layout component`}
      tableOfContents={[
        {
          id: 'buntal',
          title: 'buntal',
          level: 1,
          offset: 72
        },
        {
          id: 'overview',
          title: 'Overview',
          level: 2,
          offset: 72
        },
        {
          id: 'modules',
          title: 'Modules',
          level: 2,
          offset: 72
        },
        {
          id: 'configuration',
          title: 'Configuration',
          level: 3,
          offset: 72
        },
        {
          id: 'component-props',
          title: 'Component Props',
          level: 3,
          offset: 72
        }
      ]}
    />
  )
}
