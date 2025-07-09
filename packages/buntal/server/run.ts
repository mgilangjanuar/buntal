import { Http } from '@buntal/http'
import { logger } from '@buntal/http/middlewares'
import { networkInterfaces } from 'os'
import type { BuntalConfig } from '..'
import { bundler } from '../bundler'
import { injectHandler } from './inject'
import { notfoundHandler } from './notfound'
import { builder } from './router'
import { staticHandler } from './static'

export async function runServer({
  env = (process.env.NODE_ENV as 'development' | 'production') ||
    (process.argv[2] === '--serve' || process.argv[2] === '--build'
      ? 'production'
      : 'development'),
  appDir = './app',
  outDir = '.buntal',
  staticDir = './public',
  config = {},
  serverOptions = undefined
}: BuntalConfig = {}) {
  const routes = await builder(appDir)

  if (process.argv[2] !== '--serve') {
    await bundler(routes, { env, appDir, outDir, config })
    if (process.argv[2] === '--build') {
      process.exit(0)
    }
  }

  const app = new Http({
    port: Number(process.env.PORT) || 3000,
    appDir: appDir,
    websocket:
      env === 'development'
        ? {
            message() {}
          }
        : undefined,
    injectHandler: async (payload) => {
      const resp = await staticHandler(payload.req, outDir, staticDir)
      if (resp instanceof Response) {
        return resp
      }
      return injectHandler(env, routes)(payload)
    },
    options: serverOptions
  })

  app.onNotFound(async (req) => {
    const resp = await staticHandler(req, outDir, staticDir)
    if (resp instanceof Response) {
      return resp
    }
    return await notfoundHandler(env, appDir)
  })

  app.use(logger())

  app.start((server) => {
    const ip = networkInterfaces().en0?.find(
      (i) => i.family === 'IPv4' && !i.internal
    )?.address
    console.log(
      '\n  -... ..- -. - .- .-..\n' +
        `  Local:\thttp://localhost:${server.port}\n` +
        `  Network:\thttp://${ip || '0.0.0.0'}:${server.port}\n`
    )
  })
}
