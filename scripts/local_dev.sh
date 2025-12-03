#!/usr/bin/env bash
set -euo pipefail

# 1) Load NVM if available
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  # shellcheck source=/dev/null
  . "$HOME/.nvm/nvm.sh"
elif [ -s "/usr/local/opt/nvm/nvm.sh" ]; then
  # shellcheck source=/dev/null
  . "/usr/local/opt/nvm/nvm.sh"
fi

# 2) Ensure Node 20
if command -v nvm >/dev/null 2>&1; then
  echo "Using NVM to install/use Node 20..."
  nvm install 20
  nvm use 20
else
  echo "NVM not found; continuing with system Node ($(node -v 2>/dev/null || echo 'not found'))"
fi

echo "Node version: $(node -v 2>/dev/null || echo 'not found')"
echo "NPM version: $(npm -v 2>/dev/null || echo 'not found')"

# 3) Move to repo root (directory of this script)/..
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
cd "$SCRIPT_DIR/.."

# 4) Install deps
echo "Installing dependencies..."
npm install

# 5) Environment file
if [ ! -f .env ]; then
  echo "Creating .env from .env.example..."
  cp .env.example .env
else
  echo ".env already exists, skipping copy."
fi

# 6) Prisma migrate (SQLite local)
echo "Running Prisma migrations (local SQLite)..."
npx prisma migrate dev --name init

# 7) Start dev server
echo "Starting dev server on http://localhost:3000 ..."
npm run dev
