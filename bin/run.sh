#!/usr/bin/env bash

if [ -f ".env.local" ]; then
  echo "sourcing .env.local"
  source .env.local
fi

if [ ! -n "$DISCORD_TOKEN" ]; then
  echo "DISCORD_TOKEN not set"
  exit 1
fi

nodemon src/app.js
