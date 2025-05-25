export function Link({
  href,
  children,
}: {
  href: string,
  children?: React.ReactNode;
}) {
  return <a href={href} onClick={e => {
    e.preventDefault()
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer')
    } else {
      window.history.pushState({}, '', href)
      window.dispatchEvent(new PopStateEvent('popstate'))
    }
  }}>{children}</a>
}
