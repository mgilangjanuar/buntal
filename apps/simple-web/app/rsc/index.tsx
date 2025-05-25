export const $ = async (req: Request) => {
  return {
    title: 'RSC Page',
    description: 'This is a simple React Server Component (RSC) page.',
    url: req.url,
    _meta: {
      title: 'RSC Page',
      description: 'This is a simple React Server Component (RSC) page.',
    }
  }
}

export default function RSC({ data }: { data?: Awaited<ReturnType<typeof $>> }) {
  return (
    <div>
      <h1>RSC Page</h1>
      <p>This is a simple React Server Component (RSC) page.</p>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}
