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
bun create buntal@latest my-app
```

> [!WARNING]
> NEVER use Buntal JS in production! Unless you are a pufferfish 🐡

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

Note. The result may vary depending on your machine and the version of each service.

```
╔════════════════════════════════════════════════════════════════════════════╗
║                         MULTI-RUN BENCHMARK SUITE                          ║
╚════════════════════════════════════════════════════════════════════════════╝

Configuration:
  • Number of runs: 3
  • Requests per service per run: 100
  • Services: py-fastapi, node-express, go-gin, elysia, buntal

Checking if all services are running...

Checking py-fastapi at http://localhost:3103/json... ✅ OK
Checking node-express at http://localhost:3100/json... ✅ OK
Checking go-gin at http://localhost:3102/json... ✅ OK
Checking elysia at http://localhost:3104/json... ✅ OK
Checking buntal at http://localhost:3101/json... ✅ OK

✅ All services are running and responding!

╔════════════════════════════════════════════════════════════════════════════╗
║                            BENCHMARK RUN #1                                ║
╚════════════════════════════════════════════════════════════════════════════╝

Starting benchmark with 100 requests per service...

Benchmarking py-fastapi... 20/100 40/100 60/100 80/100 100/100 Done!
Benchmarking node-express... 20/100 40/100 60/100 80/100 100/100 Done!
Benchmarking go-gin... 20/100 40/100 60/100 80/100 100/100 Done!
Benchmarking elysia... 20/100 40/100 60/100 80/100 100/100 Done!
Benchmarking buntal... 20/100 40/100 60/100 80/100 100/100 Done!

╔════════════════════════════════════════════════════════════════════════════╗
║                           BENCHMARK RESULTS                                ║
╠════════════════════════════════════════════════════════════════════════════╣
║ Machine: Darwin arm64 | Apple M1 Pro | 16.0 GB                             ║
║ Date: 2025-06-02 20:50:17 WIB                                              ║
║ Requests per service: 100                                                  ║
╠═══════════════╦════════════════════════╦═══════════════════════════════════╣
║   Service     ║   Avg Latency (sec)    ║      RPS (req/sec)                ║
╠═══════════════╬════════════════════════╬═══════════════════════════════════╣
║ py-fastapi    ║               0.001255 ║                            796.76 ║
║ node-express  ║               0.000727 ║                           1376.16 ║
║ go-gin        ║               0.000536 ║                           1865.11 ║
║ elysia        ║               0.000504 ║                           1985.27 ║
║ buntal        ║               0.000502 ║                           1993.30 ║
╚═══════════════╩════════════════════════╩═══════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║                        PERFORMANCE CHART (RPS)                             ║
╚════════════════════════════════════════════════════════════════════════════╝

buntal        │██████████████████████████████████████████████████│ 1993.30 RPS
elysia        │██████████████████████████████████████████████████│ 1985.27 RPS
go-gin        │██████████████████████████████████████████████│ 1865.11 RPS
node-express  │██████████████████████████████████│ 1376.16 RPS
py-fastapi    │████████████████████│ 796.76 RPS

Chart Legend: Each █ represents ~39.8 RPS


════════════════════════════════════════════════════════════════════════════


╔════════════════════════════════════════════════════════════════════════════╗
║                            BENCHMARK RUN #2                                ║
╚════════════════════════════════════════════════════════════════════════════╝

Starting benchmark with 100 requests per service...

Benchmarking py-fastapi... 20/100 40/100 60/100 80/100 100/100 Done!
Benchmarking node-express... 20/100 40/100 60/100 80/100 100/100 Done!
Benchmarking go-gin... 20/100 40/100 60/100 80/100 100/100 Done!
Benchmarking elysia... 20/100 40/100 60/100 80/100 100/100 Done!
Benchmarking buntal... 20/100 40/100 60/100 80/100 100/100 Done!

╔════════════════════════════════════════════════════════════════════════════╗
║                           BENCHMARK RESULTS                                ║
╠════════════════════════════════════════════════════════════════════════════╣
║ Machine: Darwin arm64 | Apple M1 Pro | 16.0 GB                             ║
║ Date: 2025-06-02 20:50:27 WIB                                              ║
║ Requests per service: 100                                                  ║
╠═══════════════╦════════════════════════╦═══════════════════════════════════╣
║   Service     ║   Avg Latency (sec)    ║      RPS (req/sec)                ║
╠═══════════════╬════════════════════════╬═══════════════════════════════════╣
║ py-fastapi    ║               0.001140 ║                            877.53 ║
║ node-express  ║               0.000749 ║                           1334.94 ║
║ go-gin        ║               0.000507 ║                           1972.78 ║
║ elysia        ║               0.000481 ║                           2080.26 ║
║ buntal        ║               0.000475 ║                           2106.02 ║
╚═══════════════╩════════════════════════╩═══════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║                        PERFORMANCE CHART (RPS)                             ║
╚════════════════════════════════════════════════════════════════════════════╝

buntal        │██████████████████████████████████████████████████│ 2106.02 RPS
elysia        │█████████████████████████████████████████████████│ 2080.26 RPS
go-gin        │██████████████████████████████████████████████│ 1972.78 RPS
node-express  │████████████████████████████████│ 1334.94 RPS
py-fastapi    │████████████████████│ 877.53 RPS

Chart Legend: Each █ represents ~42.1 RPS


════════════════════════════════════════════════════════════════════════════


╔════════════════════════════════════════════════════════════════════════════╗
║                            BENCHMARK RUN #3                                ║
╚════════════════════════════════════════════════════════════════════════════╝

Starting benchmark with 100 requests per service...

Benchmarking py-fastapi... 20/100 40/100 60/100 80/100 100/100 Done!
Benchmarking node-express... 20/100 40/100 60/100 80/100 100/100 Done!
Benchmarking go-gin... 20/100 40/100 60/100 80/100 100/100 Done!
Benchmarking elysia... 20/100 40/100 60/100 80/100 100/100 Done!
Benchmarking buntal... 20/100 40/100 60/100 80/100 100/100 Done!

╔════════════════════════════════════════════════════════════════════════════╗
║                           BENCHMARK RESULTS                                ║
╠════════════════════════════════════════════════════════════════════════════╣
║ Machine: Darwin arm64 | Apple M1 Pro | 16.0 GB                             ║
║ Date: 2025-06-02 20:50:36 WIB                                              ║
║ Requests per service: 100                                                  ║
╠═══════════════╦════════════════════════╦═══════════════════════════════════╣
║   Service     ║   Avg Latency (sec)    ║      RPS (req/sec)                ║
╠═══════════════╬════════════════════════╬═══════════════════════════════════╣
║ py-fastapi    ║               0.001200 ║                            833.40 ║
║ node-express  ║               0.000705 ║                           1418.16 ║
║ go-gin        ║               0.000471 ║                           2124.18 ║
║ elysia        ║               0.000450 ║                           2224.20 ║
║ buntal        ║               0.000455 ║                           2199.35 ║
╚═══════════════╩════════════════════════╩═══════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║                        PERFORMANCE CHART (RPS)                             ║
╚════════════════════════════════════════════════════════════════════════════╝

elysia        │██████████████████████████████████████████████████│ 2224.20 RPS
buntal        │█████████████████████████████████████████████████│ 2199.35 RPS
go-gin        │████████████████████████████████████████████████│ 2124.18 RPS
node-express  │████████████████████████████████│ 1418.16 RPS
py-fastapi    │██████████████████│ 833.40 RPS

Chart Legend: Each █ represents ~44.4 RPS


════════════════════════════════════════════════════════════════════════════


╔════════════════════════════════════════════════════════════════════════════╗
║                         COMPREHENSIVE RECAP                                ║
║                        (3 Runs Summary)                                    ║
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
║ py-fastapi    ║  0.0012 │ 0.0011 │  0.0013     ║    835.90 │   796.76 │     877.53     ║
║ node-express  ║  0.0007 │ 0.0007 │  0.0007     ║   1376.42 │  1334.94 │    1418.16     ║
║ go-gin        ║  0.0005 │ 0.0005 │  0.0005     ║   1987.36 │  1865.11 │    2124.18     ║
║ elysia        ║  0.0005 │ 0.0004 │  0.0005     ║   2096.58 │  1985.27 │    2224.20     ║
║ buntal        ║  0.0005 │ 0.0005 │  0.0005     ║   2099.56 │  1993.30 │    2199.35     ║
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

</section>
