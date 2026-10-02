# Buntal templates

Starter projects used by `create-buntal`:

```sh
bun create buntal@latest my-app              # asks which template to use
bun create buntal@latest my-app --template landing   # or pick one directly
```

| Template               | What you get                                                                                    |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| [`default`](./default) | Minimal starter with Tailwind CSS                                                               |
| [`landing`](./landing) | Landing page and portfolio: sections, case studies, contact form stored in a database, full SEO |
| [`blog`](./blog)       | Markdown blog: posts in a database, tags, pagination, RSS, sitemap, structured data             |

## Conventions for new templates

Each folder is a complete, runnable Buntal app. To add one:

1. Create `templates/<name>/` with `package.json` (dependencies on `latest`), `tsconfig.json`, `app/` and a `README.md`.
2. Name the git ignore file `_gitignore`; `create-buntal` renames it, because npm drops `.gitignore` files from packages.
3. Put configuration in `.env.example`; it is copied to `.env` on create.
4. If the template needs a database, use `Bun.SQL` in `lib/db.ts` and expose `db:migrate` (and optionally `db:seed`) scripts. `create-buntal` runs them after install.
5. Register the template in `packages/create-buntal/cmd/default.ts` (`TEMPLATES`).
6. Check it: `bun install && bun run typecheck && bun run build && bun start`.

Templates are copied into the `create-buntal` package at publish time (`prepack`), so the version on npm always matches this folder.
