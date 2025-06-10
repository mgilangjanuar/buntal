import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Components - buntal - Buntal JS'
  } satisfies MetaProps
}

export default function BuntalComponentsPage() {
  return (
    <MarkdownContent
      title="buntal"
      content={`# Components

React components and hooks for building user interfaces in Buntal applications.

## Overview

The Components module provides essential React components and hooks that form the building blocks of Buntal applications. These include the core App component, navigation utilities, and UI components for common HTML elements.

## Components

### Core Components

- **[App](/docs/references/buntal/components/app)** - Root application component that manages routing and layouts
- **[useRouter](/docs/references/buntal/components/use-router)** - Hook for accessing router state and navigation methods

### UI Components

- **[Link](/docs/references/buntal/components/link)** - Client-side navigation component for SPA routing
- **[Meta](/docs/references/buntal/components/meta)** - Component for managing HTML document metadata
- **[Script](/docs/references/buntal/components/script)** - Component for loading external JavaScript files
- **[Svg](/docs/references/buntal/components/svg)** - Component for rendering inline SVG content


`}
      lastModified="2025-06-10"
    />
  )
}
