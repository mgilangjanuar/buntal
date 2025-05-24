import { builder, runServer } from '@buntal/web'

const routes = await builder()
console.log(routes)
runServer()
