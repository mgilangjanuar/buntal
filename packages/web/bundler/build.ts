import { $ } from 'bun'
import type { RouteBuilderResult } from '../server/router'

export async function bundler(routes: RouteBuilderResult[]) {
  await $`cp -r ${process.cwd()}/app .buntal`

  const layouts: string[] = routes.reduce((acc: string[], cur: { layoutsSafeImport: string[] }) => {
    for (const layout of cur.layoutsSafeImport) {
      if (!acc.includes(layout)) acc.push(layout)
    }
    return acc
  }, [])
  const entrypointScript = `/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { hydrateRoot } from 'react-dom/client'
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
}

hydrateRoot(document, <App routes={[
  ${
    routes.map(
      (r, i) =>
        `{ route: '${r.route}', regex: ${JSON.stringify(r.regex)}, element: Page${i}, layouts: [${
          r.layoutsSafeImport.map(layout => `Layout${layouts.findIndex(l => l === layout)}`).join(',')
        }] }`
    ).join(',')
  }
]} />)
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
}
