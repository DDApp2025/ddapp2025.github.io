# Post-deploy TODO — ATG Clinical Supplies launch

Run through this list after the Prompt 9 commit lands on `origin/main` and
GitHub Pages finishes redeploying aestheticstogo.com.

Until every item here is done the catalog is live but non-transactional —
prices stay locked, cart clicks fall back to the `Get Early Access` mailto,
and the soft gate never sends Brevo notifications.

---

## 1. Search engine sitemaps

- [ ] **Google Search Console** — resubmit `https://aestheticstogo.com/sitemap.xml`.
      Verify that the 11 new URLs under `/clinical-supplies/*` are picked up
      within 24–48 hours. Check for index coverage warnings.
- [ ] **Bing Webmaster Tools** — resubmit the same sitemap URL and watch for
      any crawl errors on the new pages.

## 2. Stripe Payment Links

Every SKU and bundle in `clinical-supplies/catalog.js` currently carries
`stripeLink: "TODO_STRIPE_LINK"`. Until those are replaced with real Stripe
Payment Link URLs, `Add to Cart` falls back to the disabled/early-access
treatment.

- [ ] For each of the 10 SKUs, create a Payment Link with "Allow customer
      to adjust quantity" enabled. SKU list (slug → current placeholder price):
      - `benev-erc` ($560 injector / $799 retail)
      - `anteage-mdx` ($375 / $699)
      - `exo-skin-serum` ($220 / $329)
      - `drpen-a20` ($330 / $449)
      - `drpen-h6` ($280 / $399)
      - `celluma-pro` ($1,845 / $2,195)
      - `skinceuticals-ce-ferulic` ($115 / $182)
      - `skinmedica-tns-advanced` ($205 / $295)
      - `zo-daily-power-defense` ($115 / $159)
      - `obagi-professional-c-20` ($95 / $126)
- [ ] For each of the 3 bundles, create a single-fixed-price Payment Link:
      - `post-microneedling-exosome-kit` ($649)
      - `recovery-retail-bundle` ($675)
      - `full-regimen-starter` ($349)
- [ ] Paste each Payment Link URL into `clinical-supplies/catalog.js`,
      replacing the `TODO_STRIPE_LINK` placeholder on the matching SKU /
      bundle object. No code changes anywhere else — the cart reads from
      `catalog.js` at runtime.
- [ ] Commit with a clear message (e.g. `catalog: replace TODO_STRIPE_LINK
      placeholders with live Stripe Payment Link URLs`) and push.

## 3. Cloudflare Worker — secrets + deploy

Worker source lives at `workers/email-verify/`. KV binding is already
committed (`wrangler.toml` → `[[kv_namespaces]]`).

- [ ] `wrangler secret put CHECK_MAIL_API_KEY` — paste the Check-Mail.org v2
      API key when prompted.
- [ ] `wrangler secret put BREVO_API_KEY` — paste the existing Brevo
      transactional API key (same one ATG outreach uses).
- [ ] `wrangler deploy` from `workers/email-verify/`.
- [ ] Confirm the deployed URL matches
      `https://atg-email-verify.aestheticstogo.workers.dev`.

## 4. Gate client wiring

- [ ] Open `clinical-supplies/gate.js`, confirm the `WORKER_URL` constant
      at the top still points at
      `https://atg-email-verify.aestheticstogo.workers.dev`. If the Worker
      was deployed to a different URL, update the constant, commit, push.

## 5. End-to-end gate test

Two sides: the happy path and the rejection path. Both should exit
gracefully with a useful UI.

- [ ] Open a clean browser (or Incognito to skip cached `localStorage`),
      navigate to `https://aestheticstogo.com/clinical-supplies/`, and
      submit a real professional email you control. Expected:
      - Button text cycles "Verifying..." → "Unlocked ✓".
      - Banner fades out after ~2s.
      - Injector prices replace the "Sign in for injector pricing" badge
        on every SKU and bundle.
      - `info@aestheticstogo.com` receives the Brevo notification with the
        submitted email, ISO timestamp, client IP, and user agent.
- [ ] Submit a disposable address (e.g. `someone@mailinator.com`). Expected:
      - Rejected client-side (inline red text) before the Worker is hit.
- [ ] Submit a role address (e.g. `info@somepractice.com`). Expected:
      - Rejected client-side with the "personal professional email" copy.
- [ ] Submit a real but invalid-MX domain
      (e.g. `someone@definitelynotadomain.xyz`). Expected:
      - Worker returns `{ ok:false, reason:"invalid_mx" }`; banner shows the
        "could not verify" copy.

## 6. Cart flow test

- [ ] **1 SKU × qty 1** — click Add to Cart on any single product after
      replacing its stripeLink. Open the drawer. Click Checkout. Should
      redirect directly to the Payment Link with no quantity param.
- [ ] **1 SKU × qty 3** — bump qty to 3 in the drawer. Checkout should
      redirect to the Payment Link with `?quantity=3` appended.
- [ ] **Multi-line cart** (2 SKUs + 1 bundle) — Checkout should open the
      Summary modal with three separate `Pay for this item` links + a
      `Create bundle request →` mailto prefilled with the cart contents.
- [ ] **TODO_STRIPE_LINK SKU** — any SKU whose `stripeLink` is still the
      placeholder should render `Get Early Access` (btn-outline) instead of
      `Add to Cart`, and that button should open a lead-capture mailto.

---

When every checkbox above is green, the Clinical Supplies launch is fully
transactional. Move on to Prompt 10 (QA report) and then the post-launch
tasks in `CLAUDE.md` (Task A — SEO parity sweep, Task B — reseller
account setup playbook).
