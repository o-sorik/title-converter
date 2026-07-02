#!/usr/bin/env bash
set -euo pipefail

# Scan only staged additions for common credential leaks.
# NOTE: the repo is PUBLIC — one leaked commit means immediate exposure.
DIFF_CONTENT="$(git diff --cached --no-color -U0 -- . || true)"

if [[ -z "${DIFF_CONTENT}" ]]; then
  exit 0
fi

# Added lines only
ADDED="$(echo "${DIFF_CONTENT}" | grep -E '^\+' || true)"

if [[ -z "${ADDED}" ]]; then
  exit 0
fi

declare -a PATTERNS=(
  # OpenAI / Anthropic (word boundary so "desk-cover" does not match)
  '\bsk-[A-Za-z0-9_-]{20,}'
  # AWS access key id
  '\bAKIA[0-9A-Z]{16}\b'
  # GitHub tokens (classic + fine-grained)
  '\bgh[pousr]_[A-Za-z0-9]{36,}'
  '\bgithub_pat_[A-Za-z0-9_]{22,}'
  # Google API key
  '\bAIza[0-9A-Za-z_-]{35}'
  # Slack tokens
  '\bxox[baprs]-[A-Za-z0-9-]{10,}'
  # npm token
  '\bnpm_[A-Za-z0-9]{36}\b'
  # Private key blocks
  'BEGIN (RSA |EC |OPENSSH |DSA )?PRIVATE KEY'
  # Generic assignment of long secrets to suspicious var names
  '(API_KEY|SECRET|TOKEN|PASSWORD|PASSWD)\s*[:=]\s*["'"'"']?[A-Za-z0-9+/_-]{24,}'
)

FAILED=0
for pattern in "${PATTERNS[@]}"; do
  MATCH="$(echo "${ADDED}" | grep -En "${pattern}" | head -3 || true)"
  if [[ -n "${MATCH}" ]]; then
    echo "Secret scan: pattern matched → ${pattern}"
    # Mask everything after the first 8 chars of long tokens in output
    echo "${MATCH}" | sed -E 's/([A-Za-z0-9+/_-]{8})[A-Za-z0-9+/_-]{16,}/\1***/g'
    FAILED=1
  fi
done

if [[ "${FAILED}" -eq 1 ]]; then
  echo ""
  echo "Secret scan FAILED: possible credential detected in staged changes."
  echo "Remove the secret, rotate the key if exposed, and commit again."
  echo "(False positive? Adjust patterns in scripts/check-secrets.sh)"
  exit 1
fi

exit 0
