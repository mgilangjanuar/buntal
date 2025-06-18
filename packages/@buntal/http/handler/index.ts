import type { Req, Res } from '../app'
import type { AtomicHandler } from './types'

export const h = <P = Record<string, string>, T = unknown>(
  ...handlers: AtomicHandler<P, T>[]
): AtomicHandler<P, T, Response | Promise<Response>> => {
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

export * from './types'
