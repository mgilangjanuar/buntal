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

### [Configuration](/references/buntal/configuration)

Configuration options for Buntal applications.

- **[BuntalConfig](/references/buntal/configuration/buntal-config)** - Main configuration interface

### [Components](/references/buntal/components)

React components and hooks for building user interfaces.

- **[App](/references/buntal/components/app)** - Root application component
- **[useRouter](/references/buntal/components/use-router)** - Router hook for navigation
- **[Link](/references/buntal/components/link)** - Client-side navigation component
- **[Meta](/references/buntal/components/meta)** - HTML meta tags component
- **[Script](/references/buntal/components/script)** - External script loader component
- **[Svg](/references/buntal/components/svg)** - SVG component for rendering inline SVGs

`}
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
          id: 'components',
          title: 'Components',
          level: 3,
          offset: 72
        }
      ]}
      lastModified="2025-06-10"
    />
  )
}
