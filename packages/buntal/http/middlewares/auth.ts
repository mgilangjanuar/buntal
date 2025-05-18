import { cookie } from '../cookie'
import type { Req } from '../request'
import type { Res } from '../response'
import { jwt } from '../security/jwt'

type Strategy = 'cookie' | 'header' | 'query'

type Options<T = unknown> = {
  secret: string,
  strategy?: Strategy | Strategy[],
  cookie?: {
    key: string
  },
  header?: {
    key: string
  },
  query?: {
    key: string
  },
  onVerified?: (req: Req, res: Res, decoded: T) => void | Response | Promise<void | Response>
}

const getToken = (req: Req, strategy: Strategy, opts: Partial<Options>) => {
  switch (strategy) {
    case 'cookie':
      return cookie.get(req, opts?.cookie?.key || 'access_token')
    case 'header':
      return req.headers.get(opts?.header?.key || 'Authorization')?.replace(/^Bearer\ /, '')
    case 'query':
      return req.query?.[opts?.query?.key || 'token']
    default:
      return null
  }
}

export const auth = <T = unknown>({
  secret,
  strategy = 'header',
  cookie = {
    key: 'access_token'
  },
  header = {
    key: 'Authorization'
  },
  query = {
    key: 'token'
  },
  onVerified
}: Options<T> = {
  secret: process.env.JWT_SECRET || process.env.SECRET || '',
}) => {
  return async (req: Req, res: Res) => {
    let token: string | null | undefined

    if (Array.isArray(strategy)) {
      for (const strat of strategy) {
        token = getToken(req, strat, {
          cookie,
          header,
          query
        })
        if (token) break
      }
    } else {
      token = getToken(req, strategy, {
        cookie,
        header,
        query
      })
    }

    if (!token) {
      return res.status(401).json({
        error: 'Unauthorized'
      })
    }

    let decoded: T | null = null
    try {
      decoded = await jwt(secret).verify<T>(token)
    } catch (error) {
      console.error('JWT error:', error)
      return res.status(401).json({
        error: 'Unauthorized'
      })
    }

    const resp = await onVerified?.(req, res, decoded)
    if (resp instanceof Response) {
      return resp
    }
  }
}
