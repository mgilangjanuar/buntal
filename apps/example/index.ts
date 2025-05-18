import { cors, Http } from 'buntal'

const app = new Http({
  port: 4001,
  appDir: './app'
})

app.use(cors())

app.get('/hello/:name', (req, res) => {
  return res.json({
    hello: `Hello ${req.params.name}`
  })
})

app.start()

console.log(`Server running at http://localhost:${app.server?.port}`)
