import { type AtomicHandler, type Req } from '@buntal/http'

export const logger = (): AtomicHandler => {
  return async (req: Req) => {
    const now = new Date()
    const print = (num: number) => num.toString().padStart(2, '0')
    console.log(
      `[${print(now.getHours())}:${print(now.getMinutes())}:${print(now.getSeconds())}] > ${req.method} ${new URL(req.url).pathname}`
    )
  }
}
