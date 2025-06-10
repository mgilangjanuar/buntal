import ReferencePage from '@/components/docs/reference-page'
import { type MetaProps } from 'buntal'

export const $ = {
  _meta: {
    title: 'App - Buntal JS'
  } satisfies MetaProps
}

export default function HttpPage() {
  return (
    <ReferencePage
      headerTitle="@buntal/core - Http"
      title="App"
      description="The main HTTP server class for creating and configuring HTTP servers in Buntal."
      sourceUrl="https://github.com/mgilangjanuar/buntal/blob/main/packages/%40buntal/core/http/app.ts"
      typeDefinition={`class Http {
  constructor(config: Config)
  start(cb?: (server: Bun.Server) => void): Bun.Server
  use(handler: AtomicHandler): void
  get<R extends string, P = ExtractRouteParams<R>>(route: R, ...handlers: AtomicHandler<P>[]): void
  post<R extends string, P = ExtractRouteParams<R>>(route: R, ...handlers: AtomicHandler<P>[]): void
  put<R extends string, P = ExtractRouteParams<R>>(route: R, ...handlers: AtomicHandler<P>[]): void
  patch<R extends string, P = ExtractRouteParams<R>>(route: R, ...handlers: AtomicHandler<P>[]): void
  delete<R extends string, P = ExtractRouteParams<R>>(route: R, ...handlers: AtomicHandler<P>[]): void
  onError(handler: (error: Error) => Response): void
  onNotFound(handler: AtomicHandler): void
}`}
      parameters={[
        {
          name: 'config',
          type: 'Config',
          required: true,
          description: 'Configuration object for the HTTP server'
        }
      ]}
      methods={[
        {
          name: 'constructor',
          description:
            'Creates a new HTTP server instance with the specified configuration.',
          parameters: [
            {
              name: 'config',
              type: 'Config',
              required: true,
              description:
                'Server configuration including port, appDir, websocket handler, and injectHandler'
            }
          ]
        },
        {
          name: 'start',
          description:
            'Starts the HTTP server and begins listening for requests.',
          parameters: [
            {
              name: 'cb',
              type: '(server: Bun.Server) => void',
              required: false,
              description:
                'Optional callback function called when server starts'
            }
          ]
        },
        {
          name: 'use',
          description:
            'Adds middleware to the server that runs for all requests.',
          parameters: [
            {
              name: 'handler',
              type: 'AtomicHandler',
              required: true,
              description: 'Middleware function to execute'
            }
          ]
        },
        {
          name: 'get',
          description: 'Registers a GET route handler.',
          parameters: [
            {
              name: 'route',
              type: 'string',
              required: true,
              description: 'Route pattern (supports parameters like /users/:id)'
            },
            {
              name: '...handlers',
              type: 'AtomicHandler[]',
              required: true,
              description: 'One or more handler functions'
            }
          ]
        },
        {
          name: 'post',
          description: 'Registers a POST route handler.',
          parameters: [
            {
              name: 'route',
              type: 'string',
              required: true,
              description: 'Route pattern (supports parameters like /users/:id)'
            },
            {
              name: '...handlers',
              type: 'AtomicHandler[]',
              required: true,
              description: 'One or more handler functions'
            }
          ]
        },
        {
          name: 'put',
          description: 'Registers a PUT route handler.',
          parameters: [
            {
              name: 'route',
              type: 'string',
              required: true,
              description: 'Route pattern (supports parameters like /users/:id)'
            },
            {
              name: '...handlers',
              type: 'AtomicHandler[]',
              required: true,
              description: 'One or more handler functions'
            }
          ]
        },
        {
          name: 'patch',
          description: 'Registers a PATCH route handler.',
          parameters: [
            {
              name: 'route',
              type: 'string',
              required: true,
              description: 'Route pattern (supports parameters like /users/:id)'
            },
            {
              name: '...handlers',
              type: 'AtomicHandler[]',
              required: true,
              description: 'One or more handler functions'
            }
          ]
        },
        {
          name: 'delete',
          description: 'Registers a DELETE route handler.',
          parameters: [
            {
              name: 'route',
              type: 'string',
              required: true,
              description: 'Route pattern (supports parameters like /users/:id)'
            },
            {
              name: '...handlers',
              type: 'AtomicHandler[]',
              required: true,
              description: 'One or more handler functions'
            }
          ]
        },
        {
          name: 'onError',
          description: 'Sets a global error handler for the server.',
          parameters: [
            {
              name: 'handler',
              type: '(error: Error) => Response | Promise<Response>',
              required: true,
              description: 'Function to handle errors'
            }
          ]
        },
        {
          name: 'onNotFound',
          description: 'Sets a handler for 404 Not Found responses.',
          parameters: [
            {
              name: 'handler',
              type: 'AtomicHandler',
              required: true,
              description: 'Function to handle 404 requests'
            }
          ]
        }
      ]}
      lastModified="2025-06-10"
    />
  )
}
