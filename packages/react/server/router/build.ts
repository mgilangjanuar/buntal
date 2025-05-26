import { buildRouter } from 'buntal-core'

export type RouteBuilderResult = {
  route: string,
  path: string,
  safeImport: string,
  regex: string,
  ssr?: boolean,
  layouts: string[],
  layoutsSafeImport: string[]
}

export const builder = async (appDir: string = './app', source: string = '..') => {
  const { routes } = buildRouter(appDir)
  const results: RouteBuilderResult[] = []

  for (const [route, filePath] of Object.entries(routes)) {
    if (!filePath.endsWith('layout.tsx') && !filePath.endsWith('404.tsx')) {
      const handler = await import(filePath)
      if ('default' in handler) {
        const layouts: string[] = []
        const parsedPaths = filePath.replace(process.cwd(), '').split('/')
        for (const [i, path] of Object.entries(parsedPaths)) {
          const layoutPath = `${process.cwd()}${parsedPaths.slice(0, Number(i)).join('/')}/${path}/layout.tsx`
          if (await Bun.file(layoutPath).exists() && 'default' in await import(layoutPath)) {
            layouts.push(layoutPath)
          }
        }
        results.push({
          route,
          path: filePath,
          safeImport: filePath.replace(process.cwd(), source).replace(/\.tsx$/gi, ''),
          regex: `^${route.replace(/\//g, '\\/')
            .replace(/\[([^\]]+)\]/g, '(?<$1>[^\\/]+)')}$`,
          ssr: '$' in handler,
          layouts,
          layoutsSafeImport: layouts.map(layout => layout.replace(process.cwd(), source).replace(/\.tsx$/gi, ''))
        })
      }
    }
  }

  return results
}
