import { Cookie } from './cookie'

export class Req<P = Record<string, string>, T = unknown> extends Request {
  public params: P = {} as P
  public query?: Record<string, string>
  public context?: T

  get cookies() {
    return Cookie.getAll(this)
  }
}

const lazy = <V>(target: object, key: string, get: () => V) =>
  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: true,
    get() {
      const value = get()
      Object.defineProperty(target, key, {
        configurable: true,
        enumerable: true,
        writable: true,
        value
      })
      return value
    }
  })

export const toReq = <P = Record<string, string>>(
  raw: Request,
  params?: P,
  query?: Record<string, string>
) => {
  const req = raw as Req<P>
  if (params) req.params = params
  if (query) {
    req.query = query
  } else {
    lazy(req, 'query', () => Object.fromEntries(new URL(raw.url).searchParams))
  }
  lazy(req, 'cookies', () => Cookie.getAll(raw))
  return req
}
