export const isSameOrigin = (req: Request) => {
  const origin = req.headers.get('origin')
  if (!origin) return false
  try {
    return new URL(origin).host === req.headers.get('host')
  } catch {
    return false
  }
}

const hits = new Map<string, { count: number; reset: number }>()

export const rateLimit = (req: Request, limit = 5, windowMs = 60_000) => {
  const key =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  const now = Date.now()
  const entry = hits.get(key)
  if (!entry || entry.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs })
    return true
  }
  entry.count++
  return entry.count <= limit
}
