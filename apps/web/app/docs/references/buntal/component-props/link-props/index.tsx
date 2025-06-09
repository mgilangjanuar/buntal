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
    />
  )
}
