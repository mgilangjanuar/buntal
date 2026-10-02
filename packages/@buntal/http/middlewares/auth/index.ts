import { Cookie, Req, Res } from '../../app'
import type { AtomicHandler } from '../../handler'
import { jwt } from './jwt'

type Strategy = 'cookie' | 'header' | 'both'

type Options<T = unknown> = {
  secret: string
  strategy?: Strategy | Strategy[]
  cookie?: {
    key: string
  }
  header?: {
    key: string
  }
  onVerified?: (
    req: Req<Record<string, string>, T>,
    res: Res,
    decoded: T
  ) => void | Response | Promise<void | Response>
}

const getToken = (req: Req, strategy: Strategy, opts: Partial<Options>) => {
  const cookieValue = Cookie.get(req, opts?.cookie?.key || 'access_token')
  const headerValue = req.headers
    .get(opts?.header?.key || 'Authorization')
    ?.replace(/^Bearer\s+/i, '')
  switch (strategy) {
    case 'cookie':
      return cookieValue
    case 'header':
      return headerValue
    case 'both':
      return cookieValue || headerValue
    default:
      return null
  }
}

export const auth = <T = unknown>(
  {
    secret,
    strategy = 'header',
    cookie = {
      key: 'access_token'
    },
    header = {
      key: 'Authorization'
    },
    onVerified
  }: Options<T> = {
    secret: process.env.JWT_SECRET || process.env.SECRET || ''
  }
): AtomicHandler<Record<string, string>, T> => {
  const verifier = jwt(secret)
  return async (req, res) => {
    if (req.method === 'OPTIONS') return

    let token: string | null | undefined

    if (Array.isArray(strategy)) {
      for (const strat of strategy) {
        token = getToken(req, strat, {
          cookie,
          header
        })
        if (token) break
      }
    } else {
      token = getToken(req, strategy, {
        cookie,
        header
      })
    }

    if (!token) {
      return res.status(401).json({
        error: 'Unauthorized'
      })
    }

    let decoded: T | null = null
    try {
      decoded = await verifier.verify<T>(token)
    } catch {
      return res.status(401).json({
        error: 'Unauthorized'
      })
    }

    req.context = decoded
    const resp = await onVerified?.(req, res, decoded)
    if (resp instanceof Response) {
      return resp
    }
  }
}

export * from './jwt'
