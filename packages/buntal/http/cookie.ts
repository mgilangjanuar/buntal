import type { Req } from './request'

type CookieOptions = {
  maxAge?: number
  expires?: Date
  path?: string
  domain?: string
  secure?: boolean
  httpOnly?: boolean
  sameSite?: 'Strict' | 'Lax' | 'None'
}

export const cookie = (req: Req) => ({
  get: (name: string) => {
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
  set: (name: string, value: string, {
    maxAge,
    expires,
    path,
    domain,
    secure,
    httpOnly,
    sameSite
  }: CookieOptions = {}) => {
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
    return cookieString
  },
  delete: (name: string) => {
    return `${name}=; Max-Age=0; path=/`
  }
})
