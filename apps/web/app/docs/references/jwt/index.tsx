import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'jwt - Buntal JS'
  } satisfies MetaProps
}

export default function JwtPage() {
  return (
    <ReferencePage
      title="jwt"
      description="JWT (JSON Web Token) utility function for signing and verifying tokens using HS256 algorithm."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/%40buntal/core/security/jwt.ts"
      typeDefinition={`function jwt(secret: string): {
  sign: (payload: Record<string, unknown>, options?: { expiresIn?: string | number | Date }) => Promise<string>
  verify: <T = unknown>(token: string) => Promise<T>
}`}
      parameters={[
        {
          name: 'secret',
          type: 'string',
          required: true,
          description: 'Secret key for signing and verifying tokens'
        }
      ]}
      methods={[
        {
          name: 'sign',
          description: 'Signs a JWT token with the provided payload.',
          parameters: [
            {
              name: 'payload',
              type: 'Record<string, unknown>',
              required: true,
              description: 'Data to encode in the token'
            },
            {
              name: 'options',
              type: '{ expiresIn?: string | number | Date }',
              required: false,
              description: 'Token expiration options'
            }
          ],
          returns: 'Promise<string>'
        },
        {
          name: 'verify',
          description: 'Verifies and decodes a JWT token.',
          parameters: [
            {
              name: 'token',
              type: 'string',
              required: true,
              description: 'JWT token to verify'
            }
          ],
          returns: 'Promise<T>'
        }
      ]}
      examples={[
        `import { jwt } from '@buntal/core/security'

const jwtUtil = jwt('your-secret-key')

// Sign a token
const token = await jwtUtil.sign({
  userId: 123,
  role: 'admin'
})`,
        `// Sign with expiration
const token = await jwtUtil.sign(
  { userId: 123 },
  { expiresIn: '1h' }
)`,
        `// Verify a token
try {
  const payload = await jwtUtil.verify<{ userId: number }>(token)
  console.log('User ID:', payload.userId)
} catch (error) {
  console.error('Invalid token:', error.message)
}`,
        `// Authentication middleware example
import { Http } from '@buntal/core'
import { jwt } from '@buntal/core/security'

const app = new Http({ port: 3000 })
const jwtUtil = jwt(process.env.JWT_SECRET!)

app.use(async (req, res) => {
  const authHeader = req.headers.get('Authorization')
  const token = authHeader?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const user = await jwtUtil.verify(token)
    req.context = { user }
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
})`
      ]}
    />
  )
}
