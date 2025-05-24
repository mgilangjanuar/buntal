export default function NestedRoot({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h1>Nested Layout</h1>
      {children}
    </div>
  )
}
