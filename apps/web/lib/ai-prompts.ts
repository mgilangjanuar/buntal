export type UseCase = {
  id: string
  template?: 'landing' | 'blog'
  title: string
  noun: string
  summary: string
  requirements: string[]
}

const SITE = 'https://buntaljs.org'

const BASE = `You are building a web app with Buntal JS, a full-stack React framework for Bun.
Before writing code, read ${SITE}/llms.txt and ${SITE}/llms-full.txt (including its Best practices section) and follow them exactly. Do not use Next.js, Remix or Express APIs; Buntal only looks similar.

Setup
- Scaffold with \`bun create buntal@latest <project-name> -t <template>\`, then work inside that folder.
- Run \`bun dev\` while developing and \`bun run build && bun start\` to check production.

Buntal rules
- Pages live in \`app/\`: \`app/<route>/index.tsx\` with a default-exported React component. Dynamic segments use \`[id]\`, catch-all uses \`[[...slug]]\`.
- \`app/layout.tsx\` renders <html>, <head> (with <Meta /> and <link rel="stylesheet" href="/globals.css" />) and <body>. Nested folders can have their own layout.tsx.
- Server data goes in \`export const $ = async (req) => ...\` next to the page. The page receives it as the \`data\` prop; put SEO fields in \`data._meta\`. Return a Response from \`$\` to redirect or deny.
- API routes are \`.ts\` files under \`app/api/\` exporting GET/POST/PUT/PATCH/DELETE built with \`h()\` from \`@buntal/http\`.
- Use \`<Link href>\` from \`buntal\` for internal navigation and \`useRouter()\` for programmatic navigation.
- Styling is Tailwind CSS v4 in \`app/globals.css\`. Static files go in \`public/\`.
- Global middlewares (auth, cors, secureHeaders, logger) go in \`buntal.config.ts\` under \`middlewares\`.
- Secrets come from environment variables. Only \`BUNTAL_PUBLIC_*\` variables reach the browser.

Quality bar
- TypeScript strict, no \`any\` where a type is known. Run \`bunx tsc --noEmit\` before finishing.
- Responsive, accessible (semantic HTML, labels, alt text, keyboard focus), light and dark mode.
- SEO on public pages: unique title and description in \`_meta\`, Open Graph tags, a canonical link, JSON-LD where it fits, \`app/sitemap.xml/index.ts\` and \`public/robots.txt\`; \`noindex\` on private and not-found pages.
- Validate every request body on the server; never trust client input.
- Keep dependencies minimal; prefer Bun built-ins: \`Bun.SQL\` for the database (SQLite by default, Postgres via DATABASE_URL), Bun.password, Bun.file, Bun.markdown.
- Finish with a short README: what was built, how to run it, required env vars.`

export const USE_CASES: UseCase[] = [
  {
    id: 'landing',
    template: 'landing',
    title: 'Landing page',
    noun: 'a landing page',
    summary: 'Marketing site with hero, features, pricing and a waitlist.',
    requirements: [
      'Single page at `/` with sections: hero with primary CTA, social proof, features grid, pricing table (3 tiers), FAQ accordion, footer.',
      'Waitlist form that POSTs to `app/api/waitlist/index.ts`; validate the email server-side and store it with Bun.SQL (SQLite in `data/app.db`).',
      'Full SEO via `$` and `_meta`: title, description, Open Graph and Twitter card tags, plus `public/robots.txt`.',
      'Smooth in-page anchor navigation with `<Link href="#pricing">`.',
      'Lighthouse-friendly: no layout shift, lazy-loaded images, system or Google fonts preconnected in the layout.'
    ]
  },
  {
    id: 'docs',
    title: 'Docs website',
    noun: 'a docs website',
    summary: 'Documentation site rendered from MDX with sidebar and search.',
    requirements: [
      'Content as `.mdx` files in `content/docs/`, rendered by a catch-all page `app/docs/[[...slug]]/index.tsx` whose `$` loads and compiles the file.',
      'Resolve the slug safely: reject any path that resolves outside `content/docs/` and return 404 data for missing files.',
      'Docs layout `app/docs/layout.tsx` with a sidebar generated from the folder structure, active link highlighting, and a table of contents from headings.',
      'Client-side search over titles and headings (build a JSON index at request time and cache it in memory).',
      'Previous/next links, copy buttons on code blocks, and `_meta` per page from MDX frontmatter.'
    ]
  },
  {
    id: 'blog',
    template: 'blog',
    title: 'Blog',
    noun: 'a blog',
    summary: 'MDX blog with tags, RSS feed and reading time.',
    requirements: [
      'Posts as `.mdx` files with frontmatter (title, description, date, tags, cover) in `content/posts/`.',
      'Pages: `/` (latest posts, paginated with `?page=`), `/posts/[slug]`, `/tags/[tag]`.',
      'RSS feed at `app/rss.xml/index.ts` exporting GET that returns `application/rss+xml`.',
      'Reading time, published date formatting, and per-post Open Graph `_meta`.',
      'Guard the slug against path traversal; unknown slugs render the 404 page.'
    ]
  },
  {
    id: 'cms',
    title: 'CMS',
    noun: 'a CMS',
    summary: 'Admin panel to manage pages and posts, with a public site.',
    requirements: [
      'Bun.SQL schema (SQLite by default, Postgres-compatible) for users, pages and posts (title, slug, body as Markdown, status draft/published, timestamps). Write a migration script in `scripts/migrate.ts`.',
      'Auth: `/login` form posting to `app/api/auth/login/index.ts`; hash passwords with `Bun.password`; issue a JWT with `jwt(secret).sign()` in an httpOnly, secure, SameSite=Lax cookie.',
      'Protect `/admin/**` and `/api/admin/**` by checking the token in the `$` loader (return a redirect Response) and with the `auth()` middleware on API routes.',
      'Admin UI: list with search and status filter, create/edit form with Markdown preview, delete with confirmation, slug uniqueness checks.',
      'Public pages `/[slug]` render only published content; drafts return 404.',
      'CSRF-safe mutations (SameSite cookie plus checking the Origin header on POST/PUT/DELETE).'
    ]
  },
  {
    id: 'ecommerce',
    title: 'E-commerce store',
    noun: 'an e-commerce store',
    summary: 'Product catalog, cart and checkout with order history.',
    requirements: [
      'Bun.SQL tables (SQLite by default, Postgres-compatible) for products (with variants and stock), carts, orders and order items; seed 12 sample products.',
      'Pages: `/` (featured), `/products` (filters by category and price, sort, pagination via query), `/products/[slug]`, `/cart`, `/checkout`, `/orders/[id]`.',
      'Cart stored server-side and keyed by an httpOnly cookie; API routes under `app/api/cart/` to add, update and remove items.',
      'Checkout recalculates prices and stock on the server inside a transaction; never trust prices from the client.',
      'Payment through a provider adapter interface with a mock implementation (Stripe-ready), configured via env vars.',
      'Product `_meta` with Open Graph images and JSON-LD Product structured data.'
    ]
  },
  {
    id: 'dashboard',
    title: 'SaaS dashboard',
    noun: 'a SaaS dashboard',
    summary: 'Authenticated app with teams, charts and settings.',
    requirements: [
      'Sign up, log in and log out with `Bun.password` and JWT cookies; `auth()` from `@buntal/http/middlewares` on all `/api/app/**` routes.',
      'Multi-tenant data: every query is scoped by the user’s team id taken from the verified token, never from the request body.',
      'Dashboard home with KPI cards and a line chart (inline SVG, no chart library), a data table with sorting and pagination, and a settings page.',
      'App shell layout `app/app/layout.tsx` with sidebar, top bar, user menu and dark-mode toggle.',
      'Enable `secureHeaders()` and a strict Content-Security-Policy in `buntal.config.ts`.'
    ]
  },
  {
    id: 'api',
    title: 'REST API',
    noun: 'a REST API',
    summary: 'Standalone JSON API with @buntal/http, no React.',
    requirements: [
      'Use only `@buntal/http` (no `buntal` package): `new Http({ port, appDir: "./app" })` in `index.ts` with file routes under `app/`.',
      'Resource: tasks with CRUD at `/tasks` and `/tasks/[id]`, backed by Bun.SQL; consistent JSON error shape `{ error, details? }`.',
      'Validation for every body and query param; 400 on invalid input, 404 on missing rows.',
      'JWT auth with `auth()` and `jwt()`, `cors({ origin: [...] })` with an explicit allow list, `secureHeaders()`, and `logger()`.',
      'Tests with `bun test` that start the server on port 0 and cover happy paths, validation and auth.'
    ]
  },
  {
    id: 'portfolio',
    template: 'landing',
    title: 'Portfolio',
    noun: 'a portfolio site',
    summary: 'Personal site with projects, writing and a contact form.',
    requirements: [
      'Pages: `/` (intro, selected work), `/projects`, `/projects/[slug]` (case study), `/about`, `/contact`.',
      'Projects defined in `content/projects.ts` as typed data; static `$` objects for pages that do not need the request.',
      'Contact form POSTing to `app/api/contact/index.ts` with validation, a honeypot field and simple per-IP rate limiting in memory.',
      'Tasteful motion with CSS transitions only, respecting `prefers-reduced-motion`.',
      'Per-page `_meta` and an Open Graph image in `public/`.'
    ]
  }
]

export const buildPrompt = (useCase: UseCase, projectName = 'my-app') =>
  `Build ${useCase.noun} with Buntal JS: ${useCase.summary}

${BASE.replace('<project-name>', projectName).replace('<template>', useCase.template ?? 'default')}${
    useCase.template
      ? `\n\nStart from the \`${useCase.template}\` template: it already has the page structure, a Bun.SQL data layer with migrations, and SEO routes. Read its README, then adapt it rather than rebuilding from scratch.`
      : ''
  }

What to build
${useCase.requirements.map((r) => `- ${r}`).join('\n')}

Work in small steps, run the app after each step, and fix every type error and console error before moving on.`
