#!/bin/bash

# Arrays to store benchmark results
declare -a services=()
declare -a avg_latencies=()
declare -a rps_values=()

benchmark_service() {
  local service_name=$1
  local url=$2
  local total_time=0
  local num_requests=100

  echo -n "Benchmarking $service_name..."

  for ((i = 1; i <= num_requests; i++)); do
    curl_output=$(curl -s -w "\n%{time_total}\n" -o /dev/null "$url")
    time_total=$(echo "$curl_output" | grep -E '^[0-9.]+$' | tail -n 1) # Extract the last number which is time_total

    if [[ -n "$time_total" && "$time_total" != "0" ]]; then
      total_time=$(awk "BEGIN {print $total_time + $time_total}")
    else
      echo " Error: Could not get a valid time_total from curl, or time_total was zero."
      return
    fi

    # Show progress
    if ((i % 20 == 0)); then
      echo -n " $i/$num_requests"
    fi
  done

  echo " Done!"

  local avg_time=$(awk "BEGIN {print $total_time / $num_requests}")
  local RPS=$(awk "BEGIN {print 1/$avg_time}")

  # Store results in arrays
  services+=("$service_name")
  avg_latencies+=("$avg_time")
  rps_values+=("$RPS")
}

print_table() {
  echo ""
  echo "╔════════════════════════════════════════════════════════════════════════════╗"
  echo "║                           BENCHMARK RESULTS                                ║"
  echo "╠═══════════════╦════════════════════════╦═══════════════════════════════════╣"
  echo "║   Service     ║   Avg Latency (sec)    ║      RPS (req/sec)                ║"
  echo "╠═══════════════╬════════════════════════╬═══════════════════════════════════╣"

  for i in "${!services[@]}"; do
    printf "║ %-13s ║ %22.6f ║ %33.2f ║\n" "${services[i]}" "${avg_latencies[i]}" "${rps_values[i]}"
  done

  echo "╚═══════════════╩════════════════════════╩═══════════════════════════════════╝"
  echo ""

  # Find the best performing service
  local best_rps=0
  local best_service=""
  for i in "${!services[@]}"; do
    if (( $(echo "${rps_values[i]} > $best_rps" | bc -l) )); then
      best_rps=${rps_values[i]}
      best_service=${services[i]}
    fi
  done

  echo "🏆 Best Performance: $best_service with ${best_rps} RPS"
  echo ""
}

echo "Starting benchmark with 100 requests per service..."
echo ""

benchmark_service "node-express" "http://localhost:3100/json"
benchmark_service "go-gin" "http://localhost:3102/json"
benchmark_service "buntal" "http://localhost:3101/json"

print_table
