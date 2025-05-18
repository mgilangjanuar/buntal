import { h, type AtomicHandler } from './handler'
import type { Req } from './request'
import { Res } from './response'
import { buildRouter } from './router'

type Config = {
  port: number
  appDir: string
}

export class Http {
  private middlewares: AtomicHandler[] = []

  constructor(private config: Config) {}

  start() {
    const router = buildRouter(this.config.appDir)
    const res = new Res()
    const middleware = this.middlewares || []

    const server = Bun.serve({
      port: this.config.port,
      fetch: async (req: Req) => {
        const match = router.match(req)
        if (match) {
          req.params = match.params
          req.query = match.query

          const handler = await import(match.filePath)
          if (handler[req.method]) {
            return h(handler[req.method])(req, res)
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

    return server
  }

  use(middleware: AtomicHandler) {
    this.middlewares.push(middleware)
  }
}
