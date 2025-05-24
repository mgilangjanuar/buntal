import { Http } from '@buntal/server'
import { logger } from '@buntal/server/middlewares'
import { networkInterfaces } from 'os'
import type { ReactNode } from 'react'
import { renderToReadableStream } from 'react-dom/server'
import { builder } from '../router'

export async function runServer(appDir: string = './app') {
  const routes = await builder(appDir)
  await Bun.write('.buntal/routes.manifest.json', JSON.stringify(routes, null, 2))

  const app = new Http({
    port: 3000,
    appDir: appDir,
    injectHandler: async ({ req, match, handler }) => {
      const route = routes.find(r => r.route === match.name)
      if (route && 'default' in handler) {
        const args = {
          query: req.query,
          params: req.params,
          data: route.ssr ? await handler.$(req) : {}
        }

        // Recursively create the component with layouts
        const createComponent = async (layouts: string[]): Promise<ReactNode> => {
          if (!layouts?.[0]) {
            return handler.default(args) as ReactNode
          }
          const layout = await import(layouts[0])
          return layout.default({
            ...args,
            children: await createComponent(layouts.slice(1))
          }) as ReactNode
        }

        // Render the component to a readable stream
        return new Response(
          await renderToReadableStream(
            await createComponent(route.layouts)
          ), {
            headers: {
              'Content-Type': 'text/html',
            }
          }
        )
      }
    },
  })

  app.onNotFound(async (req, res) => {
    const { pathname } = new URL(req.url)

    // Handle static files
    if (await Bun.file(`./public${pathname}`).exists()) {
      const file = Bun.file(`./public${pathname}`)
      return new Response(file, {
        headers: {
          'content-type': file.type
        }
      })
    }
    return res.status(404).json({
      error: 'Not found'
    })
  })

  app.use(logger())

  app.start(server => {
    const ip = networkInterfaces().en0
      ?.find(i => i.family === 'IPv4' && !i.internal)
      ?.address
    console.log(`
   -... ..- -. - .- .-..
   Local:\thttp://localhost:${server.port}
   Network:\thttp://${ip || '0.0.0.0'}:${server.port}
`)
  })
}
