import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'BuntalConfig Type - Buntal JS'
  } satisfies MetaProps
}

export default function BuntalConfigTypePage() {
  return (
    <MarkdownContent
      title="BuntalConfig Type"
      content={`# BuntalConfig Type

Configuration type for Buntal applications, used to configure the build process, server settings, and development environment.

## Import

\`\`\`typescript
import type { BuntalConfig } from 'buntal'
\`\`\`

## Type Definition

\`\`\`typescript
type BuntalConfig = {
  env?: 'development' | 'production'
  appDir?: string
  outDir?: string
  staticDir?: string
  config?: Partial<Bun.BuildConfig>
}
\`\`\`

## Properties

| Property | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| \`env\` | \`'development' \\| 'production'\` | \`'development'\` | ❌ | Environment mode for build optimization |
| \`appDir\` | \`string\` | \`'./app'\` | ❌ | Directory containing application source files |
| \`outDir\` | \`string\` | \`'.buntal'\` | ❌ | Output directory for build artifacts |
| \`staticDir\` | \`string\` | \`'./public'\` | ❌ | Directory for static assets (images, CSS, etc.) |
| \`config\` | \`Partial<Bun.BuildConfig>\` | \`{}\` | ❌ | Bun build configuration options |

## Property Details

### env?: 'development' | 'production'

Controls the environment mode, affecting build optimizations, logging, and development features.

**Development Mode:**
- Enables hot reload and file watching
- Includes source maps for debugging
- Less aggressive optimizations for faster builds
- Enhanced error reporting

**Production Mode:**
- Optimized builds with minification
- Tree shaking and dead code elimination
- Asset optimization
- Reduced bundle sizes

**Example:**
\`\`\`typescript
const config = {
  env: 'production' // or 'development'
} satisfies BuntalConfig
\`\`\`

### appDir?: string

Directory containing your application source files, including pages, layouts, and API routes.

**Default Structure:**
\`\`\`
app/
├── index.tsx          # Home page (/)
├── about.tsx          # About page (/about)
├── layout.tsx         # Root layout
├── globals.css        # Global styles
└── api/
    └── users.ts       # API route (/api/users)
\`\`\`

**Example:**
\`\`\`typescript
const config = {
  appDir: './src/app' // Custom app directory
} satisfies BuntalConfig
\`\`\`

### outDir?: string

Output directory where Buntal generates build artifacts, bundled JavaScript, and other compiled assets.

**Generated Structure:**
\`\`\`
.buntal/
├── index.ts           # Server entry point
├── dist/              # Client-side bundles
│   ├── root.js        # Main application bundle
│   └── chunks/        # Code-split chunks
└── cache/             # Build cache
\`\`\`

**Example:**
\`\`\`typescript
const config = {
  outDir: './dist' // Custom output directory
} satisfies BuntalConfig
\`\`\`

### staticDir?: string

Directory containing static assets that should be served directly by the web server without processing.

**Typical Contents:**
- Images (PNG, JPG, SVG)
- Fonts (WOFF, WOFF2, TTF)
- Favicons and app icons
- Static data files (JSON, XML)
- Third-party assets

**Example:**
\`\`\`typescript
const config = {
  staticDir: './assets' // Custom static directory
} satisfies BuntalConfig
\`\`\`

### config?: Partial<Bun.BuildConfig>

Advanced Bun build configuration options for fine-tuning the bundling process.

**Common Options:**
| Option | Type | Description |
|--------|------|-------------|
| \`minify\` | \`boolean\` | Enable code minification |
| \`splitting\` | \`boolean\` | Enable code splitting |
| \`sourcemap\` | \`'none' \\| 'external' \\| 'inline'\` | Source map generation |
| \`target\` | \`string\` | Target environment (e.g., 'browser', 'node') |
| \`external\` | \`string[]\` | External dependencies to exclude |

**Example:**
\`\`\`typescript
const config = {
  config: {
    minify: true,
    splitting: false,
    sourcemap: 'external',
    target: 'browser'
  }
} satisfies BuntalConfig
\`\`\`

## Usage Examples

### Basic Configuration

\`\`\`typescript
// buntal.config.ts
import type { BuntalConfig } from 'buntal'

const config = {
  env: 'development',
  appDir: './app',
  outDir: '.buntal',
  staticDir: './public'
} satisfies BuntalConfig

export default config
\`\`\`

### Production Optimized

\`\`\`typescript
// buntal.config.ts
import type { BuntalConfig } from 'buntal'

const config = {
  env: 'production',
  config: {
    minify: true,
    splitting: true,
    sourcemap: 'none',
    drop: ['console', 'debugger'] // Remove console.log in production
  }
} satisfies BuntalConfig

export default config
\`\`\`

### Custom Directory Structure

\`\`\`typescript
// buntal.config.ts
import type { BuntalConfig } from 'buntal'

const config = {
  appDir: './src/pages',      // Custom app directory
  outDir: './build',          // Custom output directory
  staticDir: './assets',      // Custom static directory
  config: {
    entrypoints: ['./src/index.ts'],
    outdir: './build/js'
  }
} satisfies BuntalConfig

export default config
\`\`\`

### Environment-Specific Configuration

\`\`\`typescript
// buntal.config.ts
import type { BuntalConfig } from 'buntal'

const isDev = process.env.NODE_ENV === 'development'

const config = {
  env: isDev ? 'development' : 'production',
  config: {
    minify: !isDev,
    sourcemap: isDev ? 'inline' : 'external',
    splitting: !isDev,
    define: {
      'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
      'process.env.API_URL': JSON.stringify(
        isDev ? 'http://localhost:3000' : 'https://api.example.com'
      )
    }
  }
} satisfies BuntalConfig

export default config
\`\`\`

### Advanced Build Optimization

\`\`\`typescript
// buntal.config.ts
import type { BuntalConfig } from 'buntal'

const config = {
  env: 'production',
  config: {
    minify: {
      whitespace: true,
      identifiers: true,
      syntax: true
    },
    splitting: true,
    chunkNames: '[name]-[hash]',
    external: ['react', 'react-dom'], // Don't bundle these
    loader: {
      '.svg': 'text',
      '.png': 'file'
    },
    plugins: [
      // Custom Bun plugins
    ]
  }
} satisfies BuntalConfig

export default config
\`\`\`

### Monorepo Configuration

\`\`\`typescript
// packages/web/buntal.config.ts
import type { BuntalConfig } from 'buntal'
import { resolve } from 'path'

const config = {
  appDir: './src/app',
  outDir: '../../dist/web',
  staticDir: '../../assets',
  config: {
    resolve: {
      alias: {
        '@': resolve('./src'),
        '@shared': resolve('../../packages/shared/src')
      }
    }
  }
} satisfies BuntalConfig

export default config
\`\`\`

### Development Features

\`\`\`typescript
// buntal.config.ts
import type { BuntalConfig } from 'buntal'

const config = {
  env: 'development',
  config: {
    sourcemap: 'inline',
    watch: true, // Enable file watching
    define: {
      '__DEV__': 'true',
      '__VERSION__': JSON.stringify(process.env.npm_package_version)
    },
    banner: {
      js: '// Development build - ' + new Date().toISOString()
    }
  }
} satisfies BuntalConfig

export default config
\`\`\`

## CLI Integration

The configuration file is automatically detected and used by Buntal CLI commands:

### Development Server

\`\`\`bash
buntal dev
# Uses configuration for development mode
\`\`\`

### Production Build

\`\`\`bash
buntal build
# Uses configuration for production build
\`\`\`

### Production Server

\`\`\`bash
buntal start
# Serves the production build
\`\`\`

## File Location

The configuration file should be placed in your project root with one of these names:

- \`buntal.config.ts\` (recommended)
- \`buntal.config.js\`
- \`buntal.config.mjs\`

**Example project structure:**
\`\`\`
my-project/
├── buntal.config.ts    # Configuration file
├── package.json
├── app/                # Application source
├── public/             # Static assets
└── .buntal/           # Build output (auto-generated)
\`\`\`

## Best Practices

### Environment Variables

Use environment variables for dynamic configuration:

\`\`\`typescript
// buntal.config.ts
import type { BuntalConfig } from 'buntal'

const config = {
  env: (process.env.NODE_ENV as 'development' | 'production') || 'development',
  appDir: process.env.APP_DIR || './app',
  config: {
    define: {
      'process.env.API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:3000')
    }
  }
} satisfies BuntalConfig

export default config
\`\`\`

### Type Safety

Always use \`satisfies BuntalConfig\` for type checking:

\`\`\`typescript
// Good: Type-safe configuration
const config = {
  env: 'production',
  appDir: './app'
} satisfies BuntalConfig

// Bad: No type checking
const config = {
  env: 'prod', // Error: invalid value
  appDir: './app'
}
\`\`\`

### Conditional Configuration

Structure configuration based on environment:

\`\`\`typescript
import type { BuntalConfig } from 'buntal'

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

const config = {
  env: isDev ? 'development' : 'production',
  config: {
    ...(isDev && {
      sourcemap: 'inline',
      minify: false
    }),
    ...(isProd && {
      minify: true,
      splitting: true,
      drop: ['console']
    })
  }
} satisfies BuntalConfig

export default config
\`\`\`

### Asset Optimization

Configure asset handling for production:

\`\`\`typescript
const config = {
  env: 'production',
  config: {
    loader: {
      '.png': 'file',
      '.jpg': 'file',
      '.svg': 'text',
      '.woff2': 'file'
    },
    publicPath: '/assets/', // CDN prefix
    assetNames: '[name]-[hash].[ext]'
  }
} satisfies BuntalConfig
\`\`\`

## Related Types

- [Config Type](/docs/references/config-type) - Lower-level HTTP server configuration
- [Server Functions](/docs/references/server-types) - Functions that use BuntalConfig
- [Build Process](/docs/guides/build-process) - How configuration affects builds
- [CLI Commands](/docs/guides/cli) - Commands that use this configuration`}
      tableOfContents={[
        {
          id: 'import',
          title: 'Import',
          level: 1,
          offset: 72
        },
        {
          id: 'type-definition',
          title: 'Type Definition',
          level: 1,
          offset: 72
        },
        {
          id: 'properties',
          title: 'Properties',
          level: 1,
          offset: 72
        },
        {
          id: 'property-details',
          title: 'Property Details',
          level: 1,
          offset: 72
        },
        {
          id: 'usage-examples',
          title: 'Usage Examples',
          level: 1,
          offset: 72
        },
        {
          id: 'cli-integration',
          title: 'CLI Integration',
          level: 1,
          offset: 72
        },
        {
          id: 'file-location',
          title: 'File Location',
          level: 1,
          offset: 72
        },
        {
          id: 'best-practices',
          title: 'Best Practices',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
