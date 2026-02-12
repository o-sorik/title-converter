# SEO QA Checklist

Use this before every production release.

## 0) Mandatory Pre-Release Command
- [ ] Run: `npm run lint && npm run seo:qa`
- [ ] If this command fails, release is automatically `HOLD` until fixed.

## 1) Indexing and Crawl Controls
- [ ] `robots.txt` is reachable and references the correct sitemap URL.
- [ ] No important page is blocked by robots rules.
- [ ] `noindex` is applied only to pages that should stay out of search.
- [ ] Staging/dev URLs are not indexable.

## 2) Canonical and URL Hygiene
- [ ] Canonical is present on homepage and key templates.
- [ ] Dynamic pages output self-referencing canonical URLs.
- [ ] Preferred host is consistent (apex, no `www`).
- [ ] No duplicate indexable URL variants (`/` vs non-trailing slash variants where applicable).

## 3) Metadata Quality
- [ ] Every indexable page has a unique, intent-matched `<title>`.
- [ ] Every indexable page has a unique meta description.
- [ ] Open Graph and Twitter metadata are set for core templates.
- [ ] `lang="en"` is set in root HTML.

## 4) Sitemap Integrity
- [ ] `sitemap.xml` returns `200`.
- [ ] Sitemap includes all indexable core pages.
- [ ] Sitemap excludes `noindex`/placeholder pages.
- [ ] `lastModified` values are reasonable and not obviously stale.

## 5) Rendering and Performance
- [ ] Rendering strategy matches policy: `SSG + ISR` by default, SSR only when required.
- [ ] `revalidate` values are set for SEO-relevant routes.
- [ ] Dynamic slug handling is constrained (`dynamicParams=false` where needed).
- [ ] No obvious CWV regressions after release (LCP/INP/CLS quick check).

## 6) Structured Data
- [ ] JSON-LD is valid for templates that use it (FAQ/HowTo/WebApplication/etc.).
- [ ] Structured data content matches visible page content.
- [ ] No misleading or empty schema fields.

## 7) Internal Linking and Content Quality
- [ ] New pages include required internal links (`3 in / 3 out` target).
- [ ] No thin pages (answer + examples + style context + FAQ where applicable).
- [ ] No near-duplicate pages targeting the same primary intent.
- [ ] Title/description/copy align with the actual search intent.

## 8) Analytics and Measurement
- [ ] GA4 events fire for key actions (paste, convert, copy, outbound, faq expand).
- [ ] GSC property is connected and sitemap submitted.
- [ ] Baseline snapshot is updated in `docs/ops/SEO_SCOREBOARD.md`.

## 9) Post-Release Verification (24-72h)
- [ ] Run spot checks for core URLs: status code, canonical, title, description.
- [ ] Confirm no accidental `noindex` on priority pages.
- [ ] Confirm new URLs appear in sitemap and are discoverable.
- [ ] Log release notes and anomalies in `docs/ops/SESSION_BRIEF.md`.

## 10) Blog and Article Template QA
- [ ] Blog homepage has crawlable HTML links to article URLs.
- [ ] Article template includes semantic heading structure (`H1` -> `H2/H3`).
- [ ] Article page shows author + publish/update dates.
- [ ] Article page has related links block (min `3` internal links out).
- [ ] `BlogPosting` and `BreadcrumbList` JSON-LD are valid when used.
- [ ] Requirements match `docs/ops/BLOG_SEO_DESIGN_REQUIREMENTS.md`.

## Release Decision
- [ ] PASS
- [ ] HOLD (list blockers below)

### Blockers
- 
