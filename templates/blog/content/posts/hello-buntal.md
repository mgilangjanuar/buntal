---
title: Hello, Buntal
description: Why this blog runs on Bun, React and a single SQL database.
date: 2026-09-28
tags: [buntal, bun]
---

Welcome to your new blog. Every page you see is rendered on the server by **Buntal**, so it loads fast and search engines can read it without running JavaScript.

## How posts work

Posts are Markdown files in `content/posts/`. Run the seed script to load them into the database:

```sh
bun run db:seed
```

The file name becomes the URL, so `hello-buntal.md` is served at `/posts/hello-buntal`.

## What you get

- Paginated home page and tag pages
- An RSS feed at `/rss.xml` and a sitemap at `/sitemap.xml`
- Open Graph tags, canonical links and `Article` structured data on every post
