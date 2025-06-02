#!/bin/bash

# Configuration
NUM_REQUESTS=100
NUM_RUNS=3  # Number of benchmark runs (default)

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --runs)
      NUM_RUNS="$2"
      shift 2
      ;;
    --requests)
      NUM_REQUESTS="$2"
      shift 2
      ;;
    --help|-h)
      echo "Usage: $0 [options]"
      echo "Options:"
      echo "  --runs N        Number of benchmark runs (default: 3)"
      echo "  --requests N    Number of requests per service per run (default: 100)"
      echo "  --help, -h      Show this help message"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      echo "Use --help for usage information"
      exit 1
      ;;
  esac
done

# Validate inputs
if ! [[ "$NUM_RUNS" =~ ^[1-9][0-9]*$ ]]; then
  echo "Error: --runs must be a positive integer"
  exit 1
fi

if ! [[ "$NUM_REQUESTS" =~ ^[1-9][0-9]*$ ]]; then
  echo "Error: --requests must be a positive integer"
  exit 1
fi

# Arrays to store benchmark results for current run
declare -a services=()
declare -a avg_latencies=()
declare -a rps_values=()

# Arrays to store results across multiple runs - using simple arrays instead of associative
declare -a all_runs_services=()
declare -a all_runs_latencies=()
declare -a all_runs_rps=()
declare -a all_runs_numbers=()
declare -a all_services_list=("py-fastapi" "node-express" "go-gin" "elysia" "buntal")

benchmark_service() {
  local service_name=$1
  local url=$2
  local total_time=0
  local num_requests=$NUM_REQUESTS

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

check_service() {
  local service_name=$1
  local url=$2

  echo -n "Checking $service_name at $url... "

  # Use curl with timeout and silent mode to check if service is responsive
  if curl -s --connect-timeout 5 --max-time 10 "$url" > /dev/null 2>&1; then
    echo "✅ OK"
    return 0
  else
    echo "❌ FAILED"
    return 1
  fi
}

check_all_services() {
  echo "Checking if all services are running..."
  echo ""

  local all_services_ok=true

  # Check each service
  check_service "py-fastapi" "http://localhost:3103/json" || all_services_ok=false
  check_service "node-express" "http://localhost:3100/json" || all_services_ok=false
  check_service "go-gin" "http://localhost:3102/json" || all_services_ok=false
  check_service "elysia" "http://localhost:3104/json" || all_services_ok=false
  check_service "buntal" "http://localhost:3101/json" || all_services_ok=false

  echo ""

  if [ "$all_services_ok" = false ]; then
    echo "❌ Some services are not running or not responding!"
    echo "Please make sure all services are started before running the benchmark."
    echo "You can use: ./run-services.sh to start all services."
    echo ""
    exit 1
  else
    echo "✅ All services are running and responding!"
    echo ""
  fi
}

get_machine_info() {
  local os_info=$(uname -s)
  local arch=$(uname -m)
  local cpu_info=""
  local memory_info=""

  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    cpu_info=$(sysctl -n machdep.cpu.brand_string 2>/dev/null || echo "Unknown CPU")
    memory_info=$(sysctl -n hw.memsize 2>/dev/null | awk '{printf "%.1f GB", $1/1024/1024/1024}' || echo "Unknown Memory")
  elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    cpu_info=$(grep "model name" /proc/cpuinfo | head -1 | cut -d: -f2 | sed 's/^ *//' || echo "Unknown CPU")
    memory_info=$(grep MemTotal /proc/meminfo | awk '{printf "%.1f GB", $2/1024/1024}' || echo "Unknown Memory")
  else
    cpu_info="Unknown CPU"
    memory_info="Unknown Memory"
  fi

  echo "$os_info $arch | $cpu_info | $memory_info"
}

print_table() {
  local machine_info=$(get_machine_info)

  echo ""
  echo "╔════════════════════════════════════════════════════════════════════════════╗"
  echo "║                           BENCHMARK RESULTS                                ║"
  echo "╠════════════════════════════════════════════════════════════════════════════╣"
  printf "║ Machine: %-65s ║\n" "$machine_info"
  printf "║ Date: %-68s ║\n" "$(date '+%Y-%m-%d %H:%M:%S %Z')"
  printf "║ Requests per service: %-52s ║\n" "$NUM_REQUESTS"
  echo "╠═══════════════╦════════════════════════╦═══════════════════════════════════╣"
  echo "║   Service     ║   Avg Latency (sec)    ║      RPS (req/sec)                ║"
  echo "╠═══════════════╬════════════════════════╬═══════════════════════════════════╣"

  for i in "${!services[@]}"; do
    printf "║ %-13s ║ %22.6f ║ %33.2f ║\n" "${services[i]}" "${avg_latencies[i]}" "${rps_values[i]}"
  done

  echo "╚═══════════════╩════════════════════════╩═══════════════════════════════════╝"
  echo ""
}

print_ascii_chart() {
  # Create arrays for sorted data
  local sorted_services=()
  local sorted_rps=()

  # Create combined array for sorting
  local combined=()
  for i in "${!services[@]}"; do
    # Validate RPS value before adding
    if [[ "${rps_values[i]}" =~ ^[0-9]+\.?[0-9]*$ ]]; then
      combined+=("${rps_values[i]}:${services[i]}")
    fi
  done

  # Check if we have any valid data
  if [ ${#combined[@]} -eq 0 ]; then
    echo "❌ No valid RPS data to display chart"
    return
  fi

  # Sort by RPS (descending order)
  IFS=$'\n' sorted=($(sort -t: -k1 -nr <<<"${combined[*]}"))
  unset IFS

  # Extract sorted data
  for item in "${sorted[@]}"; do
    local rps=$(echo "$item" | cut -d: -f1)
    local service=$(echo "$item" | cut -d: -f2)
    sorted_services+=("$service")
    sorted_rps+=("$rps")
  done

  # Find max RPS for scaling
  local max_rps=${sorted_rps[0]}
  local chart_width=50

  # Check for division by zero
  if [[ "$max_rps" == "0" || "$max_rps" == "0.0" ]]; then
    echo "❌ Cannot create chart: all RPS values are zero"
    return
  fi

  echo "╔════════════════════════════════════════════════════════════════════════════╗"
  echo "║                        PERFORMANCE CHART (RPS)                             ║"
  echo "╚════════════════════════════════════════════════════════════════════════════╝"
  echo ""

  for i in "${!sorted_services[@]}"; do
    local service=${sorted_services[i]}
    local rps=${sorted_rps[i]}

    # Calculate bar length (proportional to max RPS) using bc for safer arithmetic
    # Use scale=2 for better precision, then round to integer
    local bar_length_precise=$(echo "scale=2; ($rps / $max_rps) * $chart_width" | bc -l 2>/dev/null || echo "1.0")
    local bar_length=$(printf "%.0f" "$bar_length_precise" 2>/dev/null || echo "1")

    # Ensure minimum bar length of 1 for visibility, but allow proper scaling
    if ! [[ "$bar_length" =~ ^[0-9]+$ ]]; then
      bar_length=1
    elif [ "$bar_length" -lt 1 ]; then
      bar_length=1
    elif [ "$bar_length" -gt "$chart_width" ]; then
      bar_length=$chart_width
    fi

    # Create the bar
    local bar=""
    for ((j=1; j<=bar_length; j++)); do
      bar+="█"
    done

    printf "%-13s │%s│ %.2f RPS\n" "$service" "$bar" "$rps"
  done

  echo ""
  # Use bc for the legend calculation too
  local legend_value=$(echo "scale=1; $max_rps / $chart_width" | bc -l 2>/dev/null || echo "N/A")
  echo "Chart Legend: Each █ represents ~${legend_value} RPS"
  echo ""
}

# Function to reset arrays for a new run
reset_run_data() {
  services=()
  avg_latencies=()
  rps_values=()
}

# Function to run a complete benchmark round
run_benchmark_round() {
  local run_number=$1

  echo "╔════════════════════════════════════════════════════════════════════════════╗"
  echo "║                            BENCHMARK RUN #$run_number                                ║"
  echo "╚════════════════════════════════════════════════════════════════════════════╝"
  echo ""

  # Reset data for new run
  reset_run_data

  echo "Starting benchmark with $NUM_REQUESTS requests per service..."
  echo ""

  benchmark_service "py-fastapi" "http://localhost:3103/json"
  benchmark_service "node-express" "http://localhost:3100/json"
  benchmark_service "go-gin" "http://localhost:3102/json"
  benchmark_service "elysia" "http://localhost:3104/json"
  benchmark_service "buntal" "http://localhost:3101/json"

  # Store results for this run
  for i in "${!services[@]}"; do
    local service="${services[i]}"
    local avg_latency="${avg_latencies[i]}"
    local rps="${rps_values[i]}"

    # Store in parallel arrays
    all_runs_services+=("$service")
    all_runs_latencies+=("$avg_latency")
    all_runs_rps+=("$rps")
    all_runs_numbers+=("$run_number")
  done

  print_table
  print_ascii_chart

  echo ""
  echo "════════════════════════════════════════════════════════════════════════════"
  echo ""
}

# Function to calculate statistics across all runs
calculate_statistics() {
  local service=$1
  local metric=$2  # "latency" or "rps"

  local values=()
  local sum=0

  # Collect values for this service across all runs
  for i in "${!all_runs_services[@]}"; do
    if [[ "${all_runs_services[i]}" == "$service" ]]; then
      local value
      if [[ "$metric" == "latency" ]]; then
        value="${all_runs_latencies[i]}"
      else
        value="${all_runs_rps[i]}"
      fi

      # Validate that value is a number
      if [[ "$value" =~ ^[0-9]+\.?[0-9]*$ ]] && [[ "$value" != "0" ]]; then
        values+=("$value")
        sum=$(awk "BEGIN {print $sum + $value}")
      fi
    fi
  done

  if [[ ${#values[@]} -eq 0 ]]; then
    echo "0:0:0"  # avg:min:max
    return
  fi

  local avg=$(awk "BEGIN {print $sum / ${#values[@]}}")

  # Find min and max
  local min=${values[0]}
  local max=${values[0]}

  for value in "${values[@]}"; do
    if (( $(awk "BEGIN {print ($value < $min)}") )); then
      min=$value
    fi
    if (( $(awk "BEGIN {print ($value > $max)}") )); then
      max=$value
    fi
  done

  echo "$avg:$min:$max"
}

# Function to print comprehensive recap
print_recap() {
  local machine_info=$(get_machine_info)

  echo ""
  echo "╔════════════════════════════════════════════════════════════════════════════╗"
  echo "║                         COMPREHENSIVE RECAP                                ║"
  echo "║                        ($NUM_RUNS Runs Summary)                                    ║"
  echo "╠════════════════════════════════════════════════════════════════════════════╣"
  printf "║ Machine: %-65s ║\n" "$machine_info"
  printf "║ Date: %-68s ║\n" "$(date '+%Y-%m-%d %H:%M:%S %Z')"
  printf "║ Requests per service per run: %-44s ║\n" "$NUM_REQUESTS"
  printf "║ Number of runs: %-58s ║\n" "$NUM_RUNS"
  echo "╚════════════════════════════════════════════════════════════════════════════╝"
  echo ""

  echo "╔═══════════════╦════════════════════════════════╦═══════════════════════════════════════╗"
  echo "║   Service     ║      Avg Latency (sec)         ║           RPS (req/sec)               ║"
  echo "║               ║   Avg   │  Min   │   Max       ║    Avg    │   Min    │     Max        ║"
  echo "╠═══════════════╬═════════╪════════╪═════════════╬═══════════╪══════════╪════════════════╣"

  for service in "${all_services_list[@]}"; do
    local latency_stats=$(calculate_statistics "$service" "latency")
    local rps_stats=$(calculate_statistics "$service" "rps")

    local lat_avg=$(echo "$latency_stats" | cut -d: -f1)
    local lat_min=$(echo "$latency_stats" | cut -d: -f2)
    local lat_max=$(echo "$latency_stats" | cut -d: -f3)

    local rps_avg=$(echo "$rps_stats" | cut -d: -f1)
    local rps_min=$(echo "$rps_stats" | cut -d: -f2)
    local rps_max=$(echo "$rps_stats" | cut -d: -f3)

    printf "║ %-13s ║ %7.4f │ %6.4f │ %7.4f ║ %9.2f │ %8.2f │ %10.2f ║\n" \
      "$service" "$lat_avg" "$lat_min" "$lat_max" "$rps_avg" "$rps_min" "$rps_max"
  done

  echo "╚═══════════════╩═════════╪════════╪═════════════╩═══════════╪══════════╪════════════════╝"
  echo ""

  # Print ranking based on average RPS
  echo "╔════════════════════════════════════════════════════════════════════════════╗"
  echo "║                         RANKING (by Average RPS)                           ║"
  echo "╚════════════════════════════════════════════════════════════════════════════╝"
  echo ""

  # Create array for ranking
  local ranking_data=()
  for service in "${all_services_list[@]}"; do
    local rps_stats=$(calculate_statistics "$service" "rps")
    local rps_avg=$(echo "$rps_stats" | cut -d: -f1)
    ranking_data+=("$rps_avg:$service")
  done

  # Sort by RPS (descending)
  IFS=$'\n' sorted_ranking=($(sort -t: -k1 -nr <<<"${ranking_data[*]}"))
  unset IFS

  local rank=1
  for item in "${sorted_ranking[@]}"; do
    local rps=$(echo "$item" | cut -d: -f1)
    local service=$(echo "$item" | cut -d: -f2)
    printf "%d. %-15s - %.2f RPS (average)\n" "$rank" "$service" "$rps"
    ((rank++))
  done

  echo ""
}

# Main execution
echo "╔════════════════════════════════════════════════════════════════════════════╗"
echo "║                         MULTI-RUN BENCHMARK SUITE                          ║"
echo "╚════════════════════════════════════════════════════════════════════════════╝"
echo ""
echo "Configuration:"
echo "  • Number of runs: $NUM_RUNS"
echo "  • Requests per service per run: $NUM_REQUESTS"
echo "  • Services: py-fastapi, node-express, go-gin, elysia, buntal"
echo ""

# Check services once before starting all runs
check_all_services

# Run multiple benchmark rounds
for ((run=1; run<=NUM_RUNS; run++)); do
  run_benchmark_round $run

  # Add a delay between runs to allow services to recover
  if [[ $run -lt $NUM_RUNS ]]; then
    sleep 1
    echo ""
  fi
done

# Print comprehensive recap
print_recap

echo "╔════════════════════════════════════════════════════════════════════════════╗"
echo "║                          BENCHMARK COMPLETED                               ║"
echo "╚════════════════════════════════════════════════════════════════════════════╝"
