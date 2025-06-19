#!/bin/bash

# Sneakers Market Scraper - Development Startup Script

echo "🔍 Starting Sneakers Market Scraper Development Environment"
echo "============================================================"

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    exit 1
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
pip install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Run tests
echo "🧪 Running backend tests..."
python -m pytest tests/ -v

if [ $? -ne 0 ]; then
    echo "❌ Backend tests failed"
    exit 1
fi

echo "✅ All tests passed!"

# Start backend server in background
echo "🚀 Starting backend server on port 5000..."
python app.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Test backend is running
if curl -f http://localhost:5000/ > /dev/null 2>&1; then
    echo "✅ Backend server is running at http://localhost:5000"
else
    echo "❌ Backend server failed to start"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# Start frontend server
echo "🌐 Starting frontend server on port 8000..."
cd ../frontend
python -m http.server 8000 &
FRONTEND_PID=$!

# Wait for frontend to start
sleep 2

echo ""
echo "🎉 Development environment is ready!"
echo "============================================================"
echo "📱 Frontend: http://localhost:8000"
echo "🔧 Backend API: http://localhost:5000"
echo "📊 API Endpoints:"
echo "   • http://localhost:5000/api/sneakers"
echo "   • http://localhost:5000/api/sneakers/new"
echo "   • http://localhost:5000/api/sneakers/used"
echo ""
echo "Press Ctrl+C to stop all servers"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Cleanup complete"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for user to stop
wait