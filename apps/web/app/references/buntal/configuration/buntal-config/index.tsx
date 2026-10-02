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
      headerTitle="buntal"
      title="BuntalConfig"
      description="Configuration type for Buntal applications that defines build and runtime settings."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/buntal/index.ts"
      typeDefinition={`type BuntalConfig = {
  env?: 'development' | 'production'
  appDir?: string
  outDir?: string
  staticDir?: string
  config?: Partial<Bun.BuildConfig>
  serverOptions?: Partial<Bun.Serve.Options<any>>
  middlewares?: AtomicHandler[]
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
        },
        {
          name: 'serverOptions',
          type: 'Partial<Bun.Serve.Options<any>>',
          required: false,
          description: 'Options passed through to Bun.serve'
        },
        {
          name: 'middlewares',
          type: 'AtomicHandler[]',
          required: false,
          default: '[]',
          description:
            'Middlewares run before every page, $ loader and API route (e.g. auth, cors, secureHeaders). Static assets are served before them.'
        }
      ]}
      lastModified="2026-10-02"
    />
  )
}
