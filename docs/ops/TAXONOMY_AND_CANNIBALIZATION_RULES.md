# Taxonomy and Cannibalization Rules v1

## Scope
- Applies to all SEO pages in `titlecaseconverter.online`.
- Objective: ensure one primary intent per URL and prevent query overlap.

## Cluster Model
- Cluster 1: `Is X Capitalized in Title Case?`
- Cluster 2: `Is X Capitalized?`
- Cluster 3: `Writing Tips`
- Cluster 4: Converter utility pages

## URL and Intent Rules
- One primary keyword intent per page.
- Primary keyword appears in slug, title, H1, and first answer paragraph.
- No two pages may share the same primary keyword pattern.
- If intent changes materially, create a new URL (do not overload existing page).

## Canonical Intent Mapping
- `is-<term>-capitalized-in-title-case` -> title-case specific decision intent.
- `is-<term>-capitalized` -> general capitalization intent (non-title-case specific).
- Writing tips URLs must target process/how-to intent, not yes/no capitalization intent.

## Cannibalization Prevention Rules
- If two pages can both rank for the same exact query, merge or re-scope one page.
- Use distinct H1 patterns for each cluster.
- Keep FAQ questions unique per page; do not clone FAQ sets across siblings.
- Internal links must reinforce intent boundaries (title-case pages link to title-case siblings first).
- Avoid publishing near-duplicate pages with only token swaps.

## Publication Gate
- Before publish, record page in URL map with:
- slug
- primary query
- secondary queries
- cluster
- status (`draft`, `ready`, `published`)
- Do not publish if primary query already exists in map.

## Conflict Resolution
- If overlap detected post-publish:
1. Pick winner URL by impressions/CTR/position.
2. Re-scope losing URL to a different intent.
3. Add internal links to winner and adjust on-page copy.
4. Use redirect/canonical only when consolidation is final.

## Definition of Done (`P0-06`)
- Every new URL is mapped to exactly one primary intent.
- No duplicated primary query across published pages.
- Cannibalization checks are part of pre-release QA.
