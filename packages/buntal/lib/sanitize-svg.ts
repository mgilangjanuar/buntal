const BLOCKED = 'script|foreignObject|iframe|embed|object|use'
const PAIRED = new RegExp(`<(${BLOCKED})\\b[\\s\\S]*?<\\/\\1\\s*>`, 'gi')
const SINGLE = new RegExp(`<\\/?(${BLOCKED})\\b[^>]*>`, 'gi')
const HANDLERS = /\s+on[a-z0-9_-]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi
const URL_ATTRS =
  /\s+((?:xlink:)?href|src|action|formaction)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi

const isUnsafeUrl = (value: string) => {
  const url = value
    .replace(/^["']|["']$/g, '')
    .replace(/&#x?[0-9a-f]+;?/gi, '')
    .replace(/[\u0000- ]/g, '')
    .toLowerCase()
  return (
    !url.startsWith('#') &&
    (url.startsWith('javascript:') ||
      url.startsWith('vbscript:') ||
      (url.startsWith('data:') &&
        !/^data:image\/(png|gif|jpe?g|webp);/.test(url)))
  )
}

export const sanitizeSvg = (src: string) => {
  let out = src
  let previous: string
  do {
    previous = out
    out = out
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(PAIRED, '')
      .replace(SINGLE, '')
      .replace(HANDLERS, '')
      .replace(URL_ATTRS, (attr, _name, value) =>
        isUnsafeUrl(value) ? '' : attr
      )
  } while (out !== previous)
  return out
}
