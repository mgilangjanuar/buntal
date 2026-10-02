export type ContactInput = {
  name: string
  email: string
  message: string
  website: string
}

type Result =
  | { ok: true; value: ContactInput }
  | { ok: false; errors: Partial<Record<keyof ContactInput, string>> }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '')

export const parseContact = (body: unknown): Result => {
  const input = (body && typeof body === 'object' ? body : {}) as Record<
    string,
    unknown
  >
  const value: ContactInput = {
    name: text(input.name),
    email: text(input.email).toLowerCase(),
    message: text(input.message),
    website: text(input.website)
  }
  const errors: Partial<Record<keyof ContactInput, string>> = {}
  if (!value.name || value.name.length > 100) errors.name = 'Enter your name.'
  if (!EMAIL.test(value.email) || value.email.length > 254)
    errors.email = 'Enter a valid email address.'
  if (value.message.length < 10 || value.message.length > 5000)
    errors.message = 'Write at least 10 characters.'
  return Object.keys(errors).length
    ? { ok: false, errors }
    : { ok: true, value }
}
