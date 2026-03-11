# Session Brief

## Last Updated
- Date: 2026-03-11
- Updated by: Claude + Owner

## Where We Are
- Current phase: **Content scaling.** Site is LIVE, CI/CD is green, Wave 1 (12 articles) is indexed and keywords are appearing in search.
- What is done: full infra (VPS + Docker + Nginx + SSL + CI/CD), blog system (4 templates), IsX template (12 Wave 1 articles), UI/UX audit pass (typography, color tokens, accessibility), **General Capitalization template** (new template type + first article).
- What is in progress: General Capitalization P0 batch (9 remaining articles of 10 planned).

## Top 3 Next Actions
- [ ] Write remaining 9 General Cap P0 articles (seasons, earth, after-colon, high school, majors, professor, bachelor's, math, English) – each takes ~30 min with existing template.
- [ ] Connect GSC + GA4 – no traffic metrics yet, blocking ability to measure content ROI.
- [ ] Publish Wave 2 articles ("what words are not capitalized in a title", "title case vs sentence case").

## Architecture – Content Templates

Three article template types exist in the codebase:

| Template | File | Used for | Detection |
|---|---|---|---|
| `IsXTemplate` | `components/blog/article/is-x-template.tsx` | "Is X capitalized in title case?" | `getIsXArticleBySlug()` |
| `GenCapTemplate` | `components/blog/article/gen-cap-template.tsx` | "Is X capitalized?" (general) | `getGenCapArticleBySlug()` |
| `Grammar101Template` | `components/blog/article/grammar-101-template.tsx` | High-intent converter guidance | `getHighIntentGuidanceBySlug()` |
| Default | `article-main-content.tsx` fallback | APA-style generic articles | slug not matched in any data file |

Data files:
- `lib/is-x-article-data.ts` → `IS_X_ARTICLES[]`
- `lib/gen-cap-article-data.ts` → `GEN_CAP_ARTICLES[]`
- `lib/high-intent-guidance.ts` → high-intent entries

New articles are added in two places: **data file** (content) + **`components/blog/data.ts`** (article metadata for routing/sitemap/blog index).

## UI/UX State (2026-03-11 pass)

Done this session:
- Navy color tokens: `--color-navy`, `--color-navy-dark`, `--color-navy-mid`, `--color-navy-surface` in `@theme inline` (direct hex values, NOT `var()` – avoids oklch gradient artifacts)
- Typography: all magic-number font sizes replaced with Tailwind scale (`text-2xl/3xl`, `text-base leading-7`)
- Do/Don't blocks: Playfair Display font, `text-lg font-semibold`, strikethrough on wrong examples
- AnswerBox: supports `variant="it-depends"` (amber) in addition to default blue "Quick Answer"
- AccordionTrigger + article cards: `cursor-pointer` added
- Skip link: `<a href="#main">Skip to main content</a>` in `SiteShell`
- Mobile menu: `animate-in slide-in-from-top-2 fade-in` animation
- Icons: emoji → `@tabler/icons-react` SVG (ThumbUp/Down, CircleCheck)
- TOC: deduplicated to single `<details>` element (no mobile/desktop duplicates)
- ParallaxHeroBg: scroll handler wrapped in `requestAnimationFrame`
- CTA deduplication: aside CTA in `BlogWritingTipsPanel` changed to unique message+destination

## Active Blockers
- No GSC/GA4 data – cannot measure content performance yet.

## Metrics Snapshot (Quick)
- Indexation: Wave 1 articles indexing (Олег confirmed keywords appearing)
- Non-branded impressions: TBD (no GSC)
- Revenue signal: not started

## Decisions Since Last Session
- See `DECISIONS.md` entries D-0018, D-0019.
- **D-0018 (2026-03-11):** Created separate `GenCapTemplate` for "Is X Capitalized?" general questions (vs title-case-specific `IsXTemplate`). Data in `lib/gen-cap-article-data.ts`.
- **D-0019 (2026-03-11):** Navy color tokens use direct hex values (not `var()`) in `@theme inline` to avoid oklch gradient interpolation artifacts in Tailwind v4.
