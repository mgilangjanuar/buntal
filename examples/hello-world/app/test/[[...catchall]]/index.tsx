export default function Catchall({ params }: { params: { catchall: string } }) {
  return (
    <div>
      <h1>Catchall Route</h1>
      <p>This route matches all paths that do not have a specific handler.</p>
      <pre>
        <code>{params.catchall}</code>
      </pre>
    </div>
  )
}
