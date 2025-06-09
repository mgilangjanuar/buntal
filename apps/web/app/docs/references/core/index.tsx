import MarkdownContent from '@/components/docs/markdown-content'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: '@buntal/core API Reference - Buntal JS'
  } satisfies MetaProps
}

export default function CoreAPIReferencePage() {
  return (
    <MarkdownContent
      title="@buntal/core"
      content={`# @buntal/core

The core HTTP server package for Buntal JS, providing low-level APIs for building HTTP servers and handling requests/responses.

## Classes

### Http

The main HTTP server class for creating and configuring HTTP servers.

#### Constructor

\`\`\`typescript
new Http(config: Config)
\`\`\`

#### Config

Configuration object for the HTTP server.

\`\`\`typescript
type Config = {
  port: number
  appDir?: string
  websocket?: WebSocketHandler
  injectHandler?: (payload: {
    req: Req
    match: Bun.MatchedRoute
    handler: any
  }) => Promise<Response | void>
}
\`\`\`

**Properties:**
- \`port\` - The port number to listen on
- \`appDir\` - Optional directory path for file-based routing
- \`websocket\` - Optional WebSocket handler from Bun
- \`injectHandler\` - Optional middleware injection handler

#### Methods

##### start(cb?: (server: Bun.Server) => void)

Starts the HTTP server.

**Parameters:**
- \`cb\` - Optional callback function called with the Bun server instance

**Returns:** \`Bun.Server\`

##### use(handler: AtomicHandler)

Adds a middleware handler to the server.

**Parameters:**
- \`handler\` - Middleware function to execute for all requests

##### get<R, P>(route: R, ...handlers: AtomicHandler<P>[])

Registers GET route handlers.

**Type Parameters:**
- \`R\` - Route string type
- \`P\` - Route parameters type (automatically extracted from route)

**Parameters:**
- \`route\` - Route pattern string
- \`handlers\` - Handler functions for the route

##### post<R, P>(route: R, ...handlers: AtomicHandler<P>[])

Registers POST route handlers.

**Type Parameters:**
- \`R\` - Route string type
- \`P\` - Route parameters type (automatically extracted from route)

**Parameters:**
- \`route\` - Route pattern string
- \`handlers\` - Handler functions for the route

##### put<R, P>(route: R, ...handlers: AtomicHandler<P>[])

Registers PUT route handlers.

**Type Parameters:**
- \`R\` - Route string type
- \`P\` - Route parameters type (automatically extracted from route)

**Parameters:**
- \`route\` - Route pattern string
- \`handlers\` - Handler functions for the route

##### patch<R, P>(route: R, ...handlers: AtomicHandler<P>[])

Registers PATCH route handlers.

**Type Parameters:**
- \`R\` - Route string type
- \`P\` - Route parameters type (automatically extracted from route)

**Parameters:**
- \`route\` - Route pattern string
- \`handlers\` - Handler functions for the route

##### delete<R, P>(route: R, ...handlers: AtomicHandler<P>[])

Registers DELETE route handlers.

**Type Parameters:**
- \`R\` - Route string type
- \`P\` - Route parameters type (automatically extracted from route)

**Parameters:**
- \`route\` - Route pattern string
- \`handlers\` - Handler functions for the route

##### onError(handler: (error: Error) => Response | Promise<Response>)

Sets a global error handler for the server.

**Parameters:**
- \`handler\` - Function to handle errors and return a response

##### onNotFound(handler: AtomicHandler)

Sets a custom 404 not found handler.

**Parameters:**
- \`handler\` - Function to handle 404 responses

### Req<P, T>

Extended Request class with additional properties for route parameters and context.

**Type Parameters:**
- \`P\` - Type of route parameters (defaults to \`Record<string, string>\`)
- \`T\` - Type of context data (defaults to \`unknown\`)

#### Properties

- \`params: P\` - Route parameters extracted from the URL
- \`query?: Record<string, string>\` - Query string parameters
- \`context?: T\` - Additional context data

#### Getters

##### cookies

Returns all cookies from the request.

**Returns:** \`Record<string, string>\`

### Res

Response class for building HTTP responses.

#### Methods

##### status(status: number)

Sets the HTTP status code.

**Parameters:**
- \`status\` - HTTP status code

**Returns:** \`Res\` (chainable)

##### headers(headers: Record<string, string>)

Sets response headers.

**Parameters:**
- \`headers\` - Object containing header key-value pairs

**Returns:** \`Res\` (chainable)

##### redirect(url: string, status = 302)

Redirects to the specified URL.

**Parameters:**
- \`url\` - URL to redirect to
- \`status\` - HTTP status code (defaults to 302)

**Returns:** \`Response\`

##### send(data?: BodyInit)

Sends a response with optional body data.

**Parameters:**
- \`data\` - Optional response body

**Returns:** \`Response\`

##### json(data: unknown)

Sends a JSON response.

**Parameters:**
- \`data\` - Data to serialize as JSON

**Returns:** \`Response\`

##### html(data: string | ReadableStream<Uint8Array>)

Sends an HTML response.

**Parameters:**
- \`data\` - HTML content or stream

**Returns:** \`Response\`

##### text(data: string)

Sends a plain text response.

**Parameters:**
- \`data\` - Text content

**Returns:** \`Response\`

##### cookie(name: string, value?: string | null, options?: CookieOptions)

Sets or deletes a cookie.

**Parameters:**
- \`name\` - Cookie name
- \`value\` - Cookie value (null to delete)
- \`options\` - Cookie configuration options

**Returns:** \`Res\` (chainable)

## Types

### AtomicHandler<P, T, R>

Handler function type for processing requests.

\`\`\`typescript
type AtomicHandler<
  P = Record<string, string>,
  T = unknown,
  R = Response | void | undefined | Promise<Response | void | undefined>
> = {
  (req: Req<P, T>, res: Res): R
}
\`\`\`

**Type Parameters:**
- \`P\` - Route parameters type
- \`T\` - Context type
- \`R\` - Return type

### CookieOptions

Configuration options for cookies.

\`\`\`typescript
type CookieOptions = {
  maxAge?: number
  expires?: Date
  path?: string
  domain?: string
  secure?: boolean
  httpOnly?: boolean
  sameSite?: 'Strict' | 'Lax' | 'None'
}
\`\`\`

**Properties:**
- \`maxAge\` - Cookie lifetime in seconds
- \`expires\` - Expiration date
- \`path\` - Cookie path
- \`domain\` - Cookie domain
- \`secure\` - HTTPS only flag
- \`httpOnly\` - HTTP only flag (not accessible via JavaScript)
- \`sameSite\` - SameSite attribute for CSRF protection

### ExtractRouteParams<Path>

Utility type that extracts route parameters from a path string.

\`\`\`typescript
type ExtractRouteParams<Path extends string> =
  Path extends \`\${string}/:$\{infer Param}/\${infer Rest}\`
    ? { [K in Param | keyof ExtractRouteParams<\`/\${Rest}\`>]: string }
    : Path extends \`\${string}/:$\{infer Param}\`
      ? { [K in Param]: string }
      : Path extends \`/:$\{infer Param}\`
        ? { [K in Param]: string }
        : {}
\`\`\`

This type automatically extracts parameter names from route patterns like \`/users/:id\` and creates a type with those parameter names.

## Functions

### h(...handlers: AtomicHandler<P, T>[])

Handler composition function that chains multiple handlers together.

**Type Parameters:**
- \`P\` - Route parameters type
- \`T\` - Context type

**Parameters:**
- \`handlers\` - Array of handler functions to chain

**Returns:** \`AtomicHandler<P, T, Response | Promise<Response>>\`

The function executes handlers in sequence until one returns a Response, or returns a 204 No Content if no handler returns a response.

### buildRouter(dir: string)

Creates a file system router for the specified directory.

**Parameters:**
- \`dir\` - Directory path containing route files

**Returns:** \`Bun.FileSystemRouter\`

Uses Next.js-style routing conventions for file-based routing.

## Constants

### ALLOWED_METHODS

Array of allowed HTTP methods.

\`\`\`typescript
const ALLOWED_METHODS = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'OPTIONS'
] as const
\`\`\`

## Cookie Utilities

### cookie.get(req: Req, name: string)

Gets a specific cookie value from the request.

**Parameters:**
- \`req\` - Request object
- \`name\` - Cookie name

**Returns:** \`string | null\`

### cookie.getAll(req: Req)

Gets all cookies from the request.

**Parameters:**
- \`req\` - Request object

**Returns:** \`Record<string, string>\`

### cookie.set(res: Res, name: string, value: string, options?: CookieOptions)

Sets a cookie in the response.

**Parameters:**
- \`res\` - Response object
- \`name\` - Cookie name
- \`value\` - Cookie value
- \`options\` - Cookie configuration options

**Returns:** \`string\` - The cookie string

### cookie.delete(res: Res, name: string)

Deletes a cookie by setting its Max-Age to 0.

**Parameters:**
- \`res\` - Response object
- \`name\` - Cookie name to delete

**Returns:** \`string\` - The deletion cookie string`}
      tableOfContents={[
        { id: 'classes', title: 'Classes', level: 2, offset: 72 },
        { id: 'http', title: 'Http', level: 3, offset: 72 },
        { id: 'req-p-t-', title: 'Req<P, T>', level: 3, offset: 72 },
        { id: 'res', title: 'Res', level: 3, offset: 72 },
        { id: 'types', title: 'Types', level: 2, offset: 72 },
        {
          id: 'atomichandler-p-t-r-',
          title: 'AtomicHandler<P, T, R>',
          level: 3,
          offset: 72
        },
        { id: 'cookieoptions', title: 'CookieOptions', level: 3, offset: 72 },
        {
          id: 'extractrouteparams-path-',
          title: 'ExtractRouteParams<Path>',
          level: 3,
          offset: 72
        },
        { id: 'functions', title: 'Functions', level: 2, offset: 72 },
        {
          id: 'h-handlers-atomichandler-p-t-',
          title: 'h(...handlers)',
          level: 3,
          offset: 72
        },
        {
          id: 'buildrouter-dir-string-',
          title: 'buildRouter(dir)',
          level: 3,
          offset: 72
        },
        { id: 'constants', title: 'Constants', level: 2, offset: 72 },
        {
          id: 'allowed_methods',
          title: 'ALLOWED_METHODS',
          level: 3,
          offset: 72
        },
        {
          id: 'cookie-utilities',
          title: 'Cookie Utilities',
          level: 2,
          offset: 72
        }
      ]}
      lastModified="2025-06-09"
    />
  )
}
