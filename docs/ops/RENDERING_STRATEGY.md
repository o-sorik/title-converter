# Rendering Strategy (SEO)

## Short Answer
- Rendering type matters for SEO, but not in a simplistic "SSR is better" way.
- For this project, the best default is: `SSG + ISR` for SEO pages, `SSR` only when request-time data is truly required.

## Route-Level Matrix (Current Project)
| Route | Current State (in code) | Recommended Mode | Revalidate | Why |
|---|---|---|---:|---|
| `/` (`app/page.tsx`) | static component, no request-time fetch | `SSG + ISR` | `86400` (1 day) | Stable SEO content + fast TTFB; easy freshness updates. |
| `/[slug]` (`app/[slug]/page.tsx`) | `generateStaticParams()` from known slugs | `SSG + ISR` | `604800` (7 days) | Best for converter landing pages and predictable crawl efficiency. |
| `/capitalization-rules-guide` | static page | `SSG + ISR` | `604800` (7 days) | Mostly stable informational page; refreshable without full rebuild. |
| `/sitemap.xml` (`app/sitemap.ts`) | generated with `new Date()` | `SSG + ISR` | `86400` (1 day) | Keeps sitemap fresh enough without per-request render overhead. |
| `/robots.txt` (`app/robots.ts`) | static metadata route | `SSG` | n/a | Rarely changes; fully static is ideal. |

## Recommended Implementation Defaults

### 1) For SEO content pages: prefer ISR, not pure SSR
- Add `revalidate` per route segment.
- Keep content crawlable in initial HTML.

### 2) For dynamic `[slug]` routing: control unknown slugs
- Since pages are config-driven, prefer:
- `export const dynamicParams = false`
- `generateStaticParams()` for known slugs
- This prevents accidental crawl budget waste on unknown dynamic paths.

### 3) Use SSR only for request-time requirements
Use `SSR` only if one of these is true:
- authenticated/personalized response
- geo/user-agent specific content that must change per request
- real-time data that cannot tolerate ISR window

If none apply, keep `SSG/ISR`.

## Suggested Code-Level Changes

### `app/page.tsx`
- Add: `export const revalidate = 86400`

### `app/[slug]/page.tsx`
- Add: `export const revalidate = 604800`
- Add: `export const dynamicParams = false`

### `app/capitalization-rules-guide/page.tsx`
- Add: `export const revalidate = 604800`

### `app/sitemap.ts`
- Add: `export const revalidate = 86400`
- Optional quality improvement: use actual page update dates instead of `new Date()` for `lastModified` where possible.

## SEO Notes
- Google can index client-rendered apps, but server-rendered HTML remains more reliable and faster for discovery.
- Biggest SEO wins still come from content quality, intent alignment, internal linking, and crawl/index hygiene.
- Rendering choice is a multiplier, not the core growth driver.

## Decision Rule
- Default decision: `SSG + ISR`.
- Escalate to SSR only with clear request-time requirement.
