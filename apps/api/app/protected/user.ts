import { auth, h } from 'buntal'
import { SignJWT } from 'jose'

type User = {
  id: string
  name: string
}

const DONT_TRY_THIS_AT_HOME = 'your-secret-key'

export const GET = h<{}, User>(
  auth<User>({
    strategy: 'header',
    secret: DONT_TRY_THIS_AT_HOME,
    onVerified: async (req, res, decoded) => {
      req.context = decoded
    }
  }),
  (req, res) => {
    const user = req.context as User
    return res.json(user)
  }
)

export const POST = h(
  async (_, res) => {
    const user: User = {
      id: '123',
      name: 'John Doe',
    }
    const token = await new SignJWT(user)
      .setExpirationTime('2h')
      .setIssuedAt()
      .setProtectedHeader({ alg: 'HS256' })
      .sign(new TextEncoder().encode(DONT_TRY_THIS_AT_HOME))
    return res.json({
      token,
    })
  }
)
