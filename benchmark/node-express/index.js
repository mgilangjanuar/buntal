const express = require('express')
const app = express()

app.get('/json', (_, res) => {
  res.send({
    message: 'Hello, World!'
  })
})

app.listen(3100)
