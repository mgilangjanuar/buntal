import type { WebSocketHandler } from 'bun'
import { Req, Res } from './app'
import { h, type AtomicHandler } from './handler'
import type { ALLOWED_METHODS } from './lib/const'
import { buildRouter } from './router'

type Config = {
  port: number
  appDir?: string
  websocket?: WebSocketHandler
  injectHandler?: (payload: {
    req: Req
    match: Bun.MatchedRoute
    handler: any
  }) => Promise<Response | void>
}

type ExtractRouteParams<Path extends string> =
  Path extends `${string}/:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractRouteParams<`/${Rest}`>]: string }
    : Path extends `${string}/:${infer Param}`
      ? { [K in Param]: string }
      : Path extends `/:${infer Param}`
        ? { [K in Param]: string }
        : {}

export class Http {
  private middlewares: AtomicHandler[] = []
  private routes: Record<
    string,
    { [K in (typeof ALLOWED_METHODS)[number] | string]?: AtomicHandler }
  > = {}
  private errorHandler:
    | ((error: Error) => Response | Promise<Response>)
    | null = null
  private notFoundHandler: AtomicHandler = (_, res) =>
    res.status(404).json({
      error: 'Not found'
    })

  constructor(private config: Config) {}

  start(cb?: (server: Bun.Server) => void) {
    const res = new Res()
    const middlewares = this.middlewares

    const server = Bun.serve({
      port: this.config.port,
      reusePort: true,
      routes: this.routes,
      websocket: this.config.websocket,
      fetch: async (raw: Request, server): Promise<Response | any> => {
        if (this.config.websocket && server.upgrade(raw)) return

        if (raw.method === 'OPTIONS') {
          return res.send('departed')
        }

        if (!this.config.appDir) {
          return res.status(404).json({
            error: 'Not found'
          })
        }

        const req = raw as Req

        const router = buildRouter(this.config.appDir!)
        const match = router.match(req)

        if (match) {
          req.params = match.params || {}
          req.query = match.query || {}

          const handler = await import(match.filePath)
          const injected = await this.config.injectHandler?.({
            req,
            match,
            handler
          })
          if (injected instanceof Response) {
            return injected
          }

          if (req.method in handler) {
            return h(...middlewares, handler[req.method])(req, res)
          }
        }

        return h(...middlewares, this.notFoundHandler)(req, res)
      },
      error: async (error: Error) => {
        if (this.errorHandler) {
          return await this.errorHandler(error)
        }
        return res.status(500).json({
          error: error.message,
          details: error.stack
        })
      }
    })

    cb?.(server)
    return server
  }

  onError(handler: (error: Error) => Response | Promise<Response>) {
    this.errorHandler = handler
  }

  onNotFound(handler: AtomicHandler) {
    this.notFoundHandler = handler
  }

  use(handler: AtomicHandler) {
    this.middlewares.push(handler)
  }

  get<R extends string, P = ExtractRouteParams<R>>(
    route: R,
    ...handlers: AtomicHandler<P>[]
  ) {
    this.routes[route] = {
      GET: (req) =>
        h<P>(...(this.middlewares as AtomicHandler<P>[]), ...handlers)(
          req as Req<P>,
          new Res()
        )
    }
  }

  post<R extends string, P = ExtractRouteParams<R>>(
    route: R,
    ...handlers: AtomicHandler<P>[]
  ) {
    this.routes[route] = {
      POST: (req) =>
        h<P>(...(this.middlewares as AtomicHandler<P>[]), ...handlers)(
          req as Req<P>,
          new Res()
        )
    }
  }

  put<R extends string, P = ExtractRouteParams<R>>(
    route: R,
    ...handlers: AtomicHandler<P>[]
  ) {
    this.routes[route] = {
      PUT: (req) =>
        h<P>(...(this.middlewares as AtomicHandler<P>[]), ...handlers)(
          req as Req<P>,
          new Res()
        )
    }
  }

  delete<R extends string, P = ExtractRouteParams<R>>(
    route: R,
    ...handlers: AtomicHandler<P>[]
  ) {
    this.routes[route] = {
      DELETE: (req) =>
        h<P>(...(this.middlewares as AtomicHandler<P>[]), ...handlers)(
          req as Req<P>,
          new Res()
        )
    }
  }

  patch<R extends string, P = ExtractRouteParams<R>>(
    route: R,
    ...handlers: AtomicHandler<P>[]
  ) {
    this.routes[route] = {
      PATCH: (req) =>
        h<P>(...(this.middlewares as AtomicHandler<P>[]), ...handlers)(
          req as Req<P>,
          new Res()
        )
    }
  }
}

export * from './app'
export * from './router'
export * from './handler'
