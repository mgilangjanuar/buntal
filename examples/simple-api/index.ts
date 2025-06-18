import { Http } from '@buntal/http'
import { cors, logger } from '@buntal/http/middlewares'

// Initialize the HTTP server
const app = new Http({
  port: 4001,
  appDir: './app' // Enable file-based routing!
})

// Add middlewares
app.use(cors())
app.use(logger())

// Define a simple GET endpoint with a type-safe params
app.get('/hello/:name', (req, res) => {
  return res.json({
    hello: `Hello ${req.params.name}`
  })
})

// Start the server!
app.start((server) => {
  console.log(`Server running at http://localhost:${server.port}`)
})
