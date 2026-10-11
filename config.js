/* =========================================================
   YARD CULTURE SOCAL — SITE SETTINGS
   Edit this file only. Re-upload the site after changes.
   ========================================================= */
window.YC = {
  BRAND: "Yard Culture SoCal",
  PHONE: "(213) 787-5224",                 // e.g. "(818) 555-0123" — leave "" to hide the phone button
  EMAIL: "info@yardculturesocal.com",                 // e.g. "hello@yardculturesocal.com"
  INSTAGRAM: "https://instagram.com/yardculture.socal",
  LICENSE: "",               // e.g. "CSLB Lic. #1234567" — shown in the footer if filled

  /* ---- SCARCITY (keep these TRUE) ----
     How many free 3D designs you can actually deliver this month,
     and how many are still open. Update SPOTS_LEFT as you book. */
  SPOTS_TOTAL: 10,
  SPOTS_LEFT: 2,
  SPOTS_LABEL: "free 3D design spots left for",   // "{left} of {total} free 3D design spots left for October"

  /* ---- LEAD ROUTING ----
     GHL > Automation > Workflows > Trigger "Inbound Webhook" > copy URL.
     Best: put it in Cloudflare as an env variable GHL_WEBHOOK_URL (see README).
     Fallback: paste it here too, so leads still arrive if the function isn't deployed. */
  GHL_WEBHOOK_URL: "https://services.leadconnectorhq.com/hooks/nNSlvSxkLQoOV4UYOmqz/webhook-trigger/e008990c-320c-42ef-bbb7-af1b98d858a1",

  /* GHL > Calendars > your calendar > Share > copy the booking link.
     Shown on the thank-you page so leads can pick a consultation time right away. */
  GHL_CALENDAR_URL: "https://api.leadconnectorhq.com/widget/bookings/free-backyard-consultation",

  /* Meta Pixel ID (Events Manager). Fires PageView, Lead (thank-you page) and Schedule (booked page). */
  META_PIXEL_ID: "",


  /* Who runs the in-home visit (shown on the booked page). */
  CONSULTANT_NAME: "Roy",

  /* Your Facebook group link (small button on the booked page). Leave "" to hide. */
  FB_GROUP_URL: "",

  /* ---- DESIGN CONCEPT GALLERY (homepage + booked page) ----
     AI design concepts, always labeled "Design concept". Swap in real project photos as you finish jobs. */
  GALLERY: [
    { src: "https://d8j0ntlcm91z4.cloudfront.net/user_3KBn5dIGulR51DgWquIs0Wsqyiy/hf_20261011_034326_349ef23a-2db8-475e-b5e8-6870754afd89.png", cap: "Encino upgrade: patio cover, grill island, lawn and fire pit", wide: true },
    { src: "https://d8j0ntlcm91z4.cloudfront.net/user_3KBn5dIGulR51DgWquIs0Wsqyiy/hf_20261011_033415_d3ebac63-7e0d-4908-b23e-6829b2a4b7cc.png", cap: "Valley ranch home: patio cover, pavers, lawn and fire pit" },
    { src: "https://d8j0ntlcm91z4.cloudfront.net/user_3KBn5dIGulR51DgWquIs0Wsqyiy/hf_20261011_034326_526c3c90-6267-4778-a7e0-4a99193fb84f.png", cap: "Family yard: aluminum patio cover, play lawn, fire table" },
    { src: "https://d8j0ntlcm91z4.cloudfront.net/user_3KBn5dIGulR51DgWquIs0Wsqyiy/hf_20261011_033415_08d29e64-7068-495f-8192-3ae859313631.png", cap: "Pergola dining and a sunken fire pit for cool nights" },
    { src: "https://d8j0ntlcm91z4.cloudfront.net/user_3KBn5dIGulR51DgWquIs0Wsqyiy/hf_20261011_034326_74cf265f-9388-4a1d-a202-15406dfe7da5.png", cap: "Spanish-style home: wood patio cover, lawn and fire pit" }
  ],

  /* ---- TESTIMONIALS ----
     Add REAL client reviews only (FTC rules + Meta ad policy).
     While this list is empty, the site shows a "Founding Client" offer instead.
     Example:
     { name: "Dana R.", city: "Encino", text: "They showed us our yard in 3D before we spent a dollar...", stars: 5 }
  */
  TESTIMONIALS: [],

  /* ---- IMAGES ----
     These point to your Higgsfield images. For permanence, download them into /img
     and change these to "img/before.jpg" etc. */
  IMG: {
    before: "https://d8j0ntlcm91z4.cloudfront.net/user_3KBn5dIGulR51DgWquIs0Wsqyiy/hf_20261005_013819_9d430a58-d47e-4727-990a-19b0faa6b053.png",
    after:  "https://d8j0ntlcm91z4.cloudfront.net/user_3KBn5dIGulR51DgWquIs0Wsqyiy/hf_20261005_013955_f41405d4-bcf9-4679-b0b7-ef0c4f86989b.png",
    zones:  "https://d8j0ntlcm91z4.cloudfront.net/user_3KBn5dIGulR51DgWquIs0Wsqyiy/hf_20261004_204500_6b67eee6-0929-4470-91d8-1dfd6836cbe5.png",
    night:  "https://d8j0ntlcm91z4.cloudfront.net/user_3KBn5dIGulR51DgWquIs0Wsqyiy/hf_20261005_001759_8466e631-b4b2-45a5-95c0-a17598ec763d.png"
  }
};
