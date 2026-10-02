<section align="center">
  <img align="top" src="https://media.tenor.com/yjOrdcOkLPUAAAAj/green-dot.gif" width="22px" height="22px" />
  <span>Stable v1</span>
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

[![Deploy](https://github.com/mgilangjanuar/buntal/actions/workflows/deploy.yml/badge.svg)](https://github.com/mgilangjanuar/buntal/actions/workflows/deploy.yml)

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

## Sponsors ❤️

Help us maintain this project by becoming a [sponsor](https://github.com/sponsors/mgilangjanuar)!

<table>
  <tr>
    <td style="padding: 0 18px;">
      <a href="https://m.do.co/c/4aad6c899906">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/mgilangjanuar/buntal/refs/heads/main/apps/web/public/DO_Logo_horizontal_white.svg">
          <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/mgilangjanuar/buntal/refs/heads/main/apps/web/public/DO_Logo_horizontal_blue.svg">
          <img src="https://raw.githubusercontent.com/mgilangjanuar/buntal/refs/heads/main/apps/web/public/DO_Logo_horizontal_blue.svg" width="201px">
        </picture>
      </a>
    </td>
    <td style="padding: 0 18px;">
      <a href="https://cloudflare.com/?ref=buntaljs">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/mgilangjanuar/buntal/refs/heads/main/apps/web/public/cf-dark.svg">
          <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/mgilangjanuar/buntal/refs/heads/main/apps/web/public/cf.svg">
          <img src="https://raw.githubusercontent.com/mgilangjanuar/buntal/refs/heads/main/apps/web/public/cf.svg" width="184px">
        </picture>
      </a>
    </td>
    <td style="padding: 0 18px;">
      <a href="https://sentry.io?ref=buntaljs">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/mgilangjanuar/buntal/refs/heads/main/apps/web/public/sentry-wordmark-light-400x88.svg">
          <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/mgilangjanuar/buntal/refs/heads/main/apps/web/public/sentry-wordmark-dark-400x88.svg">
          <img src="https://raw.githubusercontent.com/mgilangjanuar/buntal/refs/heads/main/apps/web/public/sentry-wordmark-dark-400x88.svg" width="140px">
        </picture>
      </a>
    </td>
  </tr>
</table>

<!-- sponsors --><a href="https://github.com/moerdowo"><img src="https:&#x2F;&#x2F;github.com&#x2F;moerdowo.png" width="60px" alt="User avatar: Frianto Moerdowo" /></a><!-- sponsors -->

## Benchmark Test

It runs `benchmark/test.sh` script, which is a simple bash script to simulate multiple requests to various services and measure their performance.

```
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

Note. The result may vary depending on your machine and the version of each service. But, the top 3 services are consistent across multiple runs.

</section>
