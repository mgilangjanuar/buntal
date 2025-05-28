export function Link({
  href,
  ref,
  children,
  ...props
}: {
  href: string
  ref?: React.Ref<HTMLAnchorElement>
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href === '-1' ? '#' : href}
      onClick={(e) => {
        if (!href.startsWith('http')) {
          if (href === '-1') {
            e.preventDefault()
            window.history.back()
            window.dispatchEvent(new PopStateEvent('popstate'))
          } else {
            e.preventDefault()
            window.history.pushState({}, '', href)
            window.dispatchEvent(new PopStateEvent('popstate'))
          }
        }
      }}
      {...props}
    >
      {children}
    </a>
  )
}
