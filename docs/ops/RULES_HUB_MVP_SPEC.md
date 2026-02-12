# Rules Hub MVP Spec (`/rules`)

## Scope Locked by Decision
- Build MVP only (no interactive widgets in v1).
- Use dedicated URL: `/rules`.
- Purpose: reusable authority page for internal references like `according to /rules`.

## Core Page Blocks (MVP)
1. `H1` + 2-3 sentence intro.
2. Jump navigation to style sections.
3. Style sections for `AP`, `APA`, `MLA`, `Chicago` only.
4. One comparison table (key rule differences).
5. Edge-case section (hyphenation, colon/subtitle, infinitives, brand names).
6. Source section with official guide links.
7. References/about section for organizations and authors/editors when trustworthy pages exist.
8. Internal links to converter + relevant supporting pages.

## Source Policy (Mandatory)
- Every style section must include at least one official source link.
- Prefer primary sources (official organizations, publishers, style manual pages).
- If author/editor profile is available and relevant, link to official profile page (organization bio, verified LinkedIn, official site).
- Do not cite AI-generated summaries as primary sources.
- Mark ambiguous/secondary references as non-authoritative.

## SEO Requirements
- Self-canonical on `/rules`.
- Unique title/description targeting capitalization rules intent.
- `SSG + ISR` with explicit `revalidate`.
- Structured data: `Article` (or `WebPage`) and `BreadcrumbList`; `FAQPage` only if visible FAQ exists.
- Add `/rules` to sitemap once indexable.

## Internal Linking Requirements
- From `/rules`: link out to at least 4 relevant tool/content pages.
- To `/rules`: add links from homepage and future writing tips articles.
- Suggested anchor patterns: `capitalization rules`, `style guide rules`, `AP vs APA capitalization`.

## Nice-to-Have Ideas (Post-MVP)
- "Last reviewed" stamp with editorial owner.
- Change log section with version history (v1, v1.1...).
- Short "when guides conflict" decision framework.
- Compact "pre-publish checklist" block for editors.

## Done Criteria
- `/rules` page published and indexable.
- All 4 style sections include official citations.
- At least one trusted organization/author reference per style where available.
- Page passes `npm run lint && npm run seo:qa` before release.
