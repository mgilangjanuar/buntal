import { jwtVerify, SignJWT } from 'jose'

export const jwt = (secret: string) => ({
  sign: async (payload: Record<string, unknown>, options: { expiresIn?: string | number | Date } = {}) => {
    return await new SignJWT(payload)
      .setExpirationTime(options.expiresIn || '2h')
      .setIssuedAt()
      .setProtectedHeader({ alg: 'HS256' })
      .sign(new TextEncoder().encode(secret))
  },
  verify: async <T = unknown>(token: string) => {
    const { payload } = await jwtVerify<T>(token, new TextEncoder().encode(secret))
    return payload
  }
})
