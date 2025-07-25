import { h } from '@buntal/http'

/**
 * Handles GET requests for the ping endpoint.
 *
 * This handler logs a message ('middleware') and responds with a JSON object `{ pong: 1 }`.
 *
 * @remarks
 * The handler uses the `h` function from 'buntal/http' to define middleware and response logic.
 *
 * @param _ - The request object (not used in this handler).
 * @param res - The response object used to send a JSON response.
 * @returns A JSON response with `{ pong: 1 }`.
 */
export const GET = h(
  () => {
    console.log('middleware')
  },
  (_, res) =>
    res.json({
      pong: 1
    })
)
