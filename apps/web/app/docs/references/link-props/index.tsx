import ReferencePage from '@/components/docs/reference-page'

export default function LinkPropsReference() {
  return (
    <ReferencePage
      title="LinkProps"
      description="Properties interface for the Link component, used for client-side navigation between pages in Buntal applications."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/@buntal/core/components/link.tsx"
      typeDefinition={`interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  prefetch?: boolean;
  replace?: boolean;
  shallow?: boolean;
  children: React.ReactNode;
}`}
      properties={[
        {
          name: 'href',
          type: 'string',
          required: true,
          description: 'The destination URL or path for the link'
        },
        {
          name: 'prefetch',
          type: 'boolean',
          required: false,
          description:
            'Whether to prefetch the linked page for faster navigation (default: true)'
        },
        {
          name: 'replace',
          type: 'boolean',
          required: false,
          description:
            'Replace the current entry in the history stack instead of adding a new one'
        },
        {
          name: 'shallow',
          type: 'boolean',
          required: false,
          description:
            'Update the path without running data fetching methods again'
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'The content to be rendered inside the link'
        }
      ]}
      examples={[
        {
          title: 'Basic Navigation Link',
          code: `import { Link } from '@buntal/core';

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}`
        },
        {
          title: 'Link with Custom Styling',
          code: `import { Link } from '@buntal/core';

export default function StyledNavigation() {
  return (
    <Link
      href="/dashboard"
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Go to Dashboard
    </Link>
  );
}`
        },
        {
          title: 'Advanced Link Options',
          code: `import { Link } from '@buntal/core';

export default function AdvancedLink() {
  return (
    <>
      {/* Replace history entry */}
      <Link href="/login" replace>
        Login (Replace)
      </Link>

      {/* Disable prefetching */}
      <Link href="/heavy-page" prefetch={false}>
        Heavy Page (No Prefetch)
      </Link>

      {/* Shallow routing */}
      <Link href="/posts?filter=new" shallow>
        New Posts
      </Link>

      {/* External link (opens in new tab) */}
      <Link href="https://example.com" target="_blank" rel="noopener noreferrer">
        External Link
      </Link>
    </>
  );
}`
        }
      ]}
    />
  )
}
