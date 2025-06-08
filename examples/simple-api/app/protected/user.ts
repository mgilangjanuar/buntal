import { cookie, h } from '@buntal/core'
import { auth } from '@buntal/core/middlewares'
import { hash, jwt } from '@buntal/core/security'

type User = {
  id: string
  name: string
  password: string
}

const DONT_TRY_THIS_AT_HOME = 'your-secret-key'

/**
 * Handles a protected GET request for user data.
 *
 * This function combines authentication middleware and a request handler
 * to ensure that only authorized users can access the endpoint. The authentication
 * is performed using a cookie-based strategy.
 *
 * Authentication Details:
 * - Secret: `DONT_TRY_THIS_AT_HOME`
 * - Strategy: `cookie`
 * - Cookie Key: `access_token`
 * - Verification: Ensures the decoded user ID matches '123'.
 *
 * Middleware:
 * - `auth<User>`: Validates the request using the specified authentication strategy.
 *   - If the user is unauthorized, a 401 response with an error message is returned.
 *   - On successful verification, the decoded user data is attached to `req.context`.
 *
 * Request Handler:
 * - Returns the authenticated user's data as a JSON response.
 *
 * @param req - The incoming HTTP request object.
 * @param res - The outgoing HTTP response object.
 * @returns A JSON response containing the authenticated user's data.
 */
export const GET = h(
  auth<User>({
    secret: DONT_TRY_THIS_AT_HOME,
    strategy: 'both',
    cookie: {
      key: 'access_token'
    },
    onVerified: async (req, res, decoded) => {
      if (decoded.id !== '123') {
        return res.status(401).json({
          error: 'Unauthorized'
        })
      }
      req.context = decoded
    }
  }),
  (req, res) => {
    const user = req.context
    return res.json(user)
  }
)

/**
 * Handles POST requests to create a new user session and issue a JWT.
 *
 * This handler creates a mock user with a hashed password and generates a JWT
 * signed with a secret key. The token is set as an HTTP-only cookie named `access_token`
 * with a 2-hour expiration time. The token is also returned in the response body.
 *
 * @param _ - The incoming HTTP request (not used in this handler).
 * @param res - The HTTP response object used to send the result.
 * @returns A JSON object containing the generated JWT.
 */
export const POST = h(async (_, res) => {
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
    token
  })
})
