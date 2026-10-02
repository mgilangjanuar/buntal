import type { SQL } from 'bun'

export type Migration = { id: string; up: (tx: SQL) => Promise<unknown> }

export const migrations: Migration[] = [
  {
    id: '001_posts',
    up: async (tx) => {
      await tx`
        CREATE TABLE IF NOT EXISTS posts (
          id TEXT PRIMARY KEY,
          slug TEXT NOT NULL UNIQUE,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          body TEXT NOT NULL,
          cover TEXT,
          reading_minutes INTEGER NOT NULL DEFAULT 1,
          status TEXT NOT NULL DEFAULT 'draft',
          published_at TEXT,
          updated_at TEXT NOT NULL
        )
      `
      await tx`CREATE INDEX IF NOT EXISTS posts_published ON posts (status, published_at)`
      await tx`
        CREATE TABLE IF NOT EXISTS post_tags (
          post_id TEXT NOT NULL REFERENCES posts (id) ON DELETE CASCADE,
          tag TEXT NOT NULL,
          PRIMARY KEY (post_id, tag)
        )
      `
      await tx`CREATE INDEX IF NOT EXISTS post_tags_tag ON post_tags (tag)`
    }
  }
]
