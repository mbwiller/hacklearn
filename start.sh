#!/bin/bash

# HackLearn Pro - Quick Start Script
# This script helps you quickly deploy the platform using Docker

set -e

echo "🛡️  HackLearn Pro - Gamified Ethical Hacking Platform"
echo "===================================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker is not installed."
    echo "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Error: Docker is not running."
    echo "Please start Docker Desktop and try again."
    exit 1
fi

echo "✅ Docker is installed and running"
echo ""

# Check if docker-compose is available
if command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker-compose"
elif docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
else
    echo "❌ Error: docker-compose is not available."
    echo "Please install docker-compose or update Docker Desktop."
    exit 1
fi

echo "📦 Building and starting HackLearn Pro..."
echo ""

# Build and start the container
$COMPOSE_CMD up -d --build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ HackLearn Pro is now running!"
    echo ""
    echo "🌐 Access the platform at: http://localhost:8080"
    echo ""
    echo "📚 Useful commands:"
    echo "   Stop:    $COMPOSE_CMD down"
    echo "   Restart: $COMPOSE_CMD restart"
    echo "   Logs:    $COMPOSE_CMD logs -f"
    echo ""
    echo "Happy learning! 🎓 Stay ethical, stay secure! 🛡️"
else
    echo ""
    echo "❌ Error: Failed to start HackLearn Pro"
    echo "Please check the error messages above."
    exit 1
fi