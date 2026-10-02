export type TemplateInfo = {
  name: 'default' | 'landing' | 'blog'
  title: string
  summary: string
  features: string[]
  pages: string[]
  database: boolean
  tags: string[]
}

export const TEMPLATES: TemplateInfo[] = [
  {
    name: 'landing',
    title: 'Landing page & portfolio',
    summary:
      'A marketing site and portfolio with case studies and a contact form that saves to a database.',
    features: [
      'Hero, services, testimonials, pricing and FAQ sections',
      'Case study pages generated from typed content',
      'Contact form with validation, Origin check, rate limit and honeypot',
      'Canonical links, JSON-LD, sitemap.xml and robots.txt',
      'Content-Security-Policy through secureHeaders()'
    ],
    pages: ['/', '/projects', '/projects/[slug]', '/api/contact'],
    database: true,
    tags: ['Marketing', 'Portfolio', 'Forms', 'Database', 'SEO']
  },
  {
    name: 'blog',
    title: 'Blog',
    summary:
      'A Markdown blog: posts loaded into a SQL database, with tags, pagination and feeds.',
    features: [
      'Markdown with frontmatter, drafts and reading time',
      'Tag pages and paginated post lists',
      'RSS feed, sitemap with lastmod, BlogPosting JSON-LD',
      'Safe Markdown rendering with Bun.markdown',
      'noindex for missing posts and empty pages'
    ],
    pages: ['/', '/posts/[slug]', '/tags', '/tags/[tag]', '/rss.xml'],
    database: true,
    tags: ['Blog', 'Markdown', 'Database', 'SEO']
  },
  {
    name: 'default',
    title: 'Minimal',
    summary:
      'The smallest Buntal app: one page, a layout and Tailwind CSS, ready to grow.',
    features: [
      'Root layout with Meta tags',
      'Tailwind CSS v4',
      'ESLint and TypeScript configured'
    ],
    pages: ['/'],
    database: false,
    tags: ['Starter']
  }
]

export const SHOTS: Record<
  TemplateInfo['name'],
  { path: string; name: string }[]
> = {
  landing: [
    { path: '/', name: 'home' },
    { path: '/projects/northwind-commerce', name: 'detail' }
  ],
  blog: [
    { path: '/', name: 'home' },
    { path: '/posts/writing-posts', name: 'detail' }
  ],
  default: [{ path: '/', name: 'home' }]
}

export const shot = (
  name: TemplateInfo['name'],
  page: string,
  theme: 'light' | 'dark'
) => `/templates/${name}-${page}-${theme}.jpg`
