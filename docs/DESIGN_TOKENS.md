# ATG Design Tokens & Source-of-Truth Audit

> Read-only audit of `index.html` (root, 41,246 bytes, last modified Apr 21 12:51 2026) and all linked CSS/JS/assets.
> Authoritative reference for every future page or section built on aestheticstogo.com.
> Do not deviate from these tokens without an explicit, documented design decision.

---

## 1. Typography

### 1.1 Font Loading (in `<head>`)

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

Two Google Fonts families are loaded:

| Family | Weights loaded | Use |
|---|---|---|
| **Playfair Display** (serif) | 500, 700 | All headings, brand wordmark, card titles |
| **Inter** (sans-serif) | 300, 400, 500, 600, 700 | Body, nav, buttons, eyebrows, pills, meta |

No other font CDN. No self-hosted fonts. No icon font.

### 1.2 Font-family stacks (as written in CSS)

| Token | Stack |
|---|---|
| Body / UI | `"Inter", system-ui` |
| Display / headings | `"Playfair Display", serif` |

### 1.3 Heading sizes & line-heights

| Element | Class | font-family | size | line-height | weight | color |
|---|---|---|---|---|---|---|
| Brand wordmark | `.logo-brand` | Playfair Display | `1.4rem` | inherits 1.5 | 700 | `#111` |
| Hero `<h1>` | `.hero-title` | Playfair Display | `clamp(2.4rem, 4.2vw, 3.8rem)` | `1.05` | 500 (default) | `#201812` |
| Hero card title | `.hero-card-title` | Playfair Display | `1.35rem` | inherits 1.5 | 500 (default) | `--text-main` |
| Section `<h2>` (How / Magazine) | `.how-title`, `.magazine-title` | Playfair Display | `1.4rem` (uppercase, `letter-spacing:.12em`) | inherits 1.5 | 500 | `--text-main` |
| Card `<h3>` (How) | `.how-card-title` | Playfair Display | `1.02rem` | inherits 1.5 | 500 | `--text-main` |
| Card `<h3>` (Magazine) | `.mag-card-title` | Playfair Display | `1.05rem` | inherits 1.5 | 500 | `--text-main` |
| CTA band heading | `.cta-heading` | Playfair Display | `1.5rem` | inherits 1.5 | 500 | `#fef6ee` (on dark) |
| Modal heading | `.modal h2` | Playfair Display | `1.8rem` | inherits 1.5 | 500 | `--text-main` |

### 1.4 Body & supporting text

| Element | size | line-height | color |
|---|---|---|---|
| `body` | browser default `1rem` (16px) | `1.5` | `--text-main` (`#2a2520`) |
| Hero subtitle | `1rem` | `1.5` | `--text-muted` (`#7b6f63`) |
| Hero note / disclaimers | `.8rem` / `.72rem` / `.78rem` | 1.5 | `#9a8776`, `--text-muted` |
| Hero pill | `.8rem` | 1.5 | `#5b4c3c` |
| Eyebrow / kicker labels | `.75rem`–`.82rem`, `text-transform:uppercase`, `letter-spacing:.12em–.16em` | 1.5 | `--text-muted`, `--accent-dark`, `#7f6b57`, `#8b7766`, `#a08b77` |
| Card body text | `.9rem` | 1.5 | `--text-muted` |
| Nav links | `.82rem`, uppercase, `letter-spacing:.06em` | 1.5 | `#4b433c` |
| Button labels | `.85rem`–`.86rem`, uppercase, `letter-spacing:.12em` | 1.5 | `#fff` (primary) / `#4b433c` (outline) |
| Footer | `.78rem` (links) / `.74rem` (copyright) | 1.5 | `#968371` / `#b0a293` |
| Top announcement bar | `.82rem`, uppercase, `letter-spacing:.08em` | 1.5 | `#fceee8` |

### 1.5 Letter-spacing system

The site uses uppercase + tracked letter-spacing as a recurring stylistic device:

| Use | letter-spacing |
|---|---|
| Nav links | `.06em` |
| Top bar | `.08em` |
| Logo brand | `.08em` |
| Card titles (uppercase section headings) | `.12em` |
| Buttons (primary/outline) | `.12em` |
| Pills, footer links | `.12em` |
| Eyebrows / kickers | `.15em`–`.16em` |
| Logo tagline | `.16em` |

---

## 2. Color Palette

### 2.1 CSS custom properties (the canonical token block)

Defined on `:root` at the top of the inline `<style>`:

```css
--bg:#ffffff;
--bg-soft:#ffffff;
--text-main:#2a2520;
--text-muted:#7b6f63;
--accent:#c49652;
--accent-dark:#a67930;
--border-soft:#e3d6c5;
--border-strong:#d2b894;
--card-bg:#fdf8f3;
--pill-bg:#f4f4f4;
--shadow-soft:0 18px 55px rgba(0,0,0,.06);
--shadow-strong:0 24px 60px rgba(24,16,8,.16);
```

### 2.2 Every unique color value used on the page (with role)

| Hex / rgba | Role | Where it appears |
|---|---|---|
| `#ffffff` | Primary background | `body`, `--bg`, `--bg-soft`, header wrapper, hero, sections, footer, btn-outline, modal content |
| `#fdf8f3` | Card background (warm cream) | `--card-bg`; hero card, how cards, magazine cards |
| `#fffaf4` | Step-circle background | `.how-step` |
| `#fef6ee` | Body text on dark CTA band | `.cta-band` text color |
| `#fceee8` | Top-bar text | `.top-bar` foreground |
| `#fcede1` | Hero tag text | `.hero-tag` foreground |
| `#f6e1cf` | CTA-band secondary text | `.cta-text`, `.faq-item-answer` |
| `#f4ece0` | Magazine card image placeholder bg | `.mag-card-image` |
| `#f4f4f4` | Pill background (neutral) | `--pill-bg` |
| `#ded8cf` | Pill border | `.hero-pill` |
| `#e3d6c5` | Soft border (most dividers) | `--border-soft`; header bottom, feature strip, footer top |
| `#d2b894` | Strong border (cards, hero card) | `--border-strong`; how-card, mag-card, hero-card, how-step |
| `#c9bcad` | Outline button border (default) | `.btn-outline` |
| `#c49652` | **Primary accent (gold)** | `--accent`; btn-primary bg, hero `<span>`, accent hovers, link-style accents, login modal accent |
| `#C5973B` | Video logo overlay bg | `.video-logo-overlay` (inline-uppercased hex; near-equivalent to accent) |
| `#c9a96e` | Footer social link color | `.footer-social a` (slightly lighter gold) |
| `#a67930` | **Accent dark (gold pressed/hover)** | `--accent-dark`; btn-primary hover, hero eyebrow, hero-secondary span |
| `#a08b77` | Magazine card meta | `.mag-card-meta` |
| `#9a8776` | Hero note / disclaimers | `.hero-note`, hero asterisk lines |
| `#968371` | Footer link color | `footer`, `.footer-row a` |
| `#8b7766` | How card eyebrow / step text / mag eyebrow | `.how-step`, `.mag-card-eyebrow` |
| `#7f6b57` | Hero card eyebrow label | `.hero-card-label` |
| `#7b6f63` | **Muted text** | `--text-muted`; subtitles, body small text, login modal subtitle |
| `#6b5d50` | Feature strip text | `.feature-strip-inner` |
| `#666` | Modal supporting text | `.modal p`, `.thank-you-message p` |
| `#5b4c3c` | Pill foreground text, login "Remember me" | `.hero-pill`, login label |
| `#4b433c` | Nav link color | `.nav a` |
| `#333` | Modal label text | `.modal label` |
| `#3b0e10` | **Top announcement bar bg** (deep maroon) | `.top-bar` |
| `#2a2520` | **Main body text** | `--text-main`; `.thank-you-message h2` |
| `#20120f` | Hero tag bg (near-black warm) | `.hero-tag` |
| `#20110c` | CTA band bg (near-black warm) | `.cta-band` |
| `#201812` | Hero h1 color (near-black warm) | `.hero-title` |
| `#111` | Logo brand text | `.logo-brand` |
| `#000` | Modal close hover, video bg | `.modal-close:hover`, `.video-wrapper` |
| `#c0392b` | Login error text | login modal error |
| `#999` | Modal close icon | `.modal-close` |
| `#ddd` | Modal input border | `.modal input/select/textarea` |
| `#b0a293` | Footer copy / copyright | `.footer-copy` |
| `rgba(0,0,0,.06)` | Soft shadow base | `--shadow-soft` |
| `rgba(24,16,8,.16)` | Strong shadow base | `--shadow-strong` |
| `rgba(0,0,0,.08)` | Outline btn hover shadow | `.btn-outline:hover` |
| `rgba(0,0,0,.1)` | Hero lifestyle photo shadow | `.hero-lifestyle` |
| `rgba(0,0,0,.12)` | Mag-card hover shadow | `.mag-card:hover` |
| `rgba(0,0,0,.25)` | Modal shadow | `.modal-content` |
| `rgba(0,0,0,.3)` | Video logo overlay shadow | `.video-logo-overlay` |
| `rgba(0,0,0,.4)` | Video wrapper shadow | `.video-wrapper` |
| `rgba(0,0,0,.5)` / `.7` | Sound toggle bg / hover | `.sound-toggle` |
| `rgba(0,0,0,.6)` | Modal scrim | `.modal` |
| `rgba(196,150,82,.35)` | Btn-primary glow | `.btn-primary` shadow |
| `rgba(166,121,48,.4)` | Btn-primary hover glow | `.btn-primary:hover` shadow |
| `rgba(10,5,2,.55)` | Hero tag shadow | `.hero-tag` |
| `rgba(255,255,255,.12)` | Video wrapper border | `.video-wrapper` |
| `rgba(255,255,255,.45)` | Hero card highlight gradient | `.hero-card::before` |

### 2.3 Roles summary (use these tokens, not raw hex)

- **Primary background:** `var(--bg)` = `#ffffff`
- **Card / panel background:** `var(--card-bg)` = `#fdf8f3`
- **Pill / neutral chip background:** `var(--pill-bg)` = `#f4f4f4`
- **Body text:** `var(--text-main)` = `#2a2520`
- **Muted / secondary text:** `var(--text-muted)` = `#7b6f63`
- **Primary accent (gold):** `var(--accent)` = `#c49652`
- **Accent pressed / hover:** `var(--accent-dark)` = `#a67930`
- **Soft border:** `var(--border-soft)` = `#e3d6c5`
- **Strong border (cards):** `var(--border-strong)` = `#d2b894`
- **Dark surface (CTA band, modals, hero tag):** `#20110c` / `#20120f` / `#3b0e10`
- **Soft shadow:** `var(--shadow-soft)` = `0 18px 55px rgba(0,0,0,.06)`
- **Strong shadow:** `var(--shadow-strong)` = `0 24px 60px rgba(24,16,8,.16)`

> ⚠ **One-off colors to consolidate** when extending: `#C5973B` (video overlay) and `#c9a96e` (footer social) are gold variants that should ideally collapse to `var(--accent)` and `var(--accent-dark)`. Do not introduce new gold values.

---

## 3. Spacing & Layout

### 3.1 Container

| Token | Value | Where |
|---|---|---|
| **Max content width** | `1200px` | `.header`, `.hero`, `.feature-strip-inner`, `.how-it-works`, `.magazine`, `.cta-inner`, `.footer-inner` |
| Centering | `margin: 0 auto` | All of the above |

### 3.2 Section padding

| Section | padding |
|---|---|
| `.header` | `1rem 1.5rem` |
| `.hero` | `3.5rem 1.5rem 3.2rem` |
| `.feature-strip-inner` | `1.25rem 1.5rem` |
| `.how-it-works` | `3.5rem 1.5rem 4rem` |
| `.magazine` | `3.5rem 1.5rem 4rem` |
| `.cta-band` | `3rem 1.5rem 3.2rem` |
| `footer` | `1.6rem 1.5rem 1.8rem` |
| `.top-bar` | `.55rem 1.5rem` |

**Standard horizontal gutter: `1.5rem`** on all section wrappers (24px at default browser size).
**Standard vertical section padding: ~`3.5rem` top / `3.2rem`–`4rem` bottom** for major sections.

### 3.3 Grid & gaps

| Token | Value |
|---|---|
| `.hero` columns | `minmax(0,1.1fr) minmax(0,.9fr)`, `gap:3.5rem`, collapses to 1-col `<960px` |
| `.how-grid` / `.magazine-grid` columns | `repeat(3, minmax(0,1fr))`, `gap:1.5rem` (collapses to 2-col `<960px`, 1-col `<720px`) |
| `.feature-strip-inner` gap | `1rem 1.7rem` (row × col) |
| `.cta-inner` gap | `2rem` |
| `.header` gap | `1.5rem` |

### 3.4 Border-radius scale

| Use | radius |
|---|---|
| Pills, buttons | `999px` (fully rounded) |
| Modal input fields | `12px` |
| Hero lifestyle image, video wrapper | `18px` |
| How / magazine cards | `18px` |
| Modal content | `20px` |
| Hero card | `26px` |
| Step circle | `999px` (`34×34` size) |
| Sound toggle | `50%` |

### 3.5 Shadow scale (in addition to tokens above)

- `0 10px 25px rgba(0,0,0,.08)` — outline button hover
- `0 12px 30px rgba(196,150,82,.35)` — btn-primary base
- `0 18px 40px rgba(166,121,48,.4)` — btn-primary hover
- `0 12px 35px rgba(0,0,0,.1)` — hero lifestyle photo
- `0 14px 35px rgba(10,5,2,.55)` — hero tag pill
- `0 18px 40px rgba(0,0,0,.4)` — video wrapper
- `0 22px 55px rgba(0,0,0,.12)` — magazine card hover
- `0 30px 80px rgba(0,0,0,.25)` — modal content
- `0 2px 8px rgba(0,0,0,.3)` — video logo overlay
- `var(--shadow-soft)` and `var(--shadow-strong)` (see §2.1)

### 3.6 Responsive breakpoints

```css
@media (max-width: 960px) { /* hero collapses to 1-col, how/mag grids to 2-col */ }
@media (max-width: 720px) { /* nav hides, how/mag grids to 1-col, hero top padding 2.4rem */ }
```

> Only two breakpoints. No mobile-first. No `min-width` queries.

---

## 4. Component Patterns

### 4.1 Top announcement bar

```html
<div class="top-bar"><strong>🔥 Free EHR for Aesthetic Injectors</strong> · $0/month. No merchant fees. Limited founding spots.</div>
```

```css
.top-bar{background:#3b0e10;color:#fceee8;text-align:center;padding:.55rem 1.5rem;font-size:.82rem;letter-spacing:.08em;text-transform:uppercase}
.top-bar strong{font-weight:600}
```

- Always full-bleed, deep maroon background.
- Single short line, uppercase, light tracking.
- Optional emoji prefix inside `<strong>`.

### 4.2 Header (logo + nav + CTA)

```html
<div class="header-wrapper">
  <header class="header">
    <div class="logo">
      <img src="atg_logo_white_bkg.jpg" alt="...">
      <div class="logo-text">
        <span class="logo-brand">Aesthetics To Go</span>
        <span class="logo-tagline">The Clinical Platform for Mobile PAs</span>
      </div>
    </div>
    <nav class="nav">
      <a href="/providers">For Providers</a>
      <a href="/botox">Botox</a>
      <a href="/fillers">Fillers</a>
      <a href="/blog">Blog</a>
      <a href="/careers">Careers</a>
      <a href="/about">About</a>
    </nav>
    <div class="header-cta">
      <button class="btn-primary" onclick="openModal()">Free EHR Access</button>
    </div>
  </header>
</div>
```

Key CSS:
- `.header-wrapper` — white bg, `border-bottom:1px solid var(--border-soft)`.
- `.header` — flex, `max-width:1200px`, `padding:1rem 1.5rem`, `gap:1.5rem`, items vertically centered, space-between.
- `.logo img` — `height:90px; width:auto`. Wordmark in Playfair, tagline in Inter.
- `.nav` — flex, `flex:1; justify-content:center; gap:2rem; font-size:.82rem`. Links uppercase, `letter-spacing:.06em`, weight 500, color `#4b433c`, hover → `--accent`.
- `.nav` is **hidden below 720px** — there is currently **no mobile menu / hamburger**. Any new section adding nav items must consider this.

### 4.3 Buttons

**Primary (gold pill, default CTA)**
```css
.btn-primary{
  display:inline-flex;align-items:center;justify-content:center;
  border-radius:999px;padding:.6rem 1.6rem;border:none;
  background:var(--accent);color:#fff;
  text-transform:uppercase;letter-spacing:.12em;font-weight:600;
  cursor:pointer;font-size:.86rem;
  box-shadow:0 12px 30px rgba(196,150,82,.35);
  transition:transform .16s ease-out, box-shadow .16s ease-out, background .16s ease-out;
}
.btn-primary:hover{
  background:var(--accent-dark);
  box-shadow:0 18px 40px rgba(166,121,48,.4);
  transform:translateY(-1px);
}
```

**Outline (white pill, secondary)**
```css
.btn-outline{
  border-radius:999px;padding:.55rem 1.2rem;
  border:1px solid #c9bcad;background:#fff;
  text-transform:uppercase;letter-spacing:.12em;font-weight:500;
  transition:all .18s ease-out;
}
.btn-outline:hover{
  border-color:var(--accent);color:var(--accent-dark);
  box-shadow:0 10px 25px rgba(0,0,0,.08);
}
```

> No tertiary/text-link button style is defined. "or see how it works" copy is plain text inside `.hero-secondary`.

### 4.4 Cards

**Hero card (gold-bordered cream, with radial gloss)**
```css
.hero-card{
  position:relative;background:var(--card-bg);
  border-radius:26px;padding:1.5rem 1.5rem 1.6rem;
  box-shadow:var(--shadow-strong);border:1px solid var(--border-strong);
  overflow:hidden;backdrop-filter:blur(6px);
}
.hero-card::before{
  content:"";position:absolute;inset:0;
  background:radial-gradient(circle at top right, rgba(255,255,255,.45), transparent 55%);
  pointer-events:none;
}
```

**"How it works" card (numbered, no image)**
```css
.how-card{
  background:var(--card-bg);border-radius:18px;
  padding:1.4rem 1.4rem 1.6rem;
  border:1px solid var(--border-strong);
  box-shadow:var(--shadow-soft);
  display:flex;flex-direction:column;gap:.4rem;
}
.how-step{
  width:34px;height:34px;border-radius:999px;
  border:1px solid var(--border-strong);
  display:inline-flex;align-items:center;justify-content:center;
  font-size:.82rem;letter-spacing:.12em;text-transform:uppercase;
  color:#8b7766;margin-bottom:.4rem;background:#fffaf4;
}
```

**Magazine card (image + body, hover lift)**
```css
.mag-card{
  background:var(--card-bg);border-radius:18px;overflow:hidden;
  display:flex;flex-direction:column;
  border:1px solid var(--border-strong);min-height:100%;
  box-shadow:var(--shadow-soft);
  transition:transform .16s ease-out, box-shadow .16s ease-out;
}
.mag-card:hover{transform:translateY(-3px);box-shadow:0 22px 55px rgba(0,0,0,.12)}
.mag-card-image{height:180px;overflow:hidden;background:#f4ece0}
.mag-card-image img{width:100%;height:100%;object-fit:cover;display:block}
.mag-card-body{padding:1.3rem 1.3rem 1.4rem;display:flex;flex-direction:column;gap:.45rem}
```

> Card pattern: cream bg `#fdf8f3` + 1px gold border `#d2b894` + 18px radius (26px for hero card) + soft shadow. **All future product/feature cards must follow this pattern.**

### 4.5 Pills (small chips)

```css
.hero-pill{
  background:var(--pill-bg);border-radius:999px;
  padding:.4rem .9rem;font-size:.8rem;
  text-transform:uppercase;letter-spacing:.12em;
  color:#5b4c3c;border:1px solid #ded8cf;
}
```

Used in hero for capability callouts. Reuse for filter chips / category badges.

### 4.6 Hero section (current "Stop Paying for Your EHR" version)

Two-column grid (`1.1fr / .9fr`, gap `3.5rem`, padding `3.5rem 1.5rem 3.2rem`). Left column: eyebrow → `<h1>` → subtitle → pill row → asterisk note → action row → footnote → lifestyle image. Right column: `.hero-card` containing label, title, vertical phone-format video (`<video autoplay loop muted playsinline>`, source `/AI_Demo.mp4`, 215px wide, `aspect-ratio:9/19.5`), AI Simulator overlay badge, sound toggle, subtitle, and absolutely-positioned `.hero-tag` pill ("Licensed PAs • NPs • MDs").

Below 960px the right column moves above the left (`.hero-media{order:-1}`), grid collapses to 1 column.

### 4.7 Feature strip

Full-bleed band between hero and "how it works", bordered top + bottom with `--border-soft`, items joined by `•` separators rendered via CSS `::before`.

### 4.8 CTA band (dark)

```css
.cta-band{background:#20110c;color:#fef6ee;padding:3rem 1.5rem 3.2rem}
```

Two-column on desktop (`flex` with `flex-wrap`): left = heading + body + CTA button; right = mini FAQ list. Used as a closing conversion section. **Reuse this for the supplies page closer.**

### 4.9 Footer

```css
footer{background:#fff;border-top:1px solid var(--border-soft);padding:1.6rem 1.5rem 1.8rem;font-size:.78rem;color:#968371}
```

Three centered rows in a flex column: primary nav row → city/legal row → social row → copyright. Links uppercase, `letter-spacing:.12em`. **Add the new "Clinical Supplies" link to the primary nav row in every footer instance, and keep the order: Botox, Fillers, For Providers, Blog, Careers, About, FAQ, Contact.**

### 4.10 Modal

```css
.modal{
  display:none;position:fixed;z-index:9999;
  left:0;top:0;width:100%;height:100%;
  overflow:auto;background:rgba(0,0,0,.6);
  align-items:flex-start;justify-content:center;padding:2rem 0;
}
.modal.active{display:flex}
.modal-content{
  background:#fff;padding:2.5rem;border-radius:20px;
  max-width:560px;width:90%;max-height:90vh;
  overflow-y:auto;position:relative;
  box-shadow:0 30px 80px rgba(0,0,0,.25);
}
.modal-close{
  position:absolute;top:1rem;right:1.5rem;
  font-size:2rem;cursor:pointer;color:#999;
}
.modal-close:hover{color:#000}
.modal h2{font-family:"Playfair Display",serif;font-size:1.8rem;text-align:center;margin-bottom:1rem}
.modal p{text-align:center;margin-bottom:2rem;color:#666}
.modal input,.modal select,.modal textarea{
  width:100%;padding:.9rem;margin:.8rem 0;
  border:1px solid #ddd;border-radius:12px;font-size:1rem;
}
.modal label{display:block;margin:.8rem 0 .5rem;font-size:1rem;color:#333}
```

Two modals exist on the homepage:
- `#claimModal` — founding-provider application, posts to Formspree (see §5.2).
- `#loginModal` — provider portal sign-in (currently a UI stub: form submits → "Invalid email or password" message; no real auth backend).

**Reuse this modal pattern** for the email-gate unlock on `/clinical-supplies` (one modal, one input, submit → call validator Worker → unlock injector pricing). Match radius `20px`, padding `2.5rem`, max-width `560px` (or `420px` for compact like login modal), border-radius on inputs `12px`, scrim `rgba(0,0,0,.6)`.

---

## 5. JavaScript Patterns

### 5.1 Modal open/close

```js
function openModal()       { document.getElementById('claimModal').classList.add('active'); }
function closeModal()      { document.getElementById('claimModal').classList.remove('active'); }
function openLoginModal()  { document.getElementById('loginModal').classList.add('active');
                             document.getElementById('loginForm').style.display = '';
                             document.getElementById('loginMessage').style.display = 'none'; }
function closeLoginModal() { document.getElementById('loginModal').classList.remove('active'); }

window.onclick = function(e) {
  if (e.target === document.getElementById('claimModal'))  closeModal();
  if (e.target === document.getElementById('loginModal'))  closeLoginModal();
};
```

Pattern: `.active` class toggle + click-outside-to-close. Vanilla JS, no framework. **Use this exact pattern for the supply email-gate modal.**

> ⚠ No `Esc` key handler. No focus trap. No `aria-hidden` toggling. If accessibility is in scope for the supply build, add these.

### 5.2 Form submission (Formspree)

```html
<form id="contactForm" action="https://formspree.io/f/xbdanjvw" method="POST">
```

```js
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = this;
  var formData = new FormData(form);
  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  }).then(function(response) {
    if (response.ok) {
      document.getElementById('formContainer').innerHTML =
        '<div class="thank-you-message"><h2>Application Received</h2>' +
        '<p>Our credentialing team will review your info and reach out within 24 hours.</p></div>';
    }
  });
});
```

- **Active Formspree endpoint:** `https://formspree.io/f/xbdanjvw`
- Headers: `Accept: application/json` (so Formspree returns JSON, not a redirect).
- Success: replace the form container's innerHTML with a `.thank-you-message` block.
- No error handler — if `response.ok` is false, the form just silently stays on screen.

Conditional checkbox-driven field reveal (the "Other city" pattern):
```js
var checkboxes = document.querySelectorAll('input[name="city[]"]');
for (var i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('change', function() {
    var otherInput = document.getElementById('otherCityInput');
    var otherChecked = false;
    for (var j = 0; j < checkboxes.length; j++) {
      if (checkboxes[j].value === 'Other' && checkboxes[j].checked) { otherChecked = true; break; }
    }
    otherInput.style.display = otherChecked ? 'block' : 'none';
    otherInput.required = otherChecked;
  });
}
```

### 5.3 Video sound toggle

```js
function toggleSound() {
  var v = document.getElementById('demoVideo');
  v.muted = !v.muted;
  event.target.innerHTML = v.muted ? '🔇' : '🔊';
}
```

Relies on global `event` (works in Chrome/Edge; deprecated/non-standard in others). Fine for current use; do not copy into new code without `(e)` parameter.

### 5.4 Login stub

```js
function handleLogin(e) {
  e.preventDefault();
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('loginMessage').style.display = 'block';
}
```

UI-only. Always shows "Invalid email or password." No backend wired.

### 5.5 FAQ accordion (vestigial)

```js
var faqItems = document.querySelectorAll('.faq-item-question');
for (var i = 0; i < faqItems.length; i++) {
  faqItems[i].addEventListener('click', function() {
    this.parentElement.classList.toggle('active');
  });
}
```

> ⚠ No CSS rule responds to `.faq-item.active` — toggling currently has no visual effect on the homepage. The FAQ items are always fully visible. Either wire `.faq-item.active .faq-item-answer { display:block }` (and a default collapsed state) or remove this code in a future cleanup.

### 5.6 Analytics & tracking pixels (loaded in `<head>`)

| Tool | ID | Notes |
|---|---|---|
| **Google Analytics (gtag.js)** | `G-01ND77ERR7` | Loaded async from `googletagmanager.com`. Standard `gtag('config', ...)` boot. |
| **Meta (Facebook) Pixel** | `2435992253512805` | Standard fbq init + `PageView` track + noscript `<img>` fallback. |
| **Google Search Console verification** | `google52a8a4460b8acba3` | `<meta name="google-site-verification">` + companion file `/google52a8a4460b8acba3.html` at root. |

No other pixels. No Hotjar, Segment, GTM container, LinkedIn, or X pixel.

### 5.7 Structured data (JSON-LD) currently emitted on `/`

Seven `<script type="application/ld+json">` blocks: `Organization`, `WebSite` (with name/desc), `MedicalBusiness` (with `areaServed` for Las Vegas/Henderson/Summerlin/Boulder City and a 3-item `OfferCatalog`), `FAQPage` (6 Q&As), `VideoObject` (AI_Demo.mp4), `BreadcrumbList`. **The `/clinical-supplies` page must add its own `Product` / `OfferCatalog` JSON-LD and a fresh `BreadcrumbList`.**

---

## 6. File & Asset Inventory

### 6.1 HTML files in repo (production pages)

Each subfolder uses an `index.html` inside it (clean URLs: `/about/`, `/blog/`, etc.).

| Path | Purpose |
|---|---|
| `index.html` | Homepage — provider-side hero, AI simulator showcase, how-it-works, magazine cards, CTA band, FAQ. **The file this audit is built from.** |
| `about/index.html` | About ATG page |
| `ai-simulator/index.html` | AI Diagnostic Simulator deep dive |
| `blog/index.html` | Blog index |
| `botox/index.html` | Mobile Botox service / SEO landing |
| `boulder-city/index.html` | Boulder City local SEO page |
| `careers/index.html` | Careers / hiring |
| `contact/index.html` | Contact form page |
| `faq/index.html` | Long-form FAQ page |
| `fillers/index.html` | Mobile fillers service / SEO landing |
| `hair-restoration/index.html` | Hair restoration service page |
| `henderson/index.html` | Henderson local SEO page |
| `las-vegas/index.html` | Las Vegas local SEO page |
| `privacy/index.html` | Privacy policy |
| `providers/index.html` | For-providers landing |
| `summerlin/index.html` | Summerlin local SEO page |
| `terms/index.html` | Terms of service |
| `providerapplication.html` | Standalone provider application page |
| `google52a8a4460b8acba3.html` | Google Search Console verification stub |

### 6.2 Files explicitly NOT in production (do not link, do not edit)

These are historical snapshots/backups left at the repo root. **Do not modify, link to, or use as starting points** without explicit sign-off — they will diverge from `index.html` and confuse future audits.

| Path | What it is |
|---|---|
| `index_2026_01_26_1529.html` | Dated snapshot (Jan 26, 2026) |
| `index_2026_01_28_1633.html` | Dated snapshot (Jan 28, 2026) |
| `index_WORKS GOOD_2026_02_12.html` | Snapshot marked as known-good (Feb 12, 2026) |
| `index_enhanced.html` | Experimental enhanced version |
| `index.pdf` | PDF render of homepage |
| `index.txt` | Plain-text dump of homepage |
| `_notes/` (entire folder, incl. `index-OLD.html`) | Loose working notes; currently untracked in git |

### 6.3 Image & media assets referenced from `index.html`

| Asset | Used by | Notes |
|---|---|---|
| `atg_logo_white_bkg.jpg` (~80 KB) | Header logo, both modal headers, OG fallback in JSON-LD | **Active logo file.** 90px high in header, 70px in modals. |
| `atg_logo_white_bg.jpg` (~86 KB) | — (duplicate-ish alternate, unreferenced from index) | Variant spelling; not in active use. |
| `atg_logo.png` (~1.6 MB) | — (not referenced from index) | Source/full-res logo. |
| `ATG_in_home.jpg` (~180 KB) | Hero left column lifestyle photo (`.hero-lifestyle`) | PA delivering treatment in patient home. |
| `BeforeAfter.png` (~425 KB) | Magazine card 1 (Diagnostic Precision) | Before/after results. |
| `WorkingFromHome.png` (~320 KB) | Magazine card 2 (Low-Overhead Practice) | PA on mobile EHR. |
| `TaxMess.png` (~133 KB) | Magazine card 3 (Your Revenue, Protected) | Direct deposit / fees imagery. |
| `before_after.jpg` (~108 KB) | — (not referenced from index) | Lowercase variant. |
| `AI_Demo.mp4` (~17.5 MB) | Hero card vertical video (`<source src="/AI_Demo.mp4">`) + JSON-LD `VideoObject` | The AI simulator demo. Vertical 9:19.5 aspect. |
| `og-image.jpg` (~124 KB) | OG / Twitter card image (`og:image`, `twitter:image`) | Social share preview. |

### 6.4 Site-config files at root

| File | Purpose |
|---|---|
| `CNAME` | GitHub Pages → `aestheticstogo.com` mapping (18 bytes) |
| `robots.txt` | Crawler directives |
| `sitemap.xml` | XML sitemap (3 KB) — **must be updated when `/clinical-supplies` ships** |
| `llms.txt` | Public LLM-discovery descriptor |
| `winget` | Empty file (0 bytes); appears stray — leave untouched |
| `google52a8a4460b8acba3.html` | Search Console verification (53 bytes) |

---

## 7. Conventions & Things to Carry Forward

These are the implicit rules that keep new pages visually coherent with the homepage:

1. **Two-font system only.** Playfair Display for headings/wordmark, Inter for everything else. Don't introduce a third typeface.
2. **Gold + warm-cream + warm-near-black.** Surfaces are white (`#fff`) or cream (`#fdf8f3`); accents are `--accent` (`#c49652`); deep backgrounds are warm near-black (`#20110c` family), never pure `#000`.
3. **Card recipe = cream bg + 1px gold border + ~18px radius + soft shadow.** Apply this for any new product/feature card on the supply page.
4. **Buttons are pill-shaped (`border-radius:999px`), uppercase, tracked.** Primary = solid gold; secondary = white with thin border.
5. **All section wrappers max-width `1200px`, horizontal padding `1.5rem`, vertical `~3.5rem`.**
6. **Tracked uppercase eyebrows** above every section title (`text-transform:uppercase; letter-spacing:.12em–.16em; color:--text-muted`).
7. **Two breakpoints only:** 960px (collapse to 2-col), 720px (collapse to 1-col, hide nav). Mobile menu does not yet exist site-wide — design around it or add one as part of the supply build.
8. **No build step.** All CSS inline in `<style>`, all JS inline in `<script>`. New pages should follow the same pattern (one self-contained HTML file per route).
9. **Modals = `.modal` + `.active` toggle + click-outside-to-close.** Reuse for the email-gate unlock.
10. **Forms post to Formspree** with `Accept: application/json` and replace innerHTML on success. The supply email gate should follow the same UX shape, but submit to the Cloudflare Worker validator (per spec §Stack) instead of Formspree.
11. **Hard copy rules** (from the project spec — bake into every new page):
    - Never use "marketplace", "med spa", or DoorDash analogies.
    - Never reference DivaDash / Diva-Dash / Diva Dash or any former brand.
    - All services under "Aesthetics To Go" brand only; "ATG Clinical Supplies" is a sub-brand.
    - Never quote a specific revenue split percentage — use "industry-leading".
    - Never mention Kelly Wellington, Dr. Deborah Kessler-Hudak, or Princess.
12. **Nav label for the new section: "Clinical Supplies"** (not "Clinical Supplies", not "Supplies", not "Shop"). Add it to both the header `.nav` and the footer `.footer-row` on every page.

---

*End of audit. Source: `index.html` @ commit `ad3c356` (HEAD of `main`), audited 2026-04-21.*
