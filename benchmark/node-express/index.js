const express = require('express')
const app = express()

app.get('/json', (_, res) => {
  console.log('Received a request for /json')
  res.send({
    message: 'Hello, World!'
  })
})

app.listen(3100)
