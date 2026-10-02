import type { Req, Res } from '../app'
import type { AtomicHandler } from '../handler'

type Options = {
  origin?: string | string[]
  methods?: string | string[]
  allowedHeaders?: string | string[]
  exposedHeaders?: string | string[]
  maxAge?: number
  credentials?: boolean
}

export const cors = ({
  origin = '*',
  methods = 'GET, HEAD, PUT, PATCH, POST, DELETE',
  allowedHeaders = 'Content-Type, Authorization, X-Requested-With',
  exposedHeaders = '',
  maxAge = 600,
  credentials = true
}: Options = {}): AtomicHandler => {
  const list = (value: string | string[]) =>
    Array.isArray(value) ? value.join(', ') : value
  const allowed = Array.isArray(origin) ? new Set(origin) : null
  const headers = {
    'Access-Control-Allow-Methods': list(methods),
    'Access-Control-Allow-Headers': list(allowedHeaders),
    'Access-Control-Expose-Headers': list(exposedHeaders),
    'Access-Control-Max-Age': String(maxAge)
  }

  return (req: Req, res: Res) => {
    const requestOrigin = req.headers.get('origin')
    const allowOrigin = allowed
      ? requestOrigin && allowed.has(requestOrigin)
        ? requestOrigin
        : null
      : (origin as string)

    if (allowOrigin) {
      res.headers({
        ...headers,
        'Access-Control-Allow-Origin': allowOrigin,
        ...(credentials && allowOrigin !== '*'
          ? { 'Access-Control-Allow-Credentials': 'true' }
          : {}),
        ...(allowed ? { Vary: 'Origin' } : {})
      })
    }
    if (req.method === 'OPTIONS') {
      return res.status(204).send()
    }
  }
}
