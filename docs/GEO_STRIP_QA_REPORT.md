# Geographic Strip QA Report

**Date:** 2026-04-28
**Scope:** Site-wide geographic-positioning strip. Aesthetics To Go repositioned from "Las Vegas metro" to "nationwide mobile clinical platform."

## Summary

| Metric | Count |
|---|---|
| Files modified in geographic-strip commit | 37 |
| Total insertions | 321 lines |
| Total deletions | 3,878 lines |
| Net change | −3,557 lines |
| Geographic references removed (per inventory: 416 occurrences across 38 files) | ~410+ |
| City pages hidden and redirected | 4 (las-vegas, henderson, summerlin, boulder-city) |
| Legacy index files hidden and redirected | 4 (index_2026_01_26_1529, index_2026_01_28_1633, index_enhanced, index_WORKS GOOD_2026_02_12) |
| Plaintext snapshots cleaned of geo content | 2 (index.txt, providerapplication.txt) |
| Stale binary deleted | 1 (index.pdf) |
| Production HTML pages with body/metadata copy stripped | 11 (index, about, ai-simulator, blog, botox, careers, contact, faq, fillers, hair-restoration, providers) |
| Form-modal city-checkbox UI replaced with freeform text input | 7 production pages |
| Schema.org type substitution (LocalBusiness implication) | 1 (`MedicalBusiness` → `MedicalOrganization` on `index.html`) |
| State dropdowns expanded to 50-state alphabetical | 2 (both in `providerapplication.html`) |

## Re-grep results

All searches scoped to the entire repository. Internal documentation (`docs/GEO_STRIP_INVENTORY.md`, `docs/DESIGN_TOKENS.md`, `docs/PHASE2_SKU_CATALOG_PART3.md`, `docs/QA_REPORT.md`) is excluded from "production" counts but listed where relevant.

| Search term | Production HTML hits | Production non-HTML hits | Internal docs hits | Classification |
|---|---|---|---|---|
| `Las Vegas` | 0 | 0 | 2 (`GEO_STRIP_INVENTORY.md`, `DESIGN_TOKENS.md`) | Internal audit snapshots only — intentional |
| `las vegas` (case-insensitive distinct) | 0 | 0 | (covered above) | Clean |
| `LasVegas` | 0 | 0 | 0 | Clean |
| `Vegas` (word-boundary) | 0 | 0 | 2 (inventory + design tokens) | Internal docs only |
| `LV` (word-boundary) | 0 | 0 | 0 | Clean |
| `Henderson` | 0 | 0 | 2 (inventory + design tokens) | Internal docs only |
| `Summerlin` | 0 | 0 | 2 (inventory + design tokens) | Internal docs only |
| `Boulder City` | 0 | 0 | 1 (inventory) | Internal docs only |
| `North Las Vegas` | 0 | 0 | 1 (inventory) | Internal docs only |
| `Spring Valley` | 0 | 0 | 1 (inventory) | Internal docs only |
| `Enterprise` (geographic context) | 0 | 0 | 1 (inventory) | Internal docs only |
| `Paradise` (geographic context) | 0 | 0 | 1 (inventory) | Internal docs only |
| `Western US` / `Western United States` / `the West` | 0 | 0 | 1 (inventory: "no occurrences found in production code at audit time") | Audit-statement — intentional |
| `valley` (case-insensitive, all uses) | 0 | 0 | 1 (inventory) | Internal docs only |
| `Nevada` | 2 (`terms/`, `privacy/` — legal jurisdiction language) | 1 (`providerapplication.html` × 2 as 50-state-dropdown options) | 4 (inventory, design tokens, Phase 2 SKU catalog regulatory analysis) | All intentional — see "Intentional retentions" |
| `\b89[01]\d{2}\b` (Nevada ZIP prefix 891xx / 890xx) | 0 | 0 | 0 | Clean — never present |
| `MedicalBusiness` / `LocalBusiness` / `MedicalClinic` schema types | 0 | 0 | 1 (inventory describing prior state) | Clean — substituted with `MedicalOrganization` |
| `addressLocality` / `addressRegion` / `GeoCoordinates` / `GeoCircle` / `latitude` / `longitude` | 0 | 0 | 0 | Clean |
| `value="Las Vegas"` (city-checkbox form value) | 0 | 0 | 1 (inventory) | Internal docs only |
| `<div class="geo-tag">Las Vegas</div>` (service-page geo-tag chips) | 0 | 0 | 1 (inventory) | Internal docs only |
| `<a href="/las-vegas">…</a>` (footer city-row pattern) | 0 | 0 | 1 (inventory) | Internal docs only |
| `meta http-equiv="refresh"` (redirect-stub indicator) | 8 | 0 | 0 | Expected: 4 city pages + 4 legacy index snapshots |

## Sample page verification

| Check | Pages verified | Status |
|---|---|---|
| Nav has no city links | `index.html`, `about/`, `faq/`, `careers/`, `blog/` | ✓ — no city link anywhere in navigation HTML site-wide |
| Footer row no longer contains `/las-vegas`, `/summerlin`, `/henderson`, `/boulder-city` | All 25 production HTML pages with footer | ✓ — confirmed via grep `/las-vegas\|/summerlin\|/henderson\|/boulder-city` (zero hits in any HTML; only in inventory doc) |
| 4 city pages have meta-refresh + canonical + JS-redirect | `las-vegas/`, `henderson/`, `summerlin/`, `boulder-city/` | ✓ — all 4 stubs include `<meta http-equiv="refresh" content="0; url=https://aestheticstogo.com/">`, `<link rel="canonical" href="https://aestheticstogo.com/">`, `<meta name="robots" content="noindex,follow">`, and `<script>window.location.replace(...)</script>` |
| 4 legacy index snapshots have meta-refresh + canonical + JS-redirect | `index_2026_01_26_1529.html`, `index_2026_01_28_1633.html`, `index_enhanced.html`, `index_WORKS GOOD_2026_02_12.html` | ✓ — all 4 use the identical redirect-stub template |
| Historical comment in redirect stubs | All 8 stubs | ⚠ — redirect stubs are minimal (10–15 lines) and do not carry an inline historical comment. The historical context lives in `docs/GEO_STRIP_INVENTORY.md` and this report. If a per-stub comment is wanted, flag for follow-up. |
| `<title>`, `<meta name="description">`, `og:title`, `og:description` updated with no geographic claims | `index.html`, `about/index.html`, `botox/index.html` (sample of 3) | ✓ — verified line-by-line: title, description, og:title, og:description, twitter:title, twitter:description all reposition to nationwide language |
| JSON-LD structured data updated correctly | `index.html` (MedicalOrganization), `botox/index.html` (Service.areaServed = "United States"), `careers/index.html` (JobPosting jobLocation block removed; `applicantLocationRequirements: US` retained) | ✓ — verified |
| No `LocalBusiness` / `MedicalBusiness` / `MedicalClinic` schemas remain | Whole repo grep | ✓ — zero hits |
| `clinical-supplies/_build-detail-pages.js` no longer has city footer row | Builder template | ✓ — grep for city refs in builder = 0 hits |
| 10 regenerated `clinical-supplies/{slug}/` detail pages do not have city footer row | All 10 detail pages | ✓ — grep for city refs in `clinical-supplies/**/*.html` = 0 hits |
| `providerapplication.html` has 50-state alphabetical dropdowns | Both `<select id="state">` and `<select id="licenseState">` | ✓ — both expanded from 7-state-NV-first to full 50-state alphabetical with 2-letter ISO codes; `Select your state...` placeholder; no "Other" option |
| `providerapplication.html` license placeholder neutral | `<input id="licenseNumber">` | ✓ — `placeholder="License Number"` (was `e.g., NV-RN-123456`) |
| `providerapplication.html` licensing-board copy generic | License-verification paragraph | ✓ — "appropriate state licensing board" (was "Nevada State Board of Nursing / Medical Examiners") |
| `sitemap.xml` has zero city URLs and zero legacy index URLs | `sitemap.xml` | ✓ — verified in Prompt 2 task #2; subsequent grep `/las-vegas\|/summerlin\|/henderson\|/boulder-city` against `sitemap.xml` returns 0 hits |
| `robots.txt` has no city-specific directives | `robots.txt` | ✓ — file is generic User-agent/Allow rules + AI-crawler section + Sitemap pointer; no city entries |

## Intentional retentions

The following geographic references are deliberately preserved and verified correct.

1. **`terms/index.html`** — "Nevada Governing Law" + "Clark County, Nevada" jurisdiction clauses (lines 267–268, 372–373). Required legal language tied to the Nevada-incorporated legal entity (Infotech Inc.). Per master rules and CLAUDE.md hard rules: KEEP.

2. **`privacy/index.html`** — "Medical records must be retained for a minimum of five (5) years from the date of the last treatment in Nevada" (lines 329, 414). Required HIPAA/state retention disclosure for the Nevada-incorporated legal entity. Per master rules: KEEP.

3. **`docs/PHASE2_SKU_CATALOG_PART3.md`** (lines 13, 23) — "Nevada has had parallel language on the books longer" / "Texas and Nevada are candidates to broaden their existing statutes." This is regulatory analysis of state stem-cell laws (Phase 2 SKU research), not ATG positioning. Per inventory KEEP list.

4. **`docs/GEO_STRIP_INVENTORY.md`** — Original geographic inventory document. Records the pre-strip state of the codebase. Internal audit snapshot; not user-facing. Preserved for historical reference.

5. **`docs/DESIGN_TOKENS.md`** — Prompt 1 design audit. Lines 582, 599, 605, 606, 609 reference the as-of-2026-04-21 site structure (e.g., "MedicalBusiness with areaServed for Las Vegas/Henderson/Summerlin/Boulder City"). Internal documentation, not user-facing. Header note added at top of file flagging it as a dated snapshot; document body preserved unchanged for historical accuracy. See header note for pointer to this report.

6. **`providerapplication.html`** — `<option value="NV">Nevada</option>` × 2. These are list entries within full alphabetical 50-state dropdowns. Nevada is one of fifty equally-listed options. Not positioning; correct.

7. **`docs/QA_REPORT.md`** — Pre-existing Clinical Supplies QA report. Unrelated to geographic strip; left untouched.

## Open issues

1. **BreadcrumbList `item` URL trailing-slash inconsistency** in `privacy/index.html` (`…/privacy`) and `terms/index.html` (`…/terms`) versus their canonical URLs (which end with trailing slash). Out of scope for the geographic strip — flagged for awareness only. Google Schema.org accepts both forms.

2. **`med spa` / `medspa` deferred items** — CLAUDE.md "Deferred items" section flags ~31 occurrences of "med spa" / "medspa" across non-homepage production pages. Policy decision pending on whether to sweep them all (replace with "traditional clinic" / "brick-and-mortar practice") or allow contrast-usage against competitors. **Two such occurrences were incidentally cleaned during this geographic strip** because they appeared in the same sentence as a geographic claim that needed rewriting (`blog/index.html` L523 and `faq/index.html` L603); the remaining occurrences are untouched and still need a policy decision before full sweep.

3. **Per-stub historical comment** — Redirect stubs (4 city + 4 legacy snapshot pages) currently have only the technical machinery (meta-refresh, canonical, JS redirect, body link). They do not carry an inline HTML comment explaining the historical context of the redirect. If a per-page note is desired, flag for follow-up. The historical context is documented in `docs/GEO_STRIP_INVENTORY.md` and in this QA report.

4. **`docs/QA_REPORT.md` Prompt 10 references** — The pre-existing Clinical Supplies QA report references the old footer pattern in passing. Out of scope; left untouched. No production impact.
