import type { Server, WebSocketHandler } from 'bun'
import { watch } from 'fs'
import { Req, Res, toReq } from './app'
import { h, type AtomicHandler } from './handler'
import { ALLOWED_METHODS } from './lib/const'
import { buildRouter } from './router'

type Method = (typeof ALLOWED_METHODS)[number]
const METHODS = new Set<string>(ALLOWED_METHODS)

type Config = {
  port: number
  appDir?: string
  websocket?: WebSocketHandler<any>
  injectHandler?: (payload: {
    req: Req
    match: Bun.MatchedRoute
    handler: any
  }) => Promise<Response | void>
  assets?: (req: Request) => Promise<Response | void>
  options?: Partial<Bun.Serve.Options<any>>
}

type ExtractRouteParams<Path extends string> =
  Path extends `${string}/:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractRouteParams<`/${Rest}`>]: string }
    : Path extends `${string}/:${infer Param}`
      ? { [K in Param]: string }
      : Path extends `/:${infer Param}`
        ? { [K in Param]: string }
        : {}

type Chain = (req: Req<any>, res: Res) => Promise<Response>

export class Http {
  private middlewares: AtomicHandler[] = []
  private routes: Record<
    string,
    Partial<Record<Method, AtomicHandler<any>[]>>
  > = {}
  private errorHandler:
    ((error: Error) => Response | Promise<Response>) | null = null
  private notFoundHandler: AtomicHandler = (_, res) =>
    res.status(404).json({
      error: 'Not found'
    })

  constructor(private config: Config) {}

  start(cb?: (server: Server<any>) => void) {
    const { appDir, websocket, injectHandler, assets } = this.config
    const middlewares = this.middlewares
    const notFound = h(...middlewares, this.notFoundHandler)
    const preflight = h(...middlewares, (_, res) => res.status(204).send())
    const fallback = h(this.notFoundHandler)
    const runMiddlewares = async (req: Req, res: Res) => {
      for (const middleware of middlewares) {
        let result = middleware(req, res)
        if (result instanceof Promise) result = await result
        if (result instanceof Response) return result
      }
    }

    const routes: Record<string, Record<string, (raw: any) => any>> = {}
    for (const [path, methods] of Object.entries(this.routes)) {
      routes[path] = {}
      for (const [method, handlers] of Object.entries(methods)) {
        const chain = h(...middlewares, ...handlers!) as Chain
        routes[path][method] = (raw: Bun.BunRequest) =>
          chain(toReq(raw), new Res())
      }
    }

    const router = appDir ? buildRouter(appDir) : null
    const chains = new Map<string, Chain>()
    let stopWatching = () => {}
    if (router && process.env.NODE_ENV !== 'production') {
      const watcher = watch(appDir!, { recursive: true }, (event) => {
        if (event !== 'rename') return
        try {
          router.reload()
        } catch {}
        chains.clear()
      })
      watcher.unref()
      stopWatching = () => watcher.close()
    }

    const server = Bun.serve({
      ...(this.config.options as any),
      port: this.config.port,
      reusePort: true,
      routes,
      websocket,
      fetch: async (raw: Request, server): Promise<Response | any> => {
        if (websocket && server.upgrade(raw)) return

        if (assets && (raw.method === 'GET' || raw.method === 'HEAD')) {
          const asset = await assets(raw)
          if (asset) return asset
        }

        const match = router?.match(raw)
        if (!match) {
          const req = toReq(raw, {})
          return raw.method === 'OPTIONS'
            ? preflight(req, new Res())
            : notFound(req, new Res())
        }

        const req = toReq(raw, match.params || {}, match.query || {})
        const res = new Res()
        const handler = await import(match.filePath)

        const halted = await runMiddlewares(req, res)
        if (halted) return res.applyTo(halted)

        const injected = await injectHandler?.({ req, match, handler })
        if (injected instanceof Response) {
          return res.applyTo(injected)
        }

        const method =
          req.method === 'HEAD' && typeof handler.HEAD !== 'function'
            ? 'GET'
            : req.method
        if (!METHODS.has(method) || typeof handler[method] !== 'function') {
          return method === 'OPTIONS'
            ? res.status(204).send()
            : fallback(req, res)
        }

        const key = `${method} ${match.filePath}`
        let chain = chains.get(key)
        if (!chain) {
          chain = h(handler[method]) as Chain
          chains.set(key, chain)
        }
        return chain(req, res)
      },
      error: async (error: Error) => {
        if (this.errorHandler) {
          return await this.errorHandler(error)
        }
        console.error(error)
        return Response.json(
          process.env.NODE_ENV === 'production'
            ? { error: 'Internal Server Error' }
            : { error: error.message, details: error.stack },
          { status: 500 }
        )
      }
    })

    const stop = server.stop.bind(server)
    server.stop = (closeActiveConnections?: boolean) => {
      stopWatching()
      return stop(closeActiveConnections)
    }

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

  route<R extends string, P = ExtractRouteParams<R>>(
    method: Method,
    route: R,
    ...handlers: AtomicHandler<P, any>[]
  ) {
    ;(this.routes[route] ??= {})[method] = handlers
    return this
  }

  get<R extends string, P = ExtractRouteParams<R>>(
    route: R,
    ...handlers: AtomicHandler<P, any>[]
  ) {
    return this.route<R, P>('GET', route, ...handlers)
  }

  post<R extends string, P = ExtractRouteParams<R>>(
    route: R,
    ...handlers: AtomicHandler<P, any>[]
  ) {
    return this.route<R, P>('POST', route, ...handlers)
  }

  put<R extends string, P = ExtractRouteParams<R>>(
    route: R,
    ...handlers: AtomicHandler<P, any>[]
  ) {
    return this.route<R, P>('PUT', route, ...handlers)
  }

  delete<R extends string, P = ExtractRouteParams<R>>(
    route: R,
    ...handlers: AtomicHandler<P, any>[]
  ) {
    return this.route<R, P>('DELETE', route, ...handlers)
  }

  patch<R extends string, P = ExtractRouteParams<R>>(
    route: R,
    ...handlers: AtomicHandler<P, any>[]
  ) {
    return this.route<R, P>('PATCH', route, ...handlers)
  }

  options<R extends string, P = ExtractRouteParams<R>>(
    route: R,
    ...handlers: AtomicHandler<P, any>[]
  ) {
    return this.route<R, P>('OPTIONS', route, ...handlers)
  }
}

export * from './app'
export * from './handler'
export * from './router'
