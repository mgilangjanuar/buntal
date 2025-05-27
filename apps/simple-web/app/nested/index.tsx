import { Link } from 'buntal'

export default function NestedIndex() {
  return <div>
    <h3>Nested Index Page</h3>
    <p>
      <Link href="-1">Back</Link>
      <Link href="/nested/inner">Inner Page</Link>
    </p>
  </div>
}
