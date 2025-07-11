export interface SearchItem {
  id: string
  title: string
  url: string
  type: 'docs' | 'reference'
  category: string
  description: string
  content?: string // Add actual content for better search
  keywords: string[]
  breadcrumb: string[]
}

// Extract menu items recursively and flatten to search items
type MenuItem = { title: string; href?: string; items?: MenuItem[] }

function extractMenuItems(
  items: MenuItem[],
  type: 'docs' | 'reference',
  parentBreadcrumb: string[] = []
): SearchItem[] {
  const searchItems: SearchItem[] = []

  for (const item of items) {
    const breadcrumb = [...parentBreadcrumb, item.title]

    if (item.href) {
      // Create search item for this menu item
      const searchItem: SearchItem = {
        id: item.href,
        title: item.title,
        url: item.href,
        type,
        category: getCategory(item.href, type),
        description: getDescription(item.title, item.href, type),
        keywords: generateKeywords(item.title, item.href),
        breadcrumb
      }
      searchItems.push(searchItem)
    }

    // Recursively process nested items
    if (item.items) {
      searchItems.push(...extractMenuItems(item.items, type, breadcrumb))
    }
  }

  return searchItems
}

function getCategory(href: string, type: 'docs' | 'reference'): string {
  if (type === 'docs') {
    if (href.includes('/guides/')) return 'Guides'
    if (href.includes('/install')) return 'Installation'
    return 'Documentation'
  }

  if (href.includes('/http/')) return 'HTTP Server'
  if (href.includes('/buntal/')) return 'React Components'
  return 'API Reference'
}

function getDescription(
  title: string,
  href: string,
  type: 'docs' | 'reference'
): string {
  if (type === 'docs') {
    const descriptions: Record<string, string> = {
      'Get Started': 'Introduction to Buntal JS framework and basic concepts',
      Installation: 'How to install and set up Buntal JS in your project',
      'HTTP Server': 'Learn how to create HTTP servers with Buntal',
      'Full-stack Web': 'Build full-stack web applications with React and SSR'
    }
    return descriptions[title] || `${title} documentation`
  }

  // Reference descriptions
  if (href.includes('/http/')) {
    const apiDescriptions: Record<string, string> = {
      Http: 'Core HTTP server functionality and request handling',
      Req: 'HTTP request object properties and methods',
      Res: 'HTTP response object for sending data to clients',
      Cookie: 'Cookie management utilities for HTTP requests',
      h: 'HTTP handler utilities for request processing',
      buildRouter: 'Router builder for defining HTTP routes',
      auth: 'Authentication middleware for protecting routes',
      cors: 'Cross-Origin Resource Sharing middleware',
      logger: 'Request logging middleware for debugging',
      AtomicHandler: 'Type definition for atomic HTTP handlers',
      CookieOptions: 'Configuration options for HTTP cookies'
    }
    return apiDescriptions[title] || `${title} API reference`
  }

  if (href.includes('/buntal/')) {
    const componentDescriptions: Record<string, string> = {
      BuntalConfig: 'Configuration options for Buntal applications',
      App: 'Root application component wrapper',
      Link: 'Navigation link component with routing',
      Meta: 'HTML meta tags management component',
      Script: 'Script loading and management component',
      Svg: 'SVG component for inline graphics',
      useRouter: 'React hook for accessing routing functionality'
    }
    return componentDescriptions[title] || `${title} API reference`
  }

  return `${title} API reference`
}

function generateKeywords(title: string, href: string): string[] {
  const keywords = [title.toLowerCase()]

  // Add URL segments as keywords
  const urlParts = href
    .split('/')
    .filter((part) => part && part !== 'docs' && part !== 'references')
  keywords.push(...urlParts)

  // Add common aliases and related terms
  const aliases: Record<string, string[]> = {
    http: ['server', 'api', 'endpoint', 'request', 'response'],
    req: ['request', 'http', 'input'],
    res: ['response', 'http', 'output'],
    router: ['routing', 'routes', 'navigation'],
    auth: ['authentication', 'login', 'security'],
    cors: ['cross-origin', 'headers'],
    cookie: ['session', 'storage'],
    app: ['application', 'root', 'main'],
    link: ['navigation', 'routing', 'anchor'],
    meta: ['head', 'seo', 'metadata'],
    script: ['javascript', 'loading'],
    useRouter: ['hook', 'navigation', 'routing']
  }

  const titleLower = title.toLowerCase()
  if (aliases[titleLower]) {
    keywords.push(...aliases[titleLower])
  }

  return [...new Set(keywords)] // Remove duplicates
}

// References menu items (from references/layout.tsx)
const REFERENCES_MENUS = [
  {
    title: 'Overview',
    href: '/references'
  },
  {
    title: '@buntal/http',
    items: [
      {
        title: 'Http',
        href: '/references/http'
      },
      {
        title: 'app',
        items: [
          {
            title: 'Req',
            href: '/references/http/app/req'
          },
          {
            title: 'Res',
            href: '/references/http/app/res'
          },
          {
            title: 'Cookie',
            href: '/references/http/app/cookie'
          }
        ]
      },
      {
        title: 'handler',
        items: [
          {
            title: 'h',
            href: '/references/http/handler/h'
          }
        ]
      },
      {
        title: 'router',
        items: [
          {
            title: 'buildRouter',
            href: '/references/http/router/build-router'
          }
        ]
      },
      {
        title: 'middlewares',
        items: [
          {
            title: 'auth',
            href: '/references/http/middlewares/auth'
          },
          {
            title: 'cors',
            href: '/references/http/middlewares/cors'
          },
          {
            title: 'logger',
            href: '/references/http/middlewares/logger'
          }
        ]
      },
      {
        title: 'types',
        items: [
          {
            title: 'AtomicHandler',
            href: '/references/http/types/atomic-handler'
          },
          {
            title: 'CookieOptions',
            href: '/references/http/types/cookie-options'
          }
        ]
      }
    ]
  },
  {
    title: 'buntal',
    items: [
      {
        title: 'Configuration',
        items: [
          {
            title: 'BuntalConfig',
            href: '/references/buntal/configuration/buntal-config'
          }
        ]
      },
      {
        title: 'Components',
        items: [
          {
            title: 'App',
            href: '/references/buntal/components/app'
          },
          {
            title: 'Link',
            href: '/references/buntal/components/link'
          },
          {
            title: 'Meta',
            href: '/references/buntal/components/meta'
          },
          {
            title: 'Script',
            href: '/references/buntal/components/script'
          },
          {
            title: 'Svg',
            href: '/references/buntal/components/svg'
          }
        ]
      },
      {
        title: 'Hooks',
        items: [
          {
            title: 'useRouter',
            href: '/references/buntal/hooks/use-router'
          }
        ]
      }
    ]
  }
]

// Content-based search items with actual documentation content
const CONTENT_BASED_SEARCH_ITEMS: SearchItem[] = [
  // Documentation pages
  {
    id: '/docs',
    title: 'Get Started',
    url: '/docs',
    type: 'docs',
    category: 'Documentation',
    description: 'Introduction to Buntal JS framework and basic concepts',
    content: `Buntal JS is a lightweight, modern JavaScript framework designed to simplify web development; with Next.js-like file system routing, type-safe APIs, and focus on performance by leveraging the Bun ecosystem, the fastest runtime ever. What can I build with Buntal JS? HTTP servers Web applications Why separate the HTTP server and full-stack web framework? Our principle is to keep things simple and modular. By separating the HTTP server from the full-stack web framework, you can build API gateways, microservices, or server-side applications without installing React and other unnecessary dependencies. Features Blazing Fast Built on Bun, the fastest JavaScript runtime. HTTP Server Create type-safe API endpoints with Bun's native HTTP server. File-based Routing Define routes using file structure, similar to Next.js. SPA Single Page Application support with React and Bun's bundler. SSR Server-side rendering for dynamic content. How to Contribute We welcome contributions! Since we're in the early stages of development, you can learn how to build a web framework from scratch and help us build a better framework.`,
    keywords: [
      'buntal',
      'javascript',
      'framework',
      'bun',
      'http',
      'server',
      'routing',
      'react',
      'ssr',
      'spa'
    ],
    breadcrumb: ['Documentation', 'Get Started']
  },
  {
    id: '/docs/install',
    title: 'Installation',
    url: '/docs/install',
    type: 'docs',
    category: 'Installation',
    description: 'How to install and set up Buntal JS in your project',
    content: `Prerequisite Before you start using Buntal JS, ensure you have the following prerequisites installed on your system: Bun ^1.2.14 - Buntal JS is built on top of the Bun runtime and API, so you need to have it installed. Installation If you want to build an HTTP server, you only need to install the @buntal/http package: bun add @buntal/http If you want to use the built-in middlewares, you can install them as well: bun add @buntal/middlewares If you want to build a full-stack web application, you can create it from a template: bun create buntal@latest my-app Change my-app to your desired project name. It will initialize your project and install all the necessary dependencies.`,
    keywords: [
      'installation',
      'setup',
      'bun',
      'prerequisite',
      'http',
      'middleware',
      'template',
      'dependencies'
    ],
    breadcrumb: ['Documentation', 'Installation']
  },
  {
    id: '/docs/guides/http-server',
    title: 'HTTP Server',
    url: '/docs/guides/http-server',
    type: 'docs',
    category: 'Guides',
    description: 'Learn how to create HTTP servers with Buntal',
    content: `Quick Start Here is a simple example of how to create an HTTP server using Buntal JS. This example demonstrates how to set up a basic server with file-based routing, middleware, a declarative router, and type-safe request parameters. Http The Http class is the main entry point for creating an HTTP server in Buntal JS. It provides a simple and intuitive API for defining routes, adding middleware, and starting the server. h The h function is everything you need to create a type-safe HTTP handler. It receives a chain of AtomicHandler functions and returns a function that can be used as an HTTP handler. AtomicHandler This is a function that takes a Req and a Res object, and returns a response. Middleware Middleware actually is same as the AtomicHandler function, but it is used to modify the request or response before it reaches the final handler. Req The Req object is a native undici request with extended properties, including params, query, context, and more. params Get the request parameters from the URL path query Get the query parameters from the URL headers Get the request headers context Context is a generic type that can be used to pass data between middleware and handlers cookies Get a cookie by name from the request Res Helper object for creating responses send Send a response with the given data json Send a JSON response text Send a plain text response status Set the HTTP status code headers Set custom headers cookie Set a cookie in the response`,
    keywords: [
      'http',
      'server',
      'handler',
      'middleware',
      'request',
      'response',
      'routing',
      'params',
      'query',
      'headers',
      'cookies',
      'json',
      'typescript'
    ],
    breadcrumb: ['Documentation', 'Guides', 'HTTP Server']
  },
  {
    id: '/docs/guides/full-stack-web',
    title: 'Full-stack Web',
    url: '/docs/guides/full-stack-web',
    type: 'docs',
    category: 'Guides',
    description: 'Build full-stack web applications with React and SSR',
    content: `Full-stack web application development with Buntal JS, React components, server-side rendering, and file-based routing.`,
    keywords: [
      'full-stack',
      'web',
      'react',
      'ssr',
      'server-side',
      'rendering',
      'components'
    ],
    breadcrumb: ['Documentation', 'Guides', 'Full-stack Web']
  }
]

// Generate search index with content-based docs and menu-based references
export function generateSearchIndex(): SearchItem[] {
  const referenceItems = extractMenuItems(REFERENCES_MENUS, 'reference')

  return [...CONTENT_BASED_SEARCH_ITEMS, ...referenceItems]
}

// Export the search index
export const searchIndex = generateSearchIndex()
