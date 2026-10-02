export type Project = {
  slug: string
  title: string
  summary: string
  client: string
  year: number
  role: string
  stack: string[]
  url?: string
  sections: { heading: string; body: string }[]
}

export const features = [
  {
    title: 'Product design',
    description:
      'Research, flows and interfaces that turn ideas into products people enjoy.'
  },
  {
    title: 'Web engineering',
    description:
      'Server-rendered React on Bun: fast first paint and great SEO by default.'
  },
  {
    title: 'Design systems',
    description:
      'Reusable components and tokens so your team ships consistent UI faster.'
  },
  {
    title: 'Performance',
    description:
      'Core Web Vitals audits and fixes that make every page feel instant.'
  },
  {
    title: 'Accessibility',
    description:
      'WCAG-minded builds with semantic HTML, keyboard support and good contrast.'
  },
  {
    title: 'Content & SEO',
    description:
      'Structured data, sitemaps and metadata that help people find you.'
  }
]

export const projects: Project[] = [
  {
    slug: 'northwind-commerce',
    title: 'Northwind Commerce',
    summary: 'A storefront rebuild that cut page load time in half.',
    client: 'Northwind Traders',
    year: 2026,
    role: 'Design & engineering',
    stack: ['Buntal', 'Bun', 'Postgres'],
    url: 'https://example.com',
    sections: [
      {
        heading: 'Challenge',
        body: 'The old storefront took six seconds to become interactive on mobile, and conversion was falling.'
      },
      {
        heading: 'Approach',
        body: 'We moved rendering to the server, split code per route and replaced three tracking scripts with one.'
      },
      {
        heading: 'Outcome',
        body: 'Time to interactive dropped to 2.4 seconds and checkout conversion rose by 18 percent.'
      }
    ]
  },
  {
    slug: 'lumen-docs',
    title: 'Lumen Docs',
    summary:
      'A documentation site with instant search for a developer platform.',
    client: 'Lumen Labs',
    year: 2025,
    role: 'Engineering',
    stack: ['Buntal', 'MDX', 'SQLite'],
    sections: [
      {
        heading: 'Challenge',
        body: 'Developers could not find answers across four disconnected help centers.'
      },
      {
        heading: 'Approach',
        body: 'One docs site with a shared navigation, versioned content and keyboard-first search.'
      },
      {
        heading: 'Outcome',
        body: 'Support tickets about basic setup fell by a third within two months.'
      }
    ]
  },
  {
    slug: 'harbor-brand',
    title: 'Harbor Brand Refresh',
    summary: 'A new identity and marketing site for a logistics startup.',
    client: 'Harbor',
    year: 2025,
    role: 'Brand & design',
    stack: ['Figma', 'Buntal', 'Tailwind CSS'],
    sections: [
      {
        heading: 'Challenge',
        body: 'Harbor had outgrown a template site that looked like every competitor.'
      },
      {
        heading: 'Approach',
        body: 'A distinct visual language, a flexible page system and copy written with the sales team.'
      },
      {
        heading: 'Outcome',
        body: 'Demo requests doubled in the first quarter after launch.'
      }
    ]
  }
]

export const testimonials = [
  {
    quote: 'They shipped in six weeks what we had planned for six months.',
    name: 'Dana Ruiz',
    title: 'CTO, Northwind Traders'
  },
  {
    quote: 'Our docs finally feel like part of the product.',
    name: 'Sam Okafor',
    title: 'Head of DX, Lumen Labs'
  },
  {
    quote: 'Clear communication, sharp design and zero drama.',
    name: 'Mei Lin',
    title: 'Founder, Harbor'
  }
]

export const plans = [
  {
    name: 'Starter',
    price: '$2,500',
    description: 'A focused landing page to launch or validate an idea.',
    features: ['One page', 'Copy review', 'SEO setup', 'Two revisions'],
    highlighted: false
  },
  {
    name: 'Studio',
    price: '$9,000',
    description: 'A complete marketing site with a CMS-ready structure.',
    features: [
      'Up to 8 pages',
      'Design system',
      'Blog & case studies',
      'Analytics'
    ],
    highlighted: true
  },
  {
    name: 'Partner',
    price: 'Custom',
    description: 'An ongoing team for products that keep evolving.',
    features: [
      'Dedicated team',
      'Weekly releases',
      'Performance budget',
      'Priority support'
    ],
    highlighted: false
  }
]

export const faqs = [
  {
    question: 'How long does a project take?',
    answer:
      'A landing page takes two to three weeks. A full site usually takes six to ten.'
  },
  {
    question: 'Do you work with existing brands?',
    answer: 'Yes. We can follow your brand guidelines or help evolve them.'
  },
  {
    question: 'Can we edit content ourselves?',
    answer:
      'Content lives in typed files and a database, so it is easy to connect a CMS later.'
  },
  {
    question: 'Where is the site hosted?',
    answer:
      'Anywhere Bun runs: a VPS, containers, or platforms like Fly.io and Railway.'
  }
]
