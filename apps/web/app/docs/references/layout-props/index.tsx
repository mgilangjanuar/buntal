import ReferencePage from '@/components/docs/reference-page'

export default function LayoutPropsReference() {
  return (
    <ReferencePage
      title="LayoutProps"
      description="Properties interface for layout components in Buntal applications, providing structure and shared functionality across multiple pages."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/@buntal/core/types/layout.ts"
      typeDefinition={`interface LayoutProps {
  children: React.ReactNode;
  pathname: string;
  searchParams: Record<string, string | string[]>;
  params: Record<string, string>;
  headers: Record<string, string>;
  cookies: Record<string, string>;
  metadata?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
}`}
      properties={[
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Page content to be rendered within the layout'
        },
        {
          name: 'pathname',
          type: 'string',
          required: true,
          description: 'Current pathname of the route'
        },
        {
          name: 'searchParams',
          type: 'Record<string, string | string[]>',
          required: true,
          description: 'Query string parameters from the URL'
        },
        {
          name: 'params',
          type: 'Record<string, string>',
          required: true,
          description: 'Dynamic route parameters extracted from the URL path'
        },
        {
          name: 'headers',
          type: 'Record<string, string>',
          required: true,
          description: 'HTTP request headers'
        },
        {
          name: 'cookies',
          type: 'Record<string, string>',
          required: true,
          description: 'HTTP cookies from the request'
        },
        {
          name: 'metadata',
          type: 'object',
          required: false,
          description:
            'Optional metadata for the page (title, description, keywords)'
        }
      ]}
      examples={[
        {
          title: 'Basic Layout Component',
          code: `import type { LayoutProps } from '@buntal/core';
import { Meta } from '@buntal/core';

export default function RootLayout({
  children,
  pathname,
  metadata
}: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <Meta
          title={metadata?.title || 'My Buntal App'}
          description={metadata?.description || 'A fast web application'}
          charset="utf-8"
          viewport="width=device-width, initial-scale=1"
        />
      </head>
      <body>
        <header>
          <nav className="bg-blue-600 text-white p-4">
            <h1>My App</h1>
          </nav>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; 2024 My App. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}`
        },
        {
          title: 'Dashboard Layout with Sidebar',
          code: `import type { LayoutProps } from '@buntal/core';
import { Link } from '@buntal/core';

export default function DashboardLayout({
  children,
  pathname,
  cookies
}: LayoutProps) {
  const isAuthenticated = Boolean(cookies.auth_token);

  if (!isAuthenticated) {
    return <div>Please log in to access the dashboard.</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>
        <nav className="mt-8">
          <NavLink href="/dashboard" current={pathname}>
            Overview
          </NavLink>
          <NavLink href="/dashboard/users" current={pathname}>
            Users
          </NavLink>
          <NavLink href="/dashboard/settings" current={pathname}>
            Settings
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavLink({
  href,
  current,
  children
}: {
  href: string;
  current: string;
  children: React.ReactNode;
}) {
  const isActive = current === href || current.startsWith(href + '/');

  return (
    <Link
      href={href}
      className={\`block px-4 py-2 hover:bg-gray-700 \${
        isActive ? 'bg-gray-700 border-r-2 border-blue-500' : ''
      }\`}
    >
      {children}
    </Link>
  );
}`
        },
        {
          title: 'Layout with Dynamic Metadata',
          code: `import type { LayoutProps } from '@buntal/core';
import { Meta } from '@buntal/core';

export default function BlogLayout({
  children,
  pathname,
  searchParams,
  metadata
}: LayoutProps) {
  // Generate dynamic title based on route
  const getPageTitle = () => {
    if (pathname === '/blog') return 'Blog - My Site';
    if (pathname.startsWith('/blog/')) {
      const slug = pathname.split('/').pop();
      return \`\${slug?.replace('-', ' ')} - Blog - My Site\`;
    }
    return metadata?.title || 'My Site';
  };

  return (
    <>
      <Meta
        title={getPageTitle()}
        description={metadata?.description || 'Read our latest blog posts'}
        keywords={metadata?.keywords || 'blog, articles, news'}
      />

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold">My Blog</h1>
            {searchParams.category && (
              <p className="text-gray-600 mt-2">
                Category: {searchParams.category}
              </p>
            )}
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </div>
      </div>
    </>
  );
}`
        }
      ]}
    />
  )
}
