import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Component Props - buntal - Buntal JS'
  } satisfies MetaProps
}

export default function BuntalComponentPropsPage() {
  return (
    <MarkdownContent
      title="Component Props"
      content={`# Component Props

TypeScript interfaces for component properties in Buntal applications.

## Overview

The Component Props module provides TypeScript interfaces that define the expected properties for various built-in components and application-level constructs in Buntal. These types ensure type safety when working with metadata, links, scripts, and other UI elements.

## Components

### Metadata & Document

- **[MetaProps](/docs/references/buntal/component-props/meta-props)** - Properties for HTML meta tags and document metadata
- **[LinkProps](/docs/references/buntal/component-props/link-props)** - Properties for HTML link elements
- **[ScriptProps](/docs/references/buntal/component-props/script-props)** - Properties for HTML script elements

### UI Components

- **[SvgProps](/docs/references/buntal/component-props/svg-props)** - Properties for SVG elements

### Application Structure

- **[AppProps](/docs/references/buntal/component-props/app-props)** - Properties for the root application component
- **[PageProps](/docs/references/buntal/component-props/page-props)** - Properties for page components
- **[LayoutProps](/docs/references/buntal/component-props/layout-props)** - Properties for layout components

## Quick Start

### Using MetaProps

\`\`\`typescript
import type { MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'My Page Title',
    description: 'Page description for SEO'
  } satisfies MetaProps
}
\`\`\`

### Using PageProps

\`\`\`typescript
import type { PageProps } from 'buntal'

export default function MyPage({ params }: PageProps<{ id: string }>) {
  return <div>User ID: {params.id}</div>
}
\`\`\`

These type definitions help ensure that your components receive the correct props and that your application structure follows Buntal's conventions.
`}
    />
  )
}
