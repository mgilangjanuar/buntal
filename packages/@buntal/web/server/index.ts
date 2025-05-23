import { networkInterfaces } from 'os'
import { Http } from '@buntal/api'

const app = new Http({
  port: 3000,
})

app.start(server => {
  const ip = networkInterfaces().en0?.find(i => i.family === 'IPv4' && !i.internal)?.address
  console.log(`
   -... ..- -. - .- .-..
   Local:\thttp://localhost:${server.port}
   Network:\thttp://${ip}:${server.port}
`)
})
