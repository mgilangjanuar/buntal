import { cookie } from './cookie'

export class Req<P = Record<string, string>, T = unknown> extends Request {
  public params: P = {} as P
  public query?: Record<string, string>
  public context?: T

  get cookies() {
    return cookie.getAll(this)
  }
}
