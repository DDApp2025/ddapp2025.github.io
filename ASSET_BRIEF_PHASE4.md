# ASSET BRIEF — Phase 4 Image Replacement

**Repo:** `ddapp2025.github.io` (GitHub Pages, custom domain `aestheticstogo.com`)
**Local path:** `C:\Users\quail\Documents\ATG-site\`
**Created:** 2026-05-03
**Authority:** `VALUE_PROP_REALIGNMENT_RULES.md` (Rule 10 governs all imagery decisions; Rule 1 governs audience hierarchy; Rule 2 governs forbidden strings in alt text and filenames; Rule 8 governs earnings imagery in Asset 3).

---

## Purpose

Three placeholder images currently shipped on the homepage do not satisfy Rule 10 (clinical attire, residential setting, no consumer-app phone shots, no co-working backdrops, patients 35+ professionally dressed). They are flagged as **PENDING REPLACEMENT** in the homepage HTML with dated comments. This brief specifies the assets that must be produced and the file paths they will land at so the live swap is a one-line `src` change per asset.

**Out of scope for Phase 4:** image generation, image download, binary commits, OG/Twitter card image refresh, hero `srcset` introduction. All of those follow when the assets are produced.

---

## Filename / path strategy

Existing image filenames (`ATG_in_home.jpg`, `WorkingFromHome.png`, `TaxMess.png`) are NOT being renamed in place. Renaming would break Open Graph cached previews, external embeds, and any deep-linked references outside this repo. Replacement assets land at NEW paths under `/assets/`. The `<img src=...>` swap is the single-line change at swap time. Old files can then be deleted in a follow-up commit once 30 days have passed without a referrer hit (cache safety).

All three replacement assets ship as **WebP primary** with a **JPG fallback** (use `<picture>` with `<source type="image/webp">` and a `<img src="...jpg">` fallback). 2x variants are required for retina/high-DPI displays.

---

## Asset 1 — Hero Image

| Field | Specification |
|---|---|
| **Asset name** | Hero — Licensed Provider in Private Residence |
| **File path (1x)** | `/assets/hero-licensed-provider-private-residence.jpg` |
| **File path (WebP 1x)** | `/assets/hero-licensed-provider-private-residence.webp` |
| **File path (2x)** | `/assets/hero-licensed-provider-private-residence@2x.jpg` |
| **File path (WebP 2x)** | `/assets/hero-licensed-provider-private-residence@2x.webp` |
| **Tablet crop** | `/assets/hero-licensed-provider-private-residence-tablet.jpg` (1024x768) |
| **Mobile crop** | `/assets/hero-licensed-provider-private-residence-mobile.jpg` (750x900) |
| **Section / use** | Homepage hero, right-column figure inside `.hero-image` (`index.html` ~line 369). Replaces `ATG_in_home.jpg` (current 1024x1024 placeholder). |
| **Required dimensions** | 1600x900 (1x desktop), 3200x1800 (2x desktop). Tablet crop 1024x768. Mobile crop 750x900 (portrait orientation for `< 720px` `.hero-image` aspect-ratio:1/1 fallback). |
| **Required format** | WebP primary, JPG fallback. Quality target ~85 WebP / ~80 JPG. Color space sRGB. |
| **Subject & composition** | A licensed physician (MD) or NP, mid-treatment or in calm consultation with one seated patient. Provider is the focal point — sharp focus, three-quarter angle, eye line on patient or treatment area. No selfies. No phone-up-to-camera composition. Patient occupies secondary visual weight. Negative space top-right reserved for potential text overlay (do not pre-overlay text on the asset itself — the hero figcaption is a separate HTML layer). |
| **Wardrobe** | Clinical attire ONLY: clean tailored white lab coat over scrubs, OR scrubs alone in a neutral medical color (navy, charcoal, slate, ceil blue). Visible stethoscope acceptable. Clinician-grade hand sanitizer or pump-dispenser acceptable as prop. **No logos, no branded scrubs, no wordmarks visible.** Hair styled, professional. |
| **Setting** | High-end residential interior — designer living space, hotel suite, OR executive office. Natural light from a window, neutral palette (warm off-white, beige, taupe, soft gray). Aspirational but understated. Reads as "private home of an affluent patient," not as a clinic. **No clinical signage, no medical equipment cart visible, no exam table.** A high-back upholstered chair or chaise is acceptable as the patient seat. |
| **Patient demographic** | Age 35–55. Composed, professionally dressed (silk blouse, blazer, or cashmere — NOT activewear, NOT college casual). Skin condition consistent with someone seeking aesthetic refinement, not someone seeking primary medical care. Hair styled. |
| **Diversity requirement** | Across the three assets in this brief, provider representation must include at least three skin tones spanning physician / NP / PA categories. For Asset 1 specifically, prefer a provider whose presentation reads as MD/NP given the hero's tone-setting role; ensure overall set across Assets 1+2 is balanced. |
| **Forbidden elements** | Selfies. Phone-up-to-camera shots. Branded scrubs or visible wordmarks. Co-working backdrops. Cars, parking lots, hotel lobbies. Kitchen tables, couches with throw pillows that read "Airbnb." Casual provider clothing (jeans, t-shirts, sneakers). College-aged patients. Any cue that reads "house call gig worker" or "side hustle." Stock-photography clichés (handshake-with-thumbs-up, finger-pointing-at-camera). |
| **Approved alt text (final asset)** | `Licensed physician delivering concierge aesthetic treatment in a private residence.` |
| **HTML loading attrs** | `loading="eager"` (above-the-fold hero — must NOT be lazy). No `fetchpriority` exists today; introducing one is a separate performance-tuning task and is out of Phase 4 scope. |

---

## Asset 2 — Practice Management

| Field | Specification |
|---|---|
| **Asset name** | Practice Management — Provider Reviewing Chart |
| **File path (1x)** | `/assets/provider-managing-concierge-practice.jpg` |
| **File path (WebP 1x)** | `/assets/provider-managing-concierge-practice.webp` |
| **File path (2x)** | `/assets/provider-managing-concierge-practice@2x.jpg` |
| **File path (WebP 2x)** | `/assets/provider-managing-concierge-practice@2x.webp` |
| **Section / use** | Homepage Professional Suite block, "Low-Overhead Practice" magazine card (`index.html` ~line 505). Replaces `WorkingFromHome.png` (current 511x374 placeholder). |
| **Required dimensions** | 1200x900 (1x), 2400x1800 (2x). 4:3 aspect to match the existing `.mag-card-image` 180px-tall crop window without distortion. |
| **Required format** | WebP primary, JPG fallback. Quality target ~85 WebP / ~80 JPG. sRGB. |
| **Subject & composition** | A licensed NP or MD reviewing a patient chart on a tablet, mid-task. Three-quarter or profile angle. Hands on tablet, eye line on the screen — composed and focused, not posed for the camera. No direct gaze into lens. Tablet screen content should NOT be a recognizable consumer app — generic medical chart UI or out-of-focus screen acceptable. |
| **Wardrobe** | Lab coat over professional clinical attire, OR scrubs in a neutral medical color. Same wardrobe constraints as Asset 1 — no logos, no branded scrubs, no casual layering. |
| **Setting** | Home office that reads professional-grade. Acceptable elements: framed credentials on wall, hardcover medical reference books on a shelf, designer task lamp, leather desk pad, fresh flowers, neutral palette. **Unacceptable:** kitchen counter, couch, bed, dining table, exposed cables, child/family photos, visible TV, leisure clothing draped over a chair, slippers, coffee table with magazines. The setting must read "I run a practice from this room," not "I checked in from home today." |
| **Patient demographic** | N/A — no patient required in this asset. If a chart photo on the tablet shows any face, that face must comply with the patient demographic rules in Asset 1 (35–55, professional). |
| **Diversity requirement** | Distinct provider from Asset 1 — different skin tone and ideally different credential category (if Asset 1 is an MD, Asset 2 is an NP, etc.). Across Assets 1+2 (and Asset 3 if a human is present), the combined set must span at least three skin tones. |
| **Forbidden elements** | Slippers. Leisurewear. Robes. Athleisure. Coffee mugs with novelty text. Pets. Visible TV or gaming setup. Kitchen appliances. Anything that reads as "remote knowledge worker on a Tuesday." Phone-up-to-ear poses. Headsets that read as call-center. |
| **Approved alt text (final asset)** | `Licensed provider managing a concierge aesthetic practice on a mobile clinical operating system.` |
| **HTML loading attrs** | `loading="lazy"` (below-the-fold). |

---

## Asset 3 — Revenue / Payout

| Field | Specification |
|---|---|
| **Asset name** | Revenue / Payout — Direct-Deposit Dashboard |
| **File path (1x)** | `/assets/provider-payout-dashboard.jpg` |
| **File path (WebP 1x)** | `/assets/provider-payout-dashboard.webp` |
| **File path (2x)** | `/assets/provider-payout-dashboard@2x.jpg` |
| **File path (WebP 2x)** | `/assets/provider-payout-dashboard@2x.webp` |
| **Section / use** | Homepage Professional Suite block, "Your Revenue, Protected" magazine card (`index.html` ~line 491). Replaces `TaxMess.png` (current 1200x800 placeholder). |
| **Required dimensions** | 1200x900 (1x), 2400x1800 (2x). 4:3 to match Asset 2's card geometry. |
| **Required format** | WebP primary, JPG fallback. Quality target ~85 WebP / ~80 JPG. sRGB. If a stylized UI mock is used, render at native 2x resolution to preserve text crispness. |
| **Subject & composition** | A clean, restrained representation of a payout / dashboard view on a laptop or tablet — preferably a stylized UI mock rather than stock photography. The dashboard should read as institutional financial software (think: Stripe Treasury, Mercury, Plaid Asset) — calm typography, generous whitespace, a single bar/line chart, line items rendered as anonymized rows ("Patient — Treatment — Date — Amount"). **Use illustrative figures only.** Do NOT render specific dollar amounts that imply guaranteed earnings (Rule 8). If amounts must appear, use rounded round-number ranges (e.g., `$—,—`) or partially blurred values. The chart axis should NOT be labeled in dollars in a way that could be screenshotted as an earnings claim. |
| **Wardrobe (if human present)** | Optional. If included, must be a licensed provider in clinical attire reviewing the dashboard — same wardrobe constraints as Assets 1 and 2. A purely device-on-surface composition (no human) is acceptable and arguably preferred for compliance. |
| **Setting** | Neutral surface — leather portfolio, marble countertop, walnut desk, or linen. Soft natural light. Out-of-focus background that reads professional (bookshelf, neutral wall, framed art). No identifiable brand logos on the device shell. |
| **Patient demographic** | N/A. Any names rendered on the dashboard mock must be fully fictional and visibly anonymized (initials, "Patient A / Patient B" pattern, OR redacted-bar treatment). |
| **Diversity requirement** | If a human is included, must contribute to the cross-asset skin-tone and credential-category balance described in Assets 1 and 2. |
| **Forbidden elements** | Cash. Stacks of bills. Coins. Dollar-sign iconography rendered at hero size. Wallets. Watches that read as conspicuous wealth signaling (no Patek, no AP). Any "get rich quick" cue. Promised dollar figures rendered legibly. Specific patient names. Any UI that resembles a consumer banking or peer-payment app (no Venmo / CashApp / Zelle visual language). Stock photography of "happy person at a laptop." |
| **Approved alt text (final asset)** | `Direct-deposit payout dashboard for a licensed aesthetic provider on Aesthetics To Go.` |
| **HTML loading attrs** | `loading="lazy"` (below-the-fold). |

---

## Swap-time checklist (when assets land — NOT Phase 4)

For each asset, the swap is one `<img>` tag edit on `index.html`:

1. Upload the WebP + JPG primary and 2x variants into `/assets/`.
2. Replace the `<img src="OLD_FILENAME">` line with a `<picture>` block:
   ```html
   <picture>
     <source type="image/webp" srcset="/assets/NAME.webp 1x, /assets/NAME@2x.webp 2x">
     <img src="/assets/NAME.jpg" srcset="/assets/NAME.jpg 1x, /assets/NAME@2x.jpg 2x"
          alt="APPROVED_ALT_TEXT" width="W" height="H" loading="LAZY_OR_EAGER" />
   </picture>
   ```
3. Remove the `2026-05-03 Phase 4: ... PENDING REPLACEMENT` HTML comment placed by Phase 4.
4. For Asset 1 (hero) only: review whether `og-image.jpg` and `twitter:image` should also be refreshed in the same commit so social previews stay visually aligned with the new hero. Per Phase 4 instruction, do not modify the OG/Twitter image src outside of that review.
5. Re-verify the homepage at 375 / 768 / 1280 viewport widths per Rule 11.
6. Run the Rule 14 verification checklist before commit.
7. After 30 days with no referrer hits to the old filenames in server logs (or, since this is GitHub Pages, after a 30-day quiet period), delete `ATG_in_home.jpg`, `WorkingFromHome.png`, and `TaxMess.png` in a separate commit.

---

## Notes on the three product-card images on the homepage supply block

Phase 4 instruction item 1 references "the three product card images on the supply block." Audit finding: those three cards (`index.html` lines ~617, 628, 639) do NOT use `<img>` tags. They use CSS-styled `<div class="mag-card-image">` placeholders with the SKU name rendered as text and `aria-hidden="true"`. There is no alt text to update. When real product photography is licensed for those SKUs (a separate effort tied to Task A — Phase 2 SKU expansion), the divs will be converted to `<img>` tags and alt text will be authored at that time per Rule 10.
