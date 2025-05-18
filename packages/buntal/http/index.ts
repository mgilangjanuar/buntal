import { h, type AtomicHandler, type AtomicHandlerWithVoid } from './handler'
import { ALLOWED_METHODS } from './methods'
import type { Req } from './request'
import { Res } from './response'
import { buildRouter } from './router'

type Config = {
  port: number
  appDir: string
}

type ExtractRouteParams<Path extends string> =
  Path extends `${string}/:${infer Param}/${infer Rest}` ?
    { [K in Param | keyof ExtractRouteParams<`/${Rest}`>]: string }
  : Path extends `${string}/:${infer Param}` ?
    { [K in Param]: string }
  : Path extends `/:${infer Param}` ?
    { [K in Param]: string }
  : {}

export class Http {
  private middlewares: AtomicHandlerWithVoid[] = []
  private routes: Record<string, { [K in typeof ALLOWED_METHODS[number] | string]?: AtomicHandler }> = {}
  public server: Bun.Server | undefined

  constructor(private config: Config) {}

  start() {
    const router = buildRouter(this.config.appDir)
    const res = new Res()
    const middlewares = this.middlewares

    const server = Bun.serve({
      port: this.config.port,
      routes: this.routes,
      fetch: async (raw: Request) => {
        if (raw.method === 'OPTIONS') {
          return res.send('departed')
        }

        const req = raw as Req
        const match = router.match(req)
        if (match) {
          req.params = match.params || {}
          req.query = match.query || {}

          const handler = await import(match.filePath)
          if (handler[req.method]) {
            return h(...middlewares, handler[req.method])(req, res)
          }
        }

        return res.status(404).json({
          error: 'Not found'
        })
      },
      error: (error: Error) => {
        return new Res().status(500).json({
          error: error.message,
          details: error.stack
        })
      }
    })

    this.server = server
    return server
  }

  use(middleware: AtomicHandlerWithVoid) {
    this.middlewares.push(middleware)
  }

  get<R extends string, P = ExtractRouteParams<R>>(route: R, handler: AtomicHandler<P>) {
    this.routes[route] = {
      'GET': req => handler(req as Req<P>, new Res()),
    }
  }

  post<R extends string, P = ExtractRouteParams<R>>(route: R, handler: AtomicHandler<P>) {
    this.routes[route] = {
      'POST': req => handler(req as Req<P>, new Res()),
    }
  }

  put<R extends string, P = ExtractRouteParams<R>>(route: R, handler: AtomicHandler<P>) {
    this.routes[route] = {
      'PUT': req => handler(req as Req<P>, new Res()),
    }
  }

  delete<R extends string, P = ExtractRouteParams<R>>(route: R, handler: AtomicHandler<P>) {
    this.routes[route] = {
      'DELETE': req => handler(req as Req<P>, new Res()),
    }
  }

  patch<R extends string, P = ExtractRouteParams<R>>(route: R, handler: AtomicHandler<P>) {
    this.routes[route] = {
      'PATCH': req => handler(req as Req<P>, new Res()),
    }
  }
}
