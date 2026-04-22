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

Launching ATG Clinical Supply: a soft-gated catalog of exosomes, post-procedure devices, and skincare actives at injector pricing. Sub-brand inside aestheticstogo.com. Also rewriting homepage hero to position ATG as one clinical platform: EHR + AI Simulator + Clinical Supply.

## Hard rules — never violate

- Never use: marketplace, med spa, DoorDash, store, shop.
- Never use: DivaDash, Diva-Dash, Diva Dash. Former brand. Aesthetics To Go only.
- Never reference: Kelly Wellington, Dr. Deborah Kessler-Hudak, Princess.
- Never reference specific revenue split percentages. Use "industry-leading".
- Never compare ATG to DoorDash. Use Uber if needed.
- Always provide complete files when editing code, not snippets.

## Scope

- Three product categories only: Exosomes, Post-Procedure Devices, Skincare Actives. No commodity consumables.
- Nav label for the new section: "Clinical Supply".
- URL: `/clinical-supplies`.
- Soft email gate (regex + disposable blocklist client-side, MX check via Cloudflare Worker calling Abstract API).
- Stripe Payment Links for checkout. No server-side cart. Client-side cart in localStorage.
- Email capture: on successful unlock, POST notification email to info@aestheticstogo.com via Brevo transactional API. No spreadsheet logging.

## Status Table

| # | Prompt | Status | Commit | Date | Deliverable |
|---|--------|--------|--------|------|-------------|
| 1 | Audit + design tokens | Complete | 467d499 | 2026-04-21 | docs/DESIGN_TOKENS.md |
| 2 | Rewrite homepage hero | Complete | [see git log] | 2026-04-21 | index.html |
| 3 | SKU research | Complete | [see git log] | 2026-04-21 | docs/SKU_CATALOG.md |
| 4 | /clinical-supplies landing | Complete | [see git log] | 2026-04-21 | clinical-supplies/index.html |
| 5 | Product detail template | Pending | — | — | clinical-supplies/{slug}/*.html |
| 6 | Soft email gate + Worker | Complete | [see git log] | 2026-04-22 | clinical-supplies/gate.js, workers/email-verify/ |
| 7 | Cart + Stripe router | Pending | — | — | cart.js, cart.css |
| 8 | Homepage Clinical Supply section | Pending | — | — | index.html |
| 9 | Global nav/footer/sitemap | Pending | — | — | multiple files |
| 10 | QA report | Pending | — | — | docs/QA_REPORT.md |

## End-of-prompt rule

After finishing any prompt 2–10: update this file's Status Table (mark Complete, add commit hash and YYYY-MM-DD date), commit CLAUDE.md with the deliverable.

## Post-launch tasks (in order, after Prompt 10 passes)

### Task A — SEO parity sweep for /clinical-supplies/*

Before anything else post-launch, bring every new page under `/clinical-supplies/*` up to the same SEO standard as the existing site pages (the ones graded by Albert's SEO evaluation app). Target: preserve the site's 100% SEO score across every new URL.

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
- Re-run Albert's SEO evaluation app against a representative sample (landing + 2–3 detail pages). Target 100%.

Ask Claude in chat: "Prompt 10 QA passed. Run the SEO parity sweep per Task A in CLAUDE.md — compare new pages against the existing-site SEO baseline and give me a list of gaps with fixes."

### Task B — Reseller / distributor account setup playbook

Only after Task A passes. A step-by-step guide for establishing professional wholesale accounts with every manufacturer in the SKU catalog, in priority order. Needed ASAP after launch so TODO_STRIPE_LINK placeholders can be replaced with real Payment Links and real injector prices. Required accounts:

1. BENEV (benev.com or medpurchasing.com) — ERC exosome serum
2. SkinCeuticals Professional — CE Ferulic
3. ZO Skin Health Professional — Daily Power Defense
4. Obagi Professional — Professional-C Serum 20%
5. Dr. Pen authorized US distributor — A20, H6 microneedling pens
6. Allergan Aesthetics — required gateway for SkinMedica TNS Advanced+ (confirm existing account status)
7. AnteAGE Professional — MDX Exosome Solution
8. Celluma — PRO LED device
9. Dp Dermaceuticals (Dermapenworld) — EXO-SKIN take-home serum

Each entry in the playbook should cover: application URL, credentialing requirements, expected approval time, minimum orders, cold-chain logistics if applicable, and any known gotchas (e.g., Allergan gating SkinMedica).

Ask Claude in chat: "Task A passed. Give me the complete reseller account setup playbook per Task B in CLAUDE.md."
