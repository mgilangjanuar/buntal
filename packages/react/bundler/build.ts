import { $ } from 'bun'
import type { RouteBuilderResult } from '../server/router'

export async function bundler(routes: RouteBuilderResult[]) {
  const layouts: string[] = routes.reduce((acc: string[], cur: { layoutsSafeImport: string[] }) => {
    for (const layout of cur.layoutsSafeImport) {
      if (!acc.includes(layout)) acc.push(layout)
    }
    return acc
  }, [])
  const notFoundPage = await Bun.file('app/404.tsx').exists()
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
import NotFound from '../app/404.tsx'`
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
      notFoundPage ? ` notFound={<NotFound />}` : ''
    }
  />
</StrictMode>)
`
  await Bun.write('.buntal/root.tsx', entrypointScript)
  await Bun.build({
    entrypoints: ['.buntal/root.tsx'],
    outdir: '.buntal/dist',
    target: 'browser',
    splitting: true,
    minify: {
      identifiers: true,
      syntax: true,
      whitespace: true,
    }
  })
  if (await Bun.file('app/favicon.ico').exists()) {
    await $`cp app/favicon.ico .buntal/dist/favicon.ico`
  }
}
