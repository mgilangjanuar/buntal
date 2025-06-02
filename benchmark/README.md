# Multi-Run Benchmark Guide

The `test.sh` script has been enhanced to support multiple benchmark runs with comprehensive statistics and reporting.

## Features

- **Multiple Runs**: Run benchmarks multiple times to get more reliable results
- **Statistical Analysis**: Calculate average, minimum, and maximum values across runs
- **Comprehensive Recap**: Detailed summary showing performance statistics for all services
- **Performance Ranking**: Services ranked by average RPS performance
- **Configurable Parameters**: Customize number of runs and requests per service

## Usage

### Basic Usage

```bash
# Run with default settings (3 runs, 100 requests per service per run)
./test.sh
```

### Custom Configuration

```bash
# Run 5 times with 50 requests per service per run
./test.sh --runs 5 --requests 50

# Quick test with minimal requests
./test.sh --runs 2 --requests 10
```

### Help

```bash
./test.sh --help
```

## Output

The script provides three main sections:

### 1. Individual Run Results

Each run shows:

- Progress indicators for each service
- Results table with latency and RPS
- Visual ASCII chart showing relative performance

### 2. Comprehensive Recap

After all runs complete:

- **Statistics Table**: Shows avg/min/max for both latency and RPS across all runs
- **Performance Ranking**: Services ordered by average RPS performance

### 3. Machine Information

Includes:

- Operating system and architecture
- CPU information
- Memory information
- Timestamp

## Example Output Structure

```
╔════════════════════════════════════════════════════════════════════════════╗
║                         MULTI-RUN BENCHMARK SUITE                          ║
╚════════════════════════════════════════════════════════════════════════════╝

Configuration:
  • Number of runs: 3
  • Requests per service per run: 100
  • Services: py-fastapi, node-express, go-gin, elysia, buntal

[Service Health Check]

╔════════════════════════════════════════════════════════════════════════════╗
║                            BENCHMARK RUN #1                                ║
╚════════════════════════════════════════════════════════════════════════════╝

[Individual run results...]

╔════════════════════════════════════════════════════════════════════════════╗
║                         COMPREHENSIVE RECAP                                ║
║                        (3 Runs Summary)                                    ║
╚════════════════════════════════════════════════════════════════════════════╝

[Statistics table with avg/min/max values]

[Performance ranking]
```

## Tips

1. **For Development**: Use fewer runs and requests for quick feedback

   ```bash
   ./test.sh --runs 1 --requests 10
   ```

2. **For Production Benchmarks**: Use more runs for statistical significance

   ```bash
   ./test.sh --runs 10 --requests 1000
   ```

3. **CI/CD Integration**: The script exits with proper status codes and can be used in automated testing

4. **Service Recovery**: The script includes a 5-second delay between runs to allow services to recover

## Service Requirements

All services must be running and responding before the benchmark starts:

- py-fastapi: http://localhost:3103/json
- node-express: http://localhost:3100/json
- go-gin: http://localhost:3102/json
- elysia: http://localhost:3104/json
- buntal: http://localhost:3101/json

Use `./run-services.sh` to start all services before running the benchmark.
