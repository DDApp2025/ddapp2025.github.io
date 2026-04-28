# Geographic Reference Inventory

Inventory date: 2026-04-28
Scope: every git-tracked file under `C:\Users\quail\Documents\ATG-site\`. The `_notes/` directory and `.wrangler/` cache are gitignored and were not scanned.
Search terms: Las Vegas, las vegas, LasVegas, LV, Vegas, Henderson, Summerlin, Boulder City, North Las Vegas, Spring Valley, Enterprise, Paradise, Nevada, NV, Western US, Western United States, the West, valley (geographic context), 891xx/890xx ZIPs, lat/lng, geo.position/ICBM/geo.placename.

**No edits made.** This is an inventory report.

## Summary

- **Files with geographic references: 38**
- **Total occurrences: 416**
- **Geographic ZIP code references (891xx/890xx): 0**
- **Lat/lng or geo.position structured data: 0**
- **City-specific page directories: 4** — `las-vegas/`, `henderson/`, `summerlin/`, `boulder-city/` (each is a single `index.html`)
- **Universal footer pattern** (`<a href="/las-vegas">…</a><a href="/summerlin">…</a><a href="/henderson">…</a><a href="/boulder-city">…</a>`): present on **27** production HTML pages, including all 11 `/clinical-supplies/*` pages and the `_build-detail-pages.js` template.
- **Universal "Markets you wish to serve" form pattern** (4 city checkboxes): present in 9 page modals.

## City Pages (Category 1: hide and redirect)

These four directories are entirely geographic — every section, every meta tag, every JSON-LD block, every CTA references the named city. Recommendation: leave the file in the repo (per master rules), drop from sitemap, drop from footer nav, and add a redirect to `/`.

| Path | File | Match count | Notes |
|---|---|---|---|
| `/las-vegas/` | `las-vegas/index.html` | 49 | Provider-recruitment page targeted at Las Vegas. Title, description, keywords, OG, Twitter, areaServed JSON-LD, hero, all body sections, all stats, all FAQs, application form. |
| `/henderson/` | `henderson/index.html` | 38 | Henderson-targeted recruitment page. Same structure as las-vegas. References "Green Valley" and "Anthem Henderson" neighborhoods. |
| `/summerlin/` | `summerlin/index.html` | 40 | Summerlin-targeted recruitment page. References "The Ridges" neighborhood. |
| `/boulder-city/` | `boulder-city/index.html` | 34 | Boulder City-targeted recruitment page. References "Lake Mead" as nearby landmark. |

**Inbound link concerns:** these four URLs are listed in the universal footer on **every other production page**. They are also indexed in `sitemap.xml` (priority 0.8). Whether external sites link to them is unknown without analytics access — recommend setting up redirects rather than 404s to preserve any external link equity.

## Pages with Visible Geographic Text (Category 2: strip text)

For brevity, the universal footer city-row pattern is treated as a **single global change** — see "Universal Patterns" at the bottom of this section. This table only lists *page-specific* visible text (heroes, top-bars, body copy, FAQ answers, geo pills, stat labels, form options, eyebrows).

### `index.html` (homepage)

| Line | Current text | Suggested replacement |
|---|---|---|
| 608–611 | `<input value="Las Vegas">` / Summerlin / Henderson / Boulder City checkboxes | Replace four-checkbox UI with single free-text "Markets you'd like to serve" field, OR a 50-state dropdown if structured data is needed |

(Homepage body copy itself is geo-clean — only the modal form has city checkboxes.)

### `about/index.html`

| Line | Current text | Suggested replacement |
|---|---|---|
| 313 | `<span>Las Vegas Metro</span>` (feature-strip pill) | Remove the pill entirely; the strip already says "100% Mobile" and "Zero Physical Locations" |
| 523 | `<div class="stat-label">Las Vegas Metro Communities</div>` (paired with stat number "8+") | Replace with neutral metric — e.g., "Founding-provider markets" (stat number "Nationwide") or remove the card |
| 551 | "We currently serve the Las Vegas metropolitan area including Las Vegas, Summerlin, Henderson, Boulder City, North Las Vegas, Spring Valley, Enterprise, and Paradise. The platform is built for scalable expansion to additional markets as we grow our provider network." | "Aesthetics To Go is a nationwide mobile clinical platform. Founding providers are joining across the country as we expand our network." |
| 606–609 | Modal form city checkboxes | Same replacement as homepage |

### `faq/index.html`

| Line | Current text | Suggested replacement |
|---|---|---|
| 423 | "Las Vegas, Summerlin, Henderson, Boulder City, North Las Vegas, Spring Valley, Enterprise, and Paradise. Additional service areas are opening soon." (FAQ answer to "Where do you serve?") | "Aesthetics To Go is a nationwide mobile platform. Provider availability varies by market — sign up to be notified when a provider serves your area." |
| 427 | "All carry malpractice insurance and maintain supervisory agreements as required by Nevada law." | "All carry malpractice insurance and maintain supervisory agreements as required by their state of practice." |
| 568–571 | Modal form city checkboxes | Same replacement as homepage |
| 611 | (FAQ AI assistant system-prompt context) "Currently serving the Las Vegas metropolitan area (Las Vegas, Summerlin, Henderson, Boulder City, North Las Vegas, Spring Valley, Enterprise, Paradise)." | "Aesthetics To Go is a nationwide mobile clinical platform. Provider coverage varies by market." |

### `blog/index.html`

| Line | Current text | Suggested replacement |
|---|---|---|
| 441 | "The first wave of licensed injectors to join ATG in Las Vegas get permanently locked zero platform fees…" | "The first wave of licensed injectors to join ATG nationwide get permanently locked zero platform fees…" |
| 523 | "Opening a traditional med spa in a market like Las Vegas typically requires…" | NOTE: also contains banned term "med spa" (CLAUDE.md hard rule). Rewrite: "Opening a traditional clinic typically requires \$150,000–\$400,000 in upfront capital." |
| 581 | "Priority scheduling territory in Las Vegas." | "Priority scheduling territory." |
| 587 | "Aesthetics To Go is offering the same opportunity to licensed aesthetic providers in Las Vegas right now." | "Aesthetics To Go is offering the same opportunity to licensed aesthetic providers right now." |
| 593 | "Founding providers get first access to their preferred service areas — Summerlin, Henderson, Las Vegas, Boulder City — before…" | "Founding providers get first access to their preferred service areas before the provider network expands." |
| 598 | "Once the Las Vegas cohort is filled…" | "Once the founding cohort is filled…" |
| 637 | "In Nevada, PA-Cs can perform aesthetic injections…" | "In most states, PA-Cs can perform aesthetic injections under a collaborative agreement with a supervising physician — confirm your state's specific scope-of-practice rules." |
| 713 | "appointments across Las Vegas, Henderson, Summerlin, and Boulder City in one day…" | "appointments across a metropolitan area in one day…" |
| 716 | "two appointments in Summerlin on Tuesday afternoon…" / "Tuesday afternoon slots to other Summerlin patients" | Rewrite example with neutral neighborhoods (e.g., "two appointments in one neighborhood…") |
| 790 | "ATG ranks for high-intent search terms like 'mobile Botox Las Vegas,' 'at-home filler Henderson,' and 'concierge aesthetics Summerlin.'" | "ATG ranks for high-intent search terms like 'mobile Botox,' 'at-home filler,' and 'concierge aesthetics.'" |
| 955 | "Founding provider spots in Las Vegas are limited." | "Founding provider spots are limited." |
| 995–998 | Modal form city checkboxes | Same replacement as homepage |

### `careers/index.html`

| Line | Current text | Suggested replacement |
|---|---|---|
| 323 | top-bar: "Now recruiting founding providers · PA-Cs · NPs · MDs · Las Vegas Metro" | "Now recruiting founding providers · PA-Cs · NPs · MDs · Nationwide" |
| 344 | hero-careers-note: "Founding spots are limited · Currently recruiting in Las Vegas, Summerlin, Henderson & Boulder City" | "Founding spots are limited · Now recruiting nationwide" |
| 375 | "deliver concierge Botox, fillers, and hair restoration treatments at patients' homes across the Las Vegas metro." | "…at patients' homes wherever they practice." |
| 666 | (FAQ answer) "actively recruiting founding providers in the Las Vegas metropolitan area — Las Vegas, Summerlin, Henderson, Boulder City, North Las Vegas, Spring Valley, Enterprise, and Paradise." | "Aesthetics To Go is now recruiting founding providers nationwide." |
| 682 | "Be among the first licensed providers to launch on Aesthetics To Go in the Las Vegas metro." | "Be among the first licensed providers to launch on Aesthetics To Go." |
| 725–728 | Modal form city checkboxes | Same replacement as homepage |

### `contact/index.html`

| Line | Current text | Suggested replacement |
|---|---|---|
| 236 | feature-strip pill `<span>Las Vegas Metro</span>` | Remove the pill entirely |
| 364 | "You must hold an active license in the state of Nevada and carry appropriate malpractice insurance." | "You must hold an active license in your state of practice and carry appropriate malpractice insurance." |
| 369 | "This is a limited-time founding provider offer for our Las Vegas launch." | "This is a limited-time founding provider offer for our launch." |
| 426–429 | Modal form city checkboxes | Same replacement as homepage |

### `botox/index.html` (service page)

This page is heavily geo-anchored — body copy, geo pills, FAQ. 34 occurrences.

| Line | Current text | Suggested replacement |
|---|---|---|
| 327 | top-bar provider-preview: "This is the type of patient-facing messaging we will deploy once we launch in Las Vegas." | "This is the type of patient-facing messaging we will deploy once founding providers are activated." |
| 342 | hero-service-eyebrow: "Mobile Botox · Las Vegas Metro" | "Mobile Botox · Nationwide" or just "Mobile Botox" |
| 515 | `<h2 class="geo-title">Mobile Botox Across the Las Vegas Metro</h2>` | "Mobile Botox Where You Are" or remove the entire geo-grid section |
| 517–524 | 8 `<div class="geo-tag">` chips: Las Vegas / Summerlin / Henderson / Boulder City / North Las Vegas / Spring Valley / Enterprise / Paradise | Remove the entire `geo-tags` block — it does not generalize to nationwide language |
| 526 | "Our providers travel to homes and offices throughout the Las Vegas metropolitan area. Additional service areas opening soon." | Remove the entire "Geo" section, or replace with: "Our providers travel to homes and offices throughout their service area." |
| 545 | (FAQ) "All providers carry their own malpractice insurance and maintain supervisory agreements as required by Nevada law." | "…as required by their state's law." |
| 590 | CTA-feature: "✓ Las Vegas, Summerlin, Henderson, Boulder City" | Remove this CTA bullet entirely |
| 598+ | Modal form city checkboxes | Same replacement as homepage |

### `fillers/index.html` (service page) — 32 occurrences

Same structural pattern as botox. Lines 342 (top-bar), 357 (hero eyebrow), 573 (geo-title h2), 575–582 (8 geo-tag chips), 584 (geo-note), 648 (CTA feature), 656+ (modal). Apply same suggested replacements.

| Line | Current text | Suggested replacement |
|---|---|---|
| 342 | top-bar provider-preview line | Same as botox 327 |
| 357 | hero eyebrow "Mobile Dermal Fillers · Las Vegas Metro" | Same as botox 342 |
| 573 | `<h2>Mobile Dermal Fillers Across the Las Vegas Metro</h2>` | "Mobile Dermal Fillers Where You Are" or remove |
| 575–582 | 8 geo-tag chips | Remove entire block |
| 584 | "Our providers travel to homes and offices throughout the Las Vegas metropolitan area." | Same as botox 526 |
| 648 | CTA feature bullet | Same as botox 590 |
| 656+ | Modal form city checkboxes | Same as homepage |

### `hair-restoration/index.html` (service page) — 32 occurrences

Same pattern.

| Line | Current text | Suggested replacement |
|---|---|---|
| 337 | top-bar "Now serving Las Vegas, Summerlin, Henderson & Boulder City · Licensed providers come to you." | "Now serving providers nationwide · Licensed providers come to you." |
| 352 | hero eyebrow "Mobile Hair Restoration · Las Vegas Metro" | "Mobile Hair Restoration · Nationwide" |
| 585 | `<h2>Mobile Hair Restoration Across the Las Vegas Metro</h2>` | "Mobile Hair Restoration Where You Are" or remove |
| 587–594 | 8 geo-tag chips | Remove entire block |
| 596 | "Our providers travel to homes and offices throughout the Las Vegas metropolitan area." | Same as botox 526 |
| 662 | CTA feature bullet | Same as botox 590 |
| 670+ | Modal form city checkboxes | Same as homepage |

### `providers/index.html`

| Line | Current text | Suggested replacement |
|---|---|---|
| 86 | (FAQ JSON-LD) "Can PAs legally do mobile Botox in Nevada?" / answer references Nevada state law | Generalize question/answer to "Can PAs legally do mobile Botox?" / "Yes — PA-Cs can administer Botox and dermal filler injections in most states under a collaborative agreement with a supervising physician. Specific scope of practice varies by state." |
| 298 | hero-provider-secondary: "Limited founding spots · Las Vegas metro" | "Limited founding spots · Nationwide" |
| 588 | CTA: "Be among the first licensed providers to launch on Aesthetics To Go in the Las Vegas metro area." | "Be among the first licensed providers to launch on Aesthetics To Go." |
| 621–624 | Modal form city checkboxes | Same as homepage |

### `ai-simulator/index.html`

| Line | Current text | Suggested replacement |
|---|---|---|
| 322 | hero-sim-secondary: `<span>Available to patients in Las Vegas metro</span>` | "Available to patients nationwide" or remove the span |
| 558 | cta-note: "Available to patients in Las Vegas, Summerlin, Henderson, and Boulder City" | "Available to patients across the country" |

### `providerapplication.html` — flag for review

This is a standalone application form (not in a directory). It does not contain ATG positioning copy — only state/license dropdowns. NV is one option among 7 named states + "Other".

| Line | Current text | Notes |
|---|---|---|
| 154 | `<option value="NV">Nevada</option>` (State of Residence dropdown — NV listed first) | NV is just an option; not positioning. **Flag for review:** should the state dropdown (1) be reordered alphabetically, (2) be expanded to all 50 states, or (3) be left as is since "Other" already covers everywhere? |
| 206 | placeholder `e.g., NV-RN-123456` | License-number placeholder happens to use NV. Could change to `e.g., RN-123456` to be state-neutral. |
| 212 | `<option value="NV">Nevada</option>` (License Issuing State dropdown — NV listed first) | Same as line 154. |
| 433 | "We will verify your license status with the Nevada State Board of Nursing / Medical Examiners." | This is wrong for non-NV applicants. Replace with: "We will verify your license status with the appropriate state board." |

### `index.txt` — legacy text-only file

| Line | Current text | Suggested replacement |
|---|---|---|
| 346–349 | Modal city checkboxes (matches the same pattern as the modal in current pages) | Same replacement as homepage. NOTE: this `index.txt` file may be a stale flat-text version of the homepage — flag for human review whether it is still served or can be deleted. |

### `llms.txt`

| Line | Current text | Suggested replacement |
|---|---|---|
| 15 | `- Launching in Las Vegas, NV metro area` (under "Key Facts") | `- Nationwide mobile platform` |

## Metadata with Geographic References (Category 3: update)

### `index.html`

| Line | Type | Current value | Suggested replacement |
|---|---|---|---|
| 38 | meta keywords | "mobile Botox Las Vegas, … Botox at home Henderson, concierge fillers Summerlin" | "mobile Botox, at-home Botox, concierge aesthetic care, PA aesthetic platform, mobile aesthetic practice, mobile EHR aesthetics, Botox house call, mobile filler injections, PA-C concierge practice, mobile aesthetic provider" |
| 93–96 | JSON-LD areaServed | 4 City entries (Las Vegas/Henderson/Summerlin/Boulder City, NV) | Replace with: `"areaServed": "United States"` (or omit areaServed entirely; Schema.org allows omission for nationwide-scope organizations) |
| 126, 129 | JSON-LD FAQ "Can I get Botox at home in Las Vegas?" | Question + answer reference Las Vegas / Summerlin / Henderson / Boulder City | Generalize: "Can I get Botox at home?" / "Yes. Aesthetics To Go connects patients with licensed credentialed aesthetic providers who deliver Botox, dermal fillers, and other treatments at your home or office. Provider availability varies by market." |

### `about/index.html`

| Line | Type | Current value | Suggested replacement |
|---|---|---|---|
| 37 | meta description | "…HIPAA compliance, zero platform fees for founding providers. Serving Las Vegas metro." | Replace ending with "Serving providers nationwide." |
| 55 | twitter:description | "…The mobile-first platform powering concierge aesthetic care across Las Vegas." | "…powering concierge aesthetic care nationwide." |
| 82–85 | JSON-LD areaServed | 4 City entries | Same as `index.html` 93–96 |
| 137 | JSON-LD FAQ "Where does Aesthetics To Go operate?" answer | "currently serves the Las Vegas metropolitan area including Las Vegas, Summerlin, Henderson, Boulder City, North Las Vegas, Spring Valley, Enterprise, and Paradise." | "Aesthetics To Go is a nationwide mobile platform. Provider availability varies by market." |

### `faq/index.html`

| Line | Type | Current value | Suggested replacement |
|---|---|---|---|
| 37 | meta description | "…AI assistant anything about the platform, services, mobile apps, safety, and pricing." (currently includes "at your home in Las Vegas") | Strip "in Las Vegas" |
| 38 | meta keywords | "…concierge Botox FAQ Las Vegas…" | Strip "Las Vegas" |
| 80 | JSON-LD FAQ Q1 answer "Currently serving the Las Vegas metropolitan area." | (within long line — the FAQ JSON-LD answer to "What is Aesthetics To Go?") | Replace ending with "A nationwide mobile clinical platform." |
| 85 | JSON-LD FAQ "Can I get Botox at home in Las Vegas?" Q+A | (4-city list in answer) | Same generalization as `index.html` 126/129 |
| 104 | JSON-LD answer "as required by Nevada state law" | | "as required by their state's law" |
| 168 | JSON-LD FAQ "Where does Aesthetics To Go operate?" answer | (8-city list) | Same as about/index.html 137 |

### `blog/index.html`

| Line | Type | Current value | Suggested replacement |
|---|---|---|---|
| 55 | twitter:description | "Practice-building resources for aesthetic providers — economics, technology, compliance, and founding provider opportunities. Las Vegas metro." | Replace ending with "Nationwide." or remove the trailing geo. |
| 112 | JSON-LD article description | "early-market advantage in Las Vegas." | "early-market advantage." |
| 220 | JSON-LD FAQ answer | "Founding providers are the first wave of licensed injectors to join ATG in Las Vegas." | "…to join ATG nationwide." |

### `careers/index.html`

| Line | Type | Current value | Suggested replacement |
|---|---|---|---|
| 37 | meta description | "…Now recruiting in Las Vegas metro." | "Now recruiting nationwide." |
| 38 | meta keywords | "aesthetic provider jobs Las Vegas, … aesthetic injector jobs Nevada, …, MD aesthetic provider Las Vegas, founding provider opportunity" | Strip city/state names; keep role-based keywords. |
| 47 | og:description | "…full mobile EHR, AI diagnostics, wholesale supply pricing. Las Vegas metro." | "…wholesale supply pricing. Nationwide." |
| 55 | twitter:description | "Founding provider spots now open in Las Vegas." | "Founding provider spots now open nationwide." |
| 90–91 | JSON-LD addressLocality / addressRegion | "Las Vegas" / "NV" | **Flag for review:** the legal entity address (Infotech Inc. NV) is required for legal/contact accuracy. Recommend keeping but moving outside provider-facing positioning, or using `address` only on Privacy/Terms/Contact — not the careers JSON-LD. |
| 148 | JSON-LD FAQ answer | (8-city Las Vegas metro list) | Same as about 137 |

### `contact/index.html`

| Line | Type | Current value | Suggested replacement |
|---|---|---|---|
| 39 | meta description | "Founding provider spots now open in Las Vegas for PA-Cs, NPs, and MDs." | "Founding provider spots now open nationwide for PA-Cs, NPs, and MDs." |
| 40 | meta keywords | "PA-C mobile practice Las Vegas, … partnership aesthetics Las Vegas" | Strip city/state names. |
| 48 | og:description | "Founding provider spots now open in Las Vegas." | "Founding provider spots now open nationwide." |
| 56 | twitter:description | "Founding provider spots now open in Las Vegas." | Same. |

### `botox/index.html`, `fillers/index.html`, `hair-restoration/index.html` (3 service pages)

Each page has the **same metadata structure**, all heavily geo-anchored:

- `<title>` mentions Las Vegas / Summerlin / Henderson
- `<meta name="description">` lists 4 cities
- `<meta name="keywords">` lists ~12 city/state keyword phrases
- `og:title`, `og:description`, `twitter:title`, `twitter:description` all reference Las Vegas
- JSON-LD `MedicalService` description lists 4 cities
- JSON-LD `MedicalBusiness` `areaServed` = 8 City entries (Las Vegas, Henderson, Summerlin, Boulder City, North Las Vegas, Spring Valley, Enterprise, Paradise)
- JSON-LD FAQ Q1 ("Can I get [service] at home in Las Vegas?") + answer

**Suggested rewrite pattern (apply to all three):**

| Type | Pattern |
|---|---|
| `<title>` | `Mobile [Service] at Home | Aesthetics To Go` (drop city list) |
| `meta description` | "Get [service] at home from a licensed PA-C or NP. Concierge [service] delivered to your home or office. AI visualization, HIPAA-compliant care, no clinic visit needed." |
| `meta keywords` | Strip city names; retain role/service keywords. |
| `og:title` / `og:description` | Drop "Las Vegas" / city lists; replace with "Nationwide" or simply omit geographic claim. |
| `twitter:title` / `twitter:description` | Same. |
| JSON-LD `MedicalService.description` | "Concierge [service] treatments delivered by a licensed PA-C, NP, or MD at your home or office. Includes AI-powered before-and-after visualization and HIPAA-compliant documentation." |
| JSON-LD `MedicalBusiness.areaServed` | Replace 8-city array with `"areaServed": "United States"` or omit. |
| JSON-LD `FAQPage` Q1 | Drop the city qualifier from question; generalize answer. |

### `ai-simulator/index.html`

| Line | Type | Current value | Suggested replacement |
|---|---|---|---|
| 41 | meta description | "Available to patients in Las Vegas, Summerlin, Henderson, and Boulder City." | "Available to patients nationwide." |
| 42 | meta keywords | "Botox preview Las Vegas, …" | Strip city. |

### `providers/index.html`

| Line | Type | Current value | Suggested replacement |
|---|---|---|---|
| 38 | meta keywords | "mobile Botox Las Vegas, aesthetic PA independent practice" | Strip city. |
| 86, 89 | JSON-LD FAQ Q+A about Nevada-specific law | | Generalize as in `faq/` 104 |

## sitemap.xml entries to remove

| Line range | URL | Action |
|---|---|---|
| 33–38 | `https://aestheticstogo.com/las-vegas/` | Remove |
| 39–44 | `https://aestheticstogo.com/summerlin/` | Remove |
| 45–50 | `https://aestheticstogo.com/henderson/` | Remove |
| 51–56 | `https://aestheticstogo.com/boulder-city/` | Remove |

(Other sitemap entries reference the cities only via the URL — no in-body geographic copy in sitemap.xml beyond these four.)

## Universal Patterns (apply globally)

### Pattern 1 — Footer city-row (27 production HTML files + 1 JS template)

Every production HTML page (homepage, all service pages, all 11 `/clinical-supplies/*` pages, all 4 city pages themselves, about, blog, careers, contact, faq, ai-simulator, privacy, terms, providers) has this footer row:

```html
<div class="footer-row"><a href="/las-vegas">Las Vegas</a><a href="/summerlin">Summerlin</a><a href="/henderson">Henderson</a><a href="/boulder-city">Boulder City</a><a href="/terms">Terms</a><a href="/privacy">Privacy</a></div>
```

The same pattern is also embedded in the page-builder template `clinical-supplies/_build-detail-pages.js` line 345.

**Suggested replacement (apply globally as a single string-replace):**

```html
<div class="footer-row"><a href="/terms">Terms</a><a href="/privacy">Privacy</a></div>
```

(Drop the four city links; keep Terms/Privacy. Footer height shrinks slightly — no other layout impact.)

**Files affected by this pattern (verified by grep):**
- All 4 city pages (`las-vegas/`, `henderson/`, `summerlin/`, `boulder-city/`) — but these become hidden anyway
- All 11 `/clinical-supplies/*` pages
- `index.html`, `about/index.html`, `blog/index.html`, `careers/index.html`, `contact/index.html`, `faq/index.html`, `ai-simulator/index.html`, `botox/index.html`, `fillers/index.html`, `hair-restoration/index.html`, `privacy/index.html`, `providers/index.html`, `terms/index.html`
- `clinical-supplies/_build-detail-pages.js` (template — must update so future page builds inherit the fix)

### Pattern 2 — Modal form "Markets you wish to serve" city checkboxes (9 pages + 4 legacy + 1 .txt)

Pattern:
```html
<label><input type="checkbox" name="city[]" value="Las Vegas"> Las Vegas</label>
<label><input type="checkbox" name="city[]" value="Summerlin"> Summerlin</label>
<label><input type="checkbox" name="city[]" value="Henderson"> Henderson</label>
<label><input type="checkbox" name="city[]" value="Boulder City"> Boulder City</label>
```

Plus an "Other" checkbox + free-text "specify other city" field.

Found in: `index.html`, `about/index.html`, `blog/index.html`, `careers/index.html`, `contact/index.html`, `faq/index.html`, `botox/index.html`, `providers/index.html`, `index.txt`, plus 3 legacy `index_*.html` files.

**Suggested replacement:** replace the four-checkbox UI with a free-text input field labeled "Markets you'd like to serve" or "Your city/state". This avoids both the geography-narrow UX and the awkward "Other → specify" two-step.

## Files to KEEP unchanged (legitimate Nevada/Las Vegas references)

| File | Lines | Reason |
|---|---|---|
| `privacy/index.html` | 329, 414 | "Medical records must be retained for a minimum of five (5) years from the date of the last treatment" in Nevada — this is operationally accurate (ATG legal entity is in Nevada). KEEP. Per master rules: "keep the actual ATG corporate address (Nevada, where Infotech Inc. is incorporated) where required for legal/contact purposes." |
| `terms/index.html` | 267–268, 372–373 | "Nevada Governing Law" + "Clark County, Nevada" jurisdiction clauses — required legal language. KEEP. |
| `docs/PHASE2_SKU_CATALOG_PART3.md` | 13, 23 | "Nevada has had parallel language on the books longer" / "Texas and Nevada are candidates to broaden their existing statutes" — these are regulatory analysis statements about state stem-cell laws (not ATG positioning). KEEP. |

## Stragglers / unclear cases — flag for human review

1. **`providerapplication.html` state dropdowns (lines 154, 212).** NV is one option among 7 states + "Other". Three judgment calls:
   - Should NV be reordered alphabetically? (currently listed first as a Vegas-launch artifact)
   - Should the dropdown be expanded to all 50 states?
   - Should the placeholder `e.g., NV-RN-123456` (line 206) be changed to a state-neutral example?
   - Should line 433 ("verify your license status with the Nevada State Board of Nursing / Medical Examiners") be generalized?
   - **Recommendation:** apply all four small fixes — they are aesthetic, not structural.

2. **Legacy `index_*.html` files at root** (`index_2026_01_26_1529.html`, `index_2026_01_28_1633.html`, `index_enhanced.html`, `index_WORKS GOOD_2026_02_12.html`). All four are git-tracked, served by GitHub Pages if hit directly, and contain the city-checkbox modal pattern. They are not linked from any current navigation but indexable if Google ever discovers them.
   - **Recommendation:** ask user whether to (a) delete them, (b) leave the geo refs since the files are unmaintained, or (c) apply the same modal cleanup. The least-risk path is (a) — they appear to be local-archive snapshots that should never have been committed. Defer the decision to the user; do NOT touch in Prompt 3.

3. **`index.txt` and `index.pdf` at root.** Both are git-tracked; `index.txt` is 27KB of plaintext, `index.pdf` is ~4MB. Likely AI-crawler artifacts (the `llms.txt` cousin file). The `.txt` contains the city-checkbox pattern at lines 346–349. The `.pdf` was not searched (binary).
   - **Recommendation:** confirm what these files exist for, then either update or delete.

4. **`docs/DESIGN_TOKENS.md` lines 582, 599, 605, 606, 609.** This is a Prompt 1 audit document describing the *as-of-2026-04-21* page structure (e.g., "MedicalBusiness with areaServed for Las Vegas/Henderson/Summerlin/Boulder City"). It is internal documentation, not user-facing.
   - **Recommendation:** leave untouched until Prompt 5; once edits are done, update this doc as part of the closeout to keep the audit accurate. Or accept the snapshot is dated and do nothing.

5. **`clinical-supplies/_build-detail-pages.js` line 345.** This is the page-builder template that *generates* the 11 product detail pages. The footer city-row is hard-coded into the template. If the template is not updated, any future regeneration of detail pages will reintroduce the city links.
   - **Recommendation:** update the template alongside the static pages in Prompt 2.

6. **No "valley" matches in geographic context** were found outside `Spring Valley` and `Green Valley` (Henderson neighborhood mentioned only inside the city pages themselves). No metaphorical "the valley" usage detected.

7. **No `Western US`, `Western United States`, or `the West` matches** in the entire codebase. These were searched and returned zero hits — good.

8. **No 891xx/890xx ZIP codes, no lat/lng, no `geo.position` / `geo.placename` / `ICBM` meta tags.** Already absent — no work needed.

## Inbound link concerns

- The four city URLs (`/las-vegas/`, `/henderson/`, `/summerlin/`, `/boulder-city/`) have been in the sitemap with `priority=0.8` and `lastmod=2026-03-20`, meaning they were submitted to Google for indexing. Recommend **301 redirects to `/`** rather than 404s when Prompt 2 hides them, to preserve any external link equity. (GitHub Pages does not natively support per-path redirects in `_redirects`-style configs — the practical mechanism is a refresh-meta or JS redirect on the page itself. The page files stay in repo per master rules; just replace their content with a redirect.)
- No analytics access from this session — actual referrer data is unknown.

## Approximate scope for Prompts 2–5

| Prompt | Files touched (estimate) | Notes |
|---|---|---|
| 2 — Hide city pages | 4 city pages (rewrite to redirect), `sitemap.xml`, every page's footer row (28 files including `_build-detail-pages.js`), 9 pages with city-checkbox modals | High-volume but mostly mechanical (universal pattern replaces) |
| 3 — Edit visible text | ~14 production HTML files: about, faq, blog, careers, contact, botox, fillers, hair-restoration, providers, ai-simulator, providerapplication, index, llms.txt | Per-page judgment calls; tables above provide line-by-line guidance |
| 4 — Update metadata | Same 14 files; titles/descriptions/keywords/OG/Twitter/JSON-LD | Significant; need to preserve SEO score |
| 5 — QA verification | Re-grep, confirm no stragglers, commit | Should be clean if 2–4 are thorough |
