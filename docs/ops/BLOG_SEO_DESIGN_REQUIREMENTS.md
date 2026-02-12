# Blog SEO Design Requirements

## Goal
- Approve two templates before writing tips rollout: blog homepage (`/blog` style index) and article page template.
- Keep UX clean, but SEO-critical blocks must be present by default.

## Blog Homepage (Index) Requirements
- Unique, intent-focused `H1` and intro paragraph.
- Crawlable list of latest/featured articles with plain HTML links.
- Card structure includes article title link, short excerpt, publish/update date, and topical category label.
- Optional pagination links (`/blog/page/2`) must be crawlable.
- Canonical self-reference for each index page.
- No JS-only rendering for core article links.

## Article Template Requirements
- Single clear `H1` aligned to primary query intent.
- Short answer or summary block near top (for informational intent).
- Table of contents with anchor links for long articles.
- `H2/H3` hierarchy must be semantic (no skipped heading levels for style only).
- Author + `datePublished` + `dateModified` visible.
- FAQ block when intent supports it (not forced on every page).
- Related articles block with at least `3` relevant internal links.
- Breadcrumbs visible and marked up.
- Primary CTA to tool where contextually relevant.

## Metadata and Structured Data
- Unique `<title>` and meta description per article.
- Self-canonical for indexable pages.
- Open Graph + Twitter tags for index and article templates.
- JSON-LD: `BlogPosting` for article pages, `BreadcrumbList` when breadcrumbs are present, `FAQPage` only if FAQ exists on page.

## Performance and Rendering
- Default `SSG + ISR` for blog index and article pages.
- Include explicit `revalidate` policy.
- Avoid layout shifts from late-loading media/ads.
- Ensure text content is in initial HTML.

## Indexation and Content Quality Controls
- No indexable tag/category archives without unique value.
- No thin articles (minimum: answer/context/examples/internal links).
- Avoid duplicate intros across articles in same cluster.
- One primary keyword intent per article URL.

## Done Criteria (`P0-09`)
- Blog homepage design approved against this checklist.
- Article template design approved against this checklist.
- Any missing SEO-critical block is tracked as a blocker before publishing writing tips content.
