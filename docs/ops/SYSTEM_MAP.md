# System Map

## Purpose
This document defines where core systems live and how to validate them before shipping SEO-facing changes.

## Production Infrastructure
- Host: Hetzner Cloud CPX22 (`web-prod-1`, `78.47.113.198`, Nuremberg)
- OS: Ubuntu 24.04 LTS
- Runtime: Docker Compose v2 → Next.js standalone container on `127.0.0.1:3000`
- Reverse proxy: Nginx with SSL termination (Let's Encrypt / Certbot)
- Security: SSH key-only auth, dual firewall (Hetzner Cloud + UFW), fail2ban
- Deploy: `git pull` → `docker compose build` → `docker compose up -d`
- Runbook: `docs/ops/DEPLOY_RUNBOOK_HETZNER.md`

## Runtime Architecture
- Framework: Next.js App Router (`app/`) with TypeScript.
- Primary surfaces:
- Converter pages: `app/page.tsx`, `app/[slug]/page.tsx`
- Blog pages: `app/blog/*`
- Shared shell: `components/site-shell.tsx`
- Core converter logic: `components/text-converter.tsx`, `lib/converters.ts`
- SEO config source: `lib/seo-config.ts`

## Route Ownership
- `/`: Main converter landing page.
- `/[slug]`: Mode-specific converter pages from `SEO_CONFIG`.
- `/blog`: Blog index.
- `/blog/[slug]`: Article template pages.
- `/blog/categories` and `/blog/categories/[category]`: Category discovery pages.
- `/capitalization-rules-guide`: Long-form rules page.
- `/sitemap.xml`: Metadata route in `app/sitemap.ts`.
- `/robots.txt`: Metadata route in `app/robots.ts`.

## Shared UI Shell
- Header and footer for converter + blog surfaces live in `components/site-shell.tsx`.
- Converter utilities menu lives in `components/converter-nav.tsx`.
- Theme toggle lives in `components/mode-toggle.tsx`.

## SEO Validation Flow
1. Run `npm run release:gate` (executes `lint`, `test`, `seo:qa` and writes release record).
2. Verify `_bmad-output/implementation-artifacts/release-gate-status.json` is `passed: true`.
3. Run `npm run postchange:validate` for route reachability + converter performance guardrail.
4. Verify `_bmad-output/implementation-artifacts/post-change-validation-status.json` is `passed: true`.
5. Spot-check canonical/title/description on `/`, one `/[slug]`, `/blog`, one `/blog/[slug]`.
6. Confirm no broken nav/footer links on converter + blog templates.

## Weekly Health Check
- Critical errors target: `0`.
- High-priority issues target: `<=3`.
- All open technical risks must include owner + deadline + status.

## Known Current Risks
- Blog and converter metadata coverage must be completed for all priority URLs.
- Content scale risk: cannibalization and thin-content drift without strict URL intent mapping.
- No CI/CD pipeline yet – deploys are manual SSH + docker compose.
- GSC/GA4/Bing Webmaster not yet connected – no SEO data collection.
