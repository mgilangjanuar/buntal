import { Http } from 'buntal-core'
import { logger } from 'buntal-core/middlewares'
import { networkInterfaces } from 'os'
import { bundler } from '../bundler'
import { injectHandler } from './inject'
import { builder } from './router'
import { staticHandler } from './static'
import { notfoundHandler } from './notfound'

export type ServerConfig = {
  env?: 'development' | 'production',
  appDir?: string,
  outDir?: string,
  staticDir?: string,
}

export async function runServer({
  env = process.env.NODE_ENV as 'development' | 'production' || 'development',
  appDir = './app',
  outDir = '.buntal',
  staticDir = './public',
}: ServerConfig = {}) {
  const routes = await builder(appDir)
  await bundler(routes, { env, appDir, outDir })

  const app = new Http({
    port: Number(process.env.PORT) || 3000,
    appDir: appDir,
    websocket: env === 'development' ? {
      message() {},
    } : undefined,
    injectHandler: injectHandler(env, routes),
  })

  app.onNotFound(async (req, res) => {
    const resp = await staticHandler(req, outDir, staticDir)
    if (resp instanceof Response) {
      return resp
    }

    return await notfoundHandler(env, appDir)
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
