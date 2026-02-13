#!/usr/bin/env bash
set -euo pipefail

# Scan only staged additions for common API key leaks.
DIFF_CONTENT="$(git diff --cached --no-color -U0 -- . ':(exclude).env.local' ':(exclude).env.*' || true)"

if [[ -z "${DIFF_CONTENT}" ]]; then
  exit 0
fi

PATTERN='(\+.*OPENAI_API_KEY\s*=\s*sk-[A-Za-z0-9_-]{20,}|\+.*sk-[A-Za-z0-9_-]{20,})'

if echo "${DIFF_CONTENT}" | grep -Eiq "${PATTERN}"; then
  echo "Secret scan failed: possible API key detected in staged changes."
  echo "Remove the secret, rotate the key if exposed, and commit again."
  exit 1
fi

exit 0
