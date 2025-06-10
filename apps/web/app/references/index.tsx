import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'API Reference - Buntal JS'
  } satisfies MetaProps
}

export default function ReferencePage() {
  return (
    <MarkdownContent
      title="Overview"
      content={`# Overview

Welcome to the Buntal JS API Reference! This section provides detailed documentation for all packages, components, and utilities available in the Buntal ecosystem. Whether you're building HTTP servers, full-stack web applications, or need specific utilities, you'll find comprehensive guides and examples here.

## Main Packages

- [@buntal/core](/references/core)
- [buntal](/references/buntal)

## Package Structure

The Buntal ecosystem is organized into focused packages:

- **\`@buntal/core\`** - Core utilities for HTTP servers and backend functionality
- **\`buntal\`** - Main package for web applications with React components

Each package is designed to work independently or together, giving you the flexibility to use only what you need for your specific project requirements.

`}
      tableOfContents={[
        {
          id: 'overview',
          title: 'Overview',
          level: 2,
          offset: 72
        },
        {
          id: 'main-packages',
          title: 'Main Packages',
          level: 2,
          offset: 72
        },
        {
          id: 'package-structure',
          title: 'Package Structure',
          level: 2,
          offset: 72
        }
      ]}
      lastModified="2025-06-10"
    />
  )
}
