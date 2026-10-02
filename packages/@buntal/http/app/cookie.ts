import type { Req } from './request'
import type { Res } from './response'

export type CookieOptions = {
  maxAge?: number
  expires?: Date
  path?: string
  domain?: string
  secure?: boolean
  httpOnly?: boolean
  sameSite?: 'Strict' | 'Lax' | 'None'
}

const TOKEN = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/
const ATTR = /^[\x21-\x3a\x3c-\x7e]+$/

const decode = (value: string) => {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

const parse = (header: string | null) => {
  const result: Record<string, string> = {}
  if (!header) return result
  for (const pair of header.split(';')) {
    const eq = pair.indexOf('=')
    if (eq === -1) continue
    const key = pair.slice(0, eq).trim()
    if (key && !(key in result)) {
      result[key] = decode(pair.slice(eq + 1).trim())
    }
  }
  return result
}

export const Cookie = {
  get: (req: Request, name: string) =>
    parse(req.headers.get('cookie'))[name] ?? null,
  getAll: (req: Request) => parse(req.headers.get('cookie')),
  set: (
    res: Res,
    name: string,
    value: string,
    {
      maxAge,
      expires,
      path,
      domain,
      secure,
      httpOnly,
      sameSite
    }: CookieOptions = {}
  ) => {
    if (!TOKEN.test(name)) {
      throw new TypeError(`Invalid cookie name: ${name}`)
    }
    for (const [attr, v] of [
      ['path', path],
      ['domain', domain]
    ] as const) {
      if (v !== undefined && !ATTR.test(v)) {
        throw new TypeError(`Invalid cookie ${attr}: ${v}`)
      }
    }
    if (sameSite === 'None' && secure === false) {
      throw new TypeError('SameSite=None cookies must be Secure')
    }

    let cookieString = `${name}=${encodeURIComponent(value)}`
    if (maxAge !== undefined) {
      cookieString += `; Max-Age=${Math.floor(maxAge)}`
    }
    if (expires) {
      cookieString += `; Expires=${expires.toUTCString()}`
    }
    if (path) {
      cookieString += `; Path=${path}`
    }
    if (domain) {
      cookieString += `; Domain=${domain}`
    }
    if (secure || sameSite === 'None') {
      cookieString += '; Secure'
    }
    if (httpOnly) {
      cookieString += '; HttpOnly'
    }
    if (sameSite) {
      cookieString += `; SameSite=${sameSite}`
    }
    res.headers({
      'Set-Cookie': cookieString
    })
    return cookieString
  },
  delete: (
    res: Res,
    name: string,
    options: Pick<CookieOptions, 'path' | 'domain' | 'secure' | 'sameSite'> = {}
  ) =>
    Cookie.set(res, name, '', {
      path: '/',
      ...options,
      maxAge: 0,
      expires: new Date(0)
    })
}
