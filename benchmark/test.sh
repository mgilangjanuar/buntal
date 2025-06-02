#!/bin/bash

# Configuration
NUM_REQUESTS=100

# Arrays to store benchmark results
declare -a services=()
declare -a avg_latencies=()
declare -a rps_values=()

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

    # Add ranking number and format output
    local rank=$((i + 1))
    case $rank in
      1) rank_symbol="🥇" ;;
      2) rank_symbol="🥈" ;;
      3) rank_symbol="🥉" ;;
      *) rank_symbol="$rank." ;;
    esac

    printf "%s %-13s │%s│ %.2f RPS\n" "$rank_symbol" "$service" "$bar" "$rps"
  done

  echo ""
  # Use bc for the legend calculation too
  local legend_value=$(echo "scale=1; $max_rps / $chart_width" | bc -l 2>/dev/null || echo "N/A")
  echo "Chart Legend: Each █ represents ~${legend_value} RPS"
  echo ""
}

# First check if all services are running
check_all_services

echo "Starting benchmark with $NUM_REQUESTS requests per service..."
echo ""

benchmark_service "py-fastapi" "http://localhost:3103/json"
benchmark_service "node-express" "http://localhost:3100/json"
benchmark_service "go-gin" "http://localhost:3102/json"
benchmark_service "elysia" "http://localhost:3104/json"
benchmark_service "buntal" "http://localhost:3101/json"

print_table
print_ascii_chart
