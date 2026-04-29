# AI Simulator Hide QA Report

Generated 2026-04-29. Final verification before commit and push.

## Summary

- Production HTML files modified: **12**
- Other production assets modified: **2** (`sitemap.xml`, `llms.txt`)
- Internal docs modified: **1** (`CLAUDE.md` tagline)
- New docs created: **2** (`docs/AI_SIM_HIDE_INVENTORY.md`, `docs/AI_SIM_HIDE_QA_REPORT.md`)
- AI Simulator references removed or hidden from public-facing render: **140+** (full inventory in `docs/AI_SIM_HIDE_INVENTORY.md`)
- AI Simulator references intentionally retained on public site: **6** (legal-disclaimer / PHI carve-outs — see "Intentional retentions" section)
- `git diff --stat` net change: **+187 / −761** lines (large negative because `/ai-simulator/index.html` collapsed from 630 lines to 16-line redirect stub)

## Comment-out approach used throughout

Per the user's instruction, content removed from public visibility was **preserved in-file as comments with date markers** rather than deleted, so the original markup can be restored verbatim by uncommenting. Three syntaxes were used depending on context:

- **HTML markup** — wrapped in `<!-- AI Simulator [block description] hidden 2026-04-29 — uncomment to restore ... -->`. Used for cards, FAQ items, hero blocks, table rows, CTA links, feature-strip spans, and other visible HTML.
- **CSS** — wrapped in `/* AI Simulator [block description] hidden 2026-04-29 — uncomment to restore ... */`. Used for the homepage `.hero-card` family of styles inside the inline `<style>` tag.
- **JavaScript** — wrapped in `/* AI Simulator toggleSound hidden 2026-04-29 — uncomment to restore ... */`. Used for the orphaned `toggleSound()` function on the homepage.
- **Inline edits** (single sentence/clause removed from a longer paragraph) — preserved with single-line `<!-- prior text 2026-04-29: "..." -->` comment immediately above the active line.
- **Step renumbering** — preserved with single-line `<!-- prior step number 2026-04-29: "X" (was step X before AI Simulator step removal) -->` immediately above the renumbered `<div class="how-step">`.

### Intentional exception: orphan BlogPosting JSON-LD (clean removal, not commented)

The orphan `BlogPosting` entry at `blog/index.html` lines 101–108 (which referenced a URL `https://aestheticstogo.com/blog/ai-simulator-close-more-consultations` that does not exist) was **cleanly removed**, not preserved as a comment. Reason: HTML comments inside `<script type="application/ld+json">` are invalid JSON-LD and would break structured-data parsing in search engines. JSON has no comment syntax, so there is no way to preserve a JSON-LD object inside the same script block while keeping the surrounding JSON valid. This exception is consistent with the user's blanket rule that "metadata edits (page titles, meta descriptions, og tags, twitter tags, JSON-LD) do not need comment-out preservation."

The original orphan BlogPosting entry remains recoverable from git history.

### Intentional exception: how-step renumbering on `index.html`, `botox/index.html`, `fillers/index.html`

All three pages had a "Visualize Your Results" / "Patient Self-Assessment" how-step as **Step 1** that was entirely about the AI Simulator. Commenting out that step alone would leave the visible numbering broken (`Step 2`, `Step 3` with no `Step 1`). To maintain UX continuity:

- The original Step 1 article was wrapped in an HTML comment block (preserving full markup for restoration).
- The remaining steps were renumbered from `2, 3` to `1, 2`, with `<!-- prior step number 2026-04-29: "2" (was step 2 before AI Simulator step removal) -->` comments above each renumbered `<div class="how-step">` so the original numbering is recoverable.
- The new Step 1's body copy was inline-edited with a `<!-- prior text ... -->` comment to remove implicit references to the simulator (e.g., "Your provider reviews your AI simulation results...").
- Section headers on `botox/index.html` and `fillers/index.html` — "From AI preview to treatment in three steps." — were inline-edited to "From booking to treatment in two steps." with a prior-text comment.

## Re-grep results

Search across the entire repo (production code only — `docs/` excluded from this analysis since they are internal references):

### `AI Simulator` (case-sensitive)

| File | Matches | Classification |
|------|---------|----------------|
| `index.html` | 11 | All inside HTML/CSS/JS comment blocks (hidden card markup, hidden CSS, hidden JS, prior-text comments, prior-step-number comments) |
| `about/index.html` | 5 | All inside HTML comment blocks |
| `providers/index.html` | 10 | All inside HTML comment blocks |
| `careers/index.html` | 5 | All inside HTML comment blocks |
| `blog/index.html` | 13 | All inside HTML comment blocks |
| `botox/index.html` | 9 | All inside HTML comment blocks |
| `fillers/index.html` | 7 | All inside HTML comment blocks |
| `faq/index.html` | 11 | All inside HTML comment blocks |
| `terms/index.html` | 7 | 4 inside comment blocks; **3 intentional retentions** (legal disclaimer subhead + 2 disclaimers in §7/§8) |
| `privacy/index.html` | 3 | **All 3 intentional retentions** (PHI list mentions of "AI simulator images" — protective HIPAA language) |

### `ai-simulator` (URL fragment, case-sensitive)

| Location | Matches | Classification |
|----------|---------|----------------|
| `blog/index.html` line 968 | 1 | Inside HTML comment block (hidden CTA link, lines 967–969) |
| `sitemap.xml` | 0 | Removed cleanly |
| `llms.txt` | 0 | Removed cleanly |
| `ai-simulator/index.html` | 0 active references (file is now a redirect stub) | n/a |

### `AI procedure simulator`

| File | Matches | Classification |
|------|---------|----------------|
| `index.html` line 308 | 1 | Inside `<!-- prior text 2026-04-29: ... -->` comment |

All matches outside the legal-disclaimer/PHI carve-outs are confirmed inside comment blocks.

## Sample page verification

| Check | Status |
|-------|--------|
| Homepage right-side AI Simulator card removed and replaced with full-bleed `<figure class="hero-image">` containing `<img src="ATG_in_home.jpg">` and `<figcaption class="hero-image-caption">A mobile app for mobile aesthetic providers</figcaption>` | ✅ Verified at `index.html` lines 322–326 |
| Homepage left-side bullet reads `✓ Mobile EHR` (not `Mobile EHR + AI Simulator`) | ✅ Verified at `index.html` line 312 |
| Homepage left-side body copy reads "Charting, scheduling, and a full HIPAA compliant clinical platform on your phone." (no simulator/shipping references) | ✅ Verified at `index.html` line 309 |
| Homepage hero-card markup commented-out (preserved for restoration) with date marker | ✅ Verified at `index.html` lines 327–342 |
| Homepage `.hero-card` family CSS commented-out with date marker | ✅ Verified at `index.html` lines 209–222 (CSS comment block) |
| Homepage `toggleSound()` JS commented-out with date marker | ✅ Verified at `index.html` lines 650–656 (JS comment block) |
| `/ai-simulator/index.html` is a redirect stub | ✅ Verified — meta refresh, canonical, JS replace, robots noindex, historical comment with date marker (16 lines total) |
| `sitemap.xml` has zero `/ai-simulator/` entries | ✅ Verified by grep (0 matches) |
| `llms.txt` "AI diagnostic simulator" bullet removed | ✅ Verified by grep (0 matches) |
| Sample page nav (homepage `/`, `/providers/`, `/faq/`) does NOT link to `/ai-simulator/` | ✅ Verified — global nav on all three pages contains: For Providers, Clinical Supplies, Botox, Fillers, Blog, Careers, About. No simulator link. |
| Sample page footer (homepage `/`, `/providers/`, `/faq/`) does NOT link to `/ai-simulator/` | ✅ Verified — global footer on all three pages contains: Botox, Fillers, For Providers, Clinical Supplies, Blog, Careers, About, FAQ, Contact, Terms, Privacy, Clinical Supplies sub-links. No simulator link. |
| No remaining production-facing metadata (title, meta description, og:*, twitter:*) references AI Simulator | ✅ Verified by spot-check across `index.html`, `about/`, `providers/`, `careers/`, `blog/`, `faq/`, `botox/`, `fillers/`. All metadata cleanly edited. |

## Image processing

- **Source:** `C:\Users\quail\Documents\00-ATG\ATG_in_home.jpg`, 1024×1024, 157,243 bytes
- **Final asset path:** `/ATG_in_home.jpg` (existing repo file, 1024×1024, 180,407 bytes — also used by `about/index.html` and `careers/index.html`)
- **Method used:** None. Visual inspection of both source and existing repo asset confirmed neither has a baked-in Las Vegas caption — the images are visually identical photographs of a licensed provider performing an injection in a luxurious living room. No ImageMagick processing was needed. The user's prompt described a 1080×1080 source with a baked-in caption; the actual file is a clean 1024×1024 photograph. If the user has a separate caption-bearing version they intended, the homepage can be updated to use it later without further refactoring.

## Layout verification

- **Right column matches left column vertical extent:** ✅ confirmed by CSS approach
- **CSS approach used:**
  - `.hero` is a CSS Grid with `align-items: stretch`, so `.hero-media` is automatically stretched to match `.hero-copy` height.
  - `.hero-media { position: relative; height: 100%; }` and `.hero-image { position: relative; height: 100%; width: 100%; ... }` make the new figure fill that stretched height.
  - `.hero-image img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: center; }` ensures the photograph fills edge-to-edge, cropping if aspect ratios differ, with the woman provider centered.
  - Caption is an absolutely positioned `<figcaption>` with a dark-to-transparent gradient overlay at the bottom — does not push image height.
  - At `max-width: 960px` the grid stacks vertically and the image relaxes to its natural 1:1 aspect ratio (`aspect-ratio: 1/1`) so it does not get distorted.

A live browser visual check is recommended after deploy to confirm the rendered output matches the intent. CSS verification was structural only — no headless-browser rendering was performed.

## Intentional retentions

The following AI Simulator references remain ACTIVE on the public site by deliberate decision per the user's "legal disclaimer text stays active and visible" carve-out for `terms/` and `privacy/`:

### `terms/index.html` — legal disclaimers (3 active references)

| Line | Type | Why retained |
|------|------|--------------|
| 334 | `<h3 class="policy-subhead">AI Diagnostic Simulator</h3>` | Section heading for §7 simulator policy block |
| 356 | "...AI simulator visualizations, is provided for informational and educational purposes only..." | §8 disclaimer "No Medical Advice" — protective legal language |
| 357 | "...the accuracy of AI simulator visualizations. Individual treatment results vary." | §8 disclaimer "No Guarantee of Results" — protective legal language |

### `privacy/index.html` — PHI/HIPAA list (3 active references)

| Line | Type | Why retained |
|------|------|--------------|
| 81 | JSON-LD FAQ answer listing PHI types including "AI simulator images" | Structured-data version of HIPAA compliance answer; preserves data-category coverage |
| 238 | `hipaa-card` body listing PHI types including "AI simulator images" | Visible HIPAA encryption card; preserves data-category coverage |
| 394 | FAQ card answer listing PHI types including "AI simulator images" | Visible HIPAA FAQ; preserves data-category coverage |

If the AI Simulator capability is later removed entirely from the codebase (not just hidden), these references can be cleanly stripped at that point.

### Internal docs (out of scope, not edited)

The following docs in `/docs/` retain references to the simulator but were not edited because they are historical or internal:

- `docs/DESIGN_TOKENS.md` (4 refs) — design system reference; describes the now-hidden hero-card pattern.
- `docs/QA_REPORT.md` (1 ref) — historical QA report from launch.
- `docs/GEO_STRIP_INVENTORY.md` (5 refs) — historical inventory from prior geographic strip.
- `docs/GEO_STRIP_QA_REPORT.md` (1 ref) — historical QA report from prior geographic strip.
- `docs/PHASE2_SKU_CATALOG_PART3.md` (1 ref) — Phase 2 SKU research output.
- `docs/AI_SIM_HIDE_INVENTORY.md` (93 refs) — this work's inventory (intentional).
- `docs/AI_SIM_HIDE_QA_REPORT.md` (this file) — intentional.

`CLAUDE.md` retains 1 reference in the updated tagline: a parenthetical note explaining that the AI Simulator capability still exists in the codebase but is hidden from the public site, so future Claude sessions don't reintroduce simulator marketing copy without explicit instruction.

## Open issues

1. **Visual confirmation in browser** — CSS structural verification was performed but no live browser render was checked. Recommend opening `https://aestheticstogo.com/` (after deploy) and confirming:
   - Right-column image fills the same vertical extent as the left column from top of the eyebrow text to bottom of the CTA buttons.
   - No empty whitespace above, below, or beside the image.
   - Caption overlay is legible against the photograph at the bottom of the image.
   - At mobile widths (under 960px), the image stacks below the left column and renders at natural 1:1 aspect with no clipping or distortion.

2. **Orphaned `/AI_Demo.mp4` asset** — the video file referenced by the now-hidden VideoObject JSON-LD and the now-hidden `<video>` element on the homepage remains in the repo at `/AI_Demo.mp4`. Per scope ("do not delete the AI Simulator code, lib files, or any underlying capability"), the file was intentionally left in place. No public page links it after this commit.

3. **Untracked working-tree files NOT included in this commit** — the working tree contains several `.docx` files (CMO outreach docs, call scripts), Microsoft Word lock files (`~$*.docx`), a temp file (`~WRL2756.tmp`), and `docs/PHASE2_SKU_CATALOG_PART5.md` (Phase 2 SKU research from 2026-04-23, belongs to a separate Task A workstream). These are private business documents and unrelated work — they were **deliberately excluded** from this commit. If the `.docx` files were committed, they would be served publicly at `aestheticstogo.com/docs/...` since GitHub Pages publishes `origin/main` directly. Recommend the user `.gitignore` these patterns or delete the local files if they are not meant for the repo.

4. **`about/` and `careers/` grid asymmetry** — the platform-card on `about/index.html` and the benefit-card on `careers/index.html` were commented out without rebalancing the surrounding grid. The visible grids may now show one fewer card in the row, leading to a hanging trailing slot. This is acceptable per the comment-out spec ("the visible result stays identical except the simulator content is gone") but may warrant a visual polish pass later if the layout looks unbalanced.

5. **`providers/` comparison-table row commented out** — removing the "AI Diagnostic Simulator" row leaves the table one row shorter. The surrounding rows still describe the platform's value proposition; no other edits needed unless the user wants to add a replacement row.
