import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Types - @buntal/core - Buntal JS'
  } satisfies MetaProps
}

export default function CoreTypesPage() {
  return (
    <MarkdownContent
      title="@buntal/core"
      content={`# Types

TypeScript utility types for type-safe development in Buntal applications.

## Overview

The Types module provides essential TypeScript utility types that help ensure type safety when working with Buntal applications, particularly for route parameter extraction and type inference.

## Components

### Route Types

- **[ExtractRouteParams](/docs/references/core/types/extract-route-params)** - Utility type for extracting route parameters from URL patterns


`}
      lastModified="2025-06-10"
    />
  )
}
