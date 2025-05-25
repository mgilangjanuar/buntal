import { Link } from 'buntal-react'
import { useState } from 'react'

export default function HomePage() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>
        <Link href="/about">About</Link>
        <Link href="/nested">Nested</Link>
        <Link href="/ssr">SSR</Link>
        <Link href="/hello/gilang">Gilang</Link>
        <Link href="/notfound">Not found</Link>
      </p>
      <h1 className="font-bold text-3xl mt-4">Welcome to the Buntal App!</h1>
      <p>This is a simple example of a Buntal application.</p>
      <div>
        <button onClick={() => setCount(count + 1)}>
          Count: {count}
        </button>
      </div>
    </div>
  )
}
