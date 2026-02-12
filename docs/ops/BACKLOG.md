# Backlog (Execution-First)

## Planning Constraints
- Capacity: `10-15` hours/week.
- Sprint target: `20` pages / `14` days (quality-first).
- Mandatory review floor: `45` minutes human editing per page.
- Monetization: only after stable traffic and quality gates.

## Priority Legend
- `P0`: Must be done now, blocks progress.
- `P1`: High impact, schedule right after P0.
- `P2`: Important but can wait.

## P0 (Now)
| ID | Task | Est. Hours | Dependencies | Owner | Done When |
|---|---|---:|---|---|---|
| P0-01 | Choose deploy path and launch on Vercel with apex canonical (no `www`) | 2-4h | none | Founder | site is publicly reachable + canonical host works |
| P0-02 | Connect GSC, GA4, Bing Webmaster | 2-3h | P0-01 | Founder | properties verified + data starts collecting |
| P0-03 | Submit sitemap and request indexing for core URLs | 1-2h | P0-02 | Founder | sitemap accepted + first crawl signals visible |
| P0-04 | Technical SEO QA pass (canonical, robots, noindex, 404, metadata sanity) | 2-3h | P0-01 | Founder | no critical SEO errors on core pages |
| P0-05 | Finalize content template v1 for `Is X` pages (answer/table/examples/FAQ/links) | 2-3h | none | Founder | template documented and reusable |
| P0-06 | Finalize taxonomy + cannibalization rules | 1-2h | P0-05 | Founder | one primary query intent per URL map |
| P0-07 | Build prioritized MVP list of first `20` URLs | 2-3h | P0-06 | Founder | 20 URLs ready with intent + status |
| P0-08 | Apply rendering strategy (`SSG + ISR` defaults, `dynamicParams=false` for `[slug]`) | 1-2h | P0-01 | Founder | route configs match `docs/ops/RENDERING_STRATEGY.md` |
| P0-09 | Approve blog UX templates (blog home + article page) with SEO-first blocks | 3-5h | P0-05, P0-06 | Founder | approved wireframes/spec match `docs/ops/BLOG_SEO_DESIGN_REQUIREMENTS.md` |

## P1 (Next)
| ID | Task | Est. Hours | Dependencies | Owner | Done When |
|---|---|---:|---|---|---|
| P1-01 | Publish first 10 pages using template v1 | 8-10h | P0-05, P0-07, P0-09 | Founder | 10 pages live and internally linked |
| P1-02 | Publish next 10 pages using template v1 | 8-10h | P1-01 | Founder | total 20 pages live |
| P1-03 | Enforce internal links policy (`3 in / 3 out`) | 2-3h | P1-01 | Founder | all 20 pages pass link QA |
| P1-04 | Start competitor gap audit for 3 known competitors | 3-4h | P0-05 | Founder | top gaps mapped into actionable tasks |
| P1-05 | Populate week-0 baseline in `SEO_SCOREBOARD.md` | 1-2h | P0-02 | Founder | baseline snapshot recorded |
| P1-06 | Build MVP `/rules` hub page (style sections + comparison table + jump-nav + source citations) | 6-10h | P0-09, P1-01 | Founder | `/rules` is live, internally linked, includes official guide links, and passes SEO QA/content quality gates |

## P2 (After Initial Sprint)
| ID | Task | Est. Hours | Dependencies | Owner | Done When |
|---|---|---:|---|---|---|
| P2-01 | Build writing tips pillar outline + 8-12 supporting topics | 3-4h | P1-05 | Founder | topic map approved |
| P2-02 | Create reusable `Related questions` UI module in content pages | 2-4h | P1-01 | Founder | module used in all new pages |
| P2-03 | Expand competitor matrix to top 10 domains | 3-5h | P1-04 | Founder | monthly competitor baseline complete |
| P2-04 | Define break-even model (cost stack + revenue triggers) | 2-3h | P1-05 | Founder | monthly break-even table exists |
| P2-05 | Launch first weekly experiment review ritual | 1h/week | P1-01 | Founder | experiments updated weekly |
| P2-06 | Upgrade `/rules` to v1.1 with trust + editorial utility blocks | 2-4h | P1-06 | Founder | includes `Last reviewed`, guide-conflict framework, mini pre-publish checklist, and version changelog |
| P2-07 | Replace `mailto` error reporting with feedback dialog + backend submit flow | 4-8h | P1-05 | Founder | modal collects style/input/output/comment; submit persists data; user sees success/error state |

## Sprint 01 (14 Days)

### Day 1-3
- Execute `P0-01` to `P0-04`.
- Output: live site + tracking stack + technical QA pass.

### Day 4-6
- Execute `P0-05` to `P0-09`.
- Output: locked template + taxonomy + first 20 URL plan + rendering config aligned + approved blog/article designs.

### Day 7-10
- Execute `P1-01` + `P1-03` (first pass).
- Output: first 10 pages live, linked, quality-reviewed.

### Day 11-14
- Execute `P1-02` + `P1-05` + `P1-04` (start).
- Output: 20 pages live, baseline captured, competitor gaps initialized.

## Work-In-Progress Limits
- Max `2` concurrent tasks.
- Never publish pages that fail template QA.
- If quality drops below review floor, reduce output before adding tasks.

## Weekly Review Checklist
- [ ] Did we hit planned hours (`10-15`)?
- [ ] Did we maintain `45m` review/page?
- [ ] Did all published pages pass quality gate?
- [ ] Did indexation and impression trends improve?
- [ ] Which one task is highest leverage for next week?
