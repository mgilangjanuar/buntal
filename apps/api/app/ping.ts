import { h } from 'buntal/http'

export const GET = h<{}, { user: string }>(
  () => {
    console.log('middleware')
  },
  (_, res) => {
    return res.json({
      pong: 1
    })
  }
)
