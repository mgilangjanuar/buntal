import { Cookie, type CookieOptions } from './cookie'

const owners = new WeakMap<Response, Res>()

export class Res {
  private _status = 200
  private _headers?: Headers

  status(status: number) {
    this._status = status
    return this
  }

  headers(headers: Record<string, string>) {
    const target = (this._headers ??= new Headers())
    for (const key in headers) {
      if (key.toLowerCase() === 'set-cookie') {
        target.append(key, headers[key]!)
      } else {
        target.set(key, headers[key]!)
      }
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

  private own(response: Response) {
    if (this._headers) owners.set(response, this)
    return response
  }

  send(data?: ConstructorParameters<typeof Response>[0]) {
    return this.own(
      new Response(data, { status: this._status, headers: this._headers })
    )
  }

  json(data: unknown) {
    return this.own(
      Response.json(data, {
        status: this._status,
        headers: this._headers
      })
    )
  }

  html(data: string | ReadableStream<Uint8Array>) {
    return this.headers({
      'content-type': 'text/html; charset=utf-8'
    }).send(data)
  }

  text(data: string) {
    return this.headers({
      'content-type': 'text/plain; charset=utf-8'
    }).send(data)
  }

  applyTo(response: Response) {
    if (!this._headers || owners.get(response) === this) return response
    let target = response
    try {
      this.copyHeaders(target.headers)
    } catch {
      target = new Response(response.body, response)
      this.copyHeaders(target.headers)
    }
    return target
  }

  private copyHeaders(target: Headers) {
    for (const [key, value] of this._headers!) {
      if (key !== 'set-cookie' && !target.has(key)) target.set(key, value)
    }
    for (const cookie of this._headers!.getSetCookie()) {
      target.append('set-cookie', cookie)
    }
  }

  cookie(name: string, value?: string | null, options?: CookieOptions) {
    if (value) {
      Cookie.set(this, name, value, options)
    } else {
      Cookie.delete(this, name, options)
    }
    return this
  }
}
