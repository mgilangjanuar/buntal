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
      title="Types"
      content={`# Types

TypeScript utility types for type-safe development in Buntal applications.

## Overview

The Types module provides essential TypeScript utility types that help ensure type safety when working with Buntal applications, particularly for route parameter extraction and type inference.

## Components

### Route Types

- **[ExtractRouteParams](/docs/references/core/types/extract-route-params)** - Utility type for extracting route parameters from URL patterns

## Usage

### Route Parameter Extraction

\`\`\`typescript
import { type ExtractRouteParams } from '@buntal/core'

// Extract parameters from a route pattern
type UserRoute = '/users/:id/posts/:postId'
type UserParams = ExtractRouteParams<UserRoute>
// Result: { id: string; postId: string }

// Use in route handlers
app.get('/users/:id/posts/:postId', (req: Req<UserParams>, res) => {
  const { id, postId } = req.params // Fully typed!
  // ...
})
\`\`\`

This type utility ensures that your route parameters are properly typed throughout your application, catching potential errors at compile time.
`}
    />
  )
}
