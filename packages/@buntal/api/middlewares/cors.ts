import { type AtomicHandler, type Req, type Res } from '@/http'

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
  return async (_: Req, res: Res) => {
    res.headers({
      'Access-Control-Allow-Origin': Array.isArray(origin) ? origin.join(', ') : origin,
      'Access-Control-Allow-Methods': Array.isArray(methods) ? methods.join(', ') : methods,
      'Access-Control-Allow-Headers': Array.isArray(allowedHeaders) ? allowedHeaders.join(', ') : allowedHeaders,
      'Access-Control-Expose-Headers': Array.isArray(exposedHeaders) ? exposedHeaders.join(', ') : exposedHeaders,
      'Access-Control-Max-Age': String(maxAge),
      'Access-Control-Allow-Credentials': String(credentials)
    })
  }
}
