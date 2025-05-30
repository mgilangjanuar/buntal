import type { RouteBuilderResult } from '../../../server/router'

export function buildPages(routes: RouteBuilderResult[], layouts: string[]) {
  return {
    imports: routes
      .map((r, i) => `import Page${i} from '${r.safeImport}'`)
      .join('\n'),
    render: routes
      .map(
        (r, i) =>
          `{ regex: ${JSON.stringify(r.regex)}, element: Page${i}, ssr: ${r.ssr}, layouts: [${r.layoutsSafeImport
            .map((layout) => `Layout${layouts.findIndex((l) => l === layout)}`)
            .join(',')}]${r.data ? `, data: ${JSON.stringify(r.data)}` : ''} }`
      )
      .join(',')
  }
}
