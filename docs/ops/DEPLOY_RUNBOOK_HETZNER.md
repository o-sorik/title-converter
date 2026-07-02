# Deploy Runbook – Hetzner VPS

> Replaces `DEPLOY_RUNBOOK_VERCEL.md` as of 2026-03-03.

## Infrastructure Overview

| Component | Detail |
|-----------|--------|
| Provider | Hetzner Cloud |
| Server | `web-prod-1` – CPX22 (2 vCPU, 4 GB RAM, 80 GB SSD) |
| Location | Nuremberg, DE (`nbg1`) |
| OS | Ubuntu 24.04 LTS |
| IP | `78.47.113.198` |
| SSH user | `deploy` (key-only auth, sudo + docker group) |
| Domain | `titlecaseconverter.online` (apex canonical, no `www`) |
| DNS | Namecheap – A records for `@` and `www` → `78.47.113.198` |
| SSL | Let's Encrypt via Certbot (auto-renew via systemd timer) |
| SSL expiry | 2026-06-01 (auto-renews 30 days before) |
| Container | Docker + Docker Compose v2 |
| Reverse proxy | Nginx (host-level, not containerized) |
| App port | `127.0.0.1:3000` (localhost only) |
| Project path | `/var/www/titlecaseconverter` |
| GitHub repo | `o-sorik/title-converter` (deploy key: read-only) |

## Security Layers

- **SSH**: key-only auth, root login disabled, password auth disabled
- **Firewall (Hetzner Cloud)**: `web-servers` group – TCP 22/80/443 + ICMP
- **Firewall (UFW)**: ports 22, 80, 443 only
- **Fail2ban**: active on SSH
- **Docker port binding**: `127.0.0.1:3000` – not exposed to internet directly
- **Nginx**: SSL termination, HSTS, gzip, www→apex redirect

## Deploy Procedure

### Quick deploy (most common)

```bash
ssh deploy@78.47.113.198
cd /var/www/titlecaseconverter
git pull origin main
bash scripts/deploy.sh
```

The script builds with layer cache, waits up to 120s for the healthcheck, and
**auto-rolls back to the previous commit** if the new container never becomes
healthy. Log: `/var/www/titlecaseconverter/deploy.log`.

Verify:

```bash
docker compose ps          # should show "healthy"
curl -sI https://titlecaseconverter.online | head -5
```

### Using the deploy script remotely

```bash
ssh deploy@78.47.113.198 'bash -s' < scripts/deploy.sh
```

### Full rebuild (last resort — corrupted layer cache only)

`--no-cache` on the 2 vCPU VPS takes several minutes and starves the running
container. Use only when a cached layer is provably broken.

```bash
ssh deploy@78.47.113.198
cd /var/www/titlecaseconverter
docker compose down
docker system prune -f
git pull origin main
docker compose build --no-cache
docker compose up -d
```

### Backups

Daily config backup (cron, 03:15 server time) via `~/bin/backup-titlecase.sh`:
`.env.local`, nginx vhost, crontab, deployed commit hash → `~/backups/`
(14-day rotation, log: `~/backups/backup.log`). Certs are not backed up —
`deploy` has no root; certbot reissues them in minutes if lost.

## Verification Checklist

After every deploy, confirm:

- [ ] `https://titlecaseconverter.online` returns 200
- [ ] `https://www.titlecaseconverter.online` redirects 308 → apex
- [ ] `http://titlecaseconverter.online` redirects 301 → HTTPS
- [ ] View-source: `<link rel="canonical" href="https://titlecaseconverter.online/...">`
- [ ] `/robots.txt` is reachable
- [ ] `/sitemap.xml` is reachable
- [ ] `docker compose ps` shows container as `healthy`
- [ ] Dark mode toggle works
- [ ] Converter input/output functions correctly

## Nginx Config Location

Live config: `/etc/nginx/sites-enabled/titlecaseconverter.conf`

Three server blocks:
1. HTTP (port 80) → redirect all to HTTPS apex
2. HTTPS www (port 443) → 308 redirect to apex
3. HTTPS apex (port 443) → proxy_pass to `127.0.0.1:3000`

To reload after config changes:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## SSL Certificate Renewal

Certbot auto-renews via systemd timer. To check:

```bash
sudo certbot certificates          # see expiry dates
sudo systemctl status certbot.timer # verify timer is active
```

Manual renewal if needed:

```bash
sudo certbot renew --dry-run       # test first
sudo certbot renew                 # actual renewal
sudo systemctl reload nginx
```

## Environment Variables

`.env.local` lives at `/var/www/titlecaseconverter/.env.local` on the server. It is **never** committed to git.

To update env vars:

```bash
ssh deploy@78.47.113.198
nano /var/www/titlecaseconverter/.env.local
cd /var/www/titlecaseconverter
docker compose up -d --build
```

## Troubleshooting

### Container won't start
```bash
docker compose logs --tail 50      # check logs
docker compose down && docker compose up -d
```

### Nginx 502 Bad Gateway
Container is down or not listening on port 3000:
```bash
docker compose ps                  # check status
docker compose restart
```

### ERR_TOO_MANY_REDIRECTS
Nginx config issue – check for redirect loops:
```bash
sudo nginx -t
cat /etc/nginx/sites-enabled/titlecaseconverter.conf
```

### Disk space
```bash
df -h                              # check disk usage
docker system prune -a             # clean unused images/containers
```

## Adding Another Project to This Server

This server is designed to host multiple Docker-based projects:

1. Create a new directory: `/var/www/<project-name>`
2. Add a new `docker-compose.yml` binding to a different port (e.g., `127.0.0.1:3001`)
3. Add a new Nginx server block proxying the new domain to that port
4. Run Certbot for the new domain
5. Reload Nginx

## Post-Deploy Actions

- Execute `P0-02`: connect GSC, GA4, Bing Webmaster
- Execute `P0-03`: submit sitemap + request indexing for core URLs
- Execute `P0-04`: run technical SEO QA pass
