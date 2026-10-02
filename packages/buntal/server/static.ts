import { resolve, sep } from 'path'

const serve = async (root: string, pathname: string) => {
  const base = resolve(root)
  const target = resolve(base, '.' + pathname)
  if (!target.startsWith(base + sep)) return
  const segments = target.slice(base.length + 1).split(sep)
  if (
    segments.some(
      (s, i) => s.startsWith('.') && !(i === 0 && s === '.well-known')
    )
  )
    return
  const file = Bun.file(target)
  if (await file.exists()) {
    return new Response(file, {
      headers: {
        'content-type': file.type,
        'x-content-type-options': 'nosniff'
      }
    })
  }
}

export const staticHandler = async (
  req: Request,
  outDir: string = '.buntal',
  dir: string = './public'
): Promise<Response | void> => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return
  let pathname: string
  try {
    pathname = decodeURIComponent(new URL(req.url).pathname)
  } catch {
    return
  }
  if (pathname.endsWith('/') || pathname.includes('\0')) return
  return (await serve(dir, pathname)) || serve(`${outDir}/dist`, pathname)
}
