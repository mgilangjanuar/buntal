import type { Req } from '../http/request'
import type { Res } from '../http/response'

type Options = {
  origin: string | string[]
  methods: string | string[]
  allowedHeaders: string | string[]
  exposedHeaders: string | string[]
  maxAge: number
  credentials: boolean
}

export const cors = (opts: Options = {
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
  exposedHeaders: '',
  maxAge: 600,
  credentials: true
}) => {
  return async (req: Req, res: Res) => {
    if (req.method === 'OPTIONS') {
      return res.send('departed')
    }
    res.headers({
      'Access-Control-Allow-Origin': Array.isArray(opts.origin) ? opts.origin.join(', ') : opts.origin,
      'Access-Control-Allow-Methods': Array.isArray(opts.methods) ? opts.methods.join(', ') : opts.methods,
      'Access-Control-Allow-Headers': Array.isArray(opts.allowedHeaders) ? opts.allowedHeaders.join(', ') : opts.allowedHeaders,
      'Access-Control-Expose-Headers': Array.isArray(opts.exposedHeaders) ? opts.exposedHeaders.join(', ') : opts.exposedHeaders,
      'Access-Control-Max-Age': String(opts.maxAge),
      'Access-Control-Allow-Credentials': String(opts.credentials)
    })
  }
}
