#!/bin/bash
# -----------------------------------
# HEADROOM CURSOR LAUNCHER
# -----------------------------------
# Export variables to route traffic through the local proxy
export OPENAI_API_BASE=http://127.0.0.1:8787/v1
export OPENAI_BASE_URL=http://127.0.0.1:8787/v1
export ANTHROPIC_BASE_URL=http://127.0.0.1:8787
export NODE_TLS_REJECT_UNAUTHORIZED=0

# Launch Cursor with the injected environment
echo "Starting Cursor via Headroom Proxy..."
cursor .
