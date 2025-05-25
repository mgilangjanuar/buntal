import { Link } from 'buntal-react/components'
import { useState } from 'react'

export default function HomePage() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Welcome to the Buntal App!</h1>
      <p>This is a simple example of a Buntal application.</p>
      <div>
        <button onClick={() => setCount(count + 1)}>
          Count: {count}
        </button>
      </div>
      <p>
        <Link href="/about">About</Link>
        <Link href="/nested">Nested</Link>
        <Link href="/rsc">rsc</Link>
        <Link href="/hello/gilang">Gilang</Link>
      </p>
    </div>
  )
}
