# CLAUDE.md

Read this file completely before doing any work. Do not redo anything marked Complete in the Status Table without explicit instruction.

## Working directory

`C:\Users\quail\Documents\ATG-site\` — git checkout of DDApp2025/ddapp2025.github.io, main branch.

## Deployment

GitHub Pages serves `origin/main` directly to aestheticstogo.com. No build step, no Actions. Commit + push = live within minutes.

## Never touch

- `C:\Users\quail\Documents\00-ATG\` — business operations root, not website.
- `C:\Users\quail\Downloads\ddapp2025.github.io*` — archived broken clones.

## Project

Launching ATG Clinical Supplies: a soft-gated catalog of exosomes, post-procedure devices, skincare actives, peptide supplements, PRP/PRF procedural equipment, transdermal peptide patches, and regenerative biologics (Florida/Utah where applicable) at injector pricing. Sub-brand inside aestheticstogo.com. Positions ATG as one clinical platform: Mobile EHR + Clinical Supplies. (Note: AI Simulator capability still exists in the codebase but was hidden from public site 2026-04-29 — do not reintroduce simulator marketing copy without explicit instruction.)

## Hard rules — never violate

- Never use: marketplace, med spa, medspa, DoorDash, store, shop.
- Never use: DivaDash, Diva-Dash, Diva Dash. Former brand. Aesthetics To Go only.
- Never reference: Kelly Wellington, Dr. Deborah Kessler-Hudak, Princess.
- Never reference specific revenue split percentages. Use "industry-leading".
- Never compare ATG to DoorDash. Use Uber if needed.
- Always provide complete files when editing code, not snippets.

## Scope

- Six product categories: Exosomes (topical), Post-Procedure Devices, Skincare Actives, Peptide Supplements, PRP/PRF Procedural Equipment, Transdermal Peptide Patches. Plus regenerative biologics sub-catalog (geo-gated to Florida/Utah initially).
- Nav label for the section: "Clinical Supplies".
- URL: `/clinical-supplies`.
- Soft email gate (regex + disposable blocklist client-side, MX check via Cloudflare Worker calling Check-Mail.org).
- Stripe Payment Links for checkout. No server-side cart. Client-side cart in localStorage.
- Email capture: on successful unlock, POST notification email to info@aestheticstogo.com via Brevo transactional API. No spreadsheet logging.

## Status Table

| # | Prompt | Status | Commit | Date | Deliverable |
|---|--------|--------|--------|------|-------------|
| 1 | Audit + design tokens | Complete | 467d499 | 2026-04-21 | docs/DESIGN_TOKENS.md |
| 2 | Rewrite homepage hero | Complete | [see git log] | 2026-04-21 | index.html |
| 3 | SKU research | Complete | [see git log] | 2026-04-21 | docs/SKU_CATALOG.md |
| 4 | /clinical-supplies landing | Complete | [see git log] | 2026-04-21 | clinical-supplies/index.html |
| 5 | Product detail template | Complete | [see git log] | 2026-04-22 | clinical-supplies/{slug}/*.html |
| 6 | Soft email gate + Worker | Complete | [see git log] | 2026-04-22 | clinical-supplies/gate.js, workers/email-verify/ |
| 7 | Cart + Stripe router | Complete | [see git log] | 2026-04-22 | clinical-supplies/cart.js, clinical-supplies/cart.css |
| 8 | Homepage Clinical Supplies section | Complete | [see git log] | 2026-04-22 | index.html |
| 9 | Global nav/footer/sitemap | Complete | [see git log] | 2026-04-22 | nav + footer on all pages, sitemap.xml, docs/POST_DEPLOY_TODO.md |
| 10 | QA report | Complete | [see git log] | 2026-04-22 | docs/QA_REPORT.md |
| — | Geographic strip — removed Las Vegas references, repositioned as nationwide platform | Complete | [see git log] | 2026-04-28 | All city pages hidden and redirected, legacy index files redirected, all visible text and metadata updated, providerapplication.html updated to 50-state dropdown, builder template updated and detail pages regenerated, QA report at docs/GEO_STRIP_QA_REPORT.md |
| — | AI Simulator hide — removed from public visibility, homepage card replaced with provider image | Complete | [see git log] | 2026-04-29 | /ai-simulator/ page hidden and redirected, homepage card replaced with ATG_in_home.jpg sized to fill column, all visible copy and metadata stripped of simulator references (originals preserved as date-marked HTML/CSS/JS comments), QA report at docs/AI_SIM_HIDE_QA_REPORT.md |
| — | Value Prop Realignment Phase 1 — homepage copy and audience parity | Complete | 4392747 | 2026-05-03 | index.html — wordmark, hero H1/subhead/eyebrow, both above-the-fold CTAs, header CTA, FAQ + schema + OG/Twitter meta updated to Regional Lead Provider / Licensed Providers framing per VALUE_PROP_REALIGNMENT_RULES.md. All Rule 2 forbidden strings cleared from homepage. Modal H2 + cta-band paragraph deferred to Phase 3. Phase 2 pending. |
| — | Value Prop Realignment Phase 2 — structure, provider journey, mobile rendering | Complete | 4375636 | 2026-05-03 | index.html — structural reorganization (3-step Provider Journey replacing 2-step Clinical Flow, Professional Suite reordered to 2 cards with Revenue Protected first, Clinical Supplies demoted from above-the-fold to after Provider Journey + Professional Suite, new Patient Experience section housing the relocated AI Diagnostic card). Hero trust strip rebuilt compliance-first (HIPAA / Encrypted Documentation / Malpractice Integration). Closing CTA + application modal H2 renamed to Regional Lead Provider. Four mobile-rendering bug-class fixes at @720px with dated CSS comments documenting each regression class: (1) grid track sizing — `.how-grid`/`.magazine-grid` use `minmax(0,1fr)` not bare `1fr` so img HTML width attrs don't blow out columns via min-content; (2) flex-item nowrap — `.logo-text` and `.hero-actions` buttons allow wrapping at mobile because Phase 1 grew their strings 60-100% past the implicit nowrap budget; (3) modal centering — flex container properties moved to `.modal.active` (not the base `display:none` rule) plus `inset:0` + `margin:0 auto` defensive triple; (4) modal input sizing — smaller font + tighter padding at mobile so long placeholder strings render with maximum visible characters, placed after base rule for cascade-order correctness. .gitignore: added .tmp-diag/ for retained Playwright/Edge visual regression tooling. Temporary openModal console.log diagnostic + window.atgDiag() helper still shipped — to be removed after real-browser verification. Phase 3 pending. |
| — | Value Prop Realignment Phase 3 — clinical governance, practice economics, value-prop reframe | Complete | 68b40bb | 2026-05-03 | index.html — new Clinical Governance section (eyebrow + heading + intro + 4 institutional-gravity pillars in `.governance-grid`: State-Specific Supervisory Frameworks, Malpractice Insurance Integration, Adverse-Event Protocols, Audit-Ready Documentation, plus state-dependence disclaimer). New Practice Economics section (8-row `<table class="economics-table">` cost-structure comparison Traditional Clinic Role vs. ATG Regional Lead Provider; desktop 3-col table collapses to stacked-card layout at <=720px via td[data-label] pseudo-elements; intro paragraph contains permitted "Six-figure" mention; illustrative-results disclaimer below). Professional Suite card body rewrites: Low-Overhead Practice now "Eliminate the fixed overhead of a clinic footprint" (no clinical real estate / front-desk / marketing dept framing); Revenue Protected body rewritten to launch-period payout retention + transparent post-launch fee schedule disclosure. cta-band paragraph rewritten to enterprise-grade infrastructure framing ("EHR, scheduling, credentialed lead flow, payments, supply access, and clinical governance — provided as part of your Regional Lead Provider agreement"). Header CTA shortened from "Apply as Regional Lead Provider →" to "Apply as Provider →" — header-only; long-form preserved at hero primary CTA, cta-band closing button, and modal H2. New @media(min-width:721px) and (max-width:1280px) header flex-wrap fix: `.header{flex-wrap:wrap}` plus nav font-size shrink + header-cta sizing, with dated CSS comment documenting the same flex-item content-overflow regression class as the earlier mobile fixes. "med-spa" / "Med-Spa" replaced with "traditional clinic" / "Traditional Clinic" throughout Phase 3 content per Rule 2 strict interpretation. Two new utility CSS classes documented inline: .governance-grid (2x2 desktop, 1-col mobile, minmax(0,1fr) for grid track-sizing safety) and .economics-table (responsive table with stacked-card mobile layout). Pre-existing 1281+ viewport header overflow flagged as out-of-scope — not introduced or worsened by Phase 3. Patient Experience section subsequently hidden via comment wrap (separate commit 7093234) pending AI simulator capability decision. Phase 4 pending. |
| — | Value Prop Realignment Phase 4 — image asset brief, alt-text hardening, Rule 2 sweep | Complete | 44f79a5 | 2026-05-03 | New repo-root deliverable `ASSET_BRIEF_PHASE4.md` with three full image specifications (Hero / Practice Management / Revenue-Payout) covering paths, dimensions+2x variants, format (WebP+JPG), Rule-10 wardrobe and setting direction, patient demographic, diversity, forbidden elements, and approved alt text — designed so the live swap is a one-line `src` change once assets are produced. Three placeholder images on the homepage (`ATG_in_home.jpg` hero, `WorkingFromHome.png` Low-Overhead card, `TaxMess.png` Revenue-Protected card) flagged as PENDING REPLACEMENT via dated HTML comments referencing the asset brief, with placeholder alt text staged so the swap is alt-stable. Width/height attributes added to every `<img>` site-wide that lacked them, matching actual intrinsic file dimensions (logo 565x571, hero 1024x1024, BeforeAfter 638x467, before_after.jpg 1024x559, ATG_in_home 1024x1024). loading="eager" on hero + header logos; loading="lazy" on all below-the-fold and modal images. Hero `<figcaption>` retained as the fallback caption layer; magazine-card `.mag-card-body` text retained as fallback caption layer for the three card images. og:image (points to `og-image.jpg`, NOT to `ATG_in_home.jpg`) left unchanged with a dated TODO comment instructing the future swap commit to review og-image and twitter:image alignment with the new hero. Site-wide alt-text sweep (22 secondary HTML files): all logo `<img>` alt strings harmonized to "Aesthetics To Go — mobile clinical operating system for licensed providers."; all logo-tagline `<span>` strings rewritten from the Rule-2-forbidden "The Clinical Platform for Mobile PAs" to "The Mobile Clinical Operating System for Licensed Providers."; two image alts containing "PA-C" (about/index.html, careers/index.html) and three containing AI-simulator references (about, careers, providers) rewritten to Rule-10-compliant "Licensed provider" framing; clinical-supplies builder template `_build-detail-pages.js` updated so future regenerations don't reintroduce the forbidden tagline. Three visible "Uber for aesthetic [care/medicine]" gig-economy comparisons (contact x2, faq x1) plus the FAQ chatbot LLM system prompt rewritten to abstracted directive language ("NEVER use any gig-economy, food-delivery, or ride-share analogy"; "NEVER use storefront-clinic terminology"; "NEVER use online-storefront, retail, or e-commerce language") so the directives still constrain the LLM without containing the literal Rule-2 forbidden substrings. Final repo-wide grep confirms zero matches for all Rule 2 strings (PAs tagline, Dedicated Platform, Mobile Injectors tagline, PA Platform, Mid-Level, DoorDash, Uber for aesthetic, like/Similar to how Uber, white-label, $250k, DivaDash variants, marketplace) AND zero matches for PA-C inside `alt=` or `aria-label=` attribute values. Out of scope and explicitly deferred: (a) PA-C in body copy / meta keywords / JSON-LD (Rule 2 limits PA-C to image alt and aria-label only; Rule 1 retains PAs as #3 in the audience hierarchy), (b) "med spa" body sweep on the 22 non-homepage pages (CLAUDE.md deferred items list, policy decision pending), (c) broader Phase 1-3-style value-prop body-copy realignment on /providers /about /careers /blog /contact /faq /terms /privacy /hair-restoration /clinical-supplies pages (separate effort — header strings only were touched in this phase). |

## End-of-prompt rule

After finishing any prompt 2–10: update this file's Status Table (mark Complete, add commit hash and YYYY-MM-DD date), commit CLAUDE.md with the deliverable.

---

## Post-launch tasks (in order)

Prompts 1–10 are complete. The following tasks run in strict sequence — each depends on the previous being complete. Do not run out of order; doing SEO before the catalog is fully populated would require redoing the work after every expansion.

### Task A — Phase 2 SKU Expansion (Peptide Supplements + PRP/PRF + Transdermal Patches + Regenerative Biologics)

Expand the catalog from 10 SKUs to approximately 30 by adding four new categories researched in a separate Claude chat session. The research prompt is stored locally at `C:\Users\quail\Downloads\Phase2_SKU_Research_Prompt.md` (or similar path). Output is a Markdown file at `docs/PHASE2_SKU_CATALOG.md` with SKU-level detail matching the format of `docs/SKU_CATALOG.md`.

**Scope of Task A execution:**

1. Run the Phase 2 research in a fresh Claude chat. Save output to `docs/PHASE2_SKU_CATALOG.md`.
2. Update `clinical-supplies/catalog.js` to add the new SKUs.
3. Regenerate the 10 existing detail pages and create new detail pages for each new SKU using the existing `_build-detail-pages.js` builder template.
4. Update `clinical-supplies/index.html` to display the new category tabs and any new bundles.
5. Update `sitemap.xml` with the new detail-page URLs.
6. Update `robots.txt` if category-specific crawl rules are needed (likely not).
7. For the Regenerative Biologics category (Florida/Utah only), implement geo-gating or explicit UI labeling so providers outside those states understand the restriction. Design decision required at that step.
8. Commit and push. Update Status Table with a new "Task A" row marked Complete.

Ask Claude in chat: "Run Task A from CLAUDE.md — Phase 2 SKU expansion using the research output at docs/PHASE2_SKU_CATALOG.md."

### Task B — Reseller / distributor account setup playbook

Only after Task A is complete and all Phase 2 SKUs are in the catalog. A step-by-step guide for establishing professional wholesale accounts with every manufacturer across the combined catalog, in priority order. The Phase 2 research output from Task A will include a merged priority list combining the original 9 manufacturers with the new Phase 2 manufacturers.

Covered manufacturers include but are not limited to:

1. BENEV — ERC exosome serum
2. SkinCeuticals Professional — CE Ferulic
3. ZO Skin Health Professional — Daily Power Defense
4. Obagi Professional — Professional-C Serum 20%
5. Dr. Pen authorized US distributor — A20, H6 microneedling pens
6. Allergan Aesthetics — required gateway for SkinMedica TNS Advanced+
7. AnteAGE Professional — MDX Exosome Solution
8. Celluma — PRO LED device
9. Dp Dermaceuticals (Dermapenworld) — EXO-SKIN take-home serum
10. Phase 2 additions from Task A research output (peptide supplement brands, PRP/PRF equipment manufacturers, patch brands, ZEO ScientifiX, etc.)

Each entry in the playbook covers: application URL, credentialing requirements, expected approval time, minimum orders, cold-chain logistics if applicable, and any known gotchas (e.g., Allergan gating SkinMedica, ZEO exclusive MOU implications, state-specific restrictions).

Ask Claude in chat: "Task A complete. Give me the complete reseller account setup playbook per Task B in CLAUDE.md."

### Task C — SEO parity sweep for /clinical-supplies/*

Only after Task B is complete and all catalog SKUs are finalized. Bring every new page under `/clinical-supplies/*` up to the same SEO standard as the existing site pages (the ones graded by Albert's SEO evaluation app). Target: preserve the site's 100% SEO score across every new URL.

**Why this is last:** every SKU added in Task A becomes a new URL that needs SEO treatment. Running SEO before Task A completes guarantees redoing the work. Running it after Task B completes ensures it captures every final SKU page with no future rework.

The sweep covers, per page:

- Unique, keyword-aware `<title>` (under 60 chars)
- Unique `<meta name="description">` (140–160 chars)
- Canonical URL via `<link rel="canonical">`
- Open Graph tags: `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:site_name`, `og:locale`
- Twitter card tags: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- JSON-LD structured data appropriate to the page type:
  - `/clinical-supplies/` landing: `OfferCatalog` with every SKU
  - `/clinical-supplies/{slug}/` detail pages: `Product` with offer, brand, category, and `Breadcrumb` linking back to the landing
- Single H1 per page, proper H2/H3 hierarchy
- `alt` text on every image (including placeholder tiles until real imagery is licensed)
- `sitemap.xml` updated with every new URL, proper `lastmod` / `priority` / `changefreq`
- `robots.txt` confirmed to allow crawling of `/clinical-supplies/`
- Internal linking from the homepage, footer, and nav to the new section
- Reasonable `Cache-Control` behavior (static site default is fine — just verify nothing is marked `no-cache` unnecessarily)
- Lighthouse SEO and Best Practices checks clean on every new page
- Re-run Albert's SEO evaluation app against a representative sample (landing + 2–3 detail pages per category). Target 100%.

Ask Claude in chat: "Task B complete. Run the SEO parity sweep per Task C in CLAUDE.md — compare new pages against the existing-site SEO baseline and give me a list of gaps with fixes."

---

## Deferred items (not blocking launch)

- 31 occurrences of "med spa" / "medspa" across non-homepage production pages (about/, blog/, faq/, careers/, las-vegas/, henderson/, summerlin/, boulder-city/). Homepage already cleaned 2026-04-22. Policy decision pending on whether to sweep the rest (replace with "traditional clinic" / "brick-and-mortar practice") or allow contrast-usage against competitors.
