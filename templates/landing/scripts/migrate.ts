import { db } from '@/lib/db'
import { migrations } from '@/lib/migrations'

await db`CREATE TABLE IF NOT EXISTS _migrations (id TEXT PRIMARY KEY, applied_at TEXT NOT NULL)`
const applied = new Set(
  (await db`SELECT id FROM _migrations`).map((row: { id: string }) => row.id)
)

for (const migration of migrations) {
  if (applied.has(migration.id)) continue
  await db.begin(async (tx) => {
    await migration.up(tx)
    await tx`INSERT INTO _migrations (id, applied_at) VALUES (${migration.id}, ${new Date().toISOString()})`
  })
  console.log(`applied ${migration.id}`)
}

console.log('database is up to date')
await db.close()
