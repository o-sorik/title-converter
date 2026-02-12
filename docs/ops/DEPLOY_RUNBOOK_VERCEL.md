# Deploy Runbook (`P0-01`)

## Goal
- Launch `titlecaseconverter.online` on Vercel with apex (`https://titlecaseconverter.online`) as canonical host.
- Ensure `www` resolves and redirects to apex.

## Prerequisites
- Vercel account with project access.
- Domain access (DNS provider for `titlecaseconverter.online`).
- Repo connected to Vercel.

## Step-by-Step
1. Import project to Vercel and set production branch (`main` or current release branch).
2. Add domain `titlecaseconverter.online` to project.
3. Add alias domain `www.titlecaseconverter.online`.
4. In DNS, point apex and `www` records to Vercel per dashboard instructions.
5. In Vercel domain settings, set apex as primary domain.
6. Ensure `www` is configured as redirect to apex (`308` permanent redirect).
7. Deploy production build.

## Verification Checklist
- `https://titlecaseconverter.online` returns `200`.
- `https://www.titlecaseconverter.online` returns redirect to apex.
- View-source canonical points to apex domain.
- `https://titlecaseconverter.online/robots.txt` is reachable.
- `https://titlecaseconverter.online/sitemap.xml` is reachable.

## Post-Deploy Immediate Actions
- Execute `P0-02`: connect GSC, GA4, Bing Webmaster.
- Execute `P0-03`: submit sitemap + request indexing for core URLs.
- Execute `P0-04`: run technical SEO QA pass.

## Definition of Done
- Public production site reachable.
- Apex canonical host enforced.
- Redirect behavior confirmed for `www` to apex.
