#!/bin/bash

# node-express
echo "Benchmarking node-express"
curl_output=$(curl -s -w "\n%{time_total}\n" -o /dev/null http://localhost:3100/json)
time_total=$(echo "$curl_output" | grep -E '^[0-9.]+$' | tail -n 1) # Extract the last number which is time_total

if [[ -n "$time_total" && "$time_total" != "0" ]]; then
    RPS=$(awk "BEGIN {print 1/$time_total}")
    echo "Single Request Latency: ${time_total} seconds"
    echo "Calculated RPS (based on single request latency): $RPS"
else
    echo "Error: Could not get a valid time_total from curl, or time_total was zero."
fi


# buntal
echo -e "\nBenchmarking buntal"
curl_output=$(curl -s -w "\n%{time_total}\n" -o /dev/null http://localhost:3101/json)
time_total=$(echo "$curl_output" | grep -E '^[0-9.]+$' | tail -n 1) # Extract the last number which is time_total

if [[ -n "$time_total" && "$time_total" != "0" ]]; then
    RPS=$(awk "BEGIN {print 1/$time_total}")
    echo "Single Request Latency: ${time_total} seconds"
    echo "Calculated RPS (based on single request latency): $RPS"
else
    echo "Error: Could not get a valid time_total from curl, or time_total was zero."
fi
