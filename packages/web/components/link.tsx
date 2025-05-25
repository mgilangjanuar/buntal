export function Link({
  href,
  ref,
  children,
  ...props
}: {
  href: string,
  ref?: React.Ref<HTMLAnchorElement>,
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a
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
