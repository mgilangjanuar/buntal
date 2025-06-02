import { Http } from '@buntal/core'

const app = new Http({
  port: 3101
})

app.get('/json', (_, res) => {
  console.log('Received a request for /json')
  return res.json({
    message: 'Hello, World!'
  })
})

app.start()
