import { db } from '@/lib/db'
import { isSameOrigin, rateLimit } from '@/lib/request'
import { parseContact } from '@/lib/validate'
import { h } from '@buntal/http'

export const POST = h(async (req, res) => {
  if (!isSameOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  if (!rateLimit(req)) {
    return res.status(429).json({ error: 'Too many requests' })
  }

  const parsed = parseContact(await req.json().catch(() => null))
  if (!parsed.ok) {
    return res
      .status(400)
      .json({ error: 'Invalid input', details: parsed.errors })
  }
  if (parsed.value.website) {
    return res.status(201).json({ ok: true })
  }

  const { name, email, message } = parsed.value
  await db`
    INSERT INTO messages (id, name, email, message, created_at)
    VALUES (${crypto.randomUUID()}, ${name}, ${email}, ${message}, ${new Date().toISOString()})
  `
  return res.status(201).json({ ok: true })
})
