#!/bin/bash

benchmark_service() {
  local service_name=$1
  local url=$2
  local total_time=0
  local num_requests=100

  echo -e "\nBenchmarking $service_name"

  for ((i = 1; i <= num_requests; i++)); do
    curl_output=$(curl -s -w "\n%{time_total}\n" -o /dev/null "$url")
    time_total=$(echo "$curl_output" | grep -E '^[0-9.]+$' | tail -n 1) # Extract the last number which is time_total

    if [[ -n "$time_total" && "$time_total" != "0" ]]; then
      total_time=$(awk "BEGIN {print $total_time + $time_total}")
    else
      echo "Error: Could not get a valid time_total from curl, or time_total was zero."
      return
    fi
  done

  avg_time=$(awk "BEGIN {print $total_time / $num_requests}")
  RPS=$(awk "BEGIN {print 1/$avg_time}")
  echo "Average Latency (over $num_requests requests): ${avg_time} seconds"
  echo "Calculated RPS (based on average latency): $RPS"
}

benchmark_service "node-express" "http://localhost:3100/json"
benchmark_service "buntal" "http://localhost:3101/json"
