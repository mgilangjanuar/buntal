import ReferencePage from '@/components/docs/reference-page'

export default function PagePropsReference() {
  return (
    <ReferencePage
      title="PageProps"
      description="Base properties interface for page components in Buntal applications, providing access to route parameters, query strings, and request context."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/@buntal/core/types/page.ts"
      typeDefinition={`interface PageProps<
  TParams = Record<string, string>,
  TQuery = Record<string, string | string[]>
> {
  params: TParams;
  searchParams: TQuery;
  headers: Record<string, string>;
  cookies: Record<string, string>;
  url: URL;
  method: string;
}`}
      properties={[
        {
          name: 'params',
          type: 'TParams',
          required: true,
          description:
            "Dynamic route parameters extracted from the URL path (e.g., { id: '123' } for /users/123)"
        },
        {
          name: 'searchParams',
          type: 'TQuery',
          required: true,
          description:
            "Query string parameters from the URL (e.g., { filter: 'active', page: '2' })"
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
          name: 'url',
          type: 'URL',
          required: true,
          description: 'Complete URL object of the current request'
        },
        {
          name: 'method',
          type: 'string',
          required: true,
          description: 'HTTP method of the request (GET, POST, etc.)'
        }
      ]}
      examples={[
        {
          title: 'Basic Page Component',
          code: `import type { PageProps } from '@buntal/core';

export default function HomePage(props: PageProps) {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Current URL: {props.url.href}</p>
      <p>Method: {props.method}</p>
    </div>
  );
}`
        },
        {
          title: 'Dynamic Route with Parameters',
          code: `import type { PageProps } from '@buntal/core';

// For route: /users/[id]/posts/[postId]
type UserPostPageProps = PageProps<
  { id: string; postId: string }, // params
  { tab?: string; sort?: string }  // searchParams
>;

export default function UserPostPage({
  params,
  searchParams
}: UserPostPageProps) {
  const { id, postId } = params;
  const { tab = 'comments', sort = 'newest' } = searchParams;

  return (
    <div>
      <h1>Post {postId} by User {id}</h1>
      <p>Current tab: {tab}</p>
      <p>Sort order: {sort}</p>
    </div>
  );
}`
        },
        {
          title: 'Page with Authentication Check',
          code: `import type { PageProps } from '@buntal/core';
import { redirect } from '@buntal/core';

interface DashboardPageProps extends PageProps {
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export default function DashboardPage({
  user,
  cookies,
  headers
}: DashboardPageProps) {
  // Check authentication
  if (!user && !cookies.auth_token) {
    redirect('/login');
    return null;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {user && (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      <p>User Agent: {headers['user-agent']}</p>
    </div>
  );
}

// Optional: Server-side data fetching
export async function getServerSideProps({
  cookies,
  headers
}: PageProps): Promise<{ props: DashboardPageProps }> {
  const authToken = cookies.auth_token;

  if (!authToken) {
    return { props: { cookies, headers } };
  }

  try {
    const user = await fetchUser(authToken);
    return {
      props: {
        user,
        cookies,
        headers
      }
    };
  } catch (error) {
    return { props: { cookies, headers } };
  }
}`
        }
      ]}
    />
  )
}
