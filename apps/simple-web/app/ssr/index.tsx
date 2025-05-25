import type { Req } from 'buntal-react'

export const $ = async (req: Req) => {
  return {
    title: 'SSR Page',
    description: 'This is a simple React Server Component (SSR) page.',
    url: req.url,
    query: req.query,
    _meta: {
      title: 'SSR Page',
      description: 'This is a simple React Server Component (SSR) page.',
    }
  }
}

export default function SSR({ data }: Readonly<{
  data?: Awaited<ReturnType<typeof $>>
}>) {
  return (
    <div>
      <h1>SSR Page</h1>
      <p>This is a simple React Server Component (SSR) page.</p>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}
