import type { Req } from './request'
import { Res } from './response'

export type AtomicHandler = {
  (req: Req, res: Res): Response | Promise<Response>
}

export type AtomicHandlerWithVoid = {
  (req: Req, res: Res): Response | Promise<Response> | void | Promise<void>
}

export const h = (...handlers: AtomicHandlerWithVoid[]): AtomicHandler => {
  return async (req: Req, res: Res) => {
    for (const handler of handlers) {
      const result = await handler(req, res)
      if (result instanceof Response) {
        return result
      }
    }
    return res.status(204).send()
  }
}
