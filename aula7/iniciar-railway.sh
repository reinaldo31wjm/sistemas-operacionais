#!/usr/bin/env bash
set -euo pipefail

export NODE_ENV=production
export RAILWAY_ENVIRONMENT=production
export RAILWAY_PROJECT_NAME=so-dashboard
export RAILWAY_SERVICE_NAME=so-dashboard
export PORT="${PORT:-3001}"

exec node server.js
