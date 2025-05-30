import type { Req } from '@buntal/core'

export const ssrHandler = async (
  req: Req,
  handler: {
    $: (req: Req) => unknown
  }
): Promise<Response | void> => {
  try {
    const result = await handler.$(req)

    if (result instanceof Response) {
      return result
    }
    if (typeof result === 'object') {
      return new Response(JSON.stringify(result), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    return new Response(String(result), {
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : JSON.stringify(error)
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
