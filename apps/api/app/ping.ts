import { h } from 'buntal'

export const GET = h<{}, { user: string }>(
  (req) => {
    console.log('middleware')
    req.context = {
      user: '@buntal'
    }
  },
  (req, res) => {
    return res.json({
      pong: 1,
      user: req.context?.user
    })
  }
)
