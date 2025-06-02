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
║ Date: 2025-06-02 21:30:21 WIB                                              ║
║ Requests per service: 100                                                  ║
╠═══════════════╦════════════════════════╦═══════════════════════════════════╣
║   Service     ║   Avg Latency (sec)    ║      RPS (req/sec)                ║
╠═══════════════╬════════════════════════╬═══════════════════════════════════╣
║ py-fastapi    ║               0.001033 ║                            967.72 ║
║ node-express  ║               0.000710 ║                           1408.93 ║
║ go-gin        ║               0.000471 ║                           2121.21 ║
║ elysia        ║               0.000481 ║                           2080.04 ║
║ buntal        ║               0.000458 ║                           2181.79 ║
╚═══════════════╩════════════════════════╩═══════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║                        PERFORMANCE CHART (RPS)                             ║
╚════════════════════════════════════════════════════════════════════════════╝

buntal        │██████████████████████████████████████████████████│ 2181.79 RPS
go-gin        │████████████████████████████████████████████████│ 2121.21 RPS
elysia        │████████████████████████████████████████████████│ 2080.04 RPS
node-express  │████████████████████████████████│ 1408.93 RPS
py-fastapi    │██████████████████████│ 967.72 RPS

Chart Legend: Each █ represents ~43.6 RPS


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
║ Date: 2025-06-02 21:30:29 WIB                                              ║
║ Requests per service: 100                                                  ║
╠═══════════════╦════════════════════════╦═══════════════════════════════════╣
║   Service     ║   Avg Latency (sec)    ║      RPS (req/sec)                ║
╠═══════════════╬════════════════════════╬═══════════════════════════════════╣
║ py-fastapi    ║               0.001062 ║                            941.64 ║
║ node-express  ║               0.000685 ║                           1460.37 ║
║ go-gin        ║               0.000458 ║                           2182.98 ║
║ elysia        ║               0.000502 ║                           1991.56 ║
║ buntal        ║               0.000456 ║                           2195.15 ║
╚═══════════════╩════════════════════════╩═══════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║                        PERFORMANCE CHART (RPS)                             ║
╚════════════════════════════════════════════════════════════════════════════╝

buntal        │██████████████████████████████████████████████████│ 2195.15 RPS
go-gin        │██████████████████████████████████████████████████│ 2182.98 RPS
elysia        │█████████████████████████████████████████████│ 1991.56 RPS
node-express  │█████████████████████████████████│ 1460.37 RPS
py-fastapi    │█████████████████████│ 941.64 RPS

Chart Legend: Each █ represents ~43.9 RPS


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
║ Date: 2025-06-02 21:30:37 WIB                                              ║
║ Requests per service: 100                                                  ║
╠═══════════════╦════════════════════════╦═══════════════════════════════════╣
║   Service     ║   Avg Latency (sec)    ║      RPS (req/sec)                ║
╠═══════════════╬════════════════════════╬═══════════════════════════════════╣
║ py-fastapi    ║               0.001102 ║                            907.15 ║
║ node-express  ║               0.000662 ║                           1510.83 ║
║ go-gin        ║               0.000463 ║                           2160.62 ║
║ elysia        ║               0.000480 ║                           2082.25 ║
║ buntal        ║               0.000473 ║                           2112.82 ║
╚═══════════════╩════════════════════════╩═══════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║                        PERFORMANCE CHART (RPS)                             ║
╚════════════════════════════════════════════════════════════════════════════╝

go-gin        │██████████████████████████████████████████████████│ 2160.62 RPS
buntal        │████████████████████████████████████████████████│ 2112.82 RPS
elysia        │████████████████████████████████████████████████│ 2082.25 RPS
node-express  │██████████████████████████████████│ 1510.83 RPS
py-fastapi    │████████████████████│ 907.15 RPS

Chart Legend: Each █ represents ~43.2 RPS


════════════════════════════════════════════════════════════════════════════


╔════════════════════════════════════════════════════════════════════════════╗
║                         COMPREHENSIVE RECAP                                ║
║                        (3 Runs Summary)                                    ║
╠════════════════════════════════════════════════════════════════════════════╣
║ Machine: Darwin arm64 | Apple M1 Pro | 16.0 GB                             ║
║ Date: 2025-06-02 21:30:37 WIB                                              ║
║ Requests per service per run: 100                                          ║
║ Number of runs: 3                                                          ║
╚════════════════════════════════════════════════════════════════════════════╝

╔═══════════════╦═══════════════════════════════════╦═══════════════════════════════════════╗
║   Service     ║        Avg Latency (sec)          ║           RPS (req/sec)               ║
║               ║   Avg   │   Min   │    Max        ║    Avg    │    Min    │     Max       ║
╠═══════════════╬═════════╪═════════╪═══════════════╬═══════════╪═══════════╪═══════════════╣
║ py-fastapi    ║  0.0011 │  0.0010 │   0.0011      ║    938.83 │    907.15 │    967.72     ║
║ node-express  ║  0.0007 │  0.0007 │   0.0007      ║   1460.04 │   1408.93 │   1510.83     ║
║ go-gin        ║  0.0005 │  0.0005 │   0.0005      ║   2154.94 │   2121.21 │   2182.98     ║
║ elysia        ║  0.0005 │  0.0005 │   0.0005      ║   2051.28 │   1991.56 │   2082.25     ║
║ buntal        ║  0.0005 │  0.0005 │   0.0005      ║   2163.25 │   2112.82 │   2195.15     ║
╚═══════════════╩═════════╩═════════╩═══════════════╩═══════════╩═══════════╩═══════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║                         RANKING (by Average RPS)                           ║
╚════════════════════════════════════════════════════════════════════════════╝

1. buntal          - 2163.25 RPS (average)
2. go-gin          - 2154.94 RPS (average)
3. elysia          - 2051.28 RPS (average)
4. node-express    - 1460.04 RPS (average)
5. py-fastapi      - 938.83 RPS (average)

╔════════════════════════════════════════════════════════════════════════════╗
║                          BENCHMARK COMPLETED                               ║
╚════════════════════════════════════════════════════════════════════════════╝
```

</section>
