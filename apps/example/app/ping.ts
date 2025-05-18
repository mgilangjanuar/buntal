import { h } from 'buntal'

export const GET = h(
  (req) => {
    console.log('middleware')
    req.context = {
      user: '1234'
    }
  },
  (req, res) => {
    console.log(req.context)
    return res.json({
      pong: 1
    })
  }
)
