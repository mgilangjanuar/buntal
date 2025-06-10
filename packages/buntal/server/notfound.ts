import { createElement } from 'react'
import { renderToReadableStream } from 'react-dom/server'
import { Notfound } from '../components/notfound'

export const notfoundHandler = async (
  env: 'development' | 'production' = 'development',
  appDir: string = './app'
): Promise<Response | void> => {
  const layout =
    (await Bun.file(`${appDir}/layout.tsx`).exists()) &&
    (await import(`${process.cwd()}/${appDir}/layout.tsx`))
  if (await Bun.file(`${appDir}/404.tsx`).exists()) {
    const { default: NotFound } = await import(
      `${process.cwd()}/${appDir}/404.tsx`
    )
    return new Response(
      await renderToReadableStream(
        layout
          ? createElement(layout.default, {
              data: {
                _meta: {
                  title: 'Not found'
                }
              },
              children: createElement(NotFound)
            })
          : createElement(NotFound),
        {
          bootstrapModules: [
            '/root.js',
            ...(env === 'development' ? ['/hot-reload.js'] : [])
          ]
        }
      ),
      {
        headers: {
          'Content-Type': 'text/html'
        }
      }
    )
  }

  return new Response(
    await renderToReadableStream(
      layout
        ? createElement(layout.default, {
            data: {
              _meta: {
                title: 'Not found'
              }
            },
            children: createElement(Notfound)
          })
        : createElement(Notfound),
      {
        bootstrapModules: [
          '/root.js',
          ...(env === 'development' ? ['/hot-reload.js'] : [])
        ]
      }
    ),
    {
      headers: {
        'Content-Type': 'text/html'
      }
    }
  )
}
