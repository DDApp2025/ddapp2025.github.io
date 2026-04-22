# Prompt 10 — QA Report · ATG Clinical Supplies build

**Audited:** 2026-04-22 · **Scope:** all production HTML under `aestheticstogo.com`, `/clinical-supplies/*`, and the companion Worker + config files listed in CLAUDE.md.
**Mode:** read-only. No files were modified. Remediation recommendations per fail are in the right-hand column.

---

## Summary

| Category | Pass | Partial / Observation | Fail |
|---|---|---|---|
| Structure | 6 / 6 | 0 | 0 |
| Content | 3 / 4 | 1 (`includedSkuIds` vs `includedSlugs`) | 0 |
| UX | 1 / 3 | 2 | 0 |
| SEO | 4 / 4 | 0 | 0 |
| Cross-site | 3 / 4 | 1 (footer column gap on `/clinical-supplies/*`) | 0 |
| Hygiene | 3 / 4 | 1 (8 pages carry banned term `med spa` in contrast copy) | 0 |
| **Total** | **20 / 25** | **5** | **0** |

All 13 `stripeLink` values are still the `TODO_STRIPE_LINK` placeholder — expected per CLAUDE.md (Stripe Payment Links created post-deploy per `docs/POST_DEPLOY_TODO.md`). Listed below for completeness, not counted as a fail.

---

## STRUCTURE

| # | Check | Result | Notes |
|---|---|---|---|
| S1 | `/clinical-supplies/index.html` exists | ✅ Pass | Present. |
| S2 | `/clinical-supplies/catalog.js` exists and exports `CATALOG` with `skus[]` + `bundles[]` | ✅ Pass | `skus: [` at L18, `bundles: [` at L225. Dual-exported (classic global + CommonJS `module.exports`). |
| S3 | `/clinical-supplies/gate.js` exists and exposes `isUnlocked`, `attemptUnlock`, `renderPrices`, `bindGateForm` | ✅ Pass | All four exposed on `window.gate` at `gate.js:298-303`. |
| S4 | `/clinical-supplies/cart.js` exists and exposes add / remove / update / checkout | ✅ Pass | `window.cart` exposes `addSku`, `addBundle`, `remove`, `updateQty`, `clear`, `openDrawer`, `closeDrawer`, `checkout`, `showToast`, `getItems`, `mount`, `earlyAccessMailto` (`cart.js:587-600`). |
| S5 | `/workers/email-verify/index.js` and `wrangler.toml` exist | ✅ Pass | Both present. KV binding + `compatibility_date` set; secrets `CHECK_MAIL_API_KEY`, `BREVO_API_KEY` documented in the README. |
| S6 | One detail page per SKU at `/clinical-supplies/{slug}/index.html` | ✅ Pass | All 10 present (`anteage-mdx`, `benev-erc`, `celluma-pro`, `drpen-a20`, `drpen-h6`, `exo-skin-serum`, `obagi-professional-c-20`, `skinceuticals-ce-ferulic`, `skinmedica-tns-advanced`, `zo-daily-power-defense`). |

---

## CONTENT

| # | Check | Result | Notes |
|---|---|---|---|
| C1 | No banned words (`marketplace`, `med spa`, `DoorDash`, `store`, `shop`) anywhere in `/clinical-supplies/**` | ✅ Pass | Zero matches in the `clinical-supplies/` subtree. |
| C2 | Every SKU has `name`, `manufacturer`, `publicPrice`, `injectorPrice`, `stripeLink`, `slug`, `category`, `rationale` | ✅ Pass | Counts for each key: `manufacturer`=10, `publicPrice`=10, `injectorPrice`=10, `slug`=10, `category`=10, `rationale`=10 across the 10 SKU entries. `name` and `stripeLink` count 13 each — 10 SKUs + 3 bundles (both types share those keys). |
| C3 | Every bundle has `name`, `includedSlugs[]`, `bundlePrice`, `stripeLink` | ⚠️ **Partial — naming mismatch** | All 3 bundles have `name`, `bundlePrice`, and `stripeLink` (counts of 3 each). The array-of-member-ids field is named **`includedSkuIds`** (not `includedSlugs` as the spec calls it). Functionally equivalent because `id === slug` for every SKU in this catalog. **Fix:** either rename the field in `clinical-supplies/catalog.js:230,239,248` and every consumer (`cart.js:539` lookup, landing-page `renderBundles` at `clinical-supplies/index.html:389`), OR leave as-is and update the Prompt 10 spec to match the code. Zero visible-site impact either way — flag for spec/code alignment only. |
| C4 | Every `stripeLink` is a real URL or `TODO_STRIPE_LINK` | ℹ️ All 13 are placeholders | All 10 SKUs (`benev-erc`, `anteage-mdx`, `exo-skin-serum`, `drpen-a20`, `drpen-h6`, `celluma-pro`, `skinceuticals-ce-ferulic`, `skinmedica-tns-advanced`, `zo-daily-power-defense`, `obagi-professional-c-20`) and all 3 bundles (`post-microneedling-exosome-kit`, `recovery-retail-bundle`, `full-regimen-starter`) carry `"TODO_STRIPE_LINK"`. Expected — replacement with real Stripe Payment Links is item #2 in `docs/POST_DEPLOY_TODO.md`. |

---

## UX

| # | Check | Result | Notes |
|---|---|---|---|
| U1 | Every "Add to Cart" button is disabled when its SKU's `stripeLink` is `TODO_STRIPE_LINK` | ⚠️ **Partial — deliberate UX evolution** | The QA spec expects a `disabled` button. The shipped behavior (per the Prompt 7 follow-up `ff0b763`) renders an `<a class="btn-outline">Get Early Access</a>` that opens a lead-capture mailto to `info@aestheticstogo.com` instead of a disabled button. Auto-reverts to `Add to Cart` the moment a real `stripeLink` lands. Applies to landing-page bundle and product cards (`clinical-supplies/index.html:401,428`), the detail-page primary button (via `_build-detail-pages.js:423-438`), and the multi-line Checkout Summary modal (`cart.js:524`). **Fix:** none required if the product decision stands — but if strict spec compliance is wanted, replace the three render sites with `<button … disabled>Coming Soon</button>`. Recommend keeping the current Get Early Access treatment since it's strictly better (captures leads instead of silently failing). |
| U2 | Cart icon appears in the `/clinical-supplies/*` header on every page under that path | ✅ Pass | `window.cart.mount()` is called after boot on all 11 pages (landing + 10 detail); cart.css + cart.js are linked on every page (`Clinical Supplies` subtree grep: 11 files × 2 refs = 22 occurrences of `cart.css` / `cart.js`). |
| U3 | Gate banner on landing; absent on detail pages | ⚠️ **Partial — detail-page inline gate not implemented** | Landing carries `#gateBanner` (`clinical-supplies/index.html:291-303`); no detail page has one. The spec says detail pages should show the same gate logic **inline on the price block**, not a full-width banner. Current detail-page behavior: price block shows `🔒 Sign in for injector pricing` badge only — tapping it does nothing; the user must go back to the landing page to submit their email. **Fix (deferred, not blocking launch):** add a compact email-capture inline inside `product-price-block` in `_build-detail-pages.js:232` that calls `gate.attemptUnlock(email)` and updates the DOM without reload; regenerate the 10 pages. |

---

## SEO

| # | Check | Result | Notes |
|---|---|---|---|
| SE1 | Every page has a unique `<title>`, `<meta name="description">`, canonical URL | ✅ Pass | 28 production HTML files, 28 unique titles, 28 canonicals, 28 descriptions. Eyeball scan of titles shows no duplicates — each page title reflects its unique content. |
| SE2 | Every detail page has JSON-LD `Product` structured data | ✅ Pass | All 10 detail pages contain `"@type": "Product"` JSON-LD plus a `BreadcrumbList` block (confirmed by `_build-detail-pages.js:36-64`). |
| SE3 | `/clinical-supplies/` and all SKU pages listed in `sitemap.xml` | ✅ Pass | 11 `clinical-supplies`-prefixed `<loc>` entries added by commit `6c573fd`. Landing gets `priority 0.8, weekly`; 10 detail pages get `priority 0.7, weekly`. `lastmod 2026-04-22`. |
| SE4 | `robots.txt` does not block `/clinical-supplies/` | ✅ Pass | `robots.txt` uses `Allow: /` with no `Disallow:` line referencing `/clinical-supplies/` or any subpath. Sitemap is declared at the bottom. |

---

## CROSS-SITE

| # | Check | Result | Notes |
|---|---|---|---|
| X1 | Every root-level HTML has "Clinical Supplies" in its header nav | ✅ Pass | 28 production HTML files; all 17 non-clinical-supplies pages (homepage + 16 subpages) carry `<a href="/clinical-supplies">Clinical Supplies</a>` in `.nav` positioned after "For Providers". The 11 clinical-supplies pages (landing + 10 detail) each carry the link with the `.active` + `aria-current="page"` attributes. |
| X2 | Every root-level HTML footer includes the Clinical Supplies column | ⚠️ **Partial — 11-page gap** | The dedicated `footer-row-clinical-supplies` row (with "Clinical Supplies ·" label + Browse Catalog / Exosomes / Devices / Skincare links) is present on 17 pages (homepage + 16 non-clinical-supplies subpages). Missing from the 11 pages under `/clinical-supplies/*` — both the landing and all 10 detail pages. These pages DO have `<a href="/clinical-supplies">Clinical Supplies</a>` in the primary footer row, just not the dedicated 4-link column. **Fix:** add the `footer-row-clinical-supplies` markup block to the landing page footer (`clinical-supplies/index.html` ~L364) and to the detail-page footer template (`_build-detail-pages.js` ~L345), then regenerate the 10 pages. |
| X3 | Homepage hero matches Prompt 2 spec (eyebrow, H1, subtitle, CTAs, trust pills) | ✅ Pass | `index.html:326` eyebrow "The Clinical Platform for Mobile Injectors", `327` H1 "Everything you need to run your aesthetic practice — in *one place.*", `328` subtitle mentioning EHR + AI simulator + injector-priced supplies, `329-332` three hero pills, `334-339` hero-actions with `Apply as Founding Provider` + `Browse Clinical Supplies`. All elements present. |
| X4 | Homepage has the new Clinical Supplies section below the hero (Prompt 8) | ✅ Pass | `<section class="magazine" id="clinical-supplies-teaser">` at `index.html:378` with H2 `Clinical supplies at injector pricing`, 3 featured SKU cards (benev-erc, drpen-a20, skinceuticals-ce-ferulic), primary CTA → `/clinical-supplies`, and 3-step process strip. Positioned between the feature-strip footnote and the provider-focused how-it-works section. |

---

## HYGIENE

| # | Check | Result | Notes |
|---|---|---|---|
| H1 | No references to Kelly Wellington, Dr. Deborah Kessler-Hudak, or Princess anywhere | ✅ Pass | Zero matches in any production file. The only occurrences are in `CLAUDE.md:26` and `docs/DESIGN_TOKENS.md:675`, where the names are enumerated as part of the hard-rule list itself (required to document the prohibition). |
| H2 | No references to DivaDash, Diva-Dash, Diva Dash anywhere | ⚠️ **Partial — 1 occurrence in production `faq/index.html`** | `faq/index.html:602` contains a line that reads: *"You NEVER mention 'DivaDash' or 'Diva Dash' or any other brand name — the platform is ONLY called 'Aesthetics To Go' or 'ATG'."* The text appears to be an LLM-style style instruction left inside the page's markup (likely in a `<script>` or hidden element used by an AI-copilot flow), and it violates the strict "Never use" reading of the hard rule by literally using the banned strings while documenting them. **Fix:** either remove that line from the FAQ page entirely, paraphrase it (e.g. *"You NEVER mention any former brand name — the platform is ONLY called 'Aesthetics To Go' or 'ATG'."*), or mask the strings (e.g. `D​ivaDash` with a zero-width joiner). Recommend paraphrase + remove references. |
| H3 | No hardcoded Stripe secret keys (`sk_live`, `sk_test`) anywhere | ✅ Pass | Zero matches across the repo. |
| H4 | No hardcoded Check-Mail or Brevo API keys in client-side files | ✅ Pass | `gate.js` references only the public Worker URL. `cart.js` has no secrets. `workers/email-verify/index.js` reads secrets from `env.CHECK_MAIL_API_KEY` and `env.BREVO_API_KEY` (Cloudflare Worker bindings set via `wrangler secret put`, per `workers/email-verify/README.md`). No 20+ char literal-API-key pattern detected anywhere under `clinical-supplies/`. |

---

## Out-of-scope observations (worth a separate pass)

The following showed up during the audit but aren't on the Prompt 10 checklist. Noting them here so they can be triaged into a follow-up.

### 1. Pre-existing `med spa` / `med-spa` in 8 non-homepage production pages — 31 occurrences total

CLAUDE.md hard rules forbid the term. Homepage was cleaned in commit `79b3361` (Prompt 8 follow-up). The remaining occurrences are mostly contrast copy ("ATG is NOT a med spa", "highest med spa density proves demand") and were deferred to this QA pass per earlier triage.

| File | Count | Nature |
|---|---|---|
| `blog/index.html` | 12 | Article titled *"The Real Cost of Running a Med Spa vs. Going Mobile"* — headline, URL slug (`blog/med-spa-cost-vs-mobile-practice`), body paragraphs, article-card text |
| `about/index.html` | 5 | FAQ schema question + answer + story copy + faq-card text ("Aesthetics To Go is not a med spa…") |
| `faq/index.html` | 4 | FAQ schema + answer + an internal style-guide comment |
| `las-vegas/index.html` | 3 | Market-demand language + a why-card title about "med spa density" |
| `careers/index.html` | 2 | Career positioning vs "med spa employment" |
| `boulder-city/index.html` | 2 | Why-card + city-card |
| `henderson/index.html` | 2 | Why-card + city-card |
| `summerlin/index.html` | 1 | City-card |

**Recommendation:** standardize a replacement — e.g. swap "med spa" → *"traditional clinic"* or *"brick-and-mortar practice"* across all 31 instances, fix the blog article URL slug (redirect the old path to the new one), and regenerate the blog card text. This is a one-afternoon cleanup that needs a policy decision before it runs.

### 2. Bundle field name (`includedSkuIds` vs spec's `includedSlugs`)

Covered in row C3 above. Keep as `includedSkuIds` (because `id === slug`) and update the project spec, or rename if you prefer the spec's term.

### 3. Detail-page inline gate UX

Covered in row U3 above. Non-blocking for launch — current flow sends the user back to the landing page to unlock — but represents a modest friction point for users who arrive directly at a detail page (e.g. from a Google result).

### 4. `_build-detail-pages.js` lives alongside shipped code

The underscore prefix already signals it as tooling. It's also safe for GitHub Pages to serve it as a static file (Pages doesn't execute JS server-side). No action needed, noting for visibility.

---

*End of report. Source checks: file-listing via `ls`, field-presence via `grep -c`, pattern sweeps via ripgrep, structural probes via targeted `Grep` calls. All scans case-insensitive where relevant.*
