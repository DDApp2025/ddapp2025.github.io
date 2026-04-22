/*
 * ATG Clinical Supply — soft email gate (client).
 *
 * Loaded as a classic script from every /clinical-supplies/* page.
 * Exposes a single global `window.gate` with four entry points:
 *
 *   gate.isUnlocked()                 -> boolean (reads localStorage + checks 30d expiration)
 *   gate.attemptUnlock(email)         -> Promise<{ok:boolean, reason?:string}>
 *   gate.renderPrices()               -> toggles `body.unlocked` if storage says we're unlocked
 *   gate.bindGateForm(formElement)    -> wires up the banner form on the landing page
 *
 * Architecture:
 *   1) Client-side fast-fail: regex + DISPOSABLE_DOMAINS blocklist (common throwaway providers).
 *   2) If fast-fail passes, POST to the Cloudflare Worker at WORKER_URL, which calls
 *      Check-Mail.org (MX + disposable + role-email check) and then Brevo transactional API
 *      to notify info@aestheticstogo.com. All secrets live in Worker env vars, never here.
 *   3) On Worker { ok:true }, write { email, ts, method:"soft" } to localStorage under
 *      STORAGE_KEY and add `body.unlocked` so CSS reveals injector prices site-wide.
 *   4) Unlocks expire 30 days after ts. Expired unlocks are cleared and the user re-gates.
 *
 * No password, no account creation. Email only.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "atg_supply_unlocked";
  var MAX_AGE_MS  = 30 * 24 * 60 * 60 * 1000; // 30 days
  var WORKER_URL  = "https://atg-email-verify.aestheticstogo.workers.dev";

  // RFC-5322 approximation — good enough as a fast-fail before the network call.
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Role-address local parts that the Worker will also reject server-side.
  // Kept in sync here so the client can give a faster, friendlier error.
  var ROLE_LOCAL_PARTS = [
    "admin","administrator","info","sales","support","help","contact","office",
    "billing","accounts","hello","team","marketing","noreply","no-reply","donotreply",
    "postmaster","webmaster","hostmaster","abuse","security","privacy","legal"
  ];

  // Disposable / throwaway email provider blocklist. ~200 entries curated from the
  // disposable-email-domains project (https://github.com/disposable-email-domains/
  // disposable-email-domains) and related public lists. Refresh from upstream
  // periodically; treat this file as the snapshot, not the source of truth.
  var DISPOSABLE_DOMAINS = [
    "0clickemail.com","10minutemail.co.uk","10minutemail.com","10minutemail.net",
    "20minutemail.com","20minutemail.it","33mail.com","anonaddy.me","anonbox.net",
    "anonmails.de","anonymbox.com","armyspy.com","binkmail.com","burnermail.io",
    "byom.de","chacuo.net","chong-mail.org","cuvox.de","dayrep.com","deadfake.com",
    "discard.email","discardmail.com","discardmail.de","dispo.mail.id","disposable.ga",
    "disposable.site","dispostable.com","dropmail.me","dudmail.com","e4ward.com",
    "einrot.com","email60.com","emaildrop.io","emailfake.com","emailfake.nut.cc",
    "emailgo.de","emailias.com","emailondeck.com","emailsensei.com","emailtemporanea.com",
    "emailtemporanea.net","fake-mail.cf","fake-mail.ga","fake-mail.ml","fake-mail.pp.ua",
    "fake-mail.tk","fakeinbox.com","fakemail.com","fakemail.fr","fakemail.net",
    "fakemailgenerator.com","fakermail.com","fastacura.com","fleckens.hu","getairmail.com",
    "getairmail.net","getnada.com","grr.la","guerrillamail.biz","guerrillamail.com",
    "guerrillamail.de","guerrillamail.info","guerrillamail.net","guerrillamail.org",
    "gustr.com","harakirimail.com","hmamail.com","inboxbear.com","inboxkitten.com",
    "incognitomail.org","instantemailaddress.com","jetable.org","jourrapide.com",
    "letthemeatspam.com","lookugly.com","mail-now.top","mail-temporaire.fr","mailbox52.ga",
    "mailcatch.com","maildrop.cc","maildu.de","maildx.com","mailed.ro","mailexpire.com",
    "mailforspam.com","mailfreeonline.com","mailfs.com","mailhz.me","mailin8r.com",
    "mailinatr.com","mailinator.com","mailinator.net","mailinator.org","mailinator2.com",
    "mailmetrash.com","mailmoat.com","mailnesia.com","mailnull.com","mailsac.com",
    "mailslite.com","mailticket.ru","mailtothis.com","mbx.cc","meltmail.com",
    "mierdamail.com","migmail.net","mintemail.com","moakt.com","mohmal.com",
    "mrmailspam.com","mt2014.com","mt2015.com","mt2016.com","mt2017.com","mvrht.com",
    "mytemp.com","mytemp.email","mytempemail.com","nada.email","nepwk.com","netmails.net",
    "nomail.ch","nomail.xl.cx","notsharingmy.info","nowmymail.com","nwldx.com",
    "objectmail.com","opayq.com","ourklips.com","owlpic.com","parisjazzclub.com",
    "pjjkp.com","pokemail.net","poofy.org","privymail.de","proxymail.eu","quickinbox.com",
    "rcpt.at","reallymymail.com","regbypass.com","relay.firefox.com","rhyta.com",
    "rootfest.net","safe-mail.net","saynotospams.com","sendspamhere.com","sharklasers.com",
    "shieldedmail.com","simplelogin.com","simplelogin.io","skeefmail.com","smashmail.de",
    "snakemail.com","snapmail.cc","sogetthis.com","solvemail.info","spam.la","spam4.me",
    "spamavert.com","spambog.com","spambog.de","spambog.ru","spambox.us","spamevader.com",
    "spamfree24.com","spamfree24.de","spamfree24.eu","spamfree24.info","spamfree24.net",
    "spamfree24.org","spamgourmet.com","spamherelots.com","spamhole.com","spamify.com",
    "spammotel.com","spamspot.com","stuffmail.de","superplatyna.com","superrito.com",
    "teleworm.us","tempails.com","tempbox.app","tempemail.co","tempemail.com",
    "tempemail.net","tempemailaddress.com","tempemailer.com","tempinbox.com","tempmail.com",
    "tempmail.de","tempmail.net","tempmail.ninja","tempmail.ru","tempmail.us",
    "tempmail2.com","tempmailaddress.com","tempmailbox.com","tempmailo.com",
    "tempmailzone.com","tempomail.com","tempomail.fr","tempomail.org","tempr.email",
    "tempymail.com","thankyou2010.com","thisisnotmyrealemail.com","throam.com",
    "throwam.com","throwaway.email","throwawaymail.com","trashinbox.com","trashmail.com",
    "trashmail.io","trashmail.me","trashmail.net","trayna.com","trbvm.com","trbvn.com",
    "uggsrock.com","uroid.com","wegwerfemail.com","wegwerfemail.de","wegwerfemail.net",
    "wegwerfemail.org","wegwerpmailadres.nl","wemel.top","whatpaas.com","wilemail.com",
    "xoxy.net","yepmail.net","yopmail.com","yopmail.fr","yopmail.net","zoemail.com",
    "zoemail.org"
  ];

  // Set of disposable domains for O(1) lookup.
  var DISPOSABLE_SET = (function () {
    var s = Object.create(null);
    for (var i = 0; i < DISPOSABLE_DOMAINS.length; i++) s[DISPOSABLE_DOMAINS[i]] = 1;
    return s;
  })();

  function now() { return Date.now(); }

  function splitEmail(email) {
    var at = email.lastIndexOf("@");
    if (at < 1 || at === email.length - 1) return null;
    return { local: email.slice(0, at), domain: email.slice(at + 1).toLowerCase() };
  }

  function readStoredUnlock() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed.ts !== "number") return null;
      return parsed;
    } catch (e) {
      return null;
    }
  }

  function writeStoredUnlock(email) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ email: email, ts: now(), method: "soft" })
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  function clearStoredUnlock() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  // ---- Public API -------------------------------------------------------

  function isUnlocked() {
    var rec = readStoredUnlock();
    if (!rec) return false;
    if (now() - rec.ts > MAX_AGE_MS) {
      clearStoredUnlock();
      return false;
    }
    return true;
  }

  /**
   * attemptUnlock(email) -> Promise<{ok, reason?}>
   *
   * Reasons on { ok:false }:
   *   "format"     — regex failed
   *   "disposable" — client blocklist hit
   *   "role"       — client role-prefix hit (info@, admin@, ...)
   *   "network"    — Worker unreachable / non-JSON response
   *   "rate"       — Worker returned 429
   *   other string — server-side reason passed through
   */
  function attemptUnlock(email) {
    email = String(email || "").trim().toLowerCase();

    if (!EMAIL_RE.test(email) || email.length > 254) {
      return Promise.resolve({ ok: false, reason: "format" });
    }
    var parts = splitEmail(email);
    if (!parts || parts.local.length > 64) {
      return Promise.resolve({ ok: false, reason: "format" });
    }
    if (DISPOSABLE_SET[parts.domain]) {
      return Promise.resolve({ ok: false, reason: "disposable" });
    }
    if (ROLE_LOCAL_PARTS.indexOf(parts.local) !== -1) {
      return Promise.resolve({ ok: false, reason: "role" });
    }

    return fetch(WORKER_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: email })
    }).then(function (res) {
      if (res.status === 429) return { ok: false, reason: "rate" };
      return res.json().catch(function () { return { ok: false, reason: "network" }; });
    }).then(function (body) {
      if (body && body.ok === true) {
        writeStoredUnlock(email);
        return { ok: true };
      }
      return { ok: false, reason: (body && body.reason) || "unknown" };
    }).catch(function () {
      return { ok: false, reason: "network" };
    });
  }

  function renderPrices() {
    if (isUnlocked()) {
      document.body.classList.add("unlocked");
    }
  }

  function humanReason(reason) {
    if (reason === "format") {
      return "That email address does not look right. Double-check the format.";
    }
    if (reason === "disposable") {
      return "That looks like a personal throwaway address - try your professional email.";
    }
    if (reason === "role") {
      return "Please use a personal professional email, not a role address like info@ or admin@.";
    }
    if (reason === "rate") {
      return "Too many attempts from this network. Please try again in a minute.";
    }
    if (reason === "network") {
      return "We could not reach the verification service. Please try again in a moment.";
    }
    return "We could not verify that email. Try a different address or contact info@aestheticstogo.com.";
  }

  function bindGateForm(formElement) {
    if (!formElement) return;

    var input    = formElement.querySelector("input[type=email], input[name=email]");
    var button   = formElement.querySelector("button[type=submit], button");
    var success  = formElement.querySelector(".gate-banner-success");
    var errorEl  = formElement.querySelector(".gate-banner-error");

    // Create a dedicated error node if the markup didn't include one.
    if (!errorEl) {
      errorEl = document.createElement("div");
      errorEl.className = "gate-banner-error";
      errorEl.setAttribute("role", "alert");
      errorEl.style.cssText = "display:none;color:#c0392b;font-size:.82rem;margin-top:.5rem;width:100%";
      formElement.appendChild(errorEl);
    }

    var originalButtonText = button ? button.textContent : "";

    function setBusy(isBusy) {
      if (!button) return;
      button.disabled = !!isBusy;
      if (input) input.disabled = !!isBusy;
      button.textContent = isBusy ? "Verifying..." : originalButtonText;
    }

    function showError(msg) {
      errorEl.textContent = msg;
      errorEl.style.display = "block";
    }
    function clearError() {
      errorEl.style.display = "none";
      errorEl.textContent = "";
    }

    function showSuccess() {
      if (button) {
        button.textContent = "Unlocked ✓";
        button.style.background = "#2f855a";
        button.style.boxShadow = "0 10px 25px rgba(47,133,90,.35)";
      }
      if (success) success.style.display = "inline";
      // Add the unlock class so CSS reveals injector prices everywhere.
      document.body.classList.add("unlocked");
      // Fade out the gate banner after a short confirmation window.
      var banner = document.getElementById("gateBanner") || formElement.closest(".gate-banner");
      if (banner) {
        banner.style.transition = "opacity .5s ease-out";
        setTimeout(function () { banner.style.opacity = "0"; }, 1400);
        setTimeout(function () { banner.style.display = "none"; }, 1950);
      }
    }

    formElement.addEventListener("submit", function (e) {
      e.preventDefault();
      clearError();
      if (!input) return;
      var email = input.value.trim();
      setBusy(true);
      attemptUnlock(email).then(function (result) {
        if (result.ok) {
          showSuccess();
          // Leave input disabled — unlock is a one-time action per session.
          return;
        }
        setBusy(false);
        showError(humanReason(result.reason));
      });
    });

    // If the user arrives already unlocked, hide the banner immediately.
    if (isUnlocked()) {
      var banner2 = document.getElementById("gateBanner") || formElement.closest(".gate-banner");
      if (banner2) banner2.style.display = "none";
    }
  }

  window.gate = {
    isUnlocked: isUnlocked,
    attemptUnlock: attemptUnlock,
    renderPrices: renderPrices,
    bindGateForm: bindGateForm,
    WORKER_URL: WORKER_URL,
    DISPOSABLE_DOMAINS: DISPOSABLE_DOMAINS
  };
})();
