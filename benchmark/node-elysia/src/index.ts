import { Elysia } from 'elysia'

const app = new Elysia()
  .get('/json', () => ({ message: 'Hello, World!' }))
  .listen(3104)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
