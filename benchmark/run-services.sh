#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to kill all background processes on exit
cleanup() {
    print_warning "Stopping all services..."
    jobs -p | xargs -r kill
    exit 0
}

# Set up trap to cleanup on exit
trap cleanup SIGINT SIGTERM EXIT

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

print_status "Starting all benchmark services..."
echo

# Create logs directory if it doesn't exist
mkdir -p "$SCRIPT_DIR/logs"

# Check required commands
missing_commands=()

if ! command_exists "node"; then
    missing_commands+=("node")
fi

if ! command_exists "npm"; then
    missing_commands+=("npm")
fi

if ! command_exists "bun"; then
    missing_commands+=("bun")
fi

if ! command_exists "go"; then
    missing_commands+=("go")
fi

if ! command_exists "python3"; then
    missing_commands+=("python3")
fi

if [ ${#missing_commands[@]} -ne 0 ]; then
    print_error "Missing required commands: ${missing_commands[*]}"
    print_error "Please install the missing tools and try again."
    exit 1
fi

# Start Node.js Express service
print_status "Starting Node.js Express service on port 3100..."
cd "$SCRIPT_DIR/node-express"
if [ ! -d "node_modules" ]; then
    print_status "Installing Node.js dependencies..."
    npm install
fi
node . > ../logs/node-express.log 2>&1 &
NODE_PID=$!
print_success "Node.js Express service started (PID: $NODE_PID)"

# Start Buntal service
print_status "Starting Buntal service on port 3101..."
cd "$SCRIPT_DIR/buntal"
if [ ! -d "node_modules" ]; then
    print_status "Installing Buntal dependencies..."
    bun install
fi
bun . > ../logs/buntal.log 2>&1 &
BUNTAL_PID=$!
print_success "Buntal service started (PID: $BUNTAL_PID)"

# Start Go Gin service
print_status "Starting Go Gin service on port 3102..."
cd "$SCRIPT_DIR/go-gin"
go run main.go > ../logs/go-gin.log 2>&1 &
GO_PID=$!
print_success "Go Gin service started (PID: $GO_PID)"

# Start Python FastAPI service
print_status "Starting Python FastAPI service on port 3103..."
cd "$SCRIPT_DIR/py-fastapi"
if [ ! -d "env" ]; then
    print_warning "Python virtual environment not found. Please create it first:"
    print_warning "python3 -m venv env"
    print_warning "source env/bin/activate"
    print_warning "pip install fastapi uvicorn"
else
    source env/bin/activate
    uvicorn main:app --host 0.0.0.0 --port 3103 --log-level critical > ../logs/py-fastapi.log 2>&1 &
    PYTHON_PID=$!
    print_success "Python FastAPI service started (PID: $PYTHON_PID)"
    deactivate
fi

# Start Node.js Elysia service
print_status "Starting Node.js Elysia service on port 3104..."
cd "$SCRIPT_DIR/node-elysia"
if [ ! -d "node_modules" ]; then
    print_status "Installing Node.js Elysia dependencies..."
    bun install
fi
bun start > ../logs/node-elysia.log 2>&1 &
ELYSIA_PID=$!
print_success "Node.js Elysia service started (PID: $ELYSIA_PID)"

echo
print_success "All services have been started!"
print_status "Service endpoints:"
echo "  - Node.js Express: http://localhost:3100"
echo "  - Buntal:          http://localhost:3101"
echo "  - Go Gin:          http://localhost:3102"
echo "  - Python FastAPI:  http://localhost:3103"
echo "  - Node.js Elysia:  http://localhost:3104"
echo
print_status "Logs are being written to the logs/ directory"
print_status "Press Ctrl+C to stop all services"

# Wait for all background processes
wait

