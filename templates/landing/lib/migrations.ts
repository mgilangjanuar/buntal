import type { SQL } from 'bun'

export type Migration = { id: string; up: (tx: SQL) => Promise<unknown> }

export const migrations: Migration[] = [
  {
    id: '001_messages',
    up: (tx) => tx`
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TEXT NOT NULL
      )
    `
  }
]
