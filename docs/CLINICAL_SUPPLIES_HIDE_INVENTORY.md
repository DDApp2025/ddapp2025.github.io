# Clinical Supplies Hide Inventory

**Date compiled:** 2026-05-05
**Scope:** Read-only inventory. No edits made. Out-of-scope items (internal docs, archived files, worker code) are flagged separately so the hide pass in Prompt 2 does not touch them.

## Summary

- **Total files with Clinical Supplies references (repo-wide):** 57.
- **Production-page files in scope for the hide:** 27 — 1 homepage + 12 secondary pages (`/providers/`, `/about/`, `/careers/`, `/contact/`, `/faq/`, `/blog/`, `/botox/`, `/fillers/`, `/hair-restoration/`, `/terms/`, `/privacy/`) + 11 catalog pages under `/clinical-supplies/` + `sitemap.xml` + `llms.txt` (verified clean — no edits required) + 0 hits in `providerapplication.html`. The 5 supporting code files inside `/clinical-supplies/` (`catalog.js`, `gate.js`, `cart.js`, `cart.css`, `_build-detail-pages.js`) ride along with the catalog directory.
- **Total occurrences in production pages:** ~120 lines with at least one match. Per-file breakdown:
  - `index.html`: 13 occurrences (nav, mobile nav, feature section comment + body + 3 detail-page View links + Browse CTA, footer primary row, footer dedicated Clinical Supplies row).
  - `providers/index.html`: 7 (JSON-LD answer text, nav, mobile nav, value-card title + body, footer primary row, footer dedicated row).
  - `careers/index.html`: 5 (nav, mobile nav, benefit-card body text, footer primary row, footer dedicated row).
  - `contact/index.html`: 4 (nav, mobile nav, footer primary row, footer dedicated row).
  - `about/index.html`: 5 (nav, mobile nav, platform-card body text, footer primary row, footer dedicated row).
  - `faq/index.html`: 6 (JSON-LD answer text, nav, mobile nav, footer primary row, footer dedicated row, plus 2 bullet lines inside the FAQ chatbot LLM system prompt template literal — same line numbers).
  - `blog/index.html`: 4 (nav, mobile nav, footer primary row, footer dedicated row).
  - `botox/index.html`: 5 (nav, mobile nav, FAQ answer body text, footer primary row, footer dedicated row).
  - `fillers/index.html`: 4 (nav, mobile nav, footer primary row, footer dedicated row).
  - `hair-restoration/index.html`: 4 (nav, mobile nav, footer primary row, footer dedicated row).
  - `terms/index.html`: 4 (nav, mobile nav, footer primary row, footer dedicated row).
  - `privacy/index.html`: 4 (nav, mobile nav, footer primary row, footer dedicated row).
  - `providerapplication.html`: 0 (no references — already clean).
  - `clinical-supplies/` (the catalog itself): every file in the directory is a reference (will be hidden / redirect-stubbed wholesale).
  - `sitemap.xml`: 11 `/clinical-supplies/*` URL entries plus 1 section-comment line.
  - `llms.txt`: 0 references — verified clean, no edits needed.
- **No "Clinical Supply" singular legacy usage in any production page.** The only file that contains the singular form is the audit prompt MD itself (`Clinical_Supplies_Hide_Prompt_1.md`) and the historical commit-message log via `git log` (`6c573fd "Rename Clinical Supply → Clinical Supplies"`). All production pages use the plural form exclusively.

---

## /clinical-supplies/ directory contents

All 16 files inside `clinical-supplies/`. The 11 page files are the rendered catalog; the 5 code files are the supporting infrastructure that powers them.

| File | Size (bytes) | Type | Purpose |
|---|---|---|---|
| `clinical-supplies/index.html` | 39,812 | Page | **Catalog landing page** — full SEO-baked landing with email gate, category tabs, bundles grid, product grid, JSON-LD `Organization` + `BreadcrumbList` + `OfferCatalog` |
| `clinical-supplies/_build-detail-pages.js` | 27,889 | Code | Builder template that emits the 10 detail pages from `catalog.js` |
| `clinical-supplies/cart.js` | 22,443 | Code | Cart drawer + Stripe Payment Link router (1-line direct-redirect or multi-line drawer) |
| `clinical-supplies/catalog.js` | 14,839 | Code | Single source of truth — 10 SKUs + 3 bundles, dual-exported (browser global + CommonJS) |
| `clinical-supplies/gate.js` | 13,291 | Code | Soft email gate (regex + disposable blocklist + Cloudflare Worker MX check) |
| `clinical-supplies/cart.css` | 10,414 | Code | Cart-drawer + cart-button stylesheet, shared across landing + detail pages |
| `clinical-supplies/benev-erc/index.html` | 35,129 | Page | Detail page — BENEV ERC (exosomes) |
| `clinical-supplies/anteage-mdx/index.html` | 35,067 | Page | Detail page — AnteAGE MDX (exosomes) |
| `clinical-supplies/exo-skin-serum/index.html` | 35,110 | Page | Detail page — Dp Dermaceuticals EXO-SKIN (exosomes) |
| `clinical-supplies/drpen-a20/index.html` | 35,111 | Page | Detail page — Dr. Pen A20 (devices) |
| `clinical-supplies/drpen-h6/index.html` | 35,039 | Page | Detail page — Dr. Pen Hydra Pen H6 (devices) |
| `clinical-supplies/celluma-pro/index.html` | 35,142 | Page | Detail page — Celluma PRO LED (devices) |
| `clinical-supplies/skinceuticals-ce-ferulic/index.html` | 35,202 | Page | Detail page — SkinCeuticals C E Ferulic (skincare) |
| `clinical-supplies/skinmedica-tns-advanced/index.html` | 35,199 | Page | Detail page — SkinMedica TNS Advanced+ (skincare) |
| `clinical-supplies/zo-daily-power-defense/index.html` | 35,140 | Page | Detail page — ZO Daily Power Defense (skincare) |
| `clinical-supplies/obagi-professional-c-20/index.html` | 35,184 | Page | Detail page — Obagi Professional-C 20% (skincare) |

**11 page files explicit list (for Prompt 2):**

1. `clinical-supplies/index.html`
2. `clinical-supplies/benev-erc/index.html`
3. `clinical-supplies/anteage-mdx/index.html`
4. `clinical-supplies/exo-skin-serum/index.html`
5. `clinical-supplies/drpen-a20/index.html`
6. `clinical-supplies/drpen-h6/index.html`
7. `clinical-supplies/celluma-pro/index.html`
8. `clinical-supplies/skinceuticals-ce-ferulic/index.html`
9. `clinical-supplies/skinmedica-tns-advanced/index.html`
10. `clinical-supplies/zo-daily-power-defense/index.html`
11. `clinical-supplies/obagi-professional-c-20/index.html`

The 5 code files (`catalog.js`, `gate.js`, `cart.js`, `cart.css`, `_build-detail-pages.js`) do not need edits to be hidden — they are referenced only from the page files. Once the page files redirect away, these five become dormant. Recommend leaving them in place to preserve restoration path, matching the AI-Simulator-hide pattern.

---

## Homepage references

`index.html` — 13 occurrences across 6 distinct UI roles. All are in scope for the hide.

| Line | Role | Context |
|---|---|---|
| 480 | Header nav (desktop) | `<a href="/clinical-supplies">Clinical Supplies</a>` inside `<nav class="nav">` between For Providers and Botox |
| 503 | Mobile nav | `<a href="/clinical-supplies" onclick="closeNav()">Clinical Supplies</a>` |
| 755–767 | HTML comment block | Multi-line comment documenting the teaser section's hardcoded SKUs and the Phase 2 (Value Prop Realignment) relocation. Mentions `ATG Clinical Supplies`, `clinical-supplies/catalog.js`, prior heading `ATG Clinical Supplies / Clinical supplies at injector pricing` |
| 768 | Section root | `<section class="magazine" id="clinical-supplies-teaser" aria-labelledby="supply-teaser-title">` — the section element itself |
| 772 | Section heading | `<h2 class="magazine-title" id="supply-teaser-title">Injector-Priced Clinical Supplies for Your Practice</h2>` |
| 789 | View link | `<a href="/clinical-supplies/benev-erc/" ...>View →</a>` |
| 800 | View link | `<a href="/clinical-supplies/drpen-a20/" ...>View →</a>` |
| 811 | View link | `<a href="/clinical-supplies/skinceuticals-ce-ferulic/" ...>View →</a>` |
| 817 | Browse CTA | `<a class="btn-primary" href="/clinical-supplies">Browse Clinical Supplies</a>` |
| 918 | Footer primary row | `<a href="/clinical-supplies">Clinical Supplies</a>` between For Providers and Blog |
| 919 | Footer dedicated Clinical Supplies row | The whole `<div class="footer-row footer-row-clinical-supplies">` row containing the `Clinical Supplies ·` label, Browse Catalog href, plus three category-anchor links (`#exosomes`, `#devices`, `#skincare`). Also lives at end of line 919 (same line as Terms/Privacy row) |

**Section boundaries:** the homepage Clinical Supplies feature section runs from line 755 (HTML comment opening) through line ~890 (section closing — needs verification during Prompt 2 edit). The complete unit including the explanatory comment, the section element, the 3-card magazine grid, the Browse CTA, and the trailing 3-step process strip should be hide-wrapped as one block — same pattern as the AI Simulator and Patient Experience hides.

**Homepage head meta (lines 1–60):** verified — `<title>`, `<meta name="description">`, `<meta name="keywords">`, `<meta property="og:title">`, `<meta property="og:description">`, `<meta name="twitter:title">`, `<meta name="twitter:description">` all describe the operating system, NOT the catalog. **No homepage head-meta edits required.** No JSON-LD on the homepage references Clinical Supplies as a Service / Product / OfferCatalog (verified).

---

## Production pages with Clinical Supplies in nav/footer

Every secondary production HTML page carries the same nav + mobile nav + footer-primary-row + footer-dedicated-Clinical-Supplies-row pattern. Confirmed identical structure across all 12.

| File | Header nav (line) | Mobile nav (line) | Footer primary row (line) | Footer dedicated row (line) |
|---|---|---|---|---|
| `index.html` | 480 | 503 | 918 | 919 |
| `providers/index.html` | 417 | 440 | 778 | 779 |
| `careers/index.html` | 470 | 493 | 877 | 878 |
| `contact/index.html` | 366 | 389 | 580 | 581 |
| `about/index.html` | 437 | 460 | 761 | 762 |
| `faq/index.html` | 511 | 534 | 723 | 724 |
| `blog/index.html` | 519 | 542 | 1099 | 1100 |
| `botox/index.html` | 466 | 489 | 750 | 751 |
| `fillers/index.html` | 489 | 512 | 814 | 815 |
| `hair-restoration/index.html` | 484 | 507 | 816 | 817 |
| `terms/index.html` | 356 | 379 | 626 | 627 |
| `privacy/index.html` | 356 | 379 | 603 | 604 |
| `providerapplication.html` | — | — | — | — (no references — page lacks the standard nav/footer template) |

The four roles per page:
- **Header nav (desktop):** `<a href="/clinical-supplies">Clinical Supplies</a>` between For Providers and Botox.
- **Mobile nav:** `<a href="/clinical-supplies" onclick="closeNav()">Clinical Supplies</a>` (one of several mobile-panel links).
- **Footer primary row:** `<a href="/clinical-supplies">Clinical Supplies</a>` between For Providers and Blog.
- **Footer dedicated row:** the entire `<div class="footer-row footer-row-clinical-supplies">…</div>` block — `Clinical Supplies ·` label + Browse Catalog href + Exosomes/Devices/Skincare anchor links.

All 12 pages need the same four edits applied identically. The footer dedicated row is the most-Clinical-Supplies-saturated unit (5 link/text occurrences inside one element).

---

## Production pages with Clinical Supplies feature mentions in body content

Body-content references that go beyond the nav/footer template — these are the targeted edits requiring per-page judgment.

| File | Line | Context | Recommended treatment |
|---|---|---|---|
| `index.html` | 755–817 | Full Clinical Supplies teaser section: HTML comment block + `<section id="clinical-supplies-teaser">` + 3 magazine cards (BENEV ERC, Dr. Pen A20, SkinCeuticals CE Ferulic) + Browse CTA + 3-step process strip | Hide-wrap the whole section with dated `<!-- ... -->` comment, AI-Sim-hide style. Section needs replacement content or removal of the slot from the layout flow. |
| `providers/index.html` | 97 | JSON-LD `FAQPage` answer: `"...Regional Lead Providers receive a full mobile clinical operating system: ...wholesale-priced clinical supplies."` | Edit JSON-LD answer to remove the `wholesale-priced clinical supplies` phrase or substitute neutral language. |
| `providers/index.html` | 500 | `<h3 class="value-card-title">Injector-Priced Clinical Supplies.</h3>` — value-card title (one of the six provider-page value cards) | Replace card title + body with neutral framing OR remove card and shrink the grid (matches AI-Sim card-removal pattern). |
| `providers/index.html` | 501 | `<p class="value-card-text">Access volume pricing on Botox, dermal fillers, and clinical supplies through aggregated provider purchasing power...</p>` — value-card body | Body text accompanies the title above; treat as one unit. |
| `careers/index.html` | 618 | `<p class="benefit-card-text">Access volume pricing on Botox, dermal fillers, and clinical supplies through aggregated purchasing power...</p>` — one of the careers-page benefit cards | Edit body to remove the `clinical supplies` phrase or rephrase to "wholesale supply access". |
| `about/index.html` | 552 | `<p class="platform-card-text">Volume pricing on Botox, dermal fillers, and clinical supplies through the network's aggregated purchasing power...</p>` — about-page platform card | Same treatment as careers — phrase swap or rewrite. |
| `botox/index.html` | 760 | FAQ answer paragraph: `<p>You will need FDA-approved neurotoxins and dermal fillers from authorized distributors, plus clinical supplies: needles, cannulas, topical anesthetic...</p>` | This usage refers to "clinical supplies" generically (needles, cannulas, etc.) not to the ATG catalog. **Possibly leave as-is** — the term is used as a generic English noun phrase, not as a sub-brand reference. Flag for user judgment. |
| `faq/index.html` | 152 | JSON-LD `FAQPage` answer: `"...The operating system also provides wholesale supply access on Botox, fillers, and clinical supplies."` | Edit JSON-LD answer to drop the `clinical supplies` phrase or substitute neutral language. |
| `faq/index.html` | 808 | LLM system prompt template literal bullet (`PROVIDER APP FEATURES`): `- Wholesale Medical Supply Ordering: Access volume pricing on Botox, dermal fillers, and clinical supplies through the network's aggregated purchasing power...` | See FAQ AI assistant context block section below. |
| `faq/index.html` | 828 | LLM system prompt template literal bullet (`PROVIDER ECONOMICS`): `- Volume wholesale pricing on medical supplies (Botox, fillers, clinical supplies)` | See FAQ AI assistant context block section below. |

Pages with **only** nav/footer references (no body content edits needed beyond the standard 4 nav/footer roles):
- `contact/index.html`
- `blog/index.html`
- `fillers/index.html`
- `hair-restoration/index.html`
- `terms/index.html`
- `privacy/index.html`

---

## Metadata with Clinical Supplies references

All metadata references live inside `/clinical-supplies/*` (the catalog itself). Production pages outside the catalog have **zero** Clinical Supplies references in `<title>`, `<meta name="description">`, `<meta name="keywords">`, `<meta property="og:*">`, or `<meta name="twitter:*">`.

| File | Type | Line | Current value |
|---|---|---|---|
| `clinical-supplies/index.html` | `<title>` | 30 | `ATG Clinical Supplies — Injector-Priced Exosomes, Devices &amp; Skincare Actives` |
| `clinical-supplies/index.html` | `meta description` | 37 | `ATG Clinical Supplies — injector-priced exosomes, post-procedure devices, and skincare actives for licensed aesthetic providers. Sign in with your professional email to view injector pricing.` |
| `clinical-supplies/index.html` | `meta keywords` | 38 | `injector pricing exosomes, professional microneedling pen, BENEV ERC, SkinCeuticals CE Ferulic practice pricing, aesthetic practice supplies, licensed injector wholesale` |
| `clinical-supplies/index.html` | `og:title` | 46 | `ATG Clinical Supplies — Injector-Priced Clinical Supplies` |
| `clinical-supplies/index.html` | `og:description` | 47 | `Exosomes, post-procedure devices, and skincare actives — sourced for licensed aesthetic providers. Sign in with your professional email to view injector pricing.` |
| `clinical-supplies/index.html` | `twitter:title` | 54 | `ATG Clinical Supplies — Injector-Priced Clinical Supplies` |
| `clinical-supplies/index.html` | `twitter:description` | 55 | `Exosomes, post-procedure devices, and skincare actives for licensed aesthetic providers.` |
| `clinical-supplies/index.html` | JSON-LD `OfferCatalog` | 84–104 | `{"@type":"OfferCatalog","name":"ATG Clinical Supplies","description":"Injector-priced exosomes...","itemListElement":[10 Offer/Product entries]}` |
| `clinical-supplies/index.html` | JSON-LD `BreadcrumbList` | 73–82 | Includes a `Clinical Supplies` ListItem at position 2 |
| `clinical-supplies/index.html` | JSON-LD `Organization` | 59–71 | Generic org schema — no Clinical Supplies reference itself |
| 10 detail pages (one each) | `<title>` | ~96 of `_build-detail-pages.js` template | `${sku.name} — Injector Pricing · ATG Clinical Supplies` |
| 10 detail pages | `meta description` | ~99 of template | `${sku.rationale} Injector-priced via ATG Clinical Supplies for licensed aesthetic providers — direct-ship to your practice.` |
| 10 detail pages | `og:title` | ~107 of template | `${sku.name} — ATG Clinical Supplies` |
| 10 detail pages | `twitter:title` | ~115 of template | `${sku.name} — ATG Clinical Supplies` |
| 10 detail pages | JSON-LD `Product` | ~36 of template | Per-SKU product offering schema |
| 10 detail pages | JSON-LD `BreadcrumbList` | ~55 of template | Includes a `Clinical Supplies` ListItem at position 2, plus a category-anchor at position 3 |
| 10 detail pages | Visible breadcrumb DOM | runtime-rendered via `renderDetail` in `<script>` block | `Home › Clinical Supplies › {category} › {sku.name}` (built at line ~373 of the template, generated dynamically from `sku.category` + `sku.categoryLabel`) |

If the hide pattern matches the AI-Simulator hide (page-level redirect stub, original markup preserved as a date-marked HTML comment), the metadata above does not need surgical edits — it gets comment-wrapped wholesale along with the rest of each catalog page.

---

## sitemap.xml entries to remove

`sitemap.xml` lines 76–142. Eleven `<url>` blocks plus one section comment.

```
Line 76:  <!-- ATG Clinical Supplies (Prompt 9) -->
Line 78:  <loc>https://aestheticstogo.com/clinical-supplies/</loc>
Line 84:  <loc>https://aestheticstogo.com/clinical-supplies/benev-erc/</loc>
Line 90:  <loc>https://aestheticstogo.com/clinical-supplies/anteage-mdx/</loc>
Line 96:  <loc>https://aestheticstogo.com/clinical-supplies/exo-skin-serum/</loc>
Line 102: <loc>https://aestheticstogo.com/clinical-supplies/drpen-a20/</loc>
Line 108: <loc>https://aestheticstogo.com/clinical-supplies/drpen-h6/</loc>
Line 114: <loc>https://aestheticstogo.com/clinical-supplies/celluma-pro/</loc>
Line 120: <loc>https://aestheticstogo.com/clinical-supplies/skinceuticals-ce-ferulic/</loc>
Line 126: <loc>https://aestheticstogo.com/clinical-supplies/skinmedica-tns-advanced/</loc>
Line 132: <loc>https://aestheticstogo.com/clinical-supplies/zo-daily-power-defense/</loc>
Line 138: <loc>https://aestheticstogo.com/clinical-supplies/obagi-professional-c-20/</loc>
```

Each `<loc>` is wrapped in a complete `<url>...<lastmod>...<changefreq>...<priority>...</url>` block (6 lines per entry). The section is bracketed by the comment at line 76 and the closing `</urlset>` at line 143. Recommended action in Prompt 2: remove the entire commented block (lines 76–142 inclusive). Alternatively, comment-wrap to preserve restoration path — matches the AI-Simulator-hide pattern.

---

## llms.txt references

**`llms.txt` is already clean.** Verified line-by-line. No mention of "Clinical Supplies", "clinical supplies", "Clinical Supply", or `/clinical-supplies/`. The current content covers Botox, dermal fillers, and hair restoration as the three Services Facilitated; lists "Volume wholesale pricing on medical supplies" as a generic Key Fact (line 13) with no sub-brand link. **No edits required.**

If the hide-pass spec wants `llms.txt` updated to remove the generic "wholesale pricing on medical supplies" line, flag for user decision — that line does not name the Clinical Supplies catalog and may legitimately reference the same wholesale-supply-access value-prop ATG retains regardless of catalog visibility.

---

## FAQ AI assistant context block references

`faq/index.html` lines 760–approximately 845 contain a JavaScript template literal assigned to `var ATG_SYSTEM_PROMPT = ` …` at line 767. This is the system prompt for the in-page Claude API chatbot. Two bullets inside it mention clinical supplies:

| Line | Section | Bullet |
|---|---|---|
| 808 | `PROVIDER APP FEATURES:` (started ~line 798) | `- Wholesale Medical Supply Ordering: Access volume pricing on Botox, dermal fillers, and clinical supplies through the network's aggregated purchasing power. Lower cost-per-unit without negotiating individual supplier contracts.` |
| 828 | `PROVIDER ECONOMICS — REGIONAL LEAD PROVIDER AGREEMENT:` (started ~line 823) | `- Volume wholesale pricing on medical supplies (Botox, fillers, clinical supplies)` |

These are **not user-facing visible text on the page** — they are LLM system-prompt context that shapes the chatbot's answers. If a visitor asks the FAQ chatbot about provider features or economics, the chatbot will currently reference clinical supplies because of these two bullets. Recommended treatment in Prompt 2: edit both bullet lines to remove the `clinical supplies` reference (e.g., "wholesale supply access" or just drop the parenthetical), matching the same neutral-language treatment applied to the JSON-LD answer at line 152.

The CLAUDE.md Status Table notes the FAQ chatbot LLM system prompt was rewritten in Phase 7 (`b6c52a1 realign: faq chatbot LLM system prompt — Regional Lead Provider voice (Phase 7 follow-on)`). The two clinical-supplies bullets survived that rewrite, presumably because they were not within Phase-7 scope.

---

## Internal docs (out of scope, flagged for review)

These files contain Clinical Supplies references but are **not** public-facing — they are internal historical documentation, planning artifacts, or supporting code that should remain intact to preserve the restoration path. **No edits required during the hide pass.**

### Historical / QA reports (preserve as-is)

- `docs/QA_REPORT.md` — Phase 1 catalog-launch QA report. References Clinical Supplies extensively. Historical record of Phase 1 build.
- `docs/POST_DEPLOY_TODO.md` — Phase 1 post-deploy TODO list. References Clinical Supplies.
- `docs/SKU_CATALOG.md` — Phase 1 SKU research source-of-truth (the doc that catalog.js placeholder pricing came from).
- `docs/DESIGN_TOKENS.md` — Prompt 1 deliverable. References Clinical Supplies.
- `docs/AI_SIM_HIDE_INVENTORY.md` — AI Simulator hide inventory. References Clinical Supplies in passing.
- `docs/AI_SIM_HIDE_QA_REPORT.md` — AI Simulator hide QA. References Clinical Supplies in passing.
- `docs/GEO_STRIP_INVENTORY.md` — Geographic strip inventory. References Clinical Supplies in passing.
- `docs/GEO_STRIP_QA_REPORT.md` — Geographic strip QA. References Clinical Supplies in passing.

### Phase 2 SKU research (preserve as-is — separate workstream)

- `docs/PHASE2_SKU_CATALOG_PART1.md` — Peptide Supplements research.
- `docs/PHASE2_SKU_CATALOG_PART2.md` — PRP/PRF + Transdermal Patches research.
- `docs/PHASE2_SKU_CATALOG_PART3.md` — ZEO Regenerative Biologics research.
- `docs/PHASE2_SKU_CATALOG_PART4.md` — Phase 2 synthesis (bundles + priority + flags + table).
- `docs/PHASE2_SKU_CATALOG_PART5.md` — Secretome category research (still untracked).
- `docs/PHASE2_AUDIT.md` — Phase 2 catalog audit (just produced — separate workstream artifact, per user instruction).

### CLAUDE.md (preserve as-is)

- `CLAUDE.md` — Project rules + Status Table + Task A/B/C scope. References Clinical Supplies extensively. Will receive a new Status Table row for the hide commit, but the existing Clinical-Supplies content remains intact as project history.

### Repo-root planning docs (preserve as-is — gitignored anyway)

- `Clinical_Supplies_Hide_Prompt_1.md` — this prompt file itself (root, presumably gitignored or untracked).
- `MOBILE_NAV_ROLLOUT.md`, `MOBILE_NAV_HOMEPAGE_PILOT.md`, `MOBILE_NAV_REDESIGN.md` — mobile-nav planning docs.
- `PHASE5_PROMPT_FINAL.md`, `PHASE6A_AUDIT.md`, `PHASE6B_PROMPT_FINAL.md` — Value Prop Realignment phase prompts.
- `CLAUDE_CODE_PROMPTS.md` — generic prompt collection.
- `ABOUT_REALIGN_FULL.md`, `BLOG_REALIGN_FULL.md`, `FAQ_CHATBOT_REWRITE.md` — Phase 7 realignment prompts.
- `index.txt`, `index-old2.txt`, `about/index.txt`, `blog/index.txt`, `faq/index.txt` — text-snapshot legacy files.

### Worker / supporting code (preserve as-is — supports the gate, dormant when catalog redirected)

- `workers/email-verify/index.js` — Cloudflare Worker MX-check endpoint that powers `gate.js`. References `Clinical Supplies` in code comments / log strings.
- `workers/email-verify/wrangler.toml` — worker deployment config.
- `workers/email-verify/README.md` — worker documentation.

### Catalog support code (preserve as-is — dormant when catalog redirected)

- `clinical-supplies/catalog.js` — SKU/bundle data.
- `clinical-supplies/gate.js` — soft email gate logic.
- `clinical-supplies/cart.js` — cart drawer + Stripe router.
- `clinical-supplies/cart.css` — cart styles.
- `clinical-supplies/_build-detail-pages.js` — detail-page builder template.

These five become dormant once the 11 page files redirect away — the page files are the only callers. Leaving them in place mirrors the AI-Simulator-hide and Geographic-strip-hide patterns and preserves a one-step restoration path.

### Archived / out-of-tree HTML (preserve as-is)

The following were not greppedf for this inventory because they are explicitly archive snapshots, never served, or out-of-tree:
- `_notes/index-OLD.html`, `_notes/index.html` — `_notes/` archive directory.
- `index_2026_01_26_1529.html`, `index_2026_01_28_1633.html`, `index_enhanced.html`, `index_WORKS GOOD_2026_02_12.html` — repo-root historical homepage snapshots.
- `las-vegas/index.html`, `henderson/index.html`, `summerlin/index.html`, `boulder-city/index.html` — already-hidden city pages from the 2026-04-28 Geographic-strip pass.
- `ai-simulator/index.html` — already-hidden from the 2026-04-29 AI-Simulator pass.
- `.tmp-diag/*.html` — Playwright/Vite test scaffolding, gitignored.
- `google52a8a4460b8acba3.html` — Google Search Console verification, no body content.

---

## Stragglers

- **`providerapplication.html` is clean.** No nav/footer template at all (it's a self-contained provider-application form). Confirmed zero hits. No edits required.
- **No "Clinical Supply" (singular) usage in any production page.** `git log` shows commit `6c573fd` performed a "Clinical Supply → Clinical Supplies" rename that was thorough — production is now plural-only. The audit prompt's mention of the singular legacy form was defensive but not load-bearing.
- **`workers/email-verify/`** is the Cloudflare Worker that powers the soft email gate. It runs at a Cloudflare-hosted endpoint, not on aestheticstogo.com. Its references to "Clinical Supplies" are in code comments and log strings only — not user-facing. No public-visibility risk; no edits needed.
- **`docs/PHASE2_AUDIT.md`** — created by the prior audit work, contains many Clinical Supplies references inside narrative prose. Per user instruction, **leave alone** during the Clinical Supplies hide commit; it is a separate workstream artifact.
- **CLAUDE.md scope language** still describes ATG as "Mobile EHR + Clinical Supplies" with the catalog as a current-tense product offering. After the hide ships, the user may want to soften that to past-tense or "in development" language so future Claude Code sessions don't reintroduce hidden content. Flag for user decision; not in immediate scope.
- **Homepage feature-section comment block at lines 755–767** documents the section's hardcoded SKU list and the Phase 2 (Value Prop Realignment) relocation. This comment will be inside the dated hide-wrap by default; recommend leaving it intact inside the wrap so future restorers see the historical context.
- **`botox/index.html` line 760 generic "clinical supplies" usage** (needles, cannulas, topical anesthetic, etc.) is a generic noun phrase, not a sub-brand reference. Flag for user judgment in Prompt 2 — the conservative call is to leave it alone; the strict call is to replace the term with "consumables" or similar to keep the sub-brand vocabulary fully out of public copy.
- **No occurrences of `[Cc]linical [Ss]upply` (singular) in any production page** — verified via positive-suffix-anchored regex `[Cc]linical [Ss]upply([^a-z]|$)`. The only hit was inside the audit prompt MD itself.
- **No occurrences of "store", "shop", "marketplace"** referencing the catalog were found — these would have been Rule-2 violations. The catalog is consistently labeled "Clinical Supplies".
- **JSON-LD `OfferCatalog` and 10× `Product` schemas inside `/clinical-supplies/`** are the largest structured-data blob to be hidden — once the catalog pages redirect-stub, those schemas drop out of search-engine view automatically. No external Google-Search-Console action needed (GitHub Pages serves the redirect; crawlers will deindex the URLs over the next crawl cycle).

---

**End of inventory. No production-file edits made.**

---

## Restoration Notes (added 2026-05-05; revised same day after Prompt 2 redo)

Two distinct restoration paths exist after the 2026-05-05 hide:

- **11 catalog pages under `/clinical-supplies/`** — clean redirect stubs (~500 byte each) with no in-file preservation. Restore via git history.
- **Homepage feature section (`index.html`)** — comment-wrapped in place with `-->` → `--&gt;` escapes. Restore by removing the wrapper and reversing the two escapes.

The two paths differ because the catalog pages are standalone redirect-stubbed files where the active markup is the redirect stub (no other live content shares the file), so an in-file preservation block adds no value over git history. The homepage feature section, by contrast, sits inside an otherwise-active `index.html` whose surrounding sections remain live; preserving the section in-place via comment-wrap keeps it adjacent to its original location for easy restoration without a git checkout.

### Homepage Clinical Supplies feature section — `index.html`

**Hidden block boundaries (post-Prompt 2 line numbers):**
- Line 755: opening wrapper `<!-- Clinical Supplies homepage feature section hidden 2026-05-05 — uncomment to restore`
- Line 840: closing wrapper `-->`

**Restoration sequence:**
1. Remove the outer wrapper at lines 755 and 840 — delete the line at 755 (`  <!-- Clinical Supplies homepage feature section hidden 2026-05-05 — uncomment to restore`) and the line at 840 (`  -->`).
2. In the now-unwrapped content (formerly lines 756–839), reverse the two `--&gt;` escapes back to `-->`:
   - One inside the preserved teaser explanation comment (closes the multi-line comment block opened at the top of the section).
   - One inside the inline 3-step-strip comment (`<!-- 3-step process strip — reuses existing .how-grid / .how-card / .how-step tokens. -->`).

A grep for `--&gt;` against `index.html` immediately after step 1 will surface both occurrences and only those two — confirming the escape-reversal scope. **Skipping step 2 will leave invalid HTML entities in the restored output that won't render as valid HTML comments.**

### 11 catalog pages — `clinical-supplies/*.html`

Each page is now a clean ~500-byte redirect stub matching the AI Simulator hide pattern (`/ai-simulator/index.html`, commit `648668d`). The original Prompt-2-hybrid form (in-file preservation comment + redirect stub) was replaced with the AI-Sim-style clean stub on 2026-05-05 in the Prompt 2 redo.

**No `-->` → `--&gt;` escapes exist in any catalog page.** Repo-wide grep `--&gt;` against `clinical-supplies/` returns zero matches. There are zero `uncomment to restore` strings in any catalog page.

**Restoration sequence (all 11 pages at once):**

1. Identify the last commit that contained the original Prompt-1 catalog pages — the commit immediately before the 2026-05-05 Clinical Supplies hide commit. Convenient anchors:
   - `git log --oneline -- clinical-supplies/index.html` — the second entry from the top should be the pre-hide HEAD.
   - Or use the SHA of the Prompt-2 / Prompt-3 hide commit and refer to its parent (`<hide-commit>^`).
2. Run `git checkout <pre-hide-hash> -- clinical-supplies/` to restore every file in the directory to its pre-hide state.
3. The supporting code (`catalog.js`, `gate.js`, `cart.js`, `cart.css`, `_build-detail-pages.js`) was not modified by the hide and does not need restoration.

Because the catalog pages have no in-file preservation, **no escape reversal is required for these 11 files**.

### Why the catalog pages were redone as clean stubs

Prompt 2 originally embedded the full original markup in each catalog file with `-->` → `--&gt;` escaping. After Prompt 2 review the user opted to redo the catalog pages as clean redirect stubs matching the AI Simulator hide precedent (~500 bytes per page, original recoverable from git history) — preserving the homepage section's in-file preservation pattern only. The catalog pages now follow the AI-Simulator-style "delete and redirect" approach; the homepage section follows the comment-wrap-with-escapes approach because it is embedded inside an otherwise-active page.
