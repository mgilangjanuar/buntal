import { buildRouter } from '@buntal/http'
import path from 'path'
import type { RouteBuilderResult } from './types'

export const builder = async (
  appDir: string = './app',
  source: string = '..'
) => {
  const { routes } = buildRouter(appDir)
  const results: RouteBuilderResult[] = []

  for (const [route, filePath] of Object.entries(routes)) {
    if (
      !filePath.endsWith('layout.tsx') &&
      !filePath.endsWith('404.tsx') &&
      !filePath.split(path.sep).find((p) => p.startsWith('_'))
    ) {
      const handler = await import(filePath)
      if ('default' in handler) {
        const layouts: RouteBuilderResult['layouts'] = []
        const parsedPaths = filePath.replace(process.cwd(), '').split(path.sep)
        for (const [i, pathSegment] of Object.entries(parsedPaths)) {
          const layoutPath = path.join(
            process.cwd(),
            ...parsedPaths.slice(0, Number(i)),
            pathSegment,
            'layout.tsx'
          )
          if (
            (await Bun.file(layoutPath).exists()) &&
            'default' in (await import(layoutPath))
          ) {
            const prev = results
              .find(
                (r) =>
                  r.route === route &&
                  r.layouts.some((l) => l.filePath === layoutPath)
              )
              ?.layouts.find((l) => l.filePath === layoutPath)
            if (prev) {
              layouts.push(prev)
            } else {
              const layoutHandler = await import(layoutPath)
              layouts.push({
                filePath: layoutPath,
                ssr:
                  '$' in layoutHandler && typeof layoutHandler.$ === 'function',
                data:
                  '$' in layoutHandler && typeof layoutHandler.$ !== 'function'
                    ? layoutHandler.$
                    : undefined
              })
            }
          }
        }

        let regex = route.replace(/\//g, '\\' + path.sep)
        if (regex.includes('[[...')) {
          regex = regex.replace(/\[\[\.\.\.([^\]]+)\]\]/g, '(?<$1>.+)')
        } else {
          regex = regex.replace(/\[([^\]]+)\]/g, `(?<$1>[^\\${path.sep}]+)`)
        }
        results.push({
          route,
          safeImport: filePath
            .replace(process.cwd(), source)
            .replace(/\.tsx$/gi, ''),
          regex: `^${regex}$`,
          ssr: '$' in handler && typeof handler.$ === 'function',
          data:
            '$' in handler && typeof handler.$ !== 'function'
              ? handler.$
              : undefined,
          layouts,
          layoutsSafeImport: layouts.map((layout) => ({
            ...layout,
            filePath: layout.filePath
              .replace(process.cwd(), source)
              .replace(/\.tsx$/gi, '')
          }))
        })
      }
    }
  }

  return results
}
