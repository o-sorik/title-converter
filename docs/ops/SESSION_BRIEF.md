# Session Brief

## Last Updated
- Date: 2026-03-03
- Updated by: Claude + Owner

## Where We Are
- Current phase/epic: **Production is LIVE.** Site deployed on Hetzner VPS. Post-launch SEO measurement window can begin.
- What is already done: full blog system, shared site shell, modular components, JSON-LD structured data, production VPS setup (Docker + Nginx + SSL), DNS configured, www→apex redirect working, HTTPS enforced.
- What is in progress: GSC/GA4/Bing Webmaster connections, metadata pass for priority URLs, analytics instrumentation, CI/CD pipeline setup.

## Top 3 Next Actions
- [ ] Connect GSC, GA4, Bing Webmaster Tools – start collecting SEO metrics.
- [ ] Complete metadata pass (`title`/`description`/canonical) for priority converter + blog URLs and re-run SEO QA.
- [ ] Set up GitHub Actions CI/CD for automated deploy on push to `main`.

## Active Blockers
- None – site is live and serving traffic.

## Decisions Since Last Session
- See `docs/ops/DECISIONS.md` entries: `D-0001` to `D-0015`.
- **D-0016 (2026-03-03):** Migrated from Vercel to self-hosted Hetzner VPS. Rationale: full control over infrastructure, multi-project support on single server, cost efficiency (~€5/mo for CPX22).

## Infrastructure Milestone (2026-03-03)
Deployed `titlecaseconverter.online` to production:
- Hetzner Cloud CPX22 (Nuremberg) – `78.47.113.198`
- Ubuntu 24.04 + Docker Compose v2 + Nginx + Certbot
- SSH hardened (key-only, no root, fail2ban)
- Dual firewall (Hetzner Cloud + UFW)
- Multi-stage Docker build with Next.js standalone output
- SSL: Let's Encrypt with auto-renewal
- Full runbook: `docs/ops/DEPLOY_RUNBOOK_HETZNER.md`

## Metrics Snapshot (Quick)
- Indexation rate: pending GSC connection
- Non-branded impressions trend: TBD
- Cluster CTR trend: TBD
- 0-impressions share: TBD
- Revenue signal: not started

## Definition of Done for This Session
- [x] Blog template system implemented across all planned routes.
- [x] Blog UI refactored into modular component slices.
- [x] Article SEO foundation improved (BlogPosting JSON-LD + single Last updated date model).
- [x] Secret handling baseline documented and guarded with local pre-commit scan.
- [x] Shared header/footer unified across key routes.
- [x] Blog dark-mode contrast pass completed.
- [x] Breadcrumb UX standardized and BreadcrumbList JSON-LD added.
- [x] SEO QA smoke suite expanded (14 checks total, all passing).
- [x] **Production deploy completed** – site live at `https://titlecaseconverter.online`.
- [x] **Server security hardened** – SSH key-only, dual firewall, fail2ban.
- [x] **SSL configured** – Let's Encrypt cert, auto-renewal, HSTS header.
- [x] **Deploy runbook created** – `DEPLOY_RUNBOOK_HETZNER.md`.
