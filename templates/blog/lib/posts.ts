import { db } from '@/lib/db'
import { renderMarkdown } from '@/lib/markdown'

export type PostSummary = {
  slug: string
  title: string
  description: string
  cover: string | null
  publishedAt: string
  readingMinutes: number
  tags: string[]
}

export type Post = PostSummary & { html: string; updatedAt: string }

export type Page<T> = {
  items: T[]
  page: number
  totalPages: number
  total: number
}

type Row = {
  id: string
  slug: string
  title: string
  description: string
  cover: string | null
  published_at: string
  updated_at: string
  reading_minutes: number
  body?: string
}

const tagsFor = async (ids: string[]) => {
  const map = new Map<string, string[]>()
  if (!ids.length) return map
  const rows: { post_id: string; tag: string }[] =
    await db`SELECT post_id, tag FROM post_tags WHERE post_id IN ${db(ids)} ORDER BY tag`
  for (const row of rows) {
    map.set(row.post_id, [...(map.get(row.post_id) ?? []), row.tag])
  }
  return map
}

const toSummaries = async (rows: Row[]): Promise<PostSummary[]> => {
  const tags = await tagsFor(rows.map((r) => r.id))
  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    description: r.description,
    cover: r.cover,
    publishedAt: r.published_at,
    readingMinutes: Number(r.reading_minutes),
    tags: tags.get(r.id) ?? []
  }))
}

export const parsePage = (value: unknown) => {
  const page = Number(value ?? 1)
  return Number.isInteger(page) && page > 0 ? page : 1
}

export async function listPosts({
  page = 1,
  perPage,
  tag
}: {
  page?: number
  perPage: number
  tag?: string
}): Promise<Page<PostSummary>> {
  const offset = (page - 1) * perPage
  const [rows, [count]] = await Promise.all([
    tag
      ? db`
          SELECT p.id, p.slug, p.title, p.description, p.cover, p.published_at, p.updated_at, p.reading_minutes
          FROM posts p JOIN post_tags t ON t.post_id = p.id
          WHERE p.status = 'published' AND t.tag = ${tag}
          ORDER BY p.published_at DESC LIMIT ${perPage} OFFSET ${offset}`
      : db`
          SELECT id, slug, title, description, cover, published_at, updated_at, reading_minutes
          FROM posts WHERE status = 'published'
          ORDER BY published_at DESC LIMIT ${perPage} OFFSET ${offset}`,
    tag
      ? db`SELECT COUNT(*) AS n FROM posts p JOIN post_tags t ON t.post_id = p.id WHERE p.status = 'published' AND t.tag = ${tag}`
      : db`SELECT COUNT(*) AS n FROM posts WHERE status = 'published'`
  ])
  const total = Number(count?.n ?? 0)
  return {
    items: await toSummaries(rows),
    page,
    total,
    totalPages: Math.max(1, Math.ceil(total / perPage))
  }
}

const rendered = new Map<string, string>()

export async function getPost(slug: string): Promise<Post | null> {
  const [row]: Row[] = await db`
    SELECT id, slug, title, description, body, cover, published_at, updated_at, reading_minutes
    FROM posts WHERE slug = ${slug} AND status = 'published' LIMIT 1`
  if (!row) return null
  const key = `${row.slug}:${row.updated_at}`
  let html = rendered.get(key)
  if (!html) {
    html = renderMarkdown(row.body ?? '')
    rendered.set(key, html)
  }
  const [summary] = await toSummaries([row])
  return { ...summary!, html, updatedAt: row.updated_at }
}

export async function listTags(): Promise<{ tag: string; count: number }[]> {
  const rows: { tag: string; n: number }[] = await db`
    SELECT t.tag, COUNT(*) AS n FROM post_tags t JOIN posts p ON p.id = t.post_id
    WHERE p.status = 'published' GROUP BY t.tag ORDER BY n DESC, t.tag`
  return rows.map((r) => ({ tag: r.tag, count: Number(r.n) }))
}

export async function listAllForFeeds(): Promise<
  (PostSummary & { updatedAt: string })[]
> {
  const rows: Row[] = await db`
    SELECT id, slug, title, description, cover, published_at, updated_at, reading_minutes
    FROM posts WHERE status = 'published' ORDER BY published_at DESC`
  const summaries = await toSummaries(rows)
  return summaries.map((s, i) => ({ ...s, updatedAt: rows[i]!.updated_at }))
}
