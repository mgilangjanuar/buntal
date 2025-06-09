import ReferencePage from '@/components/docs/reference-page'

export default function AppPropsReference() {
  return (
    <ReferencePage
      title="AppProps"
      description="Properties interface for the root App component in Buntal applications, similar to Next.js App component but optimized for Buntal's architecture."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/@buntal/core/app/app.tsx"
      typeDefinition={`interface AppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
  router: {
    pathname: string;
    query: Record<string, string | string[]>;
    asPath: string;
    push: (url: string) => void;
    replace: (url: string) => void;
    back: () => void;
  };
  err?: Error;
}`}
      properties={[
        {
          name: 'Component',
          type: 'React.ComponentType<any>',
          required: true,
          description: 'The active page component that should be rendered'
        },
        {
          name: 'pageProps',
          type: 'any',
          required: true,
          description: 'Props that were preloaded for the page component'
        },
        {
          name: 'router',
          type: 'Router',
          required: true,
          description:
            'Router object containing navigation information and methods'
        },
        {
          name: 'err',
          type: 'Error',
          required: false,
          description: 'Error object if an error occurred during page loading'
        }
      ]}
    />
  )
}
