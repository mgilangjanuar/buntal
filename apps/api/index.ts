import { Http } from 'buntal/http'
import { cors } from 'buntal/http/middlewares'

// Initialize the HTTP server
const app = new Http({
  port: 4001,
  appDir: './app'
})

// Add middleware to handle CORS
app.use(cors())

// Define a simple GET endpoint with a type-safe params
app.get('/hello/:name', (req, res) => {
  return res.json({
    hello: `Hello ${req.params.name}`
  })
})

// Start the server!
app.start()

console.log(`Server running at http://localhost:${app.server?.port}`)
