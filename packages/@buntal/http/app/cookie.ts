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

export const Cookie = {
  get: (req: Req, name: string) => {
    const cookies = req.headers.get('cookie')
    if (!cookies) return null
    const cookieArray = cookies.split('; ')
    for (const cookie of cookieArray) {
      const [key, value] = cookie.split('=')
      if (key === name) {
        return decodeURIComponent(value || '')
      }
    }
    return null
  },
  getAll: (req: Req) => {
    const cookies = req.headers.get('cookie')
    if (!cookies) return {}
    const cookieArray = cookies.split('; ')
    return cookieArray.reduce(
      (acc, cookie) => {
        const [key, value] = cookie.split('=') as [string, string?]
        return { ...acc, [key]: decodeURIComponent(value || '') }
      },
      {} as Record<string, string>
    )
  },
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
    let cookieString = `${name}=${encodeURIComponent(value)}`
    if (maxAge) {
      cookieString += `; Max-Age=${maxAge}`
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
    if (secure) {
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
  delete: (res: Res, name: string) => {
    const cookieString = `${name}=; Max-Age=0; path=/`
    res.headers({
      'Set-Cookie': cookieString
    })
    return cookieString
  }
}
