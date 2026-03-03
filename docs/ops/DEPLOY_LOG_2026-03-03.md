# Deploy Log: titlecaseconverter.online goes live

**Date:** 2026-03-03
**Duration:** ~2 hours from empty server to production HTTPS

## What happened

Took a blank Hetzner VPS and got `titlecaseconverter.online` serving production traffic with SSL – from zero to live in one session.

## The stack

```
Hetzner CPX22 (€4.35/mo) → Ubuntu 24.04 → Docker Compose v2 → Next.js 16 standalone
                          → Nginx reverse proxy → Let's Encrypt SSL → Namecheap DNS
```

## What got done

**Server setup (from scratch):**
- Provisioned CPX22 in Nuremberg (2 vCPU, 4 GB RAM, 80 GB SSD)
- Cloud-init bootstrapped Docker, Nginx, Certbot, fail2ban, UFW
- Created `deploy` user with SSH key auth – disabled root login and password auth entirely
- Dual firewall: Hetzner Cloud firewall (`web-servers` group) + UFW on the box

**Docker pipeline:**
- Wrote a multi-stage Dockerfile – deps → build → runner. Final image runs as non-root user on port 3000
- Added `output: "standalone"` to `next.config.ts` for optimized Docker builds
- Docker Compose with healthcheck, restart policy, localhost-only port binding
- Container builds in ~60s, starts in ~5s, passes healthcheck in ~15s

**Nginx + SSL:**
- Nginx as reverse proxy: SSL termination, gzip, HSTS, static asset caching (1 year immutable for `/_next/static/`)
- `www` → apex 308 redirect, HTTP → HTTPS 301 redirect
- Certbot issued Let's Encrypt cert for both `titlecaseconverter.online` and `www.titlecaseconverter.online`
- Auto-renewal via systemd timer

**DNS:**
- Cleaned up Namecheap – removed old parking records
- Two A records: `@` and `www` → `78.47.113.198`
- Propagation took about 2 minutes

**Git deploy flow:**
- GitHub deploy key (read-only) on the server
- Deploy = `git pull` → `docker compose build --no-cache` → `docker compose up -d`
- Deploy script in `scripts/deploy.sh`

## Problems hit and solved

1. **`docker compose` not found** – cloud-init installed v1 (`docker-compose`), needed v2 plugin. Fixed with `apt install docker-compose-v2`.

2. **`sshd.service not found`** – Ubuntu 24.04 renamed the service to `ssh`. Learned the hard way after locking down SSH config.

3. **Missing `lib/constants.ts`** – existed locally but wasn't committed. Build failed on server. Classic "works on my machine."

4. **ERR_TOO_MANY_REDIRECTS** – Certbot auto-modified the Nginx config and left `return 301 https://` in the main HTTPS server block. HTTPS → HTTPS infinite loop. Rewrote the entire Nginx config from scratch with clean 3-block architecture.

## Numbers

| Metric | Value |
|--------|-------|
| Server cost | €4.35/mo |
| Time to production | ~2 hours |
| Docker image build | ~60s |
| Container startup | ~5s |
| SSL grade | A+ (HSTS preload) |
| Redirect chain | max 1 hop |
| Files created | 6 (Dockerfile, docker-compose.yml, .dockerignore, nginx config, deploy script, deploy runbook) |
| Problems debugged | 4 |

## Architecture

```
Internet → Hetzner Cloud Firewall (22/80/443)
         → UFW (22/80/443)
         → Nginx (:80 → redirect to :443)
         → Nginx (:443 SSL termination, gzip, HSTS)
         → Docker container (127.0.0.1:3000, Next.js standalone)
```

Server is designed for multi-project hosting – add another Docker container on a different port, add an Nginx server block, run Certbot for the new domain. Done.

## What's next

- GitHub Actions CI/CD (auto-deploy on push to `main`)
- GSC + GA4 + Bing Webmaster connections
- Cloudflare CDN (optional – Hetzner in EU already has solid latency for target audience)
