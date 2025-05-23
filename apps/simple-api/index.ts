import { Http } from '@buntal/api'
import { cors } from '@buntal/api/middlewares'

// Initialize the HTTP server
const app = new Http({
  port: 4001,
  appDir: './app'   // Enable file-based routing!
})

// Add middleware to handle CORS
app.use(cors())

app.use((req, res) => {
  return res.json({
    message: 'Hello from Buntal API!'
  })
})

// Define a simple GET endpoint with a type-safe params
app.get('/hello/:name', (req, res) => {
  return res.json({
    hello: `Hello ${req.params.name}`
  })
})

// Start the server!
app.start()

console.log(`Server running at http://localhost:${app.server?.port}`)
