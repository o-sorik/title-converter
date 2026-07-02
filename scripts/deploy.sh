#!/bin/bash
set -euo pipefail

# Deploy script for titlecaseconverter.online
# Usage: ssh deploy@78.47.113.198 'bash -s' < scripts/deploy.sh
#
# Behavior:
#   - Pulls latest main, builds with layer cache (no --no-cache: 2 vCPU VPS)
#   - Waits up to 120s for the container healthcheck
#   - On failure: rolls back to the previously deployed commit and rebuilds

APP_DIR="/var/www/titlecaseconverter"
REPO_URL="git@github.com:o-sorik/title-converter.git"
LOG_FILE="${APP_DIR}/deploy.log"
HEALTH_RETRIES=12   # 12 x 10s = 120s

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"; }

wait_healthy() {
    for i in $(seq 1 "$HEALTH_RETRIES"); do
        if docker compose ps | grep -q "healthy"; then
            return 0
        fi
        log "Health check attempt $i/$HEALTH_RETRIES – waiting 10s..."
        sleep 10
    done
    return 1
}

cd "$APP_DIR"

log "==> Deploying titlecaseconverter.online..."

# Last commit that passed the healthcheck (survives CI pulling before this script runs)
LAST_GOOD_FILE="$APP_DIR/.last-good-commit"
PREV_COMMIT=""
[ -f "$LAST_GOOD_FILE" ] && PREV_COMMIT=$(cat "$LAST_GOOD_FILE")

# Pull latest code
if [ -d ".git" ]; then
    [ -z "$PREV_COMMIT" ] && PREV_COMMIT=$(git rev-parse HEAD)
    log "==> Rollback target: ${PREV_COMMIT:-none}"
    log "==> Pulling latest changes..."
    if ! git pull origin main; then
        log "ERROR: git pull failed – aborting (nothing changed)."
        exit 1
    fi
else
    log "==> Cloning repository..."
    git clone "$REPO_URL" .
fi

NEW_COMMIT=$(git rev-parse HEAD)
if [ -n "$PREV_COMMIT" ] && [ "$PREV_COMMIT" = "$NEW_COMMIT" ]; then
    log "==> No new commits. Rebuilding current version anyway."
fi

# Build with layer cache (full --no-cache rebuild kills the 2 vCPU VPS)
log "==> Building Docker image ($NEW_COMMIT)..."
if ! docker compose build; then
    log "ERROR: docker compose build failed – previous container untouched."
    exit 1
fi

log "==> Starting container..."
docker compose up -d

log "==> Waiting for health check (max 120s)..."
if wait_healthy; then
    echo "$NEW_COMMIT" > "$LAST_GOOD_FILE"
    log "==> Deploy successful! Site is healthy at $NEW_COMMIT."
    exit 0
fi

log "ERROR: Container did not become healthy in 120s."
docker compose ps | tee -a "$LOG_FILE"
docker compose logs --tail 50 | tee -a "$LOG_FILE"

# Rollback to the previous commit if we have one
if [ -n "$PREV_COMMIT" ] && [ "$PREV_COMMIT" != "$NEW_COMMIT" ]; then
    log "==> Rolling back to $PREV_COMMIT..."
    git reset --hard "$PREV_COMMIT"
    if docker compose build && docker compose up -d && wait_healthy; then
        log "==> Rollback successful – serving $PREV_COMMIT. Fix the release and redeploy."
    else
        log "FATAL: Rollback also failed – manual intervention required."
    fi
    exit 1
fi

log "FATAL: No previous commit to roll back to – manual intervention required."
exit 1
