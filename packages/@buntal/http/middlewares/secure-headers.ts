import type { Req, Res } from '../app'
import type { AtomicHandler } from '../handler'

type Options = {
  contentSecurityPolicy?: string | false
  frameOptions?: 'DENY' | 'SAMEORIGIN' | false
  hsts?: string | false
  referrerPolicy?: string | false
  permissionsPolicy?: string | false
}

export const secureHeaders = ({
  contentSecurityPolicy = false,
  frameOptions = 'SAMEORIGIN',
  hsts = 'max-age=15552000; includeSubDomains',
  referrerPolicy = 'strict-origin-when-cross-origin',
  permissionsPolicy = 'camera=(), microphone=(), geolocation=()'
}: Options = {}): AtomicHandler => {
  const headers: Record<string, string> = {
    'X-Content-Type-Options': 'nosniff',
    'Cross-Origin-Opener-Policy': 'same-origin'
  }
  if (contentSecurityPolicy)
    headers['Content-Security-Policy'] = contentSecurityPolicy
  if (frameOptions) headers['X-Frame-Options'] = frameOptions
  if (referrerPolicy) headers['Referrer-Policy'] = referrerPolicy
  if (permissionsPolicy) headers['Permissions-Policy'] = permissionsPolicy

  return (req: Req, res: Res) => {
    res.headers(
      hsts &&
        (req.url.startsWith('https:') ||
          req.headers.get('x-forwarded-proto') === 'https')
        ? { ...headers, 'Strict-Transport-Security': hsts }
        : headers
    )
  }
}
