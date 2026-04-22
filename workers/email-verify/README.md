# `atg-email-verify` — Cloudflare Worker

Backs the soft email gate on every `/clinical-supplies/*` page. Validates
submitted emails via Check-Mail.org (MX + disposable + role check) and sends
a notification to `info@aestheticstogo.com` via Brevo on every successful
unlock. Browser-side rate-limit is a courtesy; the real rate-limit is enforced
here (5 req/min per hashed client IP, via KV).

Deployed URL: https://atg-email-verify.aestheticstogo.workers.dev

---

## One-time setup

Assumes `wrangler` is installed and authenticated via `CLOUDFLARE_API_TOKEN`.

```bash
cd workers/email-verify

# 1. Create the KV namespace used for rate-limit counters.
wrangler kv namespace create atg_email_verify_ratelimit
# => copy the printed `id` into wrangler.toml under [[kv_namespaces]].id

# 2. Set the API-key secrets (you'll be prompted to paste each value).
wrangler secret put CHECK_MAIL_API_KEY
wrangler secret put BREVO_API_KEY

# 3. Deploy.
wrangler deploy

# 4. Confirm the printed URL matches:
#    https://atg-email-verify.aestheticstogo.workers.dev
```

Re-deploy after any `index.js` change:

```bash
wrangler deploy
```

---

## Smoke-test the live Worker

Replace `test@example.com` with a real address you control — a successful
call will fire a Brevo notification to `info@aestheticstogo.com`.

```bash
curl -X POST https://atg-email-verify.aestheticstogo.workers.dev \
  -H "content-type: application/json" \
  -H "Origin: https://aestheticstogo.com" \
  -d '{"email":"test@example.com"}'
```

Expected responses:

| Scenario | Status | Body |
|---|---|---|
| Valid professional email | `200` | `{"ok":true}` |
| Role address (`info@`, `admin@`, …) | `200` | `{"ok":false,"reason":"role"}` |
| Disposable provider (mailinator etc.) | `200` | `{"ok":false,"reason":"disposable"}` |
| No MX / bad domain | `200` | `{"ok":false,"reason":"invalid_mx"}` |
| Malformed email | `400` | `{"ok":false,"reason":"format"}` |
| Rate-limited (>5/min same IP) | `429` | `{"ok":false,"reason":"rate"}` |
| Check-Mail.org outage | `502` | `{"ok":false,"reason":"verification_unavailable"}` |

---

## Check-Mail.org response field names

`index.js` calls `interpretCheckMail()` to normalize the API response. The
helper tolerates several shapes seen across Check-Mail.org versions
(`valid_mx` / `mx_found` / `mx.valid` / `deliverable` / `status:"valid"` /
`result:"valid"`, plus `disposable` / `is_disposable` / `flags.disposable`,
plus `role` / `is_role` / `role_account` / `flags.role`). If the live API
returns field names outside that set, confirm against
<https://docs.check-mail.org> and extend `interpretCheckMail()` in one place.

---

## Privacy guarantees

- **No email address is ever written to `console.log` or persisted in KV.**
  Rate-limit keys are `rl:<SHA-256(ip + salt)>` only.
- The only place the submitted email leaves the request is the single Brevo
  transactional email to `info@aestheticstogo.com`. `localStorage` on the
  client holds it for the 30-day unlock window; after that it expires and
  the client re-gates.

---

## Rollback

```bash
wrangler rollback         # roll back to previous deployment
wrangler delete           # remove the Worker entirely (destructive — confirms first)
```

Rolling back does not purge KV. If you need to clear accumulated rate-limit
counters, `wrangler kv key list --binding RATE_LIMIT` then delete the keys,
or delete and recreate the namespace.
