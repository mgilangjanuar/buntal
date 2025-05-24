import { Http } from '@buntal/server'
import { logger } from '@buntal/server/middlewares'
import { networkInterfaces } from 'os'
import { renderToReadableStream } from 'react-dom/server'

export function runServer(appDir?: string) {
  const app = new Http({
    port: 3000,
    appDir: appDir || './app',
    injectHandler: async ({ req, match, handler }) => {
      if ('default' in handler) {
        return new Response(await renderToReadableStream(handler.default()), {
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
