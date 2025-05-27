<section align="center">
  <img align="top" src="https://media.tenor.com/yjOrdcOkLPUAAAAj/green-dot.gif" width="22px" height="22px" />
  <span>Early Development Stage</span>
<section>

<br/>

<section>
  <img src="./banner.png" alt="Buntal JS"/>
</section>

<br/>

<section align="center">
  <a href="https://buntaljs.org" target="_blank">
    Website
  </a>
  <span> &nbsp;&middot; &nbsp;</span>
  <a href="https://docs.buntaljs.org" target="_blank">
    Docs
  </a>
  <span> &nbsp;&middot; &nbsp;</span>
  <a href="https://github.com/sponsors/mgilangjanuar" target="_blank">
    Sponsor &hearts;
  </a>
</section>

<br/>

<section align="left" markdown="1">
Ultra-lightweight type-safe modern full-stack web framework with TypeScript, React and Bun. Create HTTP servers and/or web apps without unnecessary bloatware.

<br/>

## Features

- **Blazing Fast**: Built on Bun, the fastest JavaScript runtime.
- **HTTP Server**: Create type-safe HTTP servers with Bun's native HTTP server.
- **File-based Routing**: Define routes using file structure, similar to Next.js.
- **SSR**: Server-side rendering for dynamic content.
- **SPA**: Single Page Application support with Bun's bundler.
- More to come!

## Examples

- **Basic HTTP Server**

  Install [Bun](https://bun.sh/) globally, and install `@buntal/core`:

  ```bash
  bun add @buntal/core
  ```

  Here's a simple example of a server app:

  ```ts
  import { Http } from '@buntal/core'
  import { cors, logger } from '@buntal/core/middlewares'

  // Initialize the HTTP server
  const app = new Http({
    port: 4000,
    appDir: './app'   // Enable file-based routing!
  })

  // Add middlewares
  app.use(cors())
  app.use(logger())

  // Define a simple GET endpoint with a type-safe params!
  app.get('/hello/:name', (req, res) => {
    return res.json({
      hello: `Hello, ${req.params.name}!`
    })
  })

  // Start the server!
  app.start(server => {
    console.log(`Server running at http://localhost:${server.port}`)
  })
  ```

- **React-based Web App**

  Install [Bun](https://bun.sh/) globally, and create a Buntal project:

  ```bash
  bun create buntal my-app
  ```

  Then, navigate to the `my-app` directory and run:

  ```bash
  bun dev
  ```

View more examples [here](/examples).

> [!WARNING]
> NEVER use Buntal JS in production! Unless you are a pufferfish 🐡

</section>
