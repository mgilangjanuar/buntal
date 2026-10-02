import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Best Practices - Buntal JS',
    description:
      'Project structure, data loading, SEO, performance, accessibility, security, testing and deployment practices for Buntal apps.'
  } satisfies MetaProps
}

export default function BestPracticePage() {
  return (
    <MarkdownContent
      title="Best Practices"
      content={`## Project structure

Keep routes thin and move logic into plain modules:

\`\`\`sh
app/                 # routes only: pages, layouts, API routes
  layout.tsx
  index.tsx
  products/[slug]/index.tsx
  api/cart/index.ts
  _components/       # page-only components (folders starting with _ are not rendered as pages)
components/          # shared UI
lib/                 # data access, validation, business logic
content/             # Markdown/MDX, JSON fixtures
public/              # static files (robots.txt, images, fonts)
buntal.config.ts
\`\`\`

- One responsibility per file: a page renders, \`lib/\` fetches and validates.
- Import with the \`@/\` alias (\`@/lib/db\`) instead of long relative paths.
- Put database and secret-using code only in \`$\` loaders, API routes and \`lib/\` modules they import. Buntal strips \`$\` from the browser bundle, but components also run in the browser.
- Start from a [template](/docs/install#templates) (\`landing\`, \`blog\`) to get this structure, a \`Bun.SQL\` database layer and SEO routes out of the box.

## Data loading

- **Use \`$\` for page data**, not client-side \`fetch\` in \`useEffect\`. It renders on the server, so content is in the HTML for users and crawlers, and it is re-fetched as JSON on client navigation.
- **Query the database directly in \`$\`.** Calling your own API route from \`$\` adds a network hop for nothing.
- **Use a static \`$\` object** (\`export const $ = { _meta: {...} }\`) for pages that do not depend on the request. It is inlined into the bundle and costs nothing at request time.
- **Return a \`Response\` to redirect or deny** (\`Response.redirect(new URL('/login', req.url), 302)\`). It works on full loads and client navigation.
- **Type the props from the loader:** \`data?: Awaited<ReturnType<typeof $>>\`.
- **Handle the empty case.** \`data\` can be \`undefined\` while a client navigation is loading.

## SEO

Every Buntal page is server-rendered, so crawlers get full HTML without running JavaScript. Make the most of it:

### Titles and descriptions

Render \`<Meta>\` once in the root layout with site defaults, and override per page through \`data._meta\`:

\`\`\`tsx
// app/layout.tsx
<Meta
  title="Acme"
  description="Acme makes the best mugs."
  og={{ site_name: 'Acme', type: 'website' }}
  twitter={{ card: 'summary_large_image' }}
  {...data?._meta}
/>
\`\`\`

\`\`\`ts
// app/products/[slug]/index.tsx
export const $ = async (req: Req) => {
  const product = await getProduct(req.params.slug)
  return {
    product,
    _meta: {
      title: \`\${product.name} | Acme\`,
      description: product.summary.slice(0, 155),
      og: {
        type: 'product',
        url: \`https://acme.com/products/\${product.slug}\`,
        image: product.imageUrl
      }
    } satisfies MetaProps
  }
}
\`\`\`

- Unique \`title\` (50 to 60 characters) and \`description\` (up to about 155) on every page.
- Use absolute URLs for \`og.url\` and \`og.image\`; images ideally 1200x630.
- Set \`<html lang="...">\` in the root layout.

### Canonical URLs

React 19 hoists \`<link>\` and \`<meta>\` rendered anywhere into \`<head>\`, so a page can declare its own canonical URL. Use your public origin, not \`req.url\`, so proxies and preview hosts do not leak in:

\`\`\`tsx
<link rel="canonical" href={\`https://acme.com/products/\${data.product.slug}\`} />
\`\`\`

Pick one URL per page (with or without trailing slash, \`www\` or not) and redirect the others at your proxy or CDN.

### Structured data

Add JSON-LD for rich results. Escape \`<\` so content cannot close the script tag:

\`\`\`tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: data.product.name,
      image: data.product.imageUrl,
      offers: { '@type': 'Offer', price: data.product.price, priceCurrency: 'USD' }
    }).replace(/</g, '\\\\u003c')
  }}
/>
\`\`\`

Common types: \`Organization\` and \`WebSite\` on the home page, \`Article\` for posts, \`Product\` for store pages, \`BreadcrumbList\` for nested sections.

### Sitemap and robots.txt

Serve a sitemap from an API route so it always matches your data:

\`\`\`ts
// app/sitemap.xml/index.ts
import { h } from '@buntal/http'

const ORIGIN = 'https://acme.com'

export const GET = h(async (_, res) => {
  const paths = ['/', '/about', ...(await listProductSlugs()).map((s) => \`/products/\${s}\`)]
  const urls = paths.map((p) => \`<url><loc>\${ORIGIN}\${p}</loc></url>\`).join('')
  return res
    .headers({
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600'
    })
    .send(
      \`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\${urls}</urlset>\`
    )
})
\`\`\`

And a static \`public/robots.txt\`:

\`\`\`text
User-agent: *
Allow: /
Disallow: /admin
Sitemap: https://acme.com/sitemap.xml
\`\`\`

An RSS feed works the same way (\`app/rss.xml/index.ts\` with \`application/rss+xml\`).

### Not found and private pages

Unknown URLs render \`app/404.tsx\` with status 404. When a dynamic route's \`$\` finds nothing, the page still renders with status 200, so tell crawlers not to index it:

\`\`\`tsx
export default function ProductPage({ data }: { data?: Awaited<ReturnType<typeof $>> }) {
  if (!data?.product) {
    return (
      <>
        <meta name="robots" content="noindex" />
        <h1>Product not found</h1>
      </>
    )
  }
  // ...
}
\`\`\`

Add \`<meta name="robots" content="noindex" />\` to admin, account, cart and search-result pages too, and disallow them in \`robots.txt\`.

### Content

- One \`<h1>\` per page, then \`<h2>\`/\`<h3>\` in order.
- Descriptive link text (not "click here") and \`alt\` text on meaningful images.
- Use \`<Link>\` for internal links: it renders a real \`<a href>\` that crawlers follow.
- Human-readable URLs: \`/products/blue-mug\`, not \`/products?id=123\`.

## Performance

- **Pages are code-split.** Each route is lazy-loaded, so keep heavy libraries (editors, charts) inside the pages that need them.
- **Do less in \`$\`.** Run independent queries in parallel with \`Promise.all\`, select only needed columns, and paginate lists.
- **Cache expensive, shared data in memory** in a \`lib/\` module (with a TTL). Loader responses themselves are \`private, no-store\` by design, so do not rely on CDN caching for them.
- **Put a CDN in front of static files.** Buntal serves \`public/\` and the bundle without long cache headers; cache \`/root.js\`, chunks, fonts and images at the edge. \`/root.js\` is versioned with your \`package.json\` version, so bump it on each release.
- **Images:** set \`width\` and \`height\` to avoid layout shift, use \`loading="lazy"\` below the fold, and serve modern formats (WebP/AVIF) at the right size.
- **Fonts:** preconnect to the font host in the root layout and use \`display=swap\`, or self-host in \`public/\`.
- **Use Bun built-ins** (\`bun:sqlite\`, \`Bun.password\`, \`Bun.file\`) instead of extra dependencies.

## Accessibility

- Semantic elements: \`<header>\`, \`<nav>\`, \`<main>\`, \`<footer>\`, \`<button>\` for actions, \`<a>\`/\`<Link>\` for navigation.
- Every form input has a \`<label>\`; show errors next to the field and announce them with \`aria-live\`.
- Keep a visible focus style and make every interaction keyboard-reachable.
- Colour contrast of at least 4.5:1 for text; support dark mode with \`prefers-color-scheme\`.
- Respect \`prefers-reduced-motion\` for animations.

## Security

Follow the [Security guide](/docs/guides/security). In short:

- Validate every request body, query and param on the server.
- Session cookies: \`httpOnly\`, \`secure\`, \`sameSite: 'Lax'\`.
- \`cors({ origin: [...] })\` with an explicit allow list; \`secureHeaders()\` with a Content-Security-Policy.
- Never build file paths or SQL from raw input.
- Secrets in environment variables; only \`BUNTAL_PUBLIC_*\` reaches the browser.

## Errors and logging

- Add \`app/404.tsx\` with your branding and links back to key pages.
- In API routes, return a consistent shape: \`{ error: string, details?: unknown }\` with the right status (400, 401, 403, 404, 409, 422).
- Use \`logger()\` from \`@buntal/http/middlewares\`, and send unexpected errors to an error tracker. In production, users only see a generic message.

## Testing

- **API routes and handlers:** \`bun test\` with a server on port 0:

  \`\`\`ts
  import { expect, test } from 'bun:test'
  import { Http } from '@buntal/http'

  test('GET /ping', async () => {
    const app = new Http({ port: 0 })
    app.get('/ping', (_, res) => res.json({ pong: 1 }))
    const server = app.start()
    const resp = await fetch(\`http://localhost:\${server.port}/ping\`)
    expect(await resp.json()).toEqual({ pong: 1 })
    server.stop(true)
  })
  \`\`\`

- **Logic in \`lib/\`:** plain unit tests, no server needed.
- **Types:** run \`bunx tsc --noEmit\` in CI.
- **Pages:** check the production build with \`bun run build && bun start\` before releasing.

## Deployment

- Build with \`bun run build\` and run \`bun start\` (sets \`NODE_ENV=production\`, listens on \`PORT\`, default 3000).
- Run behind a reverse proxy or CDN that terminates TLS and sets \`x-forwarded-proto\`, so \`secureHeaders()\` can send HSTS.
- Configure secrets (\`JWT_SECRET\`, database URLs) as environment variables, never in the repo.
- Keep data files (such as SQLite databases) on a persistent volume. \`buntal start\` serves from \`.buntal/\`, so resolve relative paths from \`process.env.BUNTAL_ROOT\` (the project folder), as the templates do, and run migrations as a deploy step.
- Add a health route (\`app/api/health/index.ts\` returning \`{ ok: true }\`) for your load balancer.

## Working with AI agents

Point your agent at [/llms-full.txt](/llms-full.txt) and add this page's rules to your project's \`AGENTS.md\` or \`CLAUDE.md\`. Ready-made prompts are in [Build with AI](/docs/guides/ai).`}
      tableOfContents={[
        {
          id: 'project-structure',
          title: 'Project structure',
          level: 1,
          offset: 72
        },
        { id: 'data-loading', title: 'Data loading', level: 1, offset: 72 },
        {
          id: 'seo',
          title: 'SEO',
          level: 1,
          offset: 72,
          children: [
            {
              id: 'titles-and-descriptions',
              title: 'Titles and descriptions',
              level: 2,
              offset: 72
            },
            {
              id: 'canonical-urls',
              title: 'Canonical URLs',
              level: 2,
              offset: 72
            },
            {
              id: 'structured-data',
              title: 'Structured data',
              level: 2,
              offset: 72
            },
            {
              id: 'sitemap-and-robots-txt',
              title: 'Sitemap and robots.txt',
              level: 2,
              offset: 72
            },
            {
              id: 'not-found-and-private-pages',
              title: 'Not found and private pages',
              level: 2,
              offset: 72
            },
            { id: 'content', title: 'Content', level: 2, offset: 72 }
          ]
        },
        { id: 'performance', title: 'Performance', level: 1, offset: 72 },
        { id: 'accessibility', title: 'Accessibility', level: 1, offset: 72 },
        { id: 'security', title: 'Security', level: 1, offset: 72 },
        {
          id: 'errors-and-logging',
          title: 'Errors and logging',
          level: 1,
          offset: 72
        },
        { id: 'testing', title: 'Testing', level: 1, offset: 72 },
        { id: 'deployment', title: 'Deployment', level: 1, offset: 72 },
        {
          id: 'working-with-ai-agents',
          title: 'Working with AI agents',
          level: 1,
          offset: 72
        }
      ]}
      lastModified="2026-10-02"
    />
  )
}
