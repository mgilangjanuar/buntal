import { useRef } from 'react'

export function Link({
  href,
  children,
  ...props
}: {
  href: string,
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLAnchorElement>(null)

  return <a
    ref={ref}
    href={href}
    onClick={e => {
      e.preventDefault()
      if (href.startsWith('http')) {
        window.open(href, '_blank', 'noopener,noreferrer')
      } else {
        window.history.pushState({}, '', href)
        window.dispatchEvent(new PopStateEvent('popstate'))
      }
    }}
    {...props}
    >
      {children}
  </a>
}
