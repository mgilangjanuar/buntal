import type { RouteBuilderResult } from '../../server/router'
import { buildLayouts, buildNotfound, buildPages } from './root-scripts'

export async function buildRoot(
  routes: RouteBuilderResult[],
  appDir: string = './app',
  outDir: string = '.buntal'
) {
  // Build all layouts and pages
  const {
    layouts,
    rootLayout,
    renderRootLayout,
    imports: layoutsImports
  } = buildLayouts(routes, appDir)
  const createPages = buildPages(routes, layouts)
  const createNotFound = await buildNotfound(appDir, rootLayout)

  // Create the entrypoint script
  const entrypointScript = `/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { App } from 'buntal'
import { lazy } from 'react'
import { createRoot } from 'react-dom/client'

${layoutsImports}
${createPages.imports}${createNotFound.imports}

window.process = {} as any
window.process.env = {}
const root = createRoot(document)
root.render(<App ${renderRootLayout}
  routes={[
    ${createPages.render}
  ]}${createNotFound.render}
/>)
`
  await Bun.write(outDir + '/root.tsx', entrypointScript)
}
