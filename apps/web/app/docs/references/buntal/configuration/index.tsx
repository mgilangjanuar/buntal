import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Configuration - buntal - Buntal JS'
  } satisfies MetaProps
}

export default function BuntalConfigurationPage() {
  return (
    <MarkdownContent
      title="Configuration"
      content={`# Configuration

Configuration options for Buntal applications.

## Overview

The Configuration module defines the structure and options for configuring Buntal applications. This includes settings for the development server, build process, and application behavior.

## Components

### Core Configuration

- **[BuntalConfig](/docs/references/buntal/configuration/buntal-config)** - Main configuration interface for Buntal applications

## Quick Start

### Basic Configuration

\`\`\`typescript
// buntal.config.ts
import type { BuntalConfig } from 'buntal'

export default {
  appDir: './app',
  port: 3000,
  build: {
    outDir: './dist'
  }
} satisfies BuntalConfig
\`\`\`

### Advanced Configuration

\`\`\`typescript
// buntal.config.ts
import type { BuntalConfig } from 'buntal'

export default {
  appDir: './app',
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  build: {
    outDir: './dist',
    sourcemap: true,
    minify: process.env.NODE_ENV === 'production'
  },
  dev: {
    hmr: true,
    open: true
  }
} satisfies BuntalConfig
\`\`\`

The configuration file allows you to customize how your Buntal application behaves during development and production builds.
`}
    />
  )
}
