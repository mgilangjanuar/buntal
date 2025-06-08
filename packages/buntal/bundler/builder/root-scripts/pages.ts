import type { RouteBuilderResult } from '../../../server/router'

export function buildPages(
  routes: RouteBuilderResult[],
  layouts: RouteBuilderResult['layouts']
) {
  return {
    imports: routes
      .map((r, i) => `import Page${i} from '${r.safeImport}'`)
      .join('\n'),
    render: routes
      .map((r, i) => {
        return `{ regex: ${JSON.stringify(r.regex)}, element: Page${i}, ssr: ${r.ssr}, layouts: [${r.layoutsSafeImport
          .slice(1)
          .map((layout) => {
            const idx = layouts.findIndex((l) => l.filePath === layout.filePath)
            return `{ element: Layout${idx}, ssr: ${layout.ssr || false}${layout.data ? `, data: ${JSON.stringify(layout.data)}` : ''} }`
          })
          .join(',')}]${r.data ? `, data: ${JSON.stringify(r.data)}` : ''} }`
      })
      .join(',')
  }
}
