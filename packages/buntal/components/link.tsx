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
          } else if (href.startsWith('#')) {
            e.preventDefault()
            const [selector, top] = href.split(':') as [
              string,
              string | undefined
            ]
            const target = document.querySelector(selector)
            if (target) {
              location.hash = selector
              window.scrollTo({
                behavior: 'smooth',
                top:
                  target.getBoundingClientRect().top +
                  window.scrollY -
                  (top ? Number(top) : 80)
              })
            }
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
