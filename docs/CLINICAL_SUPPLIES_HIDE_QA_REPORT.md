# Clinical Supplies Hide QA Report

**Date:** 2026-05-05
**Scope:** Combined QA for Prompt 2 (catalog pages + homepage feature section) and Prompt 3 (cross-site nav/footer/sitemap edits) plus a Prompt-3 patch (FAQ chatbot LLM bullets) discovered during this QA pass.

## Summary

- **Files modified by this hide work:** 26
  - 1 homepage (`index.html`) — feature section comment-wrapped
  - 11 catalog pages (`clinical-supplies/*`) — converted to clean redirect stubs (~500 bytes each)
  - 11 secondary pages (`providers`, `botox`, `fillers`, `hair-restoration`, `careers`, `about`, `faq`, `blog`, `terms`, `privacy`, `contact`) — nav/mobile-nav/footer-link/footer-dedicated wraps
  - `providers/index.html` additionally has value-card and comparison-table-row wraps
  - `faq/index.html` additionally has 2 LLM system-prompt bullets deleted (Prompt-3 patch)
  - `sitemap.xml` — 11 URL blocks wrapped in XML comment
  - `CLAUDE.md` — Status Table row added
  - `docs/CLINICAL_SUPPLIES_HIDE_INVENTORY.md` — restoration notes appended (Prompt 1 file, kept untracked through Prompt 2 redo, committed with this hide)
  - `docs/CLINICAL_SUPPLIES_HIDE_QA_REPORT.md` — this file (new)
- **Pages converted to redirect stubs:** 11 (1 landing + 10 detail). All under 1 KB. Zero in-file preservation comments. Zero `--&gt;` escapes. Originals recoverable from git history.
- **Active retained references (intentional, per spec):** 6 categories — see Intentional retentions section.

## Re-grep results

### Search term: `Clinical Supplies` (capitalized)

Repo-wide: 309 matches across 58 files. Production-page classification:

| File | Hits | Classification |
|---|---|---|
| `index.html` | 9 | All inside the homepage feature section comment-wrap (lines 755–840) — preserved-via-comment ✓ |
| `providers/index.html` | 9 | 4 nav/footer wrappers + value-card wrapper title + footer dedicated row + 1 footer link wrap + 1 inside the providers page CTA — all wrapped ✓ |
| `botox/index.html`, `fillers/index.html`, `hair-restoration/index.html`, `careers/index.html`, `about/index.html`, `faq/index.html`, `blog/index.html`, `contact/index.html`, `terms/index.html`, `privacy/index.html` | 6 each | All inside HTML comment wrappers (4 of them: nav, mobile-nav, footer-link, footer-dedicated) — preserved-via-comment ✓ |
| `clinical-supplies/*.html` (11 files) | 1 each | Inside the redirect-stub comment line (`<!-- Clinical Supplies <name> hidden 2026-05-05. ... -->`) ✓ |
| `sitemap.xml` | 1 | Inside the XML comment wrapper opener ✓ |
| `clinical-supplies/{catalog.js, gate.js, cart.js, cart.css, _build-detail-pages.js}` | 1+1+4+1+9 | Code/comment references in preservation-on-disk supporting files. Files unmodified by this hide. Restoration-ready. |
| `workers/email-verify/{index.js, wrangler.toml}` | 5+1 | Cloudflare Worker code/comments. Unmodified. |
| `docs/*.md`, repo-root planning `.md`, `*.txt` snapshots | remainder | Internal documentation and pre-existing untracked archive files. Out of scope. |

### Search term: `clinical-supplies` (URL slug)

Repo-wide: 320 matches across 42 files. All production-page hits are inside HTML comment wrappers (nav-link, mobile-nav-link, footer-link, footer-dedicated-row, value-card, comparison-table row) or inside the sitemap XML comment wrapper. Zero active production references. ✓

`sitemap.xml` shows 11 hits — all inside the XML comment wrapper between line 76 (open) and line 143 (close). Verified by reading the file.

### Search term: `clinical supplies` (lowercase)

Repo-wide: 37 matches across 15 files. Production-page classification:

| File:Line | Classification |
|---|---|
| `careers/index.html:620` | Intentional retention — generic dictionary usage in benefit-card body |
| `about/index.html:554` | Intentional retention — generic dictionary usage in platform-card body |
| `faq/index.html:152` | Intentional retention — JSON-LD answer text "wholesale supply access on Botox, fillers, and clinical supplies" describes platform feature |
| `blog/index.html:762` | Intentional retention — same generic dictionary usage as the original spec called out for `botox/index.html` (see Open Issues for spec mislabel finding). Phrase: `plus clinical supplies: needles, cannulas, topical anesthetic...` |
| Inside HTML comment wrappers (nav-link, footer-dedicated, etc.) on every secondary page | Preserved-via-comment ✓ |
| `index.html` (homepage section) | Inside the wrapped feature section ✓ |

### Search term: `Clinical Supply` (singular legacy)

Production pages: zero matches. Confirmed via positive-suffix-anchored regex `[Cc]linical [Ss]upply([^a-z]|$)` — only hits are inside repo-root planning `.md` files (`Clinical_Supplies_Hide_Prompt_1.md`, `Clinical_Supplies_Hide_Prompt_2.md`) and `docs/CLINICAL_SUPPLIES_HIDE_INVENTORY.md` discussing the singular form historically. No production code carries the singular form. ✓

## Sample page verification

Sampled 5 secondary pages (providers, botox, fillers, faq, contact) plus the homepage and one catalog stub:

| Page | Desktop nav wrapped | Mobile-nav wrapped | Footer link wrapped | Footer-ded wrapped | Other |
|---|---|---|---|---|---|
| `providers/index.html` | ✓ | ✓ | ✓ | ✓ | + value-card line 501 wrapped, + table-row line 614 wrapped |
| `botox/index.html` | ✓ | ✓ | ✓ | ✓ | n/a |
| `fillers/index.html` | ✓ | ✓ | ✓ | ✓ | n/a |
| `faq/index.html` | ✓ | ✓ | ✓ | ✓ | + 2 LLM system-prompt bullets deleted (lines 813 + 833 of post-Prompt-3 numbering) |
| `contact/index.html` | ✓ | ✓ | ✓ | ✓ | n/a |
| `index.html` (homepage) | n/a (no Clinical Supplies link in nav — already not present at homepage) | n/a (same) | n/a (same) | n/a (same) | + feature section lines 755–840 wrapped |
| `clinical-supplies/benev-erc/index.html` | n/a (redirect stub, no nav) | n/a | n/a | n/a | Clean stub, 514 bytes |

All 11 secondary pages confirmed via repo-wide grep:
- `Clinical Supplies nav link hidden 2026-05-05` → 11 matches
- `Clinical Supplies dedicated footer row hidden 2026-05-05` → 11 matches

Plus repo-wide: `Clinical Supplies value-card hidden 2026-05-05` → 1 match (providers); `Clinical Supplies comparison-table row hidden 2026-05-05` → 1 match (providers); `Clinical Supplies homepage feature section hidden 2026-05-05` → 1 match (index.html).

## Catalog stub verification

| File | Bytes | `uncomment to restore` count | `--&gt;` count |
|---|---|---|---|
| `clinical-supplies/index.html` | 556 | 0 | 0 |
| `clinical-supplies/benev-erc/index.html` | 514 | 0 | 0 |
| `clinical-supplies/anteage-mdx/index.html` | 516 | 0 | 0 |
| `clinical-supplies/exo-skin-serum/index.html` | 519 | 0 | 0 |
| `clinical-supplies/drpen-a20/index.html` | 514 | 0 | 0 |
| `clinical-supplies/drpen-h6/index.html` | 513 | 0 | 0 |
| `clinical-supplies/celluma-pro/index.html` | 516 | 0 | 0 |
| `clinical-supplies/skinceuticals-ce-ferulic/index.html` | 529 | 0 | 0 |
| `clinical-supplies/skinmedica-tns-advanced/index.html` | 528 | 0 | 0 |
| `clinical-supplies/zo-daily-power-defense/index.html` | 527 | 0 | 0 |
| `clinical-supplies/obagi-professional-c-20/index.html` | 528 | 0 | 0 |

All 11 stubs under 1 KB. Repo-wide grep `uncomment to restore` against `clinical-supplies/` → zero matches. Repo-wide grep `--&gt;` against `clinical-supplies/` → zero matches. ✓

## Homepage feature section verification

`index.html`:
- Line 755: opening wrapper `<!-- Clinical Supplies homepage feature section hidden 2026-05-05 — uncomment to restore`
- Line 768: inner `--&gt;` (escaped — closer of the original multi-line teaser explanation comment that opened on line 756)
- Line 821: inner `--&gt;` (escaped — closer of the original inline 3-step-strip comment)
- Line 840: closing wrapper `-->`
- Line 842: next section (`<section class="cta-band" id="faq">`) flows through normally

Wrapped section will not render on the live page. The 2 `--&gt;` escapes inside are documented in `docs/CLINICAL_SUPPLIES_HIDE_INVENTORY.md` Restoration Notes — they must be reversed during restoration along with removing the outer wrapper.

## Sitemap verification

`sitemap.xml`:
- Lines 76–143 wrapped in XML comment with date marker.
- 11 `<loc>https://aestheticstogo.com/clinical-supplies/...</loc>` URLs all inside the wrapper.
- Zero active `/clinical-supplies/` URL entries in the sitemap.
- Per Option 1 (selected during Prompt 3): the original inner section header `<!-- ATG Clinical Supplies (Prompt 9) -->` was dropped entirely; the new wrapper comment serves as the section marker.

## Preservation verification

Files preserved on disk, unmodified by this hide:

| File | Modified? |
|---|---|
| `clinical-supplies/catalog.js` | No (verified via `git status`) |
| `clinical-supplies/gate.js` | No |
| `clinical-supplies/cart.js` | No |
| `clinical-supplies/cart.css` | No |
| `clinical-supplies/_build-detail-pages.js` | No |
| `workers/email-verify/index.js` | No |
| `workers/email-verify/wrangler.toml` | No |
| `workers/email-verify/README.md` | No |

Per spec: catalog code, builder template, and the Cloudflare Worker (which powers the soft email gate via Brevo + Check-Mail.org integration) are all preserved untouched. Restoration of the catalog requires only `git checkout <pre-hide-commit> -- clinical-supplies/` plus reversal of the homepage section wrapper (per restoration notes).

## llms.txt verification

Repo-wide grep `[Cc]linical [Ss]upplies|/clinical-supplies/` against `llms.txt` → zero matches. ✓

The file already pre-dated the Clinical Supplies catalog launch and never referenced it. Confirmed in Prompt 1 inventory and re-confirmed in this QA pass.

## Intentional retentions

These references remain ACTIVE per spec and user decisions during Prompts 2 and 3. Each is platform-feature language or generic dictionary usage, not a Clinical Supplies brand reference:

1. **`blog/index.html` line 762** — generic dictionary usage in an FAQ answer paragraph: `<p>You will need FDA-approved neurotoxins and dermal fillers from authorized distributors, plus clinical supplies: needles, cannulas, topical anesthetic, alcohol prep pads, gauze, gloves, and emergency supplies including hyaluronidase. Platforms with wholesale pricing access can significantly reduce your per-unit product costs compared to ordering individually.</p>` — describes generic medical supplies (needles, cannulas, gauze, etc.), not the catalog. Originally mislabeled as `botox/index.html:760` in the Prompt 1 inventory; see Open Issues #1.

2. **`faq/index.html` line 152** — JSON-LD `FAQPage` answer text: `"...The operating system also provides wholesale supply access on Botox, fillers, and clinical supplies."` — describes a platform feature (wholesale supply access). Lowercase generic usage of "clinical supplies" parallels the blog generic usage.

3. **`careers/index.html` line 620** — benefit-card body: `<p class="benefit-card-text">Access volume pricing on Botox, dermal fillers, and clinical supplies through aggregated purchasing power...</p>` — generic dictionary usage. Card title is "Wholesale Supply Pricing" (platform feature, not brand).

4. **`about/index.html` line 554** — platform-card body: `<p class="platform-card-text">Volume pricing on Botox, dermal fillers, and clinical supplies through the network's aggregated purchasing power...</p>` — generic dictionary usage. Card title is "Wholesale Supply Access" (platform feature, not brand).

5. **"Wholesale Supply Access" / "Wholesale Supply Pricing" / "Wholesale Medical Supply" feature labels** across `careers/index.html`, `about/index.html`, `providers/index.html` (FAQ section) — describe a platform feature, not the public catalog. Examples:
   - `careers/index.html:524` feature-strip pill `<span>Wholesale Supply Access</span>`
   - `careers/index.html:619` benefit-card title `<h3>Wholesale Supply Pricing</h3>`
   - `careers/index.html:670` lifestyle-card text "Combine that with wholesale supply access..."
   - `careers/index.html:875` CTA feature item `<span>Wholesale supply access</span>`
   - `about/index.html:553` platform-card title `<h3>Wholesale Supply Access</h3>`
   - `providers/index.html:469` feature-strip pill `<span>Wholesale Supply Access</span>`
   - `providers/index.html:97` JSON-LD FAQPage answer "...wholesale-priced clinical supplies." — kept ACTIVE per spec out-of-scope language

6. **CSS class `.footer-row-clinical-supplies`** — defined in CSS rules, retained on disk because the dedicated footer row is comment-wrapped (not deleted). The class is unused after the hide but harmless.

## Open issues

### Issue 1 — `botox/index.html:760` reference in spec was mislabel; actual generic-usage reference is on `blog/index.html`

The Prompt 1 inventory I produced labeled the "plus clinical supplies: needles, cannulas, topical anesthetic..." FAQ answer as living on `botox/index.html:760`. The user's Prompt 2 + Prompt 3 specs both said "Do NOT modify botox/index.html line 760 — generic clinical supplies usage." The actual content is on **`blog/index.html` line 762** (post-Prompt-3 line numbering; was line 760 pre-Prompt-3). `botox/index.html` does not contain that phrase.

**Net functional outcome:** the user's stated intent (generic dictionary usage retained) is preserved — the content exists on blog and was not touched by Prompt 3 since blog received only nav/footer edits. So no action is needed for this commit. The file labeling in the spec was incorrect but the functional behavior is correct.

**Implication for future restoration:** if a future restorer searches for "botox/index.html line 760 generic clinical-supplies retain" they will not find the content there. They should grep for `plus clinical supplies: needles, cannulas` repo-wide to locate the actual line on `blog/index.html`.

### Issue 2 — FAQ chatbot LLM bullets patch (lines 813 + 833 of pre-patch numbering)

The Prompt 3 decisions preamble explicitly directed: *"faq/index.html lines 808 and 828 (inside the chatbot LLM system prompt template literal) — HIDE. Comment out per the standard pattern. The chatbot must not tell users about a catalog they can't reach."*

The Prompt 3 spec body's `Out-of-scope explicit list` then said the chatbot system-prompt language was out of scope. The two were in tension. I followed the spec body during Prompt 3 implementation and did not edit the bullets.

This QA pass caught the omission. The two bullets at post-Prompt-3 lines 813 and 833 contained explicit Clinical Supplies catalog references and were deleted in this QA pass:
- Line 813: `- Wholesale Medical Supply Ordering: Access volume pricing on Botox, dermal fillers, and clinical supplies through the network's aggregated purchasing power. Lower cost-per-unit without negotiating individual supplier contracts.`
- Line 833: `- Volume wholesale pricing on medical supplies (Botox, fillers, clinical supplies)`

**Why deletion instead of HTML-comment-wrap:** these bullets sit inside a JS template literal (`var ATG_SYSTEM_PROMPT = \`...\``). HTML comments (`<!-- ... -->`) inside a template literal are inert — they would still appear in the LLM's context as literal text including the words "Clinical Supplies", which defeats the purpose. Deletion satisfies the user's functional intent ("the chatbot must not tell users about a catalog they can't reach") cleanly. Restoration is via git history (same approach as the catalog pages).

`faq/index.html` size after the deletions: 69,587 bytes (was 69,899 post-Prompt-3, -312 bytes from the two bullet deletions).

### Issue 3 — pre-existing `index.txt` in modified status

`git status` shows `M index.txt` in the modified list. This file was already modified at the start of this session (per the initial git status snapshot) and was not touched by this hide work. It will be excluded from the staging area in Part C selective staging.

### Issue 4 — pre-existing `clinical-supplies/index.txt` snapshot in untracked list

Pre-existing 39,812-byte plain-text copy of the pre-hide landing page. Created externally before this session. Same `.txt`-sidecar pattern as `index.txt`, `about/index.txt`, `blog/index.txt`, etc. Not in scope for the hide; will be excluded from staging.

## No spot-check failures

Every wrap that was applied is present and structurally correct. Every retain is still active. Every preservation file is unmodified.
