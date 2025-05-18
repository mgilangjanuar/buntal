import { auth, cookie, h, hash, jwt } from 'buntal'

type User = {
  id: string
  name: string,
  password: string
}

const DONT_TRY_THIS_AT_HOME = 'your-secret-key'

export const GET = h<{}, User>(
  auth<User>({
    secret: DONT_TRY_THIS_AT_HOME,
    strategy: 'cookie',
    cookie: {
      key: 'access_token'
    },
    onVerified: async (req, res, decoded) => {
      if (decoded.id !== '123') {
        return res.status(401).json({
          message: 'Unauthorized',
        })
      }
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
      password: hash('password')
    }
    const token = await jwt(DONT_TRY_THIS_AT_HOME).sign(user, {
      expiresIn: '2h'
    })
    cookie.set(res, 'access_token', token, {
      maxAge: 60 * 60 * 2,
      httpOnly: true,
      path: '/'
    })
    return res.json({
      token,
    })
  }
)
