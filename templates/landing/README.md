# Landing page / portfolio

A marketing site and portfolio built with [Buntal](https://buntaljs.org): hero, services, case studies, testimonials, pricing, FAQ and a contact form saved to a database.

## Getting started

```sh
bun run db:migrate   # create the database tables (done for you by create-buntal)
bun dev              # http://localhost:3000
```

## Customize

| What                                           | Where                               |
| ---------------------------------------------- | ----------------------------------- |
| Site name, URL, navigation, social links       | `lib/site.ts`                       |
| Services, projects, testimonials, pricing, FAQ | `content/home.ts`                   |
| Home page sections                             | `app/index.tsx`                     |
| Case study page                                | `app/projects/[slug]/index.tsx`     |
| Colors and fonts                               | `app/globals.css` (Tailwind CSS v4) |

Set `BUNTAL_PUBLIC_SITE_URL` in `.env` to your public URL so canonical links, Open Graph tags and the sitemap point to the right domain. To add an Open Graph image, put a 1200x630 PNG in `public/` and set `ogImage` in `lib/site.ts`.

## Contact form

`app/api/contact/index.ts` validates input on the server, rejects cross-site posts (Origin check), rate-limits by IP, ignores bots through a hidden honeypot field, and stores messages in the `messages` table. Read them with any SQLite client, or add an admin page.

## Database

`lib/db.ts` uses `Bun.SQL`, Bun's built-in SQL client, so there is no ORM or driver to install. Queries are tagged templates and every `${value}` is sent as a parameter:

```ts
await db`INSERT INTO messages (id, name) VALUES (${crypto.randomUUID()}, ${name})`
```

- `DATABASE_URL` defaults to `sqlite://data/app.db`, resolved from the project folder in dev and production.
- Switch to Postgres with `DATABASE_URL=postgres://user:pass@host:5432/db`, then run `bun run db:migrate`.
- Add schema changes as new entries in `lib/migrations.ts`; applied migrations are tracked in `_migrations`.

## SEO

- Per-page `title`, `description` and Open Graph tags through `$` and `_meta`
- Canonical links, `Organization`/`WebSite` and `CreativeWork` JSON-LD (`components/seo.tsx`)
- `/sitemap.xml` and `/robots.txt` generated from your content
- `noindex` on not-found pages, a custom `app/404.tsx`

## Production

```sh
bun run build
bun start            # NODE_ENV=production, PORT defaults to 3000
```

Run migrations as a deploy step before starting the new version. `secureHeaders()` with a Content-Security-Policy is enabled in `buntal.config.ts`; adjust the policy if you add third-party scripts or fonts. Keep the SQLite file on a persistent volume (or use an absolute `DATABASE_URL`), and exclude `data/` from container images.
