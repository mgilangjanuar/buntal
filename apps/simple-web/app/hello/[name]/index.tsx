export default function Hello({ params, query }: { params: { name: string }, query?: Record<string, string> }) {
  return (
    <div>
      <h1>Hello, {params?.name}!</h1>
      <p>This is a dynamic route example.</p>
      <p>{JSON.stringify(query)}</p>
    </div>
  )
}
