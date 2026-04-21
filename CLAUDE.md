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

## Status Table

| # | Prompt | Status | Commit | Date | Deliverable |
|---|--------|--------|--------|------|-------------|
| 1 | Audit + design tokens | Complete | 467d499 | 2026-04-21 | docs/DESIGN_TOKENS.md |
| 2 | Rewrite homepage hero | Complete | [fill in after push] | 2026-04-21 | index.html |
| 3 | SKU research | Complete | [fill in after push] | 2026-04-21 | docs/SKU_CATALOG.md |
| 4 | /clinical-supplies landing | Complete | [fill in after push] | 2026-04-21 | clinical-supplies/index.html |
| 5 | Product detail template | Pending | — | — | clinical-supplies/{slug}/*.html |
| 6 | Soft email gate + Worker | Pending | — | — | gate.js, workers/email-verify/ |
| 7 | Cart + Stripe router | Pending | — | — | cart.js, cart.css |
| 8 | Homepage Clinical Supply section | Pending | — | — | index.html |
| 9 | Global nav/footer/sitemap | Pending | — | — | multiple files |
| 10 | QA report | Pending | — | — | docs/QA_REPORT.md |

## End-of-prompt rule

After finishing any prompt 2–10: update this file's Status Table (mark Complete, add commit hash and YYYY-MM-DD date), commit CLAUDE.md with the deliverable.
