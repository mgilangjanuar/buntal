import { listAllForFeeds } from '@/lib/posts'
import { absoluteUrl, site } from '@/lib/site'
import { escapeXml } from '@/lib/xml'
import { h } from '@buntal/http'

export const GET = h(async (_, res) => {
  const posts = (await listAllForFeeds()).slice(0, 20)
  const items = posts
    .map(
      (p) => `<item>
  <title>${escapeXml(p.title)}</title>
  <link>${absoluteUrl(`/posts/${p.slug}`)}</link>
  <guid isPermaLink="true">${absoluteUrl(`/posts/${p.slug}`)}</guid>
  <description>${escapeXml(p.description)}</description>
  <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
${p.tags.map((t) => `  <category>${escapeXml(t)}</category>`).join('\n')}
</item>`
    )
    .join('\n')
  return res.headers({
    'content-type': 'application/rss+xml; charset=utf-8',
    'cache-control': 'public, max-age=900'
  }).send(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(site.name)}</title>
  <link>${site.url}</link>
  <description>${escapeXml(site.description)}</description>
  <atom:link href="${absoluteUrl('/rss.xml')}" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>`)
})
