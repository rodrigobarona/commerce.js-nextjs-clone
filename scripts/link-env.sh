#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env.local"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing $ENV_FILE — copy .env.example to .env.local first:"
  echo "  cp .env.example .env.local"
  exit 1
fi

APPS=(api storefront checkout dashboard docs web)

for app in "${APPS[@]}"; do
  target="$ROOT/apps/$app/.env.local"
  ln -sf ../../.env.local "$target"
  echo "Linked apps/$app/.env.local -> ../../.env.local"
done

echo "Done. All apps share $ENV_FILE"
