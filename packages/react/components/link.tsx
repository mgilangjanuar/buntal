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
      if (!href.startsWith('http')) {
        e.preventDefault()
        window.history.pushState({}, '', href)
        window.dispatchEvent(new PopStateEvent('popstate'))
      }
    }}
    {...props}
  >
    {children}
  </a>
}
