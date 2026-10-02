export const site = {
  name: 'The Buntal Blog',
  description: 'Notes on building fast, simple web apps with Bun and React.',
  url: (process.env.BUNTAL_PUBLIC_SITE_URL || 'http://localhost:3000').replace(
    /\/$/,
    ''
  ),
  author: { name: 'Jane Doe', url: 'https://example.com' },
  locale: 'en-US',
  postsPerPage: 6
}

export const absoluteUrl = (path = '/') => `${site.url}${path}`
