# Title Case Converter — titlecaseconverter.online

Free online tool that converts text to Title Case, Sentence Case, camelCase, PascalCase, snake_case, kebab-case, and more. Supports AP, APA, MLA, and Chicago style guides. SEO-first architecture with integrated blog and content system.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS v4 + shadcn/ui (New York style)
- **Testing:** Vitest 4
- **Linting:** ESLint 9 with Next.js core-web-vitals + TypeScript config
- **Deployment:** Hetzner VPS (Docker + Nginx)
- **Path alias:** `@/*` maps to project root

## Commands

```
npm run dev              # Start dev server
npm run build            # Production build
npm run start            # Production server
npm run test             # Run all tests (vitest run)
npm run lint             # ESLint check
npm run seo:qa           # SEO validation (canonical URLs, metadata, structured data)
npm run release:gate     # Full pre-release gate (lint + test + seo:qa)
npm run postchange:validate  # Post-deploy route and performance checks
npm run template:qa      # Content template quality checks
npm run intent:qa        # Cannibalization / intent ownership checks
npm run ahrefs:intake    # Ahrefs keyword intake pipeline
npm run secrets:scan     # Scan for leaked secrets
```

**Before any release, always run: `npm run release:gate`**

## Deployment

Production runs on a Hetzner VPS via Docker + Nginx reverse proxy.

- **Server:** `web-prod-1` (CPX22: 2 vCPU, 4 GB RAM, 80 GB SSD, Nuremberg)
- **IP:** `78.47.113.198` | **SSH user:** `deploy`
- **Stack:** Docker Compose → Next.js standalone container on `127.0.0.1:3000` → Nginx SSL termination
- **SSL:** Let's Encrypt (Certbot, auto-renew)
- **DNS:** Namecheap A records → Hetzner IP
- **Canonical host:** `https://titlecaseconverter.online` (apex, no `www`)
- **GitHub repo:** `o-sorik/title-converter` (server uses read-only deploy key)

Quick deploy:
```bash
ssh deploy@78.47.113.198
cd /var/www/titlecaseconverter
git pull origin main
bash scripts/deploy.sh   # build (cached), 120s health wait, auto-rollback on failure
```
Never use `docker compose build --no-cache` on the VPS (2 vCPU) unless debugging a corrupted layer cache.

Ops safety nets:
- CI runs post-deploy smoke tests (/, /blog, converter page, sitemap)
- Daily config backup on VPS: `~/bin/backup-titlecase.sh` (cron 03:15, keeps 14 days in `~/backups/`)
- Deploy log on server: `/var/www/titlecaseconverter/deploy.log`

Full runbook: `docs/ops/DEPLOY_RUNBOOK_HETZNER.md`

## Project Structure

```
app/                            # Next.js App Router pages
  page.tsx                      # Homepage (/)
  [slug]/page.tsx               # Converter mode pages (/sentence-case-converter, etc.)
  blog/                         # Blog system (/blog, /blog/[slug], /blog/categories/*)
  capitalization-rules-guide/   # Long-form rules page
  is/[term]/                    # "Is X capitalized?" programmatic pages
  sitemap.ts                    # Generated sitemap
  robots.ts                     # robots.txt metadata route
components/                     # Feature components
  ui/                           # shadcn/ui primitives (DO NOT edit manually)
  blog/                         # Blog-specific components
  text-converter.tsx            # Main converter widget
  site-shell.tsx                # Shared header + footer
  json-ld.tsx                   # Structured data components (WebApplication, FAQ, HowTo, BlogPosting)
lib/                            # Business logic and utilities
  converters.ts                 # Core conversion engine (10 types, 5 title case styles)
  seo-config.ts                 # SEO page configs, slug registry, metadata templates
  high-intent-guidance.ts       # "Is X capitalized?" content entries and blog linking
  blog-view-model.ts            # Blog data orchestration
  converter-context.ts          # URL parameter parsing for deep linking
  conversion-session.ts         # Converter state snapshots
  utils.ts                      # cn() utility (clsx + tailwind-merge)
scripts/                        # Operational scripts (.mjs)
  deploy.sh                     # Server deploy script (git pull + docker rebuild)
nginx/                          # Nginx config templates
  titlecaseconverter.conf       # Reverse proxy config for the site
Dockerfile                      # Multi-stage build (deps → builder → runner)
docker-compose.yml              # Production container config (port 3000, healthcheck)
docs/ops/                       # Operational documentation (15+ docs)
data/seo/ahrefs/                # Ahrefs keyword data imports
```

## Code Conventions

### File Naming
- **kebab-case** for all filenames: `converter-context.ts`, not `converterContext.ts`
- **PascalCase** for React component exports: `TextConverter`, `SiteHeader`
- Tests co-located next to source: `converters.test.ts` beside `converters.ts`

### TypeScript
- Strict mode is ON — do not use `any` without justification
- Separate type imports: `import type { Metadata } from "next"`
- Always use `@/*` path alias: `@/lib/converters`, `@/components/ui/button`

### React / Next.js
- Server Components by default. Only add `"use client"` when the component needs browser APIs, event handlers, or hooks
- Use `cn()` from `@/lib/utils` for conditional className merging — never raw template literals
- shadcn/ui components in `components/ui/` are auto-generated — do not edit them manually

### Styling
- Tailwind CSS v4 utility classes. No custom CSS files except `app/globals.css`
- Dark mode is required: always include `dark:` variants for background and text colors
- Color system uses OKLch variables defined in `app/globals.css`
- **Cursor:** Every clickable element (`<button>`, `<a>`, interactive `<div>`) must have `cursor-pointer`. shadcn/ui primitives (e.g. `AccordionTrigger`) often omit it — add via `className` prop at the call site, not by editing `components/ui/`

### Git
- Conventional commits: `feat:`, `fix:`, `chore:`, `test:`, `docs:`
- Pre-commit hook runs secret scanning via `.githooks/pre-commit`

## SEO Rules (Mandatory)

These rules are non-negotiable. Every page change must respect them.

1. **Canonical URL:** Every indexable page MUST have a self-referencing canonical. Host is `https://titlecaseconverter.online` (apex, no `www`).
2. **Metadata:** Every page needs unique `title` (50-65 chars), unique `description` (140-160 chars), and Open Graph tags.
3. **JSON-LD:** Converter pages use `WebApplicationJsonLd` + `FAQPageJsonLd`. Blog articles use `BlogPosting` + `BreadcrumbList`. Only add `FAQPage` schema when FAQ content actually exists on the page.
4. **One intent per URL:** Each page targets exactly one primary keyword intent. Check `docs/ops/TAXONOMY_AND_CANNIBALIZATION_RULES.md` before creating new pages.
5. **Anti-cannibalization:** Never create a page whose primary query overlaps with an existing page. Run `npm run intent:qa` to verify.
6. **Rendering:** SSG + ISR by default. Use `revalidate` values from `docs/ops/RENDERING_STRATEGY.md`. Set `dynamicParams = false` on all `[slug]` routes.
7. **Internal linking:** Every content page needs minimum 3 internal links in and out. At least one link must point to the main converter (`/`).
8. **No thin content:** Content pages require answer + examples + style context + FAQ. See `docs/ops/CONTENT_TEMPLATE_V1.md`.

## Testing

- **Framework:** Vitest — import `{ expect, test, describe }` from `'vitest'`
- **Location:** Co-located tests (`lib/converters.ts` → `lib/converters.test.ts`)
- **What to test:** All `lib/` business logic, new page metadata (`*.metadata.test.ts`), script behavior
- **Run:** `npm run test` (single run) or `npx vitest` (watch mode)
- Tests must pass before release — `npm run release:gate` includes them

## Documentation Reference

Before making significant changes, consult the relevant doc in `docs/ops/`:

| Doc | When to Read |
|-----|-------------|
| `PROJECT_CONTEXT.md` | Business goals, audience, constraints |
| `SYSTEM_MAP.md` | Architecture, validation flow, known risks |
| `BACKLOG.md` | Current priorities and sprint tasks |
| `DECISIONS.md` | Past architecture and strategy decisions |
| `RENDERING_STRATEGY.md` | Before changing any route's rendering |
| `TAXONOMY_AND_CANNIBALIZATION_RULES.md` | Before creating any new content page |
| `CONTENT_TEMPLATE_V1.md` | Template for "Is X Capitalized?" pages |
| `BLOG_SEO_DESIGN_REQUIREMENTS.md` | Before changing blog templates |
| `SEO_QA_CHECKLIST.md` | Pre-release SEO validation |
| `DEPLOY_RUNBOOK_HETZNER.md` | Deployment procedures (Hetzner VPS + Docker + Nginx) |
| `SESSION_BRIEF.md` | Current session state and recent work |
| `EXPERIMENTS.md` | Active SEO and workflow experiments |

Full roadmap: `ROADMAP.md` in project root.

## Knowledge Base

Strategic KB for this project: `/Users/user/Documents/Claude/titlecaseconverter/`

Contains: SEO strategy, content plan, brand voice, current tasks, changelog.
- `prompts/` — ready-made Claude Code prompt templates (code review, UI/UX audit) — copy and paste into session

## Guardrails

### NEVER
- Commit `.env.local` or any file containing real API keys
- Add `"use client"` to a page/layout component unless it truly needs client-side interactivity
- Create a new route without adding it to `sitemap.ts` and verifying canonical URL
- Release without running `npm run release:gate`
- Duplicate a primary keyword intent across two different URLs
- Manually edit files in `components/ui/` (shadcn-generated)
- Use `www.titlecaseconverter.online` — canonical is apex only
- Set `dynamicParams = true` on slug routes (crawl budget protection)
- Skip dark mode variants when adding new UI elements

### ALWAYS
- Run `npm run lint && npm run test` before committing
- Add tests for new `lib/` functions
- Include canonical URL in metadata for new pages
- Check `docs/ops/TAXONOMY_AND_CANNIBALIZATION_RULES.md` before creating content pages
- Use `cn()` from `@/lib/utils` for conditional classNames
- Use `import type` for type-only imports

## Adding a New Page

1. Check `docs/ops/TAXONOMY_AND_CANNIBALIZATION_RULES.md` — does the intent overlap with any existing page?
2. Add the route file in `app/` following existing patterns
3. Set `export const revalidate = <value>` per `docs/ops/RENDERING_STRATEGY.md`
4. Set `export const dynamicParams = false` for any `[slug]` route
5. Add `generateStaticParams()` for dynamic routes
6. Add metadata with unique title, description, and self-referencing canonical
7. Add JSON-LD structured data using components from `@/components/json-ld`
8. Include the page in `app/sitemap.ts`
9. Add minimum 3 internal links (incoming and outgoing)
10. Write co-located tests for metadata assertions
11. Run `npm run release:gate` and confirm all checks pass

## Converter System

Core logic in `lib/converters.ts`:
- `convert(text, type, options?)` — main conversion function
- `convertWithExplanations(text, type, options?)` — conversion with per-word rule explanations
- **Types:** `title | upper | lower | sentence | camel | pascal | snake | kebab | alternating | inverse`
- **Title styles:** `standard | ap | chicago | mla | apa`

Page configs in `lib/seo-config.ts`:
- `HOME_PAGE_CONFIG` — homepage configuration
- `SEO_CONFIG` — record of slug → page config for `/[slug]` routes
- `CONVERTER_SLUGS` — list of all valid converter slugs

To add a new converter mode: add to `ConversionType` union → implement in `convert()` switch → add `SEO_CONFIG` entry → add tests.
