import { absoluteUrl } from '@/lib/site'
import { h } from '@buntal/http'

export const GET = h((_, res) =>
  res
    .headers({ 'cache-control': 'public, max-age=3600' })
    .text(
      `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`
    )
)
