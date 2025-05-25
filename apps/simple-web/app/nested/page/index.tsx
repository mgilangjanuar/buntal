import { Link } from 'buntal-react'

export default function NestedPage() {
  return <div>
    <h1>Nested Page 2</h1>
    <p>
      <Link href="/nested">Back</Link>
      <Link href="/nested/page/inner">Inner</Link>
    </p>
  </div>
}
