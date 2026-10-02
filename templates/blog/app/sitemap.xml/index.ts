import { listAllForFeeds, listTags } from '@/lib/posts'
import { absoluteUrl } from '@/lib/site'
import { escapeXml } from '@/lib/xml'
import { h } from '@buntal/http'

export const GET = h(async (_, res) => {
  const [posts, tags] = await Promise.all([listAllForFeeds(), listTags()])
  const entries = [
    { loc: absoluteUrl('/'), lastmod: posts[0]?.updatedAt },
    { loc: absoluteUrl('/tags') },
    ...posts.map((p) => ({
      loc: absoluteUrl(`/posts/${p.slug}`),
      lastmod: p.updatedAt
    })),
    ...tags.map((t) => ({
      loc: absoluteUrl(`/tags/${encodeURIComponent(t.tag)}`)
    }))
  ]
  const urls = entries
    .map(
      (e) =>
        `<url><loc>${escapeXml(e.loc)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`
    )
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
