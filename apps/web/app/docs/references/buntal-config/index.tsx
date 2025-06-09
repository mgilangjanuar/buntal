import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'BuntalConfig - Buntal JS'
  } satisfies MetaProps
}

export default function BuntalConfigPage() {
  return (
    <ReferencePage
      title="BuntalConfig"
      description="Configuration type for Buntal applications that defines build and runtime settings."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/buntal/index.ts"
      typeDefinition={`type BuntalConfig = {
  env?: 'development' | 'production'
  appDir?: string
  outDir?: string
  staticDir?: string
  config?: Partial<Bun.BuildConfig>
}`}
      properties={[
        {
          name: 'env',
          type: "'development' | 'production'",
          required: false,
          default: 'development',
          description: 'Environment mode for build optimization'
        },
        {
          name: 'appDir',
          type: 'string',
          required: false,
          default: './app',
          description: 'Directory containing application routes and pages'
        },
        {
          name: 'outDir',
          type: 'string',
          required: false,
          default: '.buntal',
          description: 'Build output directory for compiled assets'
        },
        {
          name: 'staticDir',
          type: 'string',
          required: false,
          default: './public',
          description: 'Directory containing static assets'
        },
        {
          name: 'config',
          type: 'Partial<Bun.BuildConfig>',
          required: false,
          default: '{}',
          description: 'Additional Bun build configuration options'
        }
      ]}
      examples={[
        `// buntal.config.ts
import type { BuntalConfig } from 'buntal'

const config = {} satisfies BuntalConfig

export default config`,
        `// Custom configuration
import type { BuntalConfig } from 'buntal'

const config = {
  appDir: './src/pages',
  outDir: './build',
  staticDir: './assets',
  config: {
    minify: true,
    splitting: false
  }
} satisfies BuntalConfig

export default config`,
        `// Environment-specific configuration
import type { BuntalConfig } from 'buntal'

const isDev = process.env.NODE_ENV === 'development'

const config = {
  env: isDev ? 'development' : 'production',
  config: {
    minify: !isDev,
    sourcemap: isDev ? 'inline' : 'external',
    define: {
      'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production')
    }
  }
} satisfies BuntalConfig

export default config`,
        `// Advanced build configuration
import type { BuntalConfig } from 'buntal'

const config = {
  config: {
    splitting: true,
    chunkNames: '[name]-[hash]',
    external: ['react', 'react-dom'],
    loader: {
      '.svg': 'text',
      '.png': 'file'
    }
  }
} satisfies BuntalConfig

export default config`
      ]}
    />
  )
}
