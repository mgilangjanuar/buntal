import { db } from '@/lib/db'
import { readingMinutes } from '@/lib/markdown'
import { basename } from 'path'

type Frontmatter = {
  title?: string
  description?: string
  date?: string
  tags?: string[]
  cover?: string
  draft?: boolean
}

const unquote = (value: string) => value.replace(/^(["'])(.*)\1$/, '$2')

const parse = (raw: string): { meta: Frontmatter; body: string } => {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw)
  if (!match) return { meta: {}, body: raw }
  const meta: Record<string, unknown> = {}
  for (const line of match[1]!.split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value: unknown = unquote(line.slice(idx + 1).trim())
    if (
      typeof value === 'string' &&
      value.startsWith('[') &&
      value.endsWith(']')
    ) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((v) => unquote(v.trim()))
        .filter(Boolean)
    } else if (value === 'true' || value === 'false') {
      value = value === 'true'
    }
    meta[key] = value
  }
  return { meta: meta as Frontmatter, body: raw.slice(match[0].length) }
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')

let count = 0
for await (const file of new Bun.Glob('content/posts/*.md').scan('.')) {
  const { meta, body } = parse(await Bun.file(file).text())
  const slug = slugify(basename(file, '.md'))
  if (!meta.title || !meta.description || !meta.date) {
    throw new Error(`${file}: title, description and date are required`)
  }
  const publishedAt = new Date(meta.date).toISOString()
  const now = new Date().toISOString()
  const status = meta.draft ? 'draft' : 'published'
  const tags = [...new Set((meta.tags ?? []).map(slugify).filter(Boolean))]

  await db.begin(async (tx) => {
    await tx`
      INSERT INTO posts (id, slug, title, description, body, cover, reading_minutes, status, published_at, updated_at)
      VALUES (${crypto.randomUUID()}, ${slug}, ${meta.title}, ${meta.description}, ${body}, ${meta.cover ?? null},
              ${readingMinutes(body)}, ${status}, ${publishedAt}, ${now})
      ON CONFLICT (slug) DO UPDATE SET
        title = excluded.title, description = excluded.description, body = excluded.body,
        cover = excluded.cover, reading_minutes = excluded.reading_minutes, status = excluded.status,
        published_at = excluded.published_at, updated_at = excluded.updated_at`
    const [post]: { id: string }[] =
      await tx`SELECT id FROM posts WHERE slug = ${slug}`
    await tx`DELETE FROM post_tags WHERE post_id = ${post!.id}`
    for (const tag of tags) {
      await tx`INSERT INTO post_tags (post_id, tag) VALUES (${post!.id}, ${tag})`
    }
  })
  count++
}

console.log(`seeded ${count} posts`)
await db.close()
