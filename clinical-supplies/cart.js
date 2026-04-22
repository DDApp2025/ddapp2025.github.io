/*
 * ATG Clinical Supplies — cart + Stripe Payment Link router.
 *
 * Loaded from every /clinical-supplies/* page. Exposes a single global
 * `window.cart` with:
 *
 *   cart.mount(opts?)              — inject icon + drawer + toast + modal (idempotent)
 *   cart.addSku(slug, qty?)        — add a SKU line item (or bump qty)
 *   cart.addBundle(id, qty?)       — add a bundle line item (or bump qty)
 *   cart.remove(type, slug)
 *   cart.updateQty(type, slug, qty)
 *   cart.clear()
 *   cart.openDrawer() / closeDrawer()
 *   cart.checkout()                — routes per the 1/1+qty/multi-line rules
 *   cart.showToast(msg)
 *   cart.getItems()
 *
 * State:
 *   localStorage["atg_supply_cart"] = [{ slug, qty, type: "sku"|"bundle" }, ...]
 *
 * Pricing:
 *   Read from `CATALOG` (global, defined by catalog.js which loads first).
 *   Unlock state is derived from `document.body.classList.contains("unlocked")`
 *   or `window.gate.isUnlocked()` — so gate.js and cart.js stay decoupled.
 *
 * Stripe routing:
 *   1 line × qty 1  -> direct redirect to stripeLink
 *   1 line × qty>1  -> stripeLink + ?quantity=qty (Stripe Payment Link param)
 *   N > 1 lines     -> summary modal; each line has its own "Pay for this item"
 *                      link + a "Create bundle request" mailto for combined orders.
 *
 * No framework. Vanilla DOM. No server-side cart.
 */
(function () {
  "use strict";

  var STORAGE_KEY    = "atg_supply_cart";
  var TODO           = "TODO_STRIPE_LINK";
  var MAX_QTY        = 10;
  var SUPPORT_EMAIL  = "info@aestheticstogo.com";
  var TOAST_MS       = 2000;

  // DOM refs — created lazily in mount().
  var iconBtn         = null;
  var drawerEl        = null;
  var backdropEl      = null;
  var checkoutModalEl = null;
  var toastEl         = null;
  var toastTimer      = null;
  var lastFocusBefore = null;

  // ---- State --------------------------------------------------------

  function readItems() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var arr = JSON.parse(raw);
      if (!Array.isArray(arr)) return [];
      return arr.filter(function (it) {
        return it && typeof it.slug === "string"
          && typeof it.qty === "number" && it.qty > 0
          && (it.type === "sku" || it.type === "bundle");
      });
    } catch (e) { return []; }
  }

  function writeItems(arr) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }
    catch (e) { /* storage full or unavailable — silently drop */ }
  }

  function lookup(item) {
    if (typeof CATALOG === "undefined" || !CATALOG) return null;
    if (item.type === "sku") {
      for (var i = 0; i < CATALOG.skus.length; i++) {
        if (CATALOG.skus[i].slug === item.slug) return CATALOG.skus[i];
      }
      return null;
    }
    for (var j = 0; j < CATALOG.bundles.length; j++) {
      if (CATALOG.bundles[j].id === item.slug) return CATALOG.bundles[j];
    }
    return null;
  }

  function isReady(entry) {
    return !!(entry && typeof entry.stripeLink === "string" && entry.stripeLink && entry.stripeLink !== TODO);
  }

  function isUnlocked() {
    if (document.body.classList.contains("unlocked")) return true;
    if (window.gate && typeof window.gate.isUnlocked === "function") return window.gate.isUnlocked();
    return false;
  }

  function priceFor(item, entry) {
    if (item.type === "sku")    return isUnlocked() ? entry.injectorPrice : entry.publicPrice;
    /* bundle */                 return isUnlocked() ? entry.bundlePrice  : entry.listPrice;
  }

  function nameFor(item, entry) {
    return entry ? entry.name : item.slug;
  }

  function totalCount() {
    var items = readItems(), n = 0;
    for (var i = 0; i < items.length; i++) n += items[i].qty;
    return n;
  }

  function fmt(n) { return "$" + n.toLocaleString("en-US"); }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch];
    });
  }

  function stripeUrlFor(entry, qty) {
    if (!isReady(entry)) return "#";
    if (qty > 1) {
      var sep = entry.stripeLink.indexOf("?") === -1 ? "?" : "&";
      return entry.stripeLink + sep + "quantity=" + qty;
    }
    return entry.stripeLink;
  }

  // Early-access mailto for SKUs or bundles whose stripeLink is still
  // TODO_STRIPE_LINK. Rendered as a "Get Early Access" btn-outline
  // wherever we previously rendered a disabled "Coming Soon" button.
  // Returns null if the slug is not in CATALOG.
  function earlyAccessMailto(type, slug) {
    var entry = lookup({ type: type, slug: slug });
    if (!entry) return null;
    var name     = entry.name;
    var category = type === "sku" ? (entry.categoryLabel || "Clinical Supplies") : "Bundle";
    var subject  = "Early access request — " + name;
    var body = [
      "Hi ATG,",
      "",
      "I'd like early access to the following when it becomes available:",
      "",
      "Product: "  + name,
      "Category: " + category,
      "SKU: "      + slug,
      "",
      "My practice details:",
      "Name:",
      "License type (PA / NP / MD):",
      "State(s) licensed:",
      "Practice / business name:",
      "Best email:",
      "Phone:",
      "",
      "Thanks,",
      ""
    ].join("\n");
    return "mailto:" + SUPPORT_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body="    + encodeURIComponent(body);
  }

  // ---- Mutations ----------------------------------------------------

  function addRaw(type, slug, qty) {
    qty = Math.max(1, parseInt(qty || 1, 10) || 1);
    var items = readItems();
    var existing = null;
    for (var i = 0; i < items.length; i++) {
      if (items[i].type === type && items[i].slug === slug) { existing = items[i]; break; }
    }
    if (existing) {
      existing.qty = Math.min(MAX_QTY, existing.qty + qty);
    } else {
      items.push({ type: type, slug: slug, qty: Math.min(MAX_QTY, qty) });
    }
    writeItems(items);
    renderIcon();
    renderDrawerBody();
    return items;
  }

  function addSku(slug, qty) {
    var entry = lookup({ type: "sku", slug: slug });
    if (!entry) return;
    if (!isReady(entry)) { showToast("Coming soon — this SKU is not yet available for checkout."); return; }
    addRaw("sku", slug, qty);
    showToast("Added: " + entry.shortName);
    openDrawer();
  }

  function addBundle(id, qty) {
    var entry = lookup({ type: "bundle", slug: id });
    if (!entry) return;
    if (!isReady(entry)) { showToast("Coming soon — this bundle is not yet available for checkout."); return; }
    addRaw("bundle", id, qty);
    showToast("Added: " + entry.name);
    openDrawer();
  }

  function updateQty(type, slug, qty) {
    qty = parseInt(qty || 0, 10) || 0;
    if (qty <= 0) { remove(type, slug); return; }
    if (qty > MAX_QTY) qty = MAX_QTY;
    var items = readItems();
    for (var i = 0; i < items.length; i++) {
      if (items[i].type === type && items[i].slug === slug) { items[i].qty = qty; break; }
    }
    writeItems(items);
    renderIcon();
    renderDrawerBody();
  }

  function remove(type, slug) {
    var items = readItems().filter(function (it) { return !(it.type === type && it.slug === slug); });
    writeItems(items);
    renderIcon();
    renderDrawerBody();
  }

  function clear() {
    writeItems([]);
    renderIcon();
    renderDrawerBody();
  }

  // ---- Build DOM ----------------------------------------------------

  function buildIcon() {
    var btn = document.createElement("button");
    btn.className = "cart-icon-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "Open cart");
    btn.setAttribute("aria-haspopup", "dialog");
    btn.setAttribute("data-empty", "true");
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
           'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
        '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>' +
        '<path d="M3 6h18"/>' +
        '<path d="M16 10a4 4 0 0 1-8 0"/>' +
      '</svg>' +
      '<span class="cart-icon-badge" aria-hidden="true">0</span>';
    btn.addEventListener("click", openDrawer);
    return btn;
  }

  function buildDrawer() {
    backdropEl = document.createElement("div");
    backdropEl.className = "cart-drawer-backdrop";
    backdropEl.setAttribute("aria-hidden", "true");
    backdropEl.addEventListener("click", closeDrawer);

    drawerEl = document.createElement("aside");
    drawerEl.className = "cart-drawer";
    drawerEl.setAttribute("role", "dialog");
    drawerEl.setAttribute("aria-modal", "true");
    drawerEl.setAttribute("aria-labelledby", "cartDrawerTitle");
    drawerEl.setAttribute("aria-hidden", "true");
    drawerEl.innerHTML =
      '<div class="cart-drawer-header">' +
        '<h2 class="cart-drawer-title" id="cartDrawerTitle">Your cart</h2>' +
        '<button class="cart-drawer-close" type="button" aria-label="Close cart">×</button>' +
      '</div>' +
      '<div class="cart-drawer-body" id="cartDrawerBody"></div>' +
      '<div class="cart-drawer-footer" id="cartDrawerFooter"></div>';
    drawerEl.querySelector(".cart-drawer-close").addEventListener("click", closeDrawer);

    document.body.appendChild(backdropEl);
    document.body.appendChild(drawerEl);
  }

  function buildCheckoutModal() {
    checkoutModalEl = document.createElement("div");
    checkoutModalEl.className = "cart-checkout-modal";
    checkoutModalEl.setAttribute("role", "dialog");
    checkoutModalEl.setAttribute("aria-modal", "true");
    checkoutModalEl.setAttribute("aria-labelledby", "cartCheckoutTitle");
    checkoutModalEl.setAttribute("aria-hidden", "true");
    checkoutModalEl.innerHTML =
      '<div class="cart-checkout-content">' +
        '<button class="cart-checkout-close" type="button" aria-label="Close">×</button>' +
        '<h2 class="cart-checkout-title" id="cartCheckoutTitle">Checkout Summary</h2>' +
        '<p class="cart-checkout-intro">Each item opens its own secure Stripe checkout. For large combined orders, use one of the Bundle options from the catalog.</p>' +
        '<div id="cartCheckoutLines"></div>' +
        '<a id="cartBundleRequest" class="cart-bundle-request-link" href="#">Create bundle request →</a>' +
      '</div>';
    checkoutModalEl.querySelector(".cart-checkout-close").addEventListener("click", closeCheckoutModal);
    checkoutModalEl.addEventListener("click", function (e) {
      if (e.target === checkoutModalEl) closeCheckoutModal();
    });
    document.body.appendChild(checkoutModalEl);
  }

  function buildToast() {
    toastEl = document.createElement("div");
    toastEl.className = "cart-toast";
    toastEl.setAttribute("role", "status");
    toastEl.setAttribute("aria-live", "polite");
    document.body.appendChild(toastEl);
  }

  // ---- Rendering ----------------------------------------------------

  function renderIcon() {
    if (!iconBtn) return;
    var count = totalCount();
    var badge = iconBtn.querySelector(".cart-icon-badge");
    if (badge) badge.textContent = count > 99 ? "99+" : String(count);
    iconBtn.dataset.empty = count > 0 ? "false" : "true";
    iconBtn.setAttribute(
      "aria-label",
      count ? "Open cart (" + count + " item" + (count === 1 ? "" : "s") + ")" : "Open cart (empty)"
    );
  }

  function renderDrawerBody() {
    if (!drawerEl) return;
    var body   = drawerEl.querySelector("#cartDrawerBody");
    var footer = drawerEl.querySelector("#cartDrawerFooter");
    var items  = readItems();

    if (!items.length) {
      body.innerHTML =
        '<div class="cart-empty">' +
          '<div class="cart-empty-title">Your cart is empty.</div>' +
          '<p>Browse the catalog and add exosomes, post-procedure devices, or skincare actives.</p>' +
          '<a href="/clinical-supplies/">Browse the catalog →</a>' +
        '</div>';
      footer.innerHTML = "";
      return;
    }

    var subtotal = 0;
    body.innerHTML = items.map(function (it) {
      var entry = lookup(it);
      if (!entry) return "";
      var unit = priceFor(it, entry);
      var line = unit * it.qty;
      subtotal += line;
      var dataCat = it.type === "sku" ? entry.category : "bundle";
      var imgLabel = it.type === "sku" ? entry.shortName : entry.name;
      var name = nameFor(it, entry);
      var priceBadge = isUnlocked() ? "injector" : "retail";
      return (
        '<div class="cart-line" data-type="' + it.type + '" data-slug="' + escapeHtml(it.slug) + '">' +
          '<div class="cart-line-img" data-cat="' + dataCat + '">' + escapeHtml(imgLabel) + '</div>' +
          '<div>' +
            '<div class="cart-line-name">' + escapeHtml(name) + '</div>' +
            '<div class="cart-line-price">' + fmt(unit) + " " + priceBadge + " · ea</div>" +
            '<div class="cart-line-controls">' +
              '<button class="cart-qty-btn" type="button" aria-label="Decrease quantity" data-action="dec">−</button>' +
              '<span class="cart-qty-value" aria-live="polite">' + it.qty + '</span>' +
              '<button class="cart-qty-btn" type="button" aria-label="Increase quantity" data-action="inc"' +
                (it.qty >= MAX_QTY ? ' disabled' : '') + '>+</button>' +
              '<button class="cart-line-remove" type="button" data-action="rm">Remove</button>' +
            '</div>' +
          '</div>' +
          '<div class="cart-line-total">' + fmt(line) + '</div>' +
        '</div>'
      );
    }).join("");

    // Wire line buttons
    Array.prototype.forEach.call(body.querySelectorAll(".cart-line"), function (lineEl) {
      var type = lineEl.dataset.type;
      var slug = lineEl.dataset.slug;
      Array.prototype.forEach.call(lineEl.querySelectorAll("[data-action]"), function (btn) {
        btn.addEventListener("click", function () {
          var items2 = readItems();
          var found = null;
          for (var i = 0; i < items2.length; i++) {
            if (items2[i].type === type && items2[i].slug === slug) { found = items2[i]; break; }
          }
          if (!found) return;
          var action = btn.dataset.action;
          if (action === "inc") updateQty(type, slug, found.qty + 1);
          else if (action === "dec") updateQty(type, slug, found.qty - 1);
          else if (action === "rm") remove(type, slug);
        });
      });
    });

    footer.innerHTML =
      '<div class="cart-subtotal-row">' +
        '<span class="cart-subtotal-label">Subtotal</span>' +
        '<span class="cart-subtotal-value">' + fmt(subtotal) + '</span>' +
      '</div>' +
      '<div class="cart-subtotal-note">' +
        (isUnlocked()
          ? "Injector pricing applied."
          : "Retail pricing shown — sign in on the catalog for injector pricing.") +
      '</div>' +
      '<button class="btn-primary cart-checkout-btn" id="cartCheckoutBtn" type="button">Checkout →</button>';
    footer.querySelector("#cartCheckoutBtn").addEventListener("click", checkout);
  }

  // ---- Drawer open/close + focus trap + Escape ----------------------

  function openDrawer() {
    if (!drawerEl) return;
    lastFocusBefore = document.activeElement;
    renderDrawerBody();
    backdropEl.classList.add("open");
    drawerEl.classList.add("open");
    drawerEl.setAttribute("aria-hidden", "false");
    backdropEl.setAttribute("aria-hidden", "false");
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keydown", trapTab, true);
    // Move focus into the drawer.
    setTimeout(function () {
      var first = drawerEl.querySelector(".cart-drawer-close");
      if (first) first.focus();
    }, 50);
  }

  function closeDrawer() {
    if (!drawerEl) return;
    backdropEl.classList.remove("open");
    drawerEl.classList.remove("open");
    drawerEl.setAttribute("aria-hidden", "true");
    backdropEl.setAttribute("aria-hidden", "true");
    document.removeEventListener("keydown", onKeyDown);
    document.removeEventListener("keydown", trapTab, true);
    if (lastFocusBefore && typeof lastFocusBefore.focus === "function") {
      try { lastFocusBefore.focus(); } catch (e) {}
    }
  }

  function openCheckoutModal() {
    if (!checkoutModalEl) return;
    checkoutModalEl.classList.add("open");
    checkoutModalEl.setAttribute("aria-hidden", "false");
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keydown", trapTab, true);
    setTimeout(function () {
      var first = checkoutModalEl.querySelector(".cart-checkout-close");
      if (first) first.focus();
    }, 50);
  }

  function closeCheckoutModal() {
    if (!checkoutModalEl) return;
    checkoutModalEl.classList.remove("open");
    checkoutModalEl.setAttribute("aria-hidden", "true");
    document.removeEventListener("keydown", trapTab, true);
    // onKeyDown stays — the drawer might still own it.
    if (drawerEl && !drawerEl.classList.contains("open")) {
      document.removeEventListener("keydown", onKeyDown);
    }
  }

  function onKeyDown(e) {
    if (e.key !== "Escape") return;
    if (checkoutModalEl && checkoutModalEl.classList.contains("open")) {
      closeCheckoutModal();
    } else if (drawerEl && drawerEl.classList.contains("open")) {
      closeDrawer();
    }
  }

  function trapTab(e) {
    if (e.key !== "Tab") return;
    var container = (checkoutModalEl && checkoutModalEl.classList.contains("open")) ? checkoutModalEl
                   : (drawerEl && drawerEl.classList.contains("open")) ? drawerEl
                   : null;
    if (!container) return;
    var focusables = container.querySelectorAll(
      'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    var first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    } else if (!container.contains(document.activeElement)) {
      e.preventDefault(); first.focus();
    }
  }

  // ---- Toast --------------------------------------------------------

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.innerHTML = '<span class="cart-toast-icon">✓</span>' + escapeHtml(msg);
    toastEl.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, TOAST_MS);
  }

  // ---- Checkout router ---------------------------------------------

  function checkout() {
    var items = readItems();
    if (!items.length) return;

    if (items.length === 1) {
      var only = items[0];
      var entry = lookup(only);
      if (!entry || !isReady(entry)) {
        showToast("This item is not ready for checkout yet.");
        return;
      }
      window.location.href = stripeUrlFor(entry, only.qty);
      return;
    }

    renderCheckoutLines(items);
    closeDrawer();
    openCheckoutModal();
  }

  function renderCheckoutLines(items) {
    var linesEl = checkoutModalEl.querySelector("#cartCheckoutLines");
    linesEl.innerHTML = items.map(function (it) {
      var entry = lookup(it);
      if (!entry) return "";
      var unit = priceFor(it, entry);
      var total = unit * it.qty;
      var name = nameFor(it, entry);
      var disabled = !isReady(entry);
      var url = stripeUrlFor(entry, it.qty);
      var priceLabel = it.qty + " × " + fmt(unit) + (it.qty > 1 ? " = " + fmt(total) : "");
      return (
        '<div class="cart-checkout-line">' +
          '<div>' +
            '<div class="cart-checkout-line-label">' + escapeHtml(name) + '</div>' +
            '<div class="cart-checkout-line-meta">' + priceLabel + '</div>' +
          '</div>' +
          (disabled
            ? '<a class="btn-outline cart-checkout-pay" href="' + escapeHtml(earlyAccessMailto(it.type, it.slug) || "#") + '">Get Early Access</a>'
            : '<a class="btn-primary cart-checkout-pay" href="' + escapeHtml(url) + '" target="_blank" rel="noopener">Pay for this item</a>'
          ) +
        '</div>'
      );
    }).join("");

    // Bundle-request mailto with the cart prefilled in the body.
    var subject = encodeURIComponent("ATG Clinical Supplies — combined bundle request");
    var lines = [
      "Hello,",
      "",
      "I would like to place a single combined order for the following ATG Clinical Supplies items:",
      ""
    ];
    items.forEach(function (it) {
      var entry = lookup(it);
      if (!entry) return;
      var unit = priceFor(it, entry);
      lines.push(" - " + nameFor(it, entry) + "  ×  " + it.qty + "   (" + fmt(unit) + " ea)");
    });
    lines.push("", "Please invoice me directly — I'd prefer one transaction rather than a separate Stripe checkout per item.", "", "Thanks.");
    var body = encodeURIComponent(lines.join("\n"));
    checkoutModalEl.querySelector("#cartBundleRequest").href =
      "mailto:" + SUPPORT_EMAIL + "?subject=" + subject + "&body=" + body;
  }

  // ---- Mount --------------------------------------------------------

  function mount(opts) {
    opts = opts || {};
    var containerSel = opts.iconContainer || ".header-cta";
    var container    = document.querySelector(containerSel);

    if (container) {
      var existing = container.querySelector(".cart-icon-btn");
      if (existing) {
        iconBtn = existing;
      } else {
        iconBtn = buildIcon();
        // Insert before the first child so the cart icon sits LEFT of the
        // existing "Free EHR Access" button in the header.
        container.insertBefore(iconBtn, container.firstChild);
      }
    }

    if (!drawerEl)        buildDrawer();
    if (!checkoutModalEl) buildCheckoutModal();
    if (!toastEl)         buildToast();

    renderIcon();
    renderDrawerBody();
  }

  window.cart = {
    mount:              mount,
    addSku:             addSku,
    addBundle:          addBundle,
    remove:             remove,
    updateQty:          updateQty,
    clear:              clear,
    openDrawer:         openDrawer,
    closeDrawer:        closeDrawer,
    checkout:           checkout,
    showToast:          showToast,
    getItems:           readItems,
    earlyAccessMailto:  earlyAccessMailto
  };
})();
