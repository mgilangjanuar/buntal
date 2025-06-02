<section align="center">
  <img align="top" src="https://media.tenor.com/yjOrdcOkLPUAAAAj/green-dot.gif" width="22px" height="22px" />
  <span>Early Development Stage</span>
<section>

<br/>

<section>
  <img src="https://github.com/mgilangjanuar/buntal/raw/main/banner.png" alt="Buntal JS"/>
</section>

<br/>

<section align="center">
  <a href="https://buntaljs.org" target="_blank">
    Website
  </a>
  <span> &nbsp;&middot; &nbsp;</span>
  <a href="https://buntaljs.org/docs" target="_blank">
    Docs
  </a>
  <span> &nbsp;&middot; &nbsp;</span>
  <a href="https://github.com/sponsors/mgilangjanuar" target="_blank">
    Sponsor &hearts;
  </a>
</section>

<br/>

<section align="left" markdown="1">
<p>Ultra-lightweight type-safe modern full-stack web framework with TypeScript, React and Bun. Create HTTP servers and/or web apps without unnecessary bloatware.</p>

```bash
bun create buntal my-app
```

## Features

- **Blazing Fast**: Built on Bun, the fastest JavaScript runtime.
- **HTTP Server**: Create type-safe HTTP servers with Bun's native HTTP server.
- **File-based Routing**: Define routes using file structure, similar to Next.js.
- **SSR**: Server-side rendering for dynamic content.
- **SPA**: Single Page Application support with Bun's bundler.
- More to come!

View more examples [here](/examples).

## Benchmark Test

```
╔════════════════════════════════════════════════════════════════════════════╗
║                           BENCHMARK RESULTS                                ║
╠════════════════════════════════════════════════════════════════════════════╣
║ Machine: Darwin arm64 | Apple M1 Pro | 16.0 GB                             ║
║ Date: 2025-06-02 20:31:52 WIB                                              ║
║ Requests per service: 100                                                  ║
╠═══════════════╦════════════════════════╦═══════════════════════════════════╣
║   Service     ║   Avg Latency (sec)    ║      RPS (req/sec)                ║
╠═══════════════╬════════════════════════╬═══════════════════════════════════╣
║ py-fastapi    ║               0.000950 ║                           1052.55 ║
║ node-express  ║               0.000715 ║                           1398.11 ║
║ go-gin        ║               0.000473 ║                           2115.64 ║
║ elysia        ║               0.000427 ║                           2340.50 ║
║ buntal        ║               0.000429 ║                           2331.49 ║
╚═══════════════╩════════════════════════╩═══════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║                        PERFORMANCE CHART (RPS)                             ║
╚════════════════════════════════════════════════════════════════════════════╝

elysia        │██████████████████████████████████████████████████│ 2340.50 RPS
buntal        │██████████████████████████████████████████████████│ 2331.49 RPS
go-gin        │█████████████████████████████████████████████│ 2115.64 RPS
node-express  │██████████████████████████████│ 1398.11 RPS
py-fastapi    │██████████████████████│ 1052.55 RPS

Chart Legend: Each █ represents ~46.8 RPS
```

> [!WARNING]
> NEVER use Buntal JS in production! Unless you are a pufferfish 🐡

</section>
