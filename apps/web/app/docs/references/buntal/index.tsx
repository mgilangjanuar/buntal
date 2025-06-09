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

### Configuration

Configuration options for Buntal applications.

- **BuntalConfig** - Main configuration interface

### Types

TypeScript utility types for type-safe development.

- **ExtractRouteParams** - Route parameter extraction

### Component Props

TypeScript interfaces for component properties.

- **MetaProps** - Page metadata
- **LinkProps** - Link component
- **ScriptProps** - Script component
- **SvgProps** - SVG component
- **AppProps** - App component
- **PageProps** - Page component
- **LayoutProps** - Layout component`}
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
          id: 'types',
          title: 'Types',
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
