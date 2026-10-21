#!/usr/bin/env bash
set -euo pipefail

base_url="${1:-http://localhost:3000}"
curl -fsS "$base_url/healthz" >/dev/null
curl -fsS "$base_url/api/stats" >/dev/null
curl -fsSI "$base_url/" >/dev/null
printf 'testes básicos aprovados em %s\n' "$base_url"
