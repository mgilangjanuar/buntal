import type { BodyInit } from 'bun'
import { Cookie, type CookieOptions } from './cookie'

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

  redirect(url: string, status = 302) {
    this.status(status)
    this.headers({
      location: url
    })
    return this.send()
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
      Cookie.set(this, name, value, options)
    } else {
      Cookie.delete(this, name)
    }
    return this
  }
}
