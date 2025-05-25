import { Http } from 'buntal-server'
import { logger } from 'buntal-server/middlewares'
import { networkInterfaces } from 'os'
import { bundler } from '../bundler'
import { injectHandler } from './inject'
import { builder } from './router'
import { staticHandler } from './static'

export async function runServer(appDir: string = './app') {
  const routes = await builder(appDir)
  await Bun.write('.buntal/routes.json',
    JSON.stringify(routes, null, 2))
  await bundler(routes)

  const app = new Http({
    port: 3000,
    appDir: appDir,
    injectHandler: injectHandler(routes),
  })

  app.onNotFound(async (req, res) => {
    const resp = await staticHandler(req)
    if (resp instanceof Response) {
      return resp
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
    console.log('\n  -... ..- -. - .- .-..\n' +
      `  Local:\thttp://localhost:${server.port}\n` +
      `  Network:\thttp://${ip || '0.0.0.0'}:${server.port}\n`)
  })
}
