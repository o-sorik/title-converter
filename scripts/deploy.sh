#!/bin/bash
set -e

# Deploy script for titlecaseconverter.online
# Usage: ssh deploy@78.47.113.198 'bash -s' < scripts/deploy.sh

APP_DIR="/var/www/titlecaseconverter"
REPO_URL="git@github.com:YOUR_USERNAME/titlecaseconverter.git"  # TODO: update with real repo URL

echo "==> Deploying titlecaseconverter.online..."

cd "$APP_DIR"

# Pull latest code
if [ -d ".git" ]; then
    echo "==> Pulling latest changes..."
    git pull origin main
else
    echo "==> Cloning repository..."
    git clone "$REPO_URL" .
fi

# Build and restart container
echo "==> Building Docker image..."
docker compose build --no-cache

echo "==> Starting container..."
docker compose up -d

# Wait for health check
echo "==> Waiting for health check..."
sleep 10

if docker compose ps | grep -q "healthy"; then
    echo "==> Deploy successful! Site is healthy."
else
    echo "==> Warning: Container may not be healthy yet. Check with: docker compose ps"
fi

echo "==> Done!"
