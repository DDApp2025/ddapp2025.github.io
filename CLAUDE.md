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

Launching ATG Clinical Supplies: a soft-gated catalog of exosomes, post-procedure devices, skincare actives, peptide supplements, PRP/PRF procedural equipment, transdermal peptide patches, and regenerative biologics (Florida/Utah where applicable) at injector pricing. Sub-brand inside aestheticstogo.com. Positions ATG as one clinical platform: EHR + AI Simulator + Clinical Supplies.

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
