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
      examples={[
        {
          title: 'Basic App Component',
          code: `import type { AppProps } from '@buntal/core';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}`
        },
        {
          title: 'App with Global Layout',
          code: `import type { AppProps } from '@buntal/core';
import Layout from '@/components/layout';
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}`
        },
        {
          title: 'App with Error Handling and Analytics',
          code: `import type { AppProps } from '@buntal/core';
import { useEffect } from 'react';
import ErrorBoundary from '@/components/error-boundary';
import { analytics } from '@/lib/analytics';

export default function MyApp({ Component, pageProps, router, err }: AppProps) {
  useEffect(() => {
    // Track page views
    analytics.track('page_view', {
      path: router.pathname,
      url: router.asPath
    });
  }, [router.pathname, router.asPath]);

  if (err) {
    return <ErrorPage error={err} />;
  }

  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">
          Something went wrong
        </h1>
        <p className="mt-2 text-gray-600">{error.message}</p>
      </div>
    </div>
  );
}`
        }
      ]}
    />
  )
}
