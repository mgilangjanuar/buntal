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
      title="buntal"
      content={`# Configuration

Configuration options for Buntal applications.

## Overview

The Configuration module defines the structure and options for configuring Buntal applications. This includes settings for the development server, build process, and application behavior.

## Components

### Core Configuration

- **[BuntalConfig](/docs/references/buntal/configuration/buntal-config)** - Main configuration interface for Buntal applications


`}
      lastModified="2025-06-10"
    />
  )
}
