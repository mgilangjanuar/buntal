export const site = {
  name: 'Acme Studio',
  tagline: 'Design and engineering for fast, accessible websites.',
  description:
    'Acme Studio designs and builds fast, accessible websites and products for ambitious teams.',
  url: (process.env.BUNTAL_PUBLIC_SITE_URL || 'http://localhost:3000').replace(
    /\/$/,
    ''
  ),
  email: 'hello@acme.dev',
  ogImage: undefined as string | undefined,
  nav: [
    { label: 'Work', href: '/projects' },
    { label: 'Services', href: '/#features' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Contact', href: '/#contact' }
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'X', href: 'https://x.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' }
  ]
}

export const absoluteUrl = (path = '/') => `${site.url}${path}`
