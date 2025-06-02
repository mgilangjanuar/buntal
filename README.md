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

It runs `benchmark/test.sh` script, which is a simple bash script to simulate multiple requests to various services and measure their performance.

```
╔════════════════════════════════════════════════════════════════════════════╗
║                         COMPREHENSIVE RECAP                                ║
║                        (3 Runs Summary)                                   ║
╠════════════════════════════════════════════════════════════════════════════╣
║ Machine: Darwin arm64 | Apple M1 Pro | 16.0 GB                             ║
║ Date: 2025-06-02 20:50:36 WIB                                              ║
║ Requests per service per run: 100                                          ║
║ Number of runs: 3                                                          ║
╚════════════════════════════════════════════════════════════════════════════╝

╔═══════════════╦════════════════════════════════╦═══════════════════════════════════════╗
║   Service     ║      Avg Latency (sec)         ║           RPS (req/sec)               ║
║               ║   Avg   │  Min   │   Max       ║    Avg    │   Min    │     Max        ║
╠═══════════════╬═════════╪════════╪═════════════╬═══════════╪══════════╪════════════════╣
║ py-fastapi    ║  0.0012 │ 0.0011 │  0.0013    ║    835.90 │   796.76 │     877.53    ║
║ node-express  ║  0.0007 │ 0.0007 │  0.0007    ║   1376.42 │  1334.94 │    1418.16    ║
║ go-gin        ║  0.0005 │ 0.0005 │  0.0005    ║   1987.36 │  1865.11 │    2124.18    ║
║ elysia        ║  0.0005 │ 0.0004 │  0.0005    ║   2096.58 │  1985.27 │    2224.20    ║
║ buntal        ║  0.0005 │ 0.0005 │  0.0005    ║   2099.56 │  1993.30 │    2199.35    ║
╚═══════════════╩═════════╪════════╪═════════════╩═══════════╪══════════╪════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║                         RANKING (by Average RPS)                           ║
╚════════════════════════════════════════════════════════════════════════════╝

1. buntal          - 2099.56 RPS (average)
2. elysia          - 2096.58 RPS (average)
3. go-gin          - 1987.36 RPS (average)
4. node-express    - 1376.42 RPS (average)
5. py-fastapi      - 835.90 RPS (average)

╔════════════════════════════════════════════════════════════════════════════╗
║                          BENCHMARK COMPLETED                               ║
╚════════════════════════════════════════════════════════════════════════════╝
```

> [!WARNING]
> NEVER use Buntal JS in production! Unless you are a pufferfish 🐡

</section>
