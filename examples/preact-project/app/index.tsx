import { useState } from 'preact/hooks'

export default function HomePage() {
  const [count, setCount] = useState(0)
  return (
    <div className="min-h-svh flex flex-col items-center justify-center container mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Next.js who?</h1>
        <button onClick={() => setCount(count + 1)} className="btn btn-primary">
          Click me! {count}
        </button>
        <a
          href=""
          onClick={(e) => {
            e.preventDefault()
            window.history.pushState({}, '', '/about')
            window.dispatchEvent(new PopStateEvent('popstate'))
          }}
        >
          About
        </a>
      </div>
    </div>
  )
}
