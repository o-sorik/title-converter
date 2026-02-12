# Decisions Log

Use one entry per decision.

## Template
- Date:
- Decision ID:
- Area: (SEO / Content / Product / UX / Monetization / Infra)
- Decision:
- Context:
- Options considered:
- Why this option:
- Risks:
- Revisit trigger: (metric or date)
- Owner:
- Status: (active / superseded)

---

## Entries

### D-0001
- Date: 2026-02-12
- Decision ID: D-0001
- Area: SEO Strategy
- Decision: Use staged roadmap with strict batch quality gates instead of aggressive programmatic publishing.
- Context: Project goal is sustainable growth with low risk of thin content penalties.
- Options considered: (1) publish at scale immediately, (2) staged rollout with gates.
- Why this option: Better control over indexation quality, CTR, and cannibalization.
- Risks: Slower short-term page count growth.
- Revisit trigger: After Day 90 checkpoint.
- Owner: Founder
- Status: active

### D-0002
- Date: 2026-02-12
- Decision ID: D-0002
- Area: Content
- Decision: Prioritize three tracks: `Is X Capitalized in Title Case?`, `Is X Capitalized?`, `Writing Tips`.
- Context: Need clear topical structure and internal linking model.
- Options considered: mixed ad-hoc topics vs structured clusters.
- Why this option: Stronger topical authority and easier production system.
- Risks: Requires stricter taxonomy governance.
- Revisit trigger: If cannibalization appears in GSC query/page mapping.
- Owner: Founder
- Status: active

### D-0003
- Date: 2026-02-12
- Decision ID: D-0003
- Area: Operations
- Decision: Maintain persistent ops docs in `docs/ops` for every session.
- Context: Need continuity and cumulative learning across sessions.
- Options considered: chat-only memory vs repo-based operating docs.
- Why this option: Creates durable context and execution discipline.
- Risks: Docs can drift if not updated weekly.
- Revisit trigger: Weekly review cadence misses 2 consecutive weeks.
- Owner: Founder
- Status: active

### D-0004
- Date: 2026-02-12
- Decision ID: D-0004
- Area: Monetization
- Decision: Monetization is trigger-based (traffic + quality + economics), not calendar-based.
- Context: Avoid damaging UX/SEO too early.
- Options considered: fixed date launch vs threshold-based launch.
- Why this option: Reduces risk of premature ads/affiliate clutter.
- Risks: Revenue starts later.
- Revisit trigger: Non-branded traffic stabilizes and Day 90 gate passes.
- Owner: Founder
- Status: active

### D-0005
- Date: 2026-02-12
- Decision ID: D-0005
- Area: Competitive Strategy
- Decision: Add a formal competitor gap matrix and monthly refresh cycle.
- Context: Need execution targets beyond intuition and EMD advantage.
- Options considered: occasional manual checks vs structured competitor tracking.
- Why this option: Clarifies where to match vs where to beat competitors.
- Risks: Extra monthly analysis overhead.
- Revisit trigger: Monthly roadmap review.
- Owner: Founder
- Status: active

### D-0006
- Date: 2026-02-12
- Decision ID: D-0006
- Area: Market
- Decision: Keep phase 1 focused on English content only (`EN`).
- Context: Limited weekly capacity (`10-15` hours) and first project validation stage.
- Options considered: (1) multi-language launch, (2) EN-only launch.
- Why this option: Higher focus and less operational complexity in first 6 months.
- Risks: Slower international expansion.
- Revisit trigger: After stable EN traction and repeatable workflow.
- Owner: Founder
- Status: active

### D-0007
- Date: 2026-02-12
- Decision ID: D-0007
- Area: Content Ops
- Decision: Use AI + human editor workflow for all pages.
- Context: Need sustainable publishing velocity with quality control.
- Options considered: fully manual vs AI-only vs AI+editor.
- Why this option: Best tradeoff between speed and quality consistency.
- Risks: Editorial QA discipline required each batch.
- Revisit trigger: If quality gate failure rate increases.
- Owner: Founder
- Status: active

### D-0008
- Date: 2026-02-12
- Decision ID: D-0008
- Area: Monetization
- Decision: Delay monetization until stable traffic and quality signals pass.
- Context: This is a proof-of-execution project; UX and SEO trust come first.
- Options considered: early monetization vs delayed trigger-based monetization.
- Why this option: Avoid early trust/CWV degradation.
- Risks: Delayed first revenue.
- Revisit trigger: Day 90 checkpoint passes.
- Owner: Founder
- Status: active

### D-0009
- Date: 2026-02-12
- Decision ID: D-0009
- Area: Execution
- Decision: Use publish velocity test to determine realistic output pace.
- Context: Unknown sustainable weekly page throughput.
- Options considered: fixed page target vs measured 2-week velocity test.
- Why this option: Data-backed pacing reduces burnout and quality drift.
- Risks: Initial plan uncertainty for 2 weeks.
- Revisit trigger: After first two-week production sprint.
- Owner: Founder
- Status: active

### D-0010
- Date: 2026-02-12
- Decision ID: D-0010
- Area: Infra
- Decision: Deploy on Vercel for phase 1; use apex domain without `www` as canonical primary host.
- Context: Next.js project, solo execution, need fast launch and low ops overhead.
- Options considered: Vercel vs generic shared/VPS hosting.
- Why this option: Best operational simplicity, native Next.js support, fast iteration cycle.
- Risks: Long-term cost can increase with scale.
- Revisit trigger: If cost/performance tradeoff worsens after traction.
- Owner: Founder
- Status: active

### D-0011
- Date: 2026-02-12
- Decision ID: D-0011
- Area: Content Ops
- Decision: Human editing is founder-only in phase 1, with mandatory `45` minutes minimum review per page.
- Context: Ensure quality consistency and intentional learning in first project cycle.
- Options considered: shared editing vs founder-only editing.
- Why this option: Maximum quality control and faster feedback loop at current scale.
- Risks: Throughput bottleneck.
- Revisit trigger: If output pace blocks roadmap milestones.
- Owner: Founder
- Status: active

### D-0012
- Date: 2026-02-12
- Decision ID: D-0012
- Area: Planning
- Decision: First 14-day content target is `20` pages; project stop-loss horizon is `6 months`.
- Context: Need concrete execution tempo and objective pivot boundary.
- Options considered: lower volume with longer timeline vs fixed sprint target.
- Why this option: Balanced ambition with current capacity (`10-15h/week`).
- Risks: Quality risk if production pressure increases.
- Revisit trigger: After first two-week velocity experiment.
- Owner: Founder
- Status: active

### D-0013
- Date: 2026-02-12
- Decision ID: D-0013
- Area: Content / SEO
- Decision: Build a dedicated MVP `Rules Hub` at `/rules` with mandatory official citations and reusable internal-link role for future articles.
- Context: Need a high-trust reference page comparable to competitor rules hubs, without expanding scope beyond MVP.
- Options considered: (1) keep `/capitalization-rules-guide` placeholder, (2) launch dedicated `/rules` MVP page now.
- Why this option: Stronger UX and SEO utility for internal references (`according to /rules`) and authority signaling.
- Risks: Citation quality and editorial maintenance overhead.
- Revisit trigger: After first month of impressions/clicks for `/rules`.
- Owner: Founder
- Status: active
