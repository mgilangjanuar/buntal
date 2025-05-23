import { h, type AtomicHandler } from './handler'
import { ALLOWED_METHODS } from './methods'
import type { Req } from './request'
import { Res } from './response'
import { buildRouter } from './router'

type Config = {
  port: number
  appDir?: string
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
  private middlewares: AtomicHandler[] = []
  private routes: Record<string, { [K in typeof ALLOWED_METHODS[number] | string]?: AtomicHandler }> = {}
  public server: Bun.Server | undefined

  constructor(private config: Config) {}

  start() {
    const res = new Res()
    const middlewares = this.middlewares

    const server = Bun.serve({
      port: this.config.port,
      reusePort: true,
      routes: this.routes,
      fetch: this.config.appDir ? async (raw: Request) => {
        if (raw.method === 'OPTIONS') {
          return res.send('departed')
        }

        const req = raw as Req

        const router = buildRouter(this.config.appDir!)
        const match = router.match(req)

        if (match) {
          req.params = match.params || {}
          req.query = match.query || {}

          const handler = await import(match.filePath)
          if (handler[req.method]) {
            return h(...middlewares, handler[req.method])(req, res)
          }
        }

        return h(...middlewares, (_, res) => res.status(404).json({
          error: 'Not found'
        }))(req, res)
      } : async (raw: Request) => {
        if (raw.method === 'OPTIONS') {
          return res.send('departed')
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

  use(handler: AtomicHandler) {
    this.middlewares.push(handler)
  }

  get<R extends string, P = ExtractRouteParams<R>>(route: R, ...handlers: AtomicHandler<P>[]) {
    this.routes[route] = {
      'GET': req => h<P>(...this.middlewares as AtomicHandler<P>[], ...handlers)(req as Req<P>, new Res()),
    }
  }

  post<R extends string, P = ExtractRouteParams<R>>(route: R, ...handlers: AtomicHandler<P>[]) {
    this.routes[route] = {
      'POST': req => h<P>(...this.middlewares as AtomicHandler<P>[], ...handlers)(req as Req<P>, new Res()),
    }
  }

  put<R extends string, P = ExtractRouteParams<R>>(route: R, ...handlers: AtomicHandler<P>[]) {
    this.routes[route] = {
      'PUT': req => h<P>(...this.middlewares as AtomicHandler<P>[], ...handlers)(req as Req<P>, new Res()),
    }
  }

  delete<R extends string, P = ExtractRouteParams<R>>(route: R, ...handlers: AtomicHandler<P>[]) {
    this.routes[route] = {
      'DELETE': req => h<P>(...this.middlewares as AtomicHandler<P>[], ...handlers)(req as Req<P>, new Res()),
    }
  }

  patch<R extends string, P = ExtractRouteParams<R>>(route: R, ...handlers: AtomicHandler<P>[]) {
    this.routes[route] = {
      'PATCH': req => h<P>(...this.middlewares as AtomicHandler<P>[], ...handlers)(req as Req<P>, new Res()),
    }
  }
}
