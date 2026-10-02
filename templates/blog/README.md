# Blog

A Markdown blog built with [Buntal](https://buntaljs.org). Posts live in a SQL database, loaded from Markdown files, with tags, pagination, RSS, a sitemap and structured data.

## Getting started

```sh
bun run db:migrate   # create tables (done for you by create-buntal)
bun run db:seed      # load content/posts/*.md into the database
bun dev              # http://localhost:3000
```

## Writing posts

Add a Markdown file to `content/posts/` and run `bun run db:seed` again. The file name is the URL: `my-post.md` is served at `/posts/my-post`.

```md
---
title: My post
description: One sentence for lists, search results and social cards.
date: 2026-10-01
tags: [bun, react]
cover: /covers/my-post.jpg
draft: false
---

Your post in Markdown.
```

Seeding is idempotent: existing posts are updated by slug and their tags replaced. `draft: true` keeps a post out of every page, the feed and the sitemap.

Markdown is rendered with Bun's built-in `Bun.markdown`. Tables, task lists, strikethrough, autolinks and heading anchors are on. Raw HTML is escaped and `javascript:` links are removed, so posts cannot inject scripts.

## Structure

| Path                                               | Purpose                                |
| -------------------------------------------------- | -------------------------------------- |
| `lib/site.ts`                                      | Blog name, URL, author, posts per page |
| `lib/posts.ts`                                     | All database queries                   |
| `lib/migrations.ts`                                | Schema (posts, post_tags)              |
| `scripts/seed.ts`                                  | Markdown files to database             |
| `app/index.tsx`                                    | Paginated post list (`?page=2`)        |
| `app/posts/[slug]/index.tsx`                       | Post page                              |
| `app/tags/`                                        | Tag index and tag pages                |
| `app/rss.xml`, `app/sitemap.xml`, `app/robots.txt` | Feeds for readers and crawlers         |

## Database

`lib/db.ts` uses `Bun.SQL`, Bun's built-in SQL client; there is no ORM to install. `DATABASE_URL` defaults to `sqlite://data/app.db` (resolved from the project folder). For Postgres, set `DATABASE_URL=postgres://user:pass@host:5432/blog` and run `bun run db:migrate && bun run db:seed`. The schema only uses SQL that works on both.

Page data is loaded in each page's `$` loader on the server. Buntal strips `$` and its imports from the browser bundle, so database code never ships to the client.

## SEO

- Unique `title`, `description` and Open Graph tags per post, `og:type=article`, cover images as `og:image`
- Canonical links (including paginated pages), `Blog` and `BlogPosting` JSON-LD
- `/rss.xml` (linked from every page), `/sitemap.xml` with `lastmod`, `/robots.txt`
- `noindex` on missing posts, empty tags and out-of-range pages

Set `BUNTAL_PUBLIC_SITE_URL` in `.env` to your public URL.

## Production

```sh
bun run build
bun start
```

Run `db:migrate` (and `db:seed` when content changes) as a deploy step. Keep the SQLite file on a persistent volume or use Postgres, and exclude `data/` from container images.
