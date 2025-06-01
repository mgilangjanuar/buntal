export default function AboutPage() {
  return (
    <div>
      About Page
      <a
        href=""
        onClick={(e) => {
          e.preventDefault()
          window.history.pushState({}, '', '/')
          window.dispatchEvent(new PopStateEvent('popstate'))
        }}
      >
        Home
      </a>
    </div>
  )
}
