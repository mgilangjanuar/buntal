import type { Req, Res } from '../app'

export type AtomicHandler<
  P = Record<string, string>,
  T = unknown,
  R = Response | void | undefined | Promise<Response | void | undefined>
> = {
  (req: Req<P, T>, res: Res): R
}
