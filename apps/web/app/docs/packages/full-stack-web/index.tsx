import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Full-stack Web - Buntal JS'
  } satisfies MetaProps
}

export default function HTTPPkgPage() {
  return (
    <MarkdownContent
      title="Full-stack Web"
      content={`## Quick Start

Buntal uses \`@buntal/core\` under the hood to handle all requests and render the selected page based on the pathname. So, your web will always be hydrated by returning an exact same HTML page from the server, which is great for SEO and performance.

After initializing a project with a template using this command:

\`\`\`sh
bun create buntal@latest my-app
\`\`\`

You will have Tailwind CSS and minimal dependencies to build your web project. Here is the project structure:

\`\`\`sh
.
├── app
│   ├── favicon.svg
│   ├── globals.css
│   ├── index.tsx
│   ├── layout.tsx
│   └── logo.svg
├── buntal.config.ts
├── custom.d.ts
├── lib
│   └── utils.ts
├── package.json
├── public
└── tsconfig.json
\`\`\`

Seems familiar, right?

The main modules are located in the \`app\` directory, which contains the main entry point/page at \`index.tsx\`, \`globals.css\`, and a layout file at \`layout.tsx\`. You can create a new page such as \`about/index.tsx\` in the \`app\` directory, and it will be automatically available at \`/about\`.

Run the development server using \`bun dev\`, and the output will look like this:

\`\`\`sh
  -... ..- -. - .- .-..
  Local:        http://localhost:3000
  Network:      http://192.168.18.121:3000

Done in 12ms
\`\`\`

Explore the full example on [GitHub](https://github.com/mgilangjanuar/buntal/tree/main/examples/hello-world).

## layout.tsx

The \`layout.tsx\` file is the main layout for your web app. It is used to wrap all pages and provide a consistent structure, such as a header, footer, and other common elements. Here is an example of a simple root layout:

\`\`\`tsx
export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <title>Buntal App</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.svg" />
        <link rel="stylesheet" href="/globals.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
\`\`\`

You can also have a \`layout.tsx\` in a folder, and it will be a layout for all pages in that folder. But remember that your layout will never be rendered if you haven't created an \`index.tsx\` file in the same folder.

## index.tsx

Basically, the \`index.tsx\` file is the main entry point of your web page. Here is an example of a simple index page:

\`\`\`tsx
export default function HomePage({ query }: Readonly<{
  query: Record<string, string>
}>) {
  return (
    <div className="min-h-svh flex flex-col justify-center container mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Next.js who? —{query.name || 'Buntal'}</h1>
      </div>
    </div>
  )
}
\`\`\`

The page component is exported as a default export, and it receives props such as \`params\`, \`query\`, and \`data\`.

- \`params\`: Contains the URL parameters, such as \`/about/[id]\` will have \`params.id\`.
- \`query\`: Contains the query parameters, such as \`/about?id=1\` will have \`query.id\`.
- \`data\`: Contains the data returned from the \`$\` function, which is used to fetch data from the server.

## $

The \`$\` function is used to fetch data from the server. It is a special function that is executed on the server side and can be used to fetch data from a database or an API. Here is an example of a simple \`$\` function in the \`index.tsx\`:

\`\`\`ts
import type { Req } from '@buntal/core'

export const $ = async (req: Req) => {
  const resp = await fetch(\`https://api.example/data/\${req.params.id}\`)
  return await resp.json() as { name: string }
}

export default function HomePage({ data }: {
  data?: Awaited<ReturnType<typeof $>>
}) {
  return (
    <div>
      Hello, {data?.name || 'there'}!
    </div>
  )
}
\`\`\`

See the \`Req\` type definition [here](/docs/packages/http-server#req). This function has a similar pattern to \`getServerSideProps\` from Next.js or \`loader\` from Remix.`}
      lastModified="2025-06-05"
    />
  )
}
