import { projects } from '@/content/home'
import { absoluteUrl } from '@/lib/site'
import { h } from '@buntal/http'

export const GET = h((_, res) => {
  const paths = [
    '/',
    '/projects',
    ...projects.map((p) => `/projects/${p.slug}`)
  ]
  const urls = paths
    .map((p) => `<url><loc>${absoluteUrl(p)}</loc></url>`)
    .join('')
  return res
    .headers({
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600'
    })
    .send(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`
    )
})
