import type { BodyInit } from 'bun'
import { cookie, type CookieOptions } from './cookie'

export class Res {
  private options: {
    status: number
    headers: Record<string, string>
  } = {
    status: 200,
    headers: {
      'X-Powered-By': 'Buntal v0.0.1'
    }
  }

  constructor() {}

  status(status: number) {
    this.options.status = status
    return this
  }

  headers(headers: Record<string, string>) {
    this.options.headers = {
      ...(this.options.headers || {}),
      ...headers
    }
    return this
  }

  send(data?: BodyInit) {
    return new Response(data, this.options)
  }

  json(data: unknown) {
    return this.headers({
      'content-type': 'application/json'
    }).send(JSON.stringify(data))
  }

  html(data: string | ReadableStream<Uint8Array>) {
    return this.headers({
      'content-type': 'text/html'
    }).send(data)
  }

  text(data: string) {
    return this.headers({
      'content-type': 'text/plain'
    }).send(data)
  }

  cookie(name: string, value?: string | null, options?: CookieOptions) {
    if (value) {
      cookie.set(this, name, value, options)
    } else {
      cookie.delete(this, name)
    }
    return this
  }
}
