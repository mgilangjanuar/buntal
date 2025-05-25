export default function Hello({ params }: Readonly<{
  params: { name: string }
}>) {
  return (
    <div>
      <h1>Hello, {params?.name}!</h1>
      <p>This is a dynamic route example.</p>
    </div>
  )
}
