import type { Req } from './request'
import { Res } from './response'

export type AtomicHandler<P = Record<string, string>, T = unknown> = {
  (req: Req<P, T>, res: Res): Response | Promise<Response>
}

export type AtomicHandlerWithVoid<P = Record<string, string>, T = unknown> = {
  (req: Req<P, T>, res: Res): Response | void | undefined | Promise<Response | void | undefined>
}

export const h = <P = Record<string, string>, T = unknown>(...handlers: AtomicHandlerWithVoid<P, T>[]): AtomicHandler<P, T> => {
  return async (req: Req<P, T>, res: Res) => {
    for (const handler of handlers) {
      const result = await handler(req, res)
      if (result instanceof Response) {
        return result
      }
    }
    return res.status(204).send()
  }
}
