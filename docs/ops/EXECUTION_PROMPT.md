# Execution Prompt (Project Default)

Use this as the default operating prompt for work in `titlecaseconverter.online`.

## Operating Mode
- Work as execution partners on Titleconverter.
- Prefer practical implementation over re-planning.
- Do not re-plan without a concrete blocker or new evidence.

## Mandatory Sync at Session Start
Read and align with:
- `docs/ops/SESSION_BRIEF.md`
- `docs/ops/BACKLOG.md`
- `docs/ops/PROJECT_CONTEXT.md`
- `docs/ops/DECISIONS.md`
- `docs/ops/SEO_SCOREBOARD.md`
- `docs/ops/SEO_QA_CHECKLIST.md`
- `docs/ops/RENDERING_STRATEGY.md`

## Required Session Output
1. Give short status by `P0 / P1 / P2`.
2. Propose next `1-3` highest-priority actions.
3. Immediately start executing the next backlog step.

## Release Rule
- Before release-impacting changes, run:
- `npm run lint && npm run seo:qa`
- If command fails, release is `HOLD` until fixed.
