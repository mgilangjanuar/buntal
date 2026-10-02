import { sameOriginPath, scrollToHash } from '../lib/navigation'

export function Link({
  href,
  ref,
  children,
  onClick,
  ...props
}: {
  href: string
  ref?: React.Ref<HTMLAnchorElement>
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      ref={ref}
      href={href === '-1' ? '#' : href}
      onClick={(e) => {
        onClick?.(e)
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          (props.target && props.target !== '_self') ||
          props.download !== undefined
        ) {
          return
        }

        if (href === '-1') {
          e.preventDefault()
          window.history.back()
        } else if (href.startsWith('#')) {
          e.preventDefault()
          if (scrollToHash(href)) {
            window.history.pushState({}, '', href)
          }
        } else {
          const path = sameOriginPath(href)
          if (path === null) return
          e.preventDefault()
          window.history.pushState({}, '', path)
          window.dispatchEvent(new PopStateEvent('popstate'))
        }
      }}
    >
      {children}
    </a>
  )
}
