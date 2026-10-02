---
title: SQLite today, Postgres tomorrow
description: How this template uses Bun's built-in SQL client so you can switch databases with one environment variable.
date: 2026-09-12
tags: [bun, database]
---

This template talks to the database with `Bun.SQL`, the SQL client built into Bun. No ORM or driver package is needed.

```ts
import { SQL } from 'bun'

export const db = new SQL(process.env.DATABASE_URL || 'sqlite://data/app.db')

const posts =
  await db`SELECT slug, title FROM posts WHERE status = ${'published'}`
```

Values inside `${}` are sent as parameters, never pasted into the SQL string, so queries are safe from SQL injection.

## Switching to Postgres

Set `DATABASE_URL` and run the migrations again:

```sh
DATABASE_URL=postgres://user:pass@localhost:5432/blog bun run db:migrate
bun run db:seed
```

The schema in `lib/migrations.ts` only uses SQL that works on both SQLite and Postgres.
