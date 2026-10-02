import { secureHeaders } from '@buntal/http/middlewares'
import type { BuntalConfig } from 'buntal'

export default {
  middlewares: [
    secureHeaders({
      contentSecurityPolicy:
        "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'"
    })
  ]
} satisfies BuntalConfig
