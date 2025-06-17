import type { RouteBuilderResult } from '../../../server/router'

export function buildLayouts(
  routes: RouteBuilderResult[],
  appDir: string = './app'
) {
  const layouts: RouteBuilderResult['layouts'] = routes.reduce(
    (
      acc: RouteBuilderResult['layouts'],
      cur: { layoutsSafeImport: RouteBuilderResult['layouts'] }
    ) => {
      for (const layout of cur.layoutsSafeImport) {
        if (!acc.find((l) => l.filePath === layout.filePath)) acc.push(layout)
      }
      return acc
    },
    []
  )

  const rootIdx = layouts.findIndex((l) =>
    l.filePath.endsWith(appDir + '/layout')
  )

  return {
    layouts,
    rootLayout: rootIdx === -1 ? null : `Layout${rootIdx}`,
    imports: layouts
      .map(
        (layout, i) =>
          `const Layout${i} = lazy(() => import('${layout.filePath}'))`
      )
      .join('\n'),
    renderRootLayout:
      rootIdx === -1
        ? ''
        : `rootLayout={{ element: Layout${rootIdx}, ssr: ${layouts[rootIdx]!.ssr}, data: ${layouts[rootIdx]!.data ? JSON.stringify(layouts[rootIdx]!.data) : 'undefined'} }}`
  }
}
