# AI Simulator Hide Inventory

Generated 2026-04-28. No edits made — inventory only. Drives Prompts 2–4 of the AI Simulator hide sweep.

## Summary

- Total files with AI Simulator references (production + internal): **17**
- Production-facing files needing edits in Prompts 2–3: **12** (HTML pages + sitemap + llms.txt)
- Internal docs with references (out of scope, flagged for review): **5**
- Total occurrences of AI Simulator phrases across all files: **154**
- Total production-facing occurrences: **146**

Note: counts above use phrase patterns (`AI Simulator`, `AI Diagnostic Simulator`, `AI procedure simulator`, `AI diagnostic simulator`, `visual mapping`, `before-and-after visualization`). The sitemap.xml `/ai-simulator/` URL entry is tracked separately under "Sitemap and llms.txt" below.

## /ai-simulator/ directory contents

| File | Size | Notes |
|------|------|-------|
| `ai-simulator/index.html` | 41,654 bytes / 630 lines | Full simulator landing page. Convert to redirect stub in Prompt 3 (do not delete). |
| `ai-simulator/atg_logo_white_bkg.jpg` | 79,901 bytes | Logo image. Leave in place; orphaned after redirect but harmless. |

## Homepage references (`index.html`)

19 occurrences. Distinguished by category below.

### (a) Right-side AI Simulator card — REPLACE in Prompt 2

Lines **335–350**: the entire `<div class="hero-media">` block (the cream-background container with the eyebrow, heading, video, caption, and pill).

```
335:    <div class="hero-media">
336:      <div class="hero-card">
337:        <div class="hero-card-label">AI Diagnostic Simulator</div>
338:        <div class="hero-card-title">Enhance your consultation with precision.</div>
339:        <div class="video-wrapper">
340:          <video id="demoVideo" autoplay loop muted playsinline>
341:            <source src="/AI_Demo.mp4" type="video/mp4">
342:            Your browser does not support the video tag.
343:          </video>
344:          <div class="video-logo-overlay">AI Simulator</div>
345:          <div class="sound-toggle" onclick="toggleSound()">🔊</div>
346:        </div>
347:        <p class="hero-card-subtitle">AI-assisted visual mapping for toxins and fillers, built for high-conversion patient education.</p><br><br><br>
348:        <div class="hero-tag">Licensed PAs • NPs • MDs</div>
349:      </div>
350:    </div>
```

Replace with provider image (`ATG_in_home.jpg`, Las Vegas caption stripped via ImageMagick) + caption "A mobile app for mobile aesthetic providers". Image must vertically fill the same space as the left column (top of eyebrow to bottom of CTA buttons).

Related: `<video id="demoVideo">` is referenced by `toggleSound()` JS function — verify whether removing the video orphans the JS handler. If yes, remove the function too.

### (b) Left-column hero pill — UPDATE in Prompt 2

Line **325**: `<div class="hero-pill">✓ Mobile EHR + AI Simulator</div>`
Replace with: `<div class="hero-pill">✓ Mobile EHR</div>`

### (c) Left-column hero subtitle — UPDATE in Prompt 2

Line **323**: contains "Charting, scheduling, and an AI procedure simulator on your phone. Injector-priced exosomes, post-procedure devices, and skincare actives shipped to your door."
Replace the leading sentences with: "Charting, scheduling, and a full HIPAA compliant clinical platform on your phone."

Per the spec, the rest of the sentence ("Injector-priced exosomes…") is replaced too — the replacement text given is the entire substitution.

### (d) Other homepage references — STRIP in Prompt 3

| Line | Type | Current text |
|------|------|--------------|
| 30 | `<title>` | `Aesthetics To Go — Mobile EHR, AI Simulator & Clinical Supplies for Injectors` |
| 37 | meta description | `…Mobile EHR, AI procedure simulator, and injector-priced clinical supplies — one login, one brand.` |
| 46 | og:title | `Aesthetics To Go — Mobile EHR, AI Simulator & Clinical Supplies` |
| 47 | og:description | `…Mobile EHR, AI procedure simulator, and injector-priced clinical supplies…` |
| 54 | twitter:title | Same as og:title |
| 55 | twitter:description | Same as og:description |
| 124 | JSON-LD FAQ answer | `…Patients use an AI simulator to visualize results before the provider arrives.` |
| 153 | JSON-LD FAQ question | `What is the AI diagnostic simulator?` |
| 156 | JSON-LD FAQ answer | `The Aesthetics To Go AI simulator uses high-fidelity visual mapping to show patients realistic before-and-after outcomes…` |
| 168 | JSON-LD VideoObject name | `Aesthetics To Go AI Diagnostic Simulator Demo` |
| 169 | JSON-LD VideoObject description | `AI-assisted visual mapping for toxins and fillers, demonstrating how patients can see realistic before-and-after results…` |
| 459 | "How it works" step body | `Patients select their area of concern… and run the AI simulator on their own face. Within seconds they see realistic before-and-after outcomes…` |

The entire VideoObject block (lines ~165–172) and the FAQ Q/A pair about the simulator (~152–158) should be removed wholesale, not just edited. Confirm there is no other JSON-LD that depends on them.

The `<video id="demoVideo">` source `/AI_Demo.mp4` at line 341 is the file referenced by VideoObject `contentUrl`. The MP4 file itself can stay in the repo (not in scope to delete asset files) but no public page should link it after Prompt 3.

## Other production pages with AI Simulator references

### `about/index.html` — 9 occurrences

| Line | Type | Current text (truncated) |
|------|------|--------------------------|
| 124 | JSON-LD FAQ answer | "…before-and-after photos, medical records, and AI simulator photos is encrypted…" |
| 354 | platform-card title | `AI Diagnostic Simulator` |
| 355 | platform-card body | "High-fidelity visual mapping shows patients realistic before-and-after outcomes…" |
| 457 | image alt | `AI diagnostic simulator showing realistic before-and-after visualization for aesthetic treatments` |
| 462 | diff-card body | "No other mobile aesthetic platform offers AI-powered before-and-after visualization…" |
| 463 | diff-card meta | `AI Simulator · Patient Education · Conversion` |
| 535 | FAQ card answer | "…mobile EHR, AI simulator, scheduling, payments, supply access…" |

The whole `<div class="platform-card">` at lines 352–356 is a dedicated AI Simulator card on the page — likely needs full removal or replacement (similar to homepage card decision). The diff-card at lines 455–465 is also a full card centered on the simulator. Decision in Prompt 3: remove cards or restructure surrounding grids.

### `providers/index.html` — 14 occurrences

| Line | Type | Current text (truncated) |
|------|------|--------------------------|
| 47 | og:description | "…full mobile EHR, AI simulator, wholesale pricing…" |
| 113 | JSON-LD FAQ answer | "The AI simulator uses high-fidelity visual mapping to show patients…" |
| 308 | feature-strip span | `AI Diagnostic Simulator` |
| 339 | value-card title | `AI Diagnostic Simulator` |
| 340 | value-card body | "Patients run realistic before-and-after visualizations on their own face…" |
| 413 | comparison table row | `AI Diagnostic Simulator` (table cell, with ✓/✗ row that follows) |
| 473 | how-card body | "Patients in your area book appointments after running the AI simulator on their own face…" |
| 498 | tech-card body | "The AI diagnostic simulator maps toxin and filler placement onto the patient's own face…" |
| 500 | tech-card meta | `AI Simulator · Patient Education · Higher Conversion` |
| 573 | FAQ card answer | "Patients download the Aesthetics To Go app, run the AI simulator on their face…" |

The value-card (337–342), comparison-table row (411–416), and tech-card (~495–501) are full structural blocks centered on the simulator. The feature-strip line 308 is a single token in a horizontal scroller. JSON-LD FAQ Q/A pair around line 110–115 likely needs removal as a Q/A unit.

### `faq/index.html` — 16 occurrences

| Line | Type | Current text (truncated) |
|------|------|--------------------------|
| 47 | og:description | "…the AI simulator, safety, and pricing…" |
| 88 | JSON-LD FAQ answer | "…You can visualize your results using the AI simulator before booking." |
| 120 | JSON-LD FAQ answer | "The ATG AI diagnostic simulator uses high-fidelity visual mapping…" |
| 144 | JSON-LD FAQ answer | "…and AI simulator photos, and payment information is encrypted…" |
| 393 | chat assistant prompt | "…the AI simulator — anything. What would you like to know?" |
| 401 | chat suggestion button | `What is the AI simulator?` |
| 473 | FAQ card answer | "Run the AI simulator on your face, browse credentialed providers…" |
| 476 | FAQ card question | `What is the AI simulator?` |
| 477 | FAQ card answer | "Upload a photo, select treatment areas, and see realistic before-and-after outcomes…" |
| 516 | FAQ card answer | "Patients download the app, run the AI simulator, and book with credentialed providers…" |
| 611 | llms.txt-style block | `- AI Diagnostic Simulator: Upload a photo, select treatment areas…` |
| 666 | llms.txt-style block | "…before-and-after photos, medical records, AI simulator photos, payment information" |
| 673 | llms.txt-style block | "Homepage: Platform overview, AI simulator demo video, provider recruitment CTA…" |

JSON-LD FAQ Q/A pair around 117–121 and the visible FAQ card pair around 475–478 should be removed as units. Lines 611, 666, 673 are inside an embedded LLM-readable block at the bottom of the page — needs careful editing to keep the block coherent.

### `careers/index.html` — 5 occurrences

| Line | Type | Current text (truncated) |
|------|------|--------------------------|
| 432 | benefit-card title | `AI Diagnostic Simulator` |
| 433 | benefit-card body | "Patients visualize realistic before-and-after outcomes on their own face before you arrive…" |
| 451 | benefit-card body | "Patients find you through the platform — they download the app, run the AI simulator, and book…" |
| 590 | onboarding-card body | "Patients in your area book after running the AI simulator on their own face…" |

Full benefit-card block at 430–434 likely needs removal.

### `blog/index.html` — 19 occurrences

| Line | Type | Current text (truncated) |
|------|------|--------------------------|
| 103 | JSON-LD BlogPosting headline | `How the AI Simulator Helps Providers Close More Consultations` |
| 104 | JSON-LD BlogPosting description | "…How ATG providers use the AI simulator as a clinical sales tool." |
| 107 | JSON-LD BlogPosting URL | `https://aestheticstogo.com/blog/ai-simulator-close-more-consultations` |
| 204 | JSON-LD FAQ answer | "ATG handles all patient acquisition through paid advertising, SEO, social media, the AI simulator…" |
| 556 | article-card title | `How the AI Simulator Helps Providers Close More Consultations` |
| 557 | article-card body | "…Here's how ATG providers use the AI diagnostic simulator as a clinical sales tool…" |
| 564 | article body H4 | `What the AI simulator changes` |
| 565 | article body | "The Aesthetics To Go AI diagnostic simulator lets patients see realistic before-and-after outcomes…" |
| 568 | article body | "ATG providers report that patients who use the AI simulator before their appointment arrive with clear expectations…" |
| 571 | article body | "…the AI simulator is not a gimmick — it is a clinical workflow tool…" |
| 720 | article body | "When ATG drives a new patient through advertising, SEO, social media, or the AI simulator…" |
| 780 | article-card body | "Paid ads, SEO, social media, AI simulator leads, and direct outreach…" |
| 792 | article body | "AI simulator leads: Patients who use the AI simulator to visualize treatment results are high-intent prospects…" |
| 917 | FAQ card answer | "ATG handles all patient acquisition through paid advertising, SEO, social media, the AI simulator…" |
| 955 | CTA text | "Zero platform fees for founding providers… Full EHR, AI simulator, smart scheduling, and wholesale supplies…" |
| **965** | **CTA link (HREF)** | `<a href="/ai-simulator" class="cta-link">… Try the AI Diagnostic Simulator</a>` |

Line **965** is the only direct nav/footer-style link to `/ai-simulator/` found in production HTML (excluding `ai-simulator/index.html` itself). Must be removed in Prompt 3.

The full BlogPosting JSON-LD entry (~101–108) and the corresponding article card (554–573) are dedicated to the simulator. Removing the article card requires renumbering or restructuring the surrounding article grid.

### `botox/index.html` — 11 occurrences

| Line | Type | Current text (truncated) |
|------|------|--------------------------|
| 78 | JSON-LD MedicalProcedure description | "…Includes AI-powered before-and-after visualization, HIPAA-compliant SOAP charting…" |
| 80 | JSON-LD howPerformed | "…The provider reviews the patient's AI simulation results, conducts an in-person assessment…" |
| 98 | JSON-LD FAQ answer | "…You can visualize your results using the AI simulator before booking…" |
| 127 | JSON-LD FAQ question | `What is the AI simulator and how does it work?` |
| 130 | JSON-LD FAQ answer | "The Aesthetics To Go AI diagnostic simulator uses high-fidelity visual mapping…" |
| 344 | hero secondary CTA | `<div class="hero-service-secondary">or <span>try the AI simulator first</span></div>` |
| 446 | how-card body | "Open the Aesthetics To Go app and run the AI diagnostic simulator on your own face…" |
| 531 | FAQ card question | `What is the AI simulator?` |
| 532 | FAQ card answer | "The AI diagnostic simulator maps realistic Botox outcomes onto your own face…" |
| 558 | cta-feature text | `AI before-and-after visualization` |

### `fillers/index.html` — 7 occurrences

| Line | Type | Current text (truncated) |
|------|------|--------------------------|
| 78 | JSON-LD MedicalProcedure description | "…Includes AI-powered before-and-after visualization and HIPAA-compliant documentation." |
| 98 | JSON-LD FAQ answer | "…You can visualize your results using the AI simulator before booking…" |
| 359 | hero secondary CTA | `<div class="hero-service-secondary">or <span>try the AI simulator first</span></div>` |
| 469 | how-card body | "Open the Aesthetics To Go app and run the AI diagnostic simulator on your own face…" |
| 617 | cta-feature text | `AI before-and-after visualization` |

### `terms/index.html` — 10 occurrences

| Line | Type | Current text (truncated) |
|------|------|--------------------------|
| 255 | highlight-card title | `AI Simulator Is Educational Only` |
| 256 | highlight-card body | "The AI diagnostic simulator provides visualizations for consultation and educational purposes only…" |
| 331 | policy subhead | `AI Diagnostic Simulator` |
| 332 | policy text | "The AI diagnostic simulator is provided for educational and consultation purposes only…" |
| 353 | disclaimer | "…blog posts, FAQs, treatment descriptions, and AI simulator visualizations…" |
| 354 | disclaimer | "…the accuracy of AI simulator visualizations…" |
| 421 | FAQ card question | `Does the AI simulator guarantee results?` |
| 422 | FAQ card answer | "No. The AI diagnostic simulator provides visualizations for educational and consultation purposes only…" |

Special case: terms references are *legal disclaimers* about the simulator. Even with the simulator hidden from public marketing, the underlying capability still exists in the codebase. **Question for Prompt 3:** keep the legal disclaimer language (since the feature exists internally and may return) or strip it entirely (since it is no longer offered to the public)? Suggest keeping the policy subhead intact but removing the dedicated highlight-card at 253–257 and the FAQ card at 419–423, since those are user-facing marketing, while the policy text at 331–332 and disclaimers 353–354 are protective legal language worth retaining.

### `privacy/index.html` — 6 occurrences

| Line | Type | Current text (truncated) |
|------|------|--------------------------|
| 81 | JSON-LD FAQ answer | "…before-and-after photos, AI simulator images, and medical records is encrypted…" |
| 238 | hipaa-card body | "…charting, digital consents, before-and-after photos, AI simulator images, and medical records." |
| 394 | FAQ card answer | "…before-and-after photos, AI simulator images, and medical records…" |

Same legal-protection question as terms. Recommendation: leave PHI list intact (mentions of "AI simulator images" in the encrypted-data list), since the data category may still apply if the feature returns.

## Sitemap and llms.txt

| File | Line | Action |
|------|------|--------|
| `sitemap.xml` | 57–62 | Remove the entire `<url>` block for `https://aestheticstogo.com/ai-simulator/`. |
| `llms.txt` | 13 | `- AI diagnostic simulator for patient visualization` — remove this bullet from the platform feature list. |

## /ai-simulator/index.html — internal references (29 occurrences)

The page itself is being converted to a redirect stub in Prompt 3 (per the city-page pattern). The current page contains: meta tags, canonical, breadcrumb JSON-LD, Service JSON-LD, FAQ JSON-LD with 5+ questions, hero section, sim-card block, FAQ section, and an early-access form. **Action:** replace the entire 630-line file with a minimal `<meta http-equiv="refresh" content="0; url=/" />` redirect stub. None of the inline references need individual editing because the file is being wholesale replaced.

Note line 300 contains the comment: `<!-- Nav does NOT include AI Simulator link — page is hidden until first PA onboarded -->` — confirms the public nav already does not link to /ai-simulator/.

## Nav and footer links to /ai-simulator/

Direct grep for `href="/ai-simulator"` or `href="ai-simulator"` returned exactly **one** match outside the simulator page itself:

- `blog/index.html:965` — CTA-links section: `<a href="/ai-simulator" class="cta-link"><span class="cta-link-arrow">→</span> Try the AI Diagnostic Simulator</a>`

Global navs and footers across the site do not link to `/ai-simulator/`. (Confirmed by absence of matches in the global nav/footer pattern in any other page.) This matches the comment in `ai-simulator/index.html` line 300 stating the nav was deliberately not wired up.

## JS files

Grepped all `*.js` files in the repo for AI Simulator phrases — **zero matches**. No JS files reference the simulator by name. The homepage `toggleSound()` function (defined inline) controls the demo video; verify in Prompt 2 whether removing the `<video id="demoVideo">` element orphans this function and remove the function if so.

## Internal docs (likely keep, flag for review)

These are project documentation files in `/docs/`. Out of scope for the public-facing strip. Listed for awareness only.

| File | Occurrences | Notes |
|------|-------------|-------|
| `CLAUDE.md` | 1 | Mentions "AI Simulator" in project tagline ("EHR + AI Simulator + Clinical Supplies"). May want to update at end of sweep so future sessions don't reintroduce the phrase. |
| `docs/DESIGN_TOKENS.md` | 4 | Design system reference. References AI Simulator as one of the platform pillars. |
| `docs/QA_REPORT.md` | 1 | Historical QA report from launch. Leave as-is — historical record. |
| `docs/GEO_STRIP_INVENTORY.md` | 1 | Historical inventory from prior geographic strip. Leave as-is. |
| `docs/PHASE2_SKU_CATALOG_PART3.md` | 1 | Historical research output. Leave as-is. |

`CLAUDE.md` is borderline: it shapes future work. Recommend a small surgical edit in Prompt 4 to update the project tagline so future Claude sessions don't pitch the simulator as a public-facing feature.

## Stragglers / decisions needed before Prompt 3

1. **Card removal vs. card replacement on /about/, /providers/, /careers/.** Each page has a dedicated card (platform-card, value-card, benefit-card) for the simulator. Removing leaves a hole in a 3-up or 4-up grid. Decisions: (a) delete and reflow the grid, or (b) replace the card with another platform pillar (e.g., highlight Clinical Supplies more prominently). Recommend (a) for speed; verify visual balance after edit.

2. **`/providers/` comparison table row at line 413** — the table currently has a row "AI Diagnostic Simulator" with checkmarks comparing ATG to other platforms. Removing the row affects table rhythm but is the only correct move. No replacement row needed.

3. **`/blog/` article card at lines 554–573** — a full-length article post about the simulator. Removing it leaves the blog grid one card short. Decision: delete the article entirely (recommended — it markets a hidden feature) and accept the resulting grid asymmetry, or hide it with a CSS class that preserves DOM but suppresses display (not recommended — leaves stale content).

4. **`/blog/` JSON-LD BlogPosting entry at lines 101–108** — references a URL `https://aestheticstogo.com/blog/ai-simulator-close-more-consultations` that does not appear to exist as a separate page. Confirmed by absence of any file matching that path. The JSON-LD entry is orphan structured data and should be removed regardless of the visible card decision.

5. **VideoObject + `/AI_Demo.mp4` asset.** The video file `AI_Demo.mp4` is referenced by JSON-LD (homepage) and by the `<video>` element on the homepage. After Prompt 2 removes the `<video>` and Prompt 3 removes the JSON-LD VideoObject, the file becomes orphaned. Out of scope to delete the file from the repo (per scope: do not delete capability), but no public reference will remain.

6. **`/terms/` and `/privacy/` legal disclaimers** — see notes inline above. Recommend keeping protective legal language and only removing the user-facing marketing card and FAQ card on those pages.

7. **`/faq/` embedded LLM-readable block (lines ~609–675)** — bottom of the FAQ page contains a structured block apparently for LLM consumption. References "AI Diagnostic Simulator" as a feature. Decision: remove all simulator-related lines from this block, taking care to keep surrounding sections coherent.

8. **CLAUDE.md project tagline** — see internal docs section. Recommend small edit in Prompt 4.

## Counts by category (production files only)

- Visible page copy (titles, body, headings, CTAs, FAQ cards, comparison table cells): ~80
- Metadata (`<title>`, meta description, og:*, twitter:*): 7 across 4 files
- JSON-LD structured data (FAQ Q/A, BlogPosting, VideoObject, Service, MedicalProcedure descriptions): ~25 entries across 8 files
- Image alt text: 1 (about/index.html line 457)
- Internal navigation/CTA links to /ai-simulator/: 1 (blog/index.html line 965)
- Sitemap entry: 1 (`<url>` block)
- llms.txt entry: 1 bullet
- Embedded LLM-readable text on /faq/: 3 lines
