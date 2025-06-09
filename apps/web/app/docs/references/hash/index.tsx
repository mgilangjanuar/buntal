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
    />
  )
}
