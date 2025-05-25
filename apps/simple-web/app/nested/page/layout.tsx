export default function NestedRoot({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="nested-layout">
      {children}
    </div>
  )
}
