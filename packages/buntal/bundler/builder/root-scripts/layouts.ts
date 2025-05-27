import type { RouteBuilderResult } from '../../../server/router'

export function buildLayouts(routes: RouteBuilderResult[], appDir: string = './app') {
  const layouts: string[] = routes.reduce((acc: string[], cur: { layoutsSafeImport: string[] }) => {
    for (const layout of cur.layoutsSafeImport) {
      if (!acc.includes(layout)) acc.push(layout)
    }
    return acc
  }, [])

  const rootIdx = layouts.findIndex((l) => l.endsWith(appDir + '/layout'))

  return {
    layouts,
    rootLayout: rootIdx === -1 ? null : `Layout${rootIdx}`,
    imports: layouts.map(
      (layout, i) => `import Layout${i} from '${layout}'`
    ).join('\n'),
    renderRootLayout: rootIdx === -1 ? '' : `rootLayout={Layout${rootIdx}}`,
  }
}
