/*
 * ATG Clinical Supply — Email Verify Worker.
 *
 * Cloudflare Worker that backs the soft email gate on /clinical-supplies/*.
 *
 * Pipeline:
 *   POST { email }
 *     -> rate-limit check (5 req/min per hashed IP, via KV namespace RATE_LIMIT)
 *     -> Check-Mail.org POST /v2 validation (MX + disposable + role)
 *     -> on valid: Brevo transactional email notification to info@aestheticstogo.com
 *     -> reply { ok:true } or { ok:false, reason:"..." }
 *
 * Secrets (set via `wrangler secret put`):
 *   CHECK_MAIL_API_KEY   — Check-Mail.org API key
 *   BREVO_API_KEY        — Brevo transactional API key
 *
 * Bindings (in wrangler.toml):
 *   kv_namespaces RATE_LIMIT — rate-limit counter storage
 *
 * Privacy:
 *   - Full email addresses are NEVER written to console.log or KV. KV keys are
 *     SHA-256 hashes of the client IP only.
 *   - The only place the submitted email lands beyond the live request is the
 *     one Brevo transactional email to info@aestheticstogo.com.
 */

const ALLOWED_ORIGINS = new Set([
  "https://aestheticstogo.com",
  "https://www.aestheticstogo.com",
  "http://localhost:8000",
  "http://127.0.0.1:8000"
]);

const RATE_LIMIT_MAX    = 5;
const RATE_LIMIT_WINDOW = 60; // seconds

const CHECK_MAIL_URL = "https://api.check-mail.org/v2";
const BREVO_URL      = "https://api.brevo.com/v3/smtp/email";

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin") || "";
    const corsOrigin = ALLOWED_ORIGINS.has(origin) ? origin : "https://aestheticstogo.com";

    // --- CORS preflight ---------------------------------------------------
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(corsOrigin)
      });
    }

    if (request.method !== "POST") {
      return jsonReply({ ok: false, reason: "method" }, 405, corsOrigin);
    }

    // --- Parse body -------------------------------------------------------
    let body;
    try {
      body = await request.json();
    } catch (_) {
      return jsonReply({ ok: false, reason: "bad_json" }, 400, corsOrigin);
    }
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return jsonReply({ ok: false, reason: "format" }, 400, corsOrigin);
    }

    // --- Rate limit (hashed-IP keys in KV) -------------------------------
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const ipHash = await sha256Hex(ip + "|" + (env.RATE_LIMIT_SALT || "atg-default-salt"));
    const rlKey  = "rl:" + ipHash;

    if (env.RATE_LIMIT) {
      try {
        const current = parseInt((await env.RATE_LIMIT.get(rlKey)) || "0", 10);
        if (current >= RATE_LIMIT_MAX) {
          return jsonReply({ ok: false, reason: "rate" }, 429, corsOrigin);
        }
        // Increment with a TTL that rolls forward the window.
        await env.RATE_LIMIT.put(rlKey, String(current + 1), { expirationTtl: RATE_LIMIT_WINDOW });
      } catch (err) {
        // KV outage should not block verification; just skip rate-limiting.
        console.log("[rate_limit] KV error, allowing request:", err?.message || String(err));
      }
    } else {
      // TODO: Create the RATE_LIMIT KV namespace and bind it in wrangler.toml.
      //       Run: wrangler kv namespace create atg_email_verify_ratelimit
      //       Then paste the returned id into [[kv_namespaces]].id in wrangler.toml.
      console.log("[rate_limit] RATE_LIMIT binding missing; skipping.");
    }

    // --- Check-Mail.org validation ---------------------------------------
    if (!env.CHECK_MAIL_API_KEY) {
      return jsonReply({ ok: false, reason: "server_config" }, 500, corsOrigin);
    }

    let checkMailResult;
    try {
      const cmRes = await fetch(CHECK_MAIL_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${env.CHECK_MAIL_API_KEY}`
        },
        body: JSON.stringify({ email })
      });
      if (!cmRes.ok) {
        console.log("[check-mail] HTTP", cmRes.status);
        return jsonReply({ ok: false, reason: "verification_unavailable" }, 502, corsOrigin);
      }
      checkMailResult = await cmRes.json();
    } catch (err) {
      console.log("[check-mail] fetch error:", err?.message || String(err));
      return jsonReply({ ok: false, reason: "verification_unavailable" }, 502, corsOrigin);
    }

    const verdict = interpretCheckMail(checkMailResult);
    if (!verdict.validMx)    return jsonReply({ ok: false, reason: "invalid_mx" }, 200, corsOrigin);
    if (verdict.disposable)  return jsonReply({ ok: false, reason: "disposable" }, 200, corsOrigin);
    if (verdict.role)        return jsonReply({ ok: false, reason: "role" }, 200, corsOrigin);

    // --- Brevo notification (best-effort — never blocks the unlock) ------
    const notifyCtx = {
      email,
      ts: new Date().toISOString(),
      userAgent: request.headers.get("User-Agent") || "unknown",
      ip
    };
    // Fire-and-forget via waitUntil so the response latency stays tight.
    ctx.waitUntil(sendBrevoNotification(env, notifyCtx));

    return jsonReply({ ok: true }, 200, corsOrigin);
  }
};

// =========================================================================
// Helpers
// =========================================================================

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin":  origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age":       "86400",
    "Vary":                         "Origin"
  };
}

function jsonReply(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      ...corsHeaders(origin)
    }
  });
}

async function sha256Hex(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Map Check-Mail.org's response to { validMx, disposable, role }.
 *
 * The API's exact field names can drift between versions. This helper
 * tolerates several shapes seen in the wild so a minor docs change does
 * not take the gate down. Confirm the live field names against
 * https://docs.check-mail.org before relying on any single key.
 */
function interpretCheckMail(r) {
  if (!r || typeof r !== "object") {
    return { validMx: false, disposable: false, role: false };
  }

  const validMx =
    r.valid_mx === true ||
    r.mx_found === true ||
    (r.mx && r.mx.valid === true) ||
    r.deliverable === true ||
    r.status === "valid" ||
    r.result === "valid" ||
    r.is_valid === true;

  const disposable =
    r.disposable === true ||
    r.is_disposable === true ||
    (r.flags && r.flags.disposable === true);

  const role =
    r.role === true ||
    r.is_role === true ||
    r.role_account === true ||
    (r.flags && r.flags.role === true);

  return { validMx: !!validMx, disposable: !!disposable, role: !!role };
}

async function sendBrevoNotification(env, info) {
  if (!env.BREVO_API_KEY) {
    console.log("[brevo] BREVO_API_KEY not set; skipping notification.");
    return;
  }

  const subject  = `ATG Clinical Supply — pricing unlocked by ${info.email}`;
  const textBody =
    "A new practitioner unlocked injector pricing on the ATG Clinical Supply catalog.\n\n" +
    "Email:      " + info.email + "\n" +
    "Timestamp:  " + info.ts + "\n" +
    "IP:         " + info.ip + "\n" +
    "User-Agent: " + info.userAgent + "\n";
  const htmlBody =
    "<p>A new practitioner unlocked injector pricing on the ATG Clinical Supply catalog.</p>" +
    "<table style=\"font-family:Inter,Arial,sans-serif;font-size:14px;border-collapse:collapse\">" +
      "<tr><td style=\"padding:4px 12px 4px 0;color:#7b6f63\">Email</td><td><strong>" + escapeHtml(info.email) + "</strong></td></tr>" +
      "<tr><td style=\"padding:4px 12px 4px 0;color:#7b6f63\">Timestamp</td><td>" + escapeHtml(info.ts) + "</td></tr>" +
      "<tr><td style=\"padding:4px 12px 4px 0;color:#7b6f63\">IP</td><td>" + escapeHtml(info.ip) + "</td></tr>" +
      "<tr><td style=\"padding:4px 12px 4px 0;color:#7b6f63\">User-Agent</td><td>" + escapeHtml(info.userAgent) + "</td></tr>" +
    "</table>";

  try {
    const res = await fetch(BREVO_URL, {
      method: "POST",
      headers: {
        "accept":       "application/json",
        "api-key":      env.BREVO_API_KEY,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        sender: { email: "info@aestheticstogo.com", name: "ATG Clinical Supply" },
        to:     [{ email: "info@aestheticstogo.com" }],
        subject,
        textContent: textBody,
        htmlContent: htmlBody
      })
    });
    if (!res.ok) {
      console.log("[brevo] non-OK response:", res.status);
    }
  } catch (err) {
    // Never fail the unlock on notification error — just log and move on.
    console.log("[brevo] send failed:", err?.message || String(err));
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
