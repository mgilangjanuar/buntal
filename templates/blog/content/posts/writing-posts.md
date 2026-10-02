---
title: Writing posts in Markdown
description: Frontmatter fields, drafts, tags and the Markdown features this template supports.
date: 2026-09-20
tags: [guide, markdown]
---

Each post starts with frontmatter:

```md
---
title: My post
description: One sentence shown in lists and search results.
date: 2026-10-01
tags: [news, bun]
cover: /covers/my-post.jpg
draft: false
---
```

| Field         | Required | Notes                                  |
| ------------- | -------- | -------------------------------------- |
| `title`       | yes      | Used for the page title and Open Graph |
| `description` | yes      | Keep it under 155 characters           |
| `date`        | yes      | Publish date, ISO format               |
| `tags`        | no       | Lowercased and turned into URLs        |
| `cover`       | no       | Image in `public/` or an absolute URL  |
| `draft`       | no       | `true` hides the post                  |

## Supported Markdown

Tables, ~~strikethrough~~, task lists and autolinks like https://buntaljs.org all work:

- [x] Write the post
- [ ] Share it

Raw HTML is escaped for safety, so `<script>` tags show up as text instead of running.
