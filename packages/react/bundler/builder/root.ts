import type { RouteBuilderResult } from '../../server/router'
import { buildLayouts, buildNotfound, buildPages } from './root-scripts'

export async function buildRoot(routes: RouteBuilderResult[], appDir: string = './app', outDir: string = '.buntal') {
  // Build all layouts and pages
  const { layouts, rootLayout, renderRootLayout, imports: layoutsImports } = buildLayouts(routes, appDir)
  const createPages = buildPages(routes, layouts)
  const createNotFound = await buildNotfound(appDir, rootLayout)

  // Create the entrypoint script
  const entrypointScript = `/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from 'buntal-react/components'
${createPages.imports}${createNotFound.imports}
${layoutsImports}

window.process = {} as any
window.process.env = {}
const root = createRoot(document)
root.render(<StrictMode>
  <App ${renderRootLayout}
    routes={[
      ${createPages.render}
    ]}${createNotFound.render}
  />
</StrictMode>)
`
  await Bun.write(outDir + '/root.tsx', entrypointScript)

  // Build!
  await Bun.build({
    entrypoints: [outDir + '/root.tsx'],
    outdir: outDir + '/dist',
    target: 'browser',
    env: 'BUNTAL_PUBLIC_*',
    splitting: true,
    minify: {
      identifiers: true,
      syntax: true,
      whitespace: true,
    }
  })
}
