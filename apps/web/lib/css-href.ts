const KEY = '__buntalCssHref'

export const setCssHref = (href: string) => {
  ;(globalThis as Record<string, unknown>)[KEY] = href
}

export function cssHref(): string {
  if (typeof document !== 'undefined')
    return (
      document.querySelector('link[data-app-css]')?.getAttribute('href') ??
      '/globals.css'
    )
  return (
    ((globalThis as Record<string, unknown>)[KEY] as string) ?? '/globals.css'
  )
}
