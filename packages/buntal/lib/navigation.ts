export const scrollToHash = (hash: string) => {
  const [selector, top] = hash.split(':') as [string, string | undefined]
  let target: Element | null = null
  try {
    target =
      document.getElementById(decodeURIComponent(selector.slice(1))) ||
      document.querySelector(selector)
  } catch {
    return false
  }
  if (!target) return false
  const offset = Number(top)
  window.scrollTo({
    behavior: 'smooth',
    top:
      target.getBoundingClientRect().top +
      window.scrollY -
      (Number.isFinite(offset) && top ? offset : 80)
  })
  return true
}

export const sameOriginPath = (href: string) => {
  try {
    const url = new URL(href, window.location.href)
    if (url.origin !== window.location.origin) return null
    return url.pathname + url.search + url.hash
  } catch {
    return null
  }
}
