import { join } from 'path'
import { createElement } from 'react'
import { renderToReadableStream } from 'react-dom/server'
import { Notfound } from '../components/notfound'
import { bootstrapModules, pageHeaders } from './inject'

export const notfoundHandler = async (
  env: 'development' | 'production' = 'development',
  appDir: string = './app',
  outDir: string = '.buntal'
): Promise<Response | void> => {
  const layout =
    (await Bun.file(join(appDir, 'layout.tsx')).exists()) &&
    (await import(join(process.cwd(), appDir, 'layout.tsx')))

  const NotFound = (await Bun.file(join(appDir, '404.tsx')).exists())
    ? (await import(join(process.cwd(), appDir, '404.tsx'))).default
    : Notfound

  return new Response(
    await renderToReadableStream(
      layout
        ? createElement(layout.default, {
            data: { _meta: { title: 'Not found' } },
            children: createElement(NotFound)
          })
        : createElement(NotFound),
      { bootstrapModules: await bootstrapModules(env, outDir) }
    ),
    { status: 404, headers: pageHeaders }
  )
}
