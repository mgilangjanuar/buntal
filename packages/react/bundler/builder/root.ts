import type { RouteBuilderResult } from '../../server/router'

export async function buildRoot(routes: RouteBuilderResult[], appDir: string = './app', outDir: string = '.buntal') {
  const layouts: string[] = routes.reduce((acc: string[], cur: { layoutsSafeImport: string[] }) => {
    for (const layout of cur.layoutsSafeImport) {
      if (!acc.includes(layout)) acc.push(layout)
    }
    return acc
  }, [])
  const notFoundPage = await Bun.file(appDir + '/404.tsx').exists()
  const rootLayoutIdx = layouts.findIndex((l) => l.endsWith(appDir + '/layout'))
  const entrypointScript = `/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from 'buntal-react/components'
${
  routes.map(
    (r, i) => `import Page${i} from '${r.safeImport}'`
  ).join('\n')
}
${
  layouts.map(
    (layout, i) => `import Layout${i} from '${layout}'`
  ).join('\n')
}${
  notFoundPage ? `
import NotFound from '../${appDir.replace(/^\.\//, '')}/404.tsx'`
  : ''
}

const root = createRoot(document)
root.render(<StrictMode>
  <App
    routes={[
      ${
        routes.map(
          (r, i) =>
            `{ regex: ${JSON.stringify(r.regex)}, element: Page${i}, ssr: ${r.ssr}, layouts: [${
              r.layoutsSafeImport.map(layout => `Layout${layouts.findIndex(l => l === layout)}`).join(',')
            }] }`
        ).join(',')
      }
    ]}${
      notFoundPage ? ` notFound={${rootLayoutIdx === -1 ? '<NotFound />'
        : `<Layout${rootLayoutIdx} children={<NotFound />} data={{ _meta: { title: 'Not found' } }} />`}}` : ''
    }
  />
</StrictMode>)
`
  await Bun.write(outDir + '/root.tsx', entrypointScript)
  await Bun.build({
    entrypoints: [outDir + '/root.tsx'],
    outdir: outDir + '/dist',
    target: 'browser',
    splitting: true,
    minify: {
      identifiers: true,
      syntax: true,
      whitespace: true,
    }
  })
}
