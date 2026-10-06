// Cloudflare Pages Function: POST /api/lead -> forwards the lead to your GHL Inbound Webhook.
// Set GHL_WEBHOOK_URL in Pages > Settings > Variables and Secrets.
export async function onRequestPost({ request, env }) {
  const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });
  let data;
  try { data = await request.json(); } catch { return json({ ok: false, error: "bad json" }, 400); }

  // Honeypot: bots fill the hidden "company" field
  if (data.company) return json({ ok: true });
  if (!data.phone && !data.email) return json({ ok: false, error: "missing contact" }, 400);
  if (!env.GHL_WEBHOOK_URL) return json({ ok: false, error: "GHL_WEBHOOK_URL not set" }, 500);

  const lead = {
    ...data,
    source: "Website - Free 3D Design",
    ip_country: request.cf?.country || "",
    ip_city: request.cf?.city || "",
    submitted_at: new Date().toISOString(),
  };
  const r = await fetch(env.GHL_WEBHOOK_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(lead),
  });
  return json({ ok: r.ok }, r.ok ? 200 : 502);
}
