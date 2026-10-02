import { jwtVerify, SignJWT } from 'jose'

export const jwt = (secret: string) => {
  if (!secret) {
    throw new Error('jwt: a non-empty secret is required')
  }
  const key = new TextEncoder().encode(secret)
  return {
    sign: async (
      payload: Record<string, unknown>,
      options: { expiresIn?: string | number | Date } = {}
    ) => {
      return await new SignJWT(payload)
        .setExpirationTime(options.expiresIn || '2h')
        .setIssuedAt()
        .setProtectedHeader({ alg: 'HS256' })
        .sign(key)
    },
    verify: async <T = unknown>(token: string) => {
      const { payload } = await jwtVerify<T>(token, key, {
        algorithms: ['HS256']
      })
      return payload
    }
  }
}
