import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'hash - Buntal JS'
  } satisfies MetaProps
}

export default function HashPage() {
  return (
    <ReferencePage
      title="hash"
      description="Password hashing utility function using bcrypt for secure password storage."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/%40buntal/core/security/hash.ts"
      typeDefinition={`function hash(password: string): string

hash.compare = function (password: string, hashed: string): boolean`}
      parameters={[
        {
          name: 'password',
          type: 'string',
          required: true,
          description: 'Plain text password to hash'
        }
      ]}
      methods={[
        {
          name: 'hash',
          description:
            'Hashes a password using bcrypt with automatic salt generation.',
          parameters: [
            {
              name: 'password',
              type: 'string',
              required: true,
              description: 'Plain text password to hash'
            }
          ],
          returns: 'string'
        },
        {
          name: 'hash.compare',
          description: 'Compares a plain text password with a hashed password.',
          parameters: [
            {
              name: 'password',
              type: 'string',
              required: true,
              description: 'Plain text password'
            },
            {
              name: 'hashed',
              type: 'string',
              required: true,
              description: 'Previously hashed password'
            }
          ],
          returns: 'boolean'
        }
      ]}
      examples={[
        `import { hash } from '@buntal/core/security'

// Hash a password during registration
const password = 'user123'
const hashedPassword = hash(password)
console.log(hashedPassword) // $2a$10$...`,
        `// Compare password during login
const inputPassword = 'user123'
const storedHash = '$2a$10$...'

const isValid = hash.compare(inputPassword, storedHash)
console.log(isValid) // true`,
        `// Complete authentication example
import { Http } from '@buntal/core'
import { hash } from '@buntal/core/security'

const app = new Http({ port: 3000 })

// Registration endpoint
app.post('/register', async (req, res) => {
  const { email, password } = await req.json()

  // Hash the password
  const hashedPassword = hash(password)

  // Save to database (pseudo code)
  await db.users.create({
    email,
    password: hashedPassword
  })

  return res.status(201).json({ message: 'User created' })
})

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = await req.json()

  // Get user from database
  const user = await db.users.findByEmail(email)
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  // Verify password
  const isValid = hash.compare(password, user.password)
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  return res.json({ message: 'Login successful' })
})`
      ]}
    />
  )
}
