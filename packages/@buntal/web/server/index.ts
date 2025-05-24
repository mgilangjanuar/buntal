import { Http } from '@buntal/server'
import { logger } from '@buntal/server/middlewares'
import { networkInterfaces } from 'os'
import type { ReactNode } from 'react'
import { renderToReadableStream } from 'react-dom/server'
import { builder } from '../router'

export async function runServer(appDir: string = './app') {
  const routes = await builder(appDir)

  const app = new Http({
    port: 3000,
    appDir: appDir,
    injectHandler: async ({ req, match, handler }) => {
      const route = routes.find(r => r.route === match.name)
      if (route?.layouts.length && 'default' in handler) {
        const args = {
          query: req.query,
          params: req.params,
          data: route.ssr ? await handler.$(req) : {}
        }
        const createComponent = async (layouts: string[]): Promise<ReactNode> => {
          if (!layouts?.[0]) {
            return handler.default(args) as ReactNode
          }
          const layout = await import(layouts[0])
          return layout.default(args) as ReactNode
        }
        return new Response(await renderToReadableStream(await createComponent(route.layouts)), {
          headers: {
            'Content-Type': 'text/html',
          }
        })
      }
    },
  })

  app.use(logger())

  app.start(server => {
    const ip = networkInterfaces().en0
      ?.find(i => i.family === 'IPv4' && !i.internal)
      ?.address
    console.log(`
   -... ..- -. - .- .-..
   Local:\thttp://localhost:${server.port}
   Network:\thttp://${ip}:${server.port}
`)
  })
}
