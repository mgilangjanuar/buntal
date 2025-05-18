import { Http } from 'buntal'

const app = new Http({
  port: 4001,
  appDir: './app'
})

const server = app.start()

console.log(`Server running at http://localhost:${server.port}`)
