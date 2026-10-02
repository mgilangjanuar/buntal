import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'Security - Buntal JS',
    description:
      'Authentication, cookies, CORS, security headers and safe file access in Buntal.'
  } satisfies MetaProps
}

export default function SecurityPage() {
  return (
    <MarkdownContent
      title="Security"
      content={`## Defaults

Buntal ships with safe defaults so the common mistakes are hard to make:

- Static files are served only from \`public/\` and the build output. Path traversal (\`/..%2f\`) and dotfiles such as \`.env\` are refused; \`.well-known/\` is allowed.
- \`$\` loader data is sent with \`Cache-Control: private, no-store\`, so CDNs never cache one user's data for another.
- In production (\`buntal start\` sets \`NODE_ENV=production\`), errors return a generic message. Stack traces are logged on the server only.
- Pages and static files send \`X-Content-Type-Options: nosniff\`.
- \`<Link>\` only routes same-origin URLs client-side, so \`javascript:\` links are never pushed into history.
- \`<Svg>\` strips scripts, event handlers, \`foreignObject\` and \`javascript:\` URLs unless you pass \`unsafe\`.
- Only HTTP method exports (\`GET\`, \`POST\`, ...) of a route file are reachable.

## Authentication

Use \`jwt()\` to issue tokens and \`auth()\` to verify them. Both require a non-empty secret and throw at startup without one, so a missing env var can never silently accept forged tokens.

\`\`\`ts
import { h } from '@buntal/http'
import { auth, jwt } from '@buntal/http/middlewares'

const secret = process.env.JWT_SECRET!

export const POST = h(async (req, res) => {
  // verify the user's password with Bun.password.verify(...)
  const token = await jwt(secret).sign({ sub: 'user-id' }, { expiresIn: '2h' })
  return res
    .cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      path: '/',
      maxAge: 60 * 60 * 2
    })
    .json({ ok: true })
})

export const GET = h(
  auth<{ sub: string }>({ secret, strategy: 'cookie' }),
  (req, res) => res.json({ id: req.context?.sub })
)
\`\`\`

Tokens are verified with HS256 only, and the decoded payload is set on \`req.context\`. Hash passwords with \`Bun.password.hash\` and compare with \`Bun.password.verify\`.

### Protecting pages

Middlewares in \`buntal.config.ts\` run before every page, \`$\` loader and API route. Static assets are served first, so a login page still loads its JS and CSS.

\`\`\`ts
import { auth, secureHeaders } from '@buntal/http/middlewares'
import type { BuntalConfig } from 'buntal'

export default {
  middlewares: [secureHeaders(), auth({ secret: process.env.JWT_SECRET! })]
} satisfies BuntalConfig
\`\`\`

A global \`auth()\` protects the whole site. To protect only some pages, check the token in the page's \`$\` and return a redirect:

\`\`\`tsx
import type { Req } from '@buntal/http'
import { jwt } from '@buntal/http/middlewares'

export const $ = async (req: Req) => {
  const user = await jwt(process.env.JWT_SECRET!)
    .verify<{ sub: string }>(req.cookies.access_token ?? '')
    .catch(() => null)
  if (!user) return Response.redirect(new URL('/login', req.url), 302)
  return { userId: user.sub }
}
\`\`\`

A \`Response\` returned from \`$\` is sent as-is, both on the first load and on client-side navigation.

## Cookies

- Names must be valid cookie tokens, and \`path\`/\`domain\` cannot contain \`;\` or spaces; invalid values throw instead of injecting attributes.
- Values are URL-encoded, so user input cannot add attributes.
- \`sameSite: 'None'\` always adds \`Secure\`. \`maxAge: 0\` expires the cookie.
- Delete with the same scope you set: \`res.cookie('sid', null, { path: '/app' })\`.

For session cookies use \`httpOnly: true, secure: true, sameSite: 'Lax'\`. \`SameSite=Lax\` also blocks most cross-site form posts; for extra CSRF protection, compare the \`Origin\` header with your host on POST, PUT, PATCH and DELETE.

## CORS

\`\`\`ts
app.use(cors({ origin: ['https://app.example.com'] }))
\`\`\`

- With an array, only listed origins get CORS headers, plus \`Vary: Origin\` and \`Access-Control-Allow-Credentials\`.
- With \`origin: '*'\` (the default), credentials are never allowed.
- \`cors()\` answers preflight requests. Register it before \`auth()\` so preflights are not rejected.

## Security headers

\`\`\`ts
app.use(
  secureHeaders({
    contentSecurityPolicy: "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'"
  })
)
\`\`\`

Sets \`X-Content-Type-Options\`, \`X-Frame-Options: SAMEORIGIN\`, \`Referrer-Policy\`, \`Permissions-Policy\`, \`Cross-Origin-Opener-Policy\` and, over https, \`Strict-Transport-Security\`. Pass \`false\` for any option to turn it off. The CSP is off by default because every app needs its own.

## Your own code

The framework cannot validate your inputs for you:

- **Validate request bodies and params** before using them. Reject unknown shapes with 400.
- **Never build file paths from user input** without resolving them and checking they stay in an allowed folder:

  \`\`\`ts
  const root = path.resolve('content')
  const file = path.resolve(root, \`\${req.params.slug}.mdx\`)
  if (!file.startsWith(root + path.sep)) return { notFound: true }
  \`\`\`

- **Use parameterized queries** (\`db.query('... where id = ?').get(id)\`), never string concatenation.
- **Scope data by the verified user**, taken from \`req.context\`, never from the request body.
- **Keep secrets server-side.** Components also run in the browser; only \`BUNTAL_PUBLIC_*\` env vars are bundled.`}
      tableOfContents={[
        { id: 'defaults', title: 'Defaults', level: 1, offset: 72 },
        {
          id: 'authentication',
          title: 'Authentication',
          level: 1,
          offset: 72,
          children: [
            {
              id: 'protecting-pages',
              title: 'Protecting pages',
              level: 2,
              offset: 72
            }
          ]
        },
        { id: 'cookies', title: 'Cookies', level: 1, offset: 72 },
        { id: 'cors', title: 'CORS', level: 1, offset: 72 },
        {
          id: 'security-headers',
          title: 'Security headers',
          level: 1,
          offset: 72
        },
        { id: 'your-own-code', title: 'Your own code', level: 1, offset: 72 }
      ]}
      lastModified="2026-10-02"
    />
  )
}
