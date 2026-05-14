<div align="center">

# Title Case Converter

**A fast, free, SEO-first text case converter built with Next.js 16 and React 19.**

Convert text to Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case and more — with proper support for AP, APA, MLA, Chicago and Standard style guides.

[![CI](https://github.com/o-sorik/title-converter/actions/workflows/ci.yml/badge.svg)](https://github.com/o-sorik/title-converter/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Ftitlecaseconverter.online&label=titlecaseconverter.online)](https://titlecaseconverter.online)

[**Live demo →**](https://titlecaseconverter.online)

</div>

---

## Highlights

- **10 conversion types** — Title, Sentence, UPPER, lower, camelCase, PascalCase, snake_case, kebab-case, AlTeRnAtInG, iNVERSE
- **5 title case styles** — Standard, AP, Chicago, MLA, APA, with per-word rule explanations
- **Batch checker** — paste a list of headlines and validate them in bulk
- **SEO-first architecture** — SSG + ISR, self-referencing canonicals, JSON-LD, sitemap, programmatic pages
- **Built-in blog & rules hub** — long-form content for capitalization rules and style guides
- **Dark mode** out of the box, OKLch color system
- **Strict TypeScript** + co-located Vitest tests
- **One-command release gate** — lint, tests and SEO QA enforced before every deploy

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI | [React 19](https://react.dev) + [shadcn/ui](https://ui.shadcn.com) (New York) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) + OKLch tokens |
| Language | TypeScript 5 (strict) |
| Testing | [Vitest 4](https://vitest.dev) |
| Linting | ESLint 9 + `eslint-config-next` |
| Deployment | Docker + Nginx on Hetzner VPS |
| CI/CD | GitHub Actions (lint → test → SEO QA → SSH deploy) |

## Quickstart

Requirements: **Node.js 22+** and **npm**.

```bash
git clone https://github.com/o-sorik/title-converter.git
cd title-converter
npm install
cp .env.example .env.local   # set OPENAI_API_KEY if you need it
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run test` | Run the full Vitest suite |
| `npm run lint` | ESLint |
| `npm run seo:qa` | Validate canonical URLs, metadata, JSON-LD |
| `npm run release:gate` | Full pre-release gate (lint + test + SEO QA) |
| `npm run postchange:validate` | Post-deploy route & performance checks |
| `npm run template:qa` | Content template quality checks |
| `npm run intent:qa` | Cannibalization / intent ownership checks |
| `npm run secrets:scan` | Scan for leaked secrets |

> Run `npm run release:gate` before every release — CI enforces the same checks.

## Project structure

```
app/                     Next.js App Router pages (homepage, [slug] converters, blog, rules guide)
components/              Feature components — text-converter, batch-checker, site-shell, json-ld
  ui/                    shadcn/ui primitives (auto-generated, do not edit)
lib/                     Business logic: converters.ts, seo-config.ts, blog-view-model.ts, ...
scripts/                 Operational scripts (.mjs) — SEO QA, release gate, deploy helpers
docs/ops/                Runbooks, architecture notes, SEO checklists
nginx/                   Reverse proxy config
Dockerfile               Multi-stage build (deps → builder → runner)
docker-compose.yml       Production container
.github/workflows/ci.yml Lint + test + SEO QA + SSH deploy on push to main
```

## The converter engine

Core logic lives in [`lib/converters.ts`](lib/converters.ts):

```ts
import { convert, convertWithExplanations } from "@/lib/converters";

convert("the quick brown fox", "title", { titleStyle: "ap" });
// → "The Quick Brown Fox"

convertWithExplanations("a tale of two cities", "title", { titleStyle: "chicago" });
// → tokens with per-word capitalization rules
```

- **Types:** `title | upper | lower | sentence | camel | pascal | snake | kebab | alternating | inverse`
- **Title styles:** `standard | ap | chicago | mla | apa`

To add a new mode: extend the `ConversionType` union → implement the case in `convert()` → register the slug in `lib/seo-config.ts` → add tests.

## SEO architecture

This project treats SEO as a first-class concern, not a footer concern.

- **Canonical host:** `https://titlecaseconverter.online` (apex, no `www`)
- **One intent per URL** — anti-cannibalization rules enforced by `npm run intent:qa`
- **Self-referencing canonicals** on every indexable page
- **JSON-LD** — `WebApplication` + `FAQPage` on converter pages, `BlogPosting` + `BreadcrumbList` on articles
- **Rendering** — SSG + ISR by default, `dynamicParams = false` on every `[slug]` route
- **Programmatic pages** — `/is/[term]` answers "Is X capitalized?" queries from a content registry
- **Generated sitemap & robots** via `app/sitemap.ts` and `app/robots.ts`

Full ruleset: see [`docs/ops/SEO_QA_CHECKLIST.md`](docs/ops/SEO_QA_CHECKLIST.md) and [`docs/ops/TAXONOMY_AND_CANNIBALIZATION_RULES.md`](docs/ops/TAXONOMY_AND_CANNIBALIZATION_RULES.md).

## Testing

```bash
npm run test         # full Vitest run
npx vitest           # watch mode
```

Tests are co-located with their source (`lib/converters.ts` → `lib/converters.test.ts`) and cover all conversion logic, blog view models, SEO config, and page metadata.

## Deployment

Production runs on a Hetzner VPS via Docker Compose + Nginx with Let's Encrypt SSL.

```bash
ssh deploy@<server>
cd /var/www/titlecaseconverter
git pull origin main
docker compose build --no-cache
docker compose up -d
```

Pushes to `main` trigger the GitHub Actions workflow, which gates on lint + test + SEO QA before SSHing into the server and rolling the container. Full runbook in [`docs/ops/DEPLOY_RUNBOOK_HETZNER.md`](docs/ops/DEPLOY_RUNBOOK_HETZNER.md).

## Roadmap

Current priorities and recent decisions live in:

- [`ROADMAP.md`](ROADMAP.md) — long-term plan
- [`docs/ops/BACKLOG.md`](docs/ops/BACKLOG.md) — current sprint
- [`docs/ops/DECISIONS.md`](docs/ops/DECISIONS.md) — architecture decision log

## Contributing

Issues and PRs are welcome. Before opening a PR:

1. Run `npm run release:gate` — it must pass cleanly.
2. Follow [Conventional Commits](https://www.conventionalcommits.org) (`feat:`, `fix:`, `chore:`, `test:`, `docs:`).
3. Keep canonical URLs, JSON-LD and sitemap entries in sync when you add or rename a route.
4. New `lib/` functions need co-located tests.

## Author

Built and maintained by [**@o-sorik**](https://github.com/o-sorik).

Site: [titlecaseconverter.online](https://titlecaseconverter.online)
