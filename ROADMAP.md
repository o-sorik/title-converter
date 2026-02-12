# Titleconverter SEO Roadmap v2

## Primary Goal
Build a scalable SEO content system around `titlecaseconverter.online` to grow non-branded organic traffic, validate programmatic workflows, and prepare monetization without sacrificing quality.

## Status Legend
- `[ ]` Planned
- `[~]` In progress
- `[x]` Done

## Epic 0: Measurement and Baseline (Phase -1)
### Scope
- `[ ]` Connect and verify Google Search Console, GA4, and Bing Webmaster.
- `[ ]` Configure query/page segment tracking for `/is-`, `/writing-tips`, `/tools`.
- `[ ]` Add event tracking for `paste_text`, `convert_click`, `copy_click`, `outbound_click`, `faq_expand`.
- `[ ]` Capture baseline for impressions, clicks, CTR, average position, indexation rate.
### Definition of Done
- `[ ]` One shared weekly SEO dashboard exists with baseline snapshots and segment-level trends.

## Epic 1: Technical SEO Hygiene (Week 1)
### Scope
- `[ ]` Unify dependency and lockfile consistency.
- `[ ]` Validate canonical, robots, sitemap coverage across all core templates.
- `[ ]` Run duplicate checks for title and meta description.
- `[ ]` Audit `noindex`, 404, and soft-404 risks.
- `[ ]` Validate structured data (FAQ/Article/Breadcrumb where applicable).
### KPI / Exit Criteria
- `[ ]` `0` critical technical SEO errors.
- `[ ]` `100%` of core pages included in sitemap.

## Epic 2: Content System (Week 1-2)
### Scope
- `[ ]` Finalize 3 content tracks: `Is X Capitalized in Title Case?`; `Is X Capitalized?`; `Writing Tips`.
- `[ ]` Create master template for each track: answer-first summary; AP/APA/MLA/Chicago comparison table; examples and edge cases; FAQ and internal links; `last_updated` block.
- `[ ]` Define taxonomy and cannibalization prevention rules: word-level vs phrase-level vs rule-level intent; one primary query per URL; strict use of "Depends" only with real style variance.
- `[ ]` Define internal linking rules (minimum related links per page).
### Definition of Done
- `[ ]` Editorial guidelines approved.
- `[ ]` URL map approved.
- `[ ]` Internal linking policy documented.

## Epic 3: MVP Cluster Launch (Week 2-4)
### Scope
- `[ ]` Build seed list of `100+` candidate terms.
- `[ ]` Prioritize and publish first `30-50` URLs for `Is X Capitalized in Title Case?`.
- `[ ]` Publish in controlled mini-batches of `10-15` URLs.
- `[ ]` Ensure each page includes style table, examples, edge cases, FAQ, and contextual links.
### KPI / Exit Criteria
- `[ ]` `>70%` indexation within `30-45` days.
- `[ ]` First non-trivial impressions and clicks appear across the cluster.

## Epic 4: Internal Linking Engine (Parallel with Epic 3)
### Scope
- `[ ]` Add `Related capitalization questions` module.
- `[ ]` Add bidirectional links between semantically close terms.
- `[ ]` Link informational pages to tools and tools back to informational hubs.
### Definition of Done
- `[ ]` Each target page has at least `3` relevant incoming and `3` outgoing internal links.

## Epic 5: Writing Tips Pillar (Month 2)
### Scope
- `[ ]` Launch one pillar topic plus `8-12` supporting articles.
- `[ ]` Connect pillar pages with relevant `Is X` pages and tool pages.
- `[ ]` Keep answer-first structure and style-guide clarity in all articles.
### KPI / Exit Criteria
- `[ ]` Growth in branded and non-branded impressions.
- `[ ]` Improved engagement depth on informational pages.

## Epic 6: Programmatic Expansion (Month 2-3)
### Scope
- `[ ]` Scale only after MVP quality validation.
- `[ ]` Publish in controlled batches (`50-100`) with pre-release QA.
- `[ ]` Review low-visibility pages and near-duplicates weekly.
### KPI / Exit Criteria
- `[ ]` Cluster CTR remains stable or improves.
- `[ ]` Share of `0 impressions` pages remains controlled.

## Epic 7: Admin Panel MVP (Month 3)
### Scope
- `[ ]` Build content entities: term, style variants, examples, status, last updated.
- `[ ]` Implement workflow: draft -> review -> published.
- `[ ]` Add internal link suggestions and quality checklist before publish.
### KPI / Exit Criteria
- `[ ]` Article production time decreases significantly.
- `[ ]` Quality gate remains consistent across new pages.

## Epic 8: Monetization Foundation (After Stable Traffic)
### Scope
- `[ ]` Introduce ads on informational pages with UX-safe placement.
- `[ ]` Add affiliate placements only for strong intent alignment.
- `[ ]` Run controlled A/B tests on monetization blocks.
### KPI / Exit Criteria
- `[ ]` RPM / affiliate conversion improves without SEO regression.
- `[ ]` No meaningful CWV or engagement degradation.

## Epic 9: Competitor Intelligence System (Week 1, then monthly)
### Scope
- `[ ]` Build a top-10 competitor list for `/is-`, `/writing-tips`, `/tools`.
- `[ ]` Benchmark each competitor on template depth, schema usage, UX, CWV, monetization style, and internal linking.
- `[ ]` Produce a `Competitor Gap Matrix` with "match", "beat", and "ignore" opportunities.
- `[ ]` Define "win conditions" for each cluster (what must be better than competitor median).
### Definition of Done
- `[ ]` One living competitor doc exists and is refreshed monthly with concrete action items.

## Epic 10: SERP Intent Mapping and Cannibalization Control (Week 1-2)
### Scope
- `[ ]` Classify each target keyword by dominant intent: quick answer, guide, comparison, tool, mixed.
- `[ ]` Map one primary query intent per URL before publishing.
- `[ ]` Define hybrid template rules for mixed SERPs (answer-first + table + examples + tool CTA).
- `[ ]` Add pre-publish cannibalization checks against existing URLs.
### KPI / Exit Criteria
- `[ ]` No unresolved intent collisions in planned URL map.
- `[ ]` Reduced cannibalization risk in GSC query-to-page mapping.

## Epic 11: SEO UX and Functional Design Spec (Week 2)
### Scope
- `[ ]` Define UX standards for content pages: sticky TOC, jump links, readability spacing, and mobile-first typography.
- `[ ]` Add reusable modules: `Related questions`, `Style comparison table`, `Copy-ready examples`, `Next best action`.
- `[ ]` Add lightweight interactive blocks inside articles (mini converter / instant examples).
- `[ ]` Document ad placement constraints to protect content accessibility and CWV.
### Definition of Done
- `[ ]` One page-level UI spec exists and is used as baseline for all new informational templates.

## Epic 12: Topical Authority Map (Month 2)
### Scope
- `[ ]` Build a full topic map, not only term pages: capitalization by part of speech; punctuation and capitalization interactions; AP/APA/MLA/Chicago disagreement scenarios.
- `[ ]` Mark each topic as pillar, supporting, or long-tail programmatic.
- `[ ]` Sequence production to maximize topical coverage per month.
### KPI / Exit Criteria
- `[ ]` Clear hub-and-spoke coverage map with no major topic blind spots.

## Epic 13: Link Acquisition Lite (Month 2+)
### Scope
- `[ ]` Ship linkable assets (cheat sheets, style tables, downloadable references).
- `[ ]` Run lightweight outreach to writing blogs, student resources, and style communities.
- `[ ]` Re-purpose high-value answers into community channels with source links back.
### KPI / Exit Criteria
- `[ ]` Consistent growth in referring domains month-over-month.

## Epic 14: Unit Economics and Profit Guardrails (Before scale)
### Scope
- `[ ]` Track monthly cost stack: hosting, AI infra, tooling, content production time.
- `[ ]` Define break-even thresholds by sessions, RPM, and affiliate conversion.
- `[ ]` Set monetization triggers based on economics, not timeline assumptions.
### KPI / Exit Criteria
- `[ ]` A documented break-even model exists and is reviewed monthly.

## Epic 15: Experiment Operating System (Weekly cadence)
### Scope
- `[ ]` Run 1-2 structured experiments per week.
- `[ ]` Use one format: hypothesis -> change -> metric -> decision.
- `[ ]` Keep an experiment log with outcomes, confidence, and follow-up actions.
### KPI / Exit Criteria
- `[ ]` At least `8` completed experiments per 6 weeks with clear keep/kill decisions.

## Global Guardrails (Mandatory)
- `[ ]` Do not publish massive page volumes at once.
- `[ ]` Every batch must pass quality QA before release.
- `[ ]` No thin pages: each URL must contain examples and style-table depth.
- `[ ]` Use trigger-based scaling and monetization, not calendar-only decisions.

## Batch Quality Gate (Must Pass Before Next Release)
- `[ ]` Previous batch indexation > `70%` after `30-45` days.
- `[ ]` `0 impressions` pages < `40%`.
- `[ ]` Cluster CTR does not decline month-over-month.
- `[ ]` No thin or near-duplicate template outputs.
- `[ ]` No Core Web Vitals regression after deployment.

## 14-Day Execution Slice
### Days 1-3
- `[ ]` Measurement setup and baseline reporting.
- `[ ]` Technical SEO audit and critical fixes.
### Days 4-6
- `[ ]` Template finalization, taxonomy rules, URL map.
### Days 7-10
- `[ ]` First `15` MVP pages + internal links.
### Days 11-14
- `[ ]` Next `15-20` pages + QA + initial performance review.

## 90-Day Go/No-Go Scoreboard
### Day 45 Checkpoint
- `[ ]` Indexation for first cluster >= `70%`.
- `[ ]` `0 impressions` share <= `40%`.
- `[ ]` Early non-branded impressions trend is positive week-over-week.
### Day 90 Checkpoint
- `[ ]` Non-branded clicks show sustained growth (not one-week spike only).
- `[ ]` At least `20-30%` of published pages have measurable traction.
- `[ ]` First monetization signal appears (ads or affiliate test baseline).
### Day 120 Decision
- `[ ]` `Scale` if quality gates and economics are positive.
- `[ ]` `Pivot` if traction exists but cluster/UX model underperforms.
- `[ ]` `Stop` if indexation + engagement + economics fail after remediation cycles.
