YARD CULTURE SOCAL: LANDING PAGE SETUP (about 15 minutes)
=========================================================

FILES
  index.html        landing page
  thank-you.html    after-submit page (calendar + Meta "Lead" event)
  booked.html       after-booking page (prep checklist, gallery, Meta "Schedule" event)
  privacy.html      privacy policy (needed for Meta ads and SMS)
  config.js         <- THE ONLY FILE YOU EDIT (spots, phone, webhook, calendar, pixel, reviews)
  app.js, styles.css, _headers
  functions/api/lead.js   server function that sends leads to GHL

1) GHL: CREATE THE WEBHOOK
  Automation > Workflows > Create > Start from scratch
  Trigger: "Inbound Webhook". Copy the URL it shows.
  Submit a test lead on the site (step 3), then click "Fetch sample request" in the trigger.
  Add action "Create/Update Contact" and map:
    first_name, last_name, phone, email, zip (Postal code), city
    interests, timeline, sms_consent, utm_source, utm_campaign, fbclid  -> custom fields
  Add tag "website-lead", create an Opportunity in your pipeline, and send yourself an SMS alert.
  Speed matters: auto-text the lead within 1 minute ("Hi {first_name}, it's Yard Culture...").

2) EDIT config.js
  PHONE, EMAIL, LICENSE
  SPOTS_TOTAL / SPOTS_LEFT  -> keep them true, and update SPOTS_LEFT as you book
  GHL_WEBHOOK_URL           -> paste the webhook URL (backup path)
  GHL_CALENDAR_URL          -> GHL Calendars > Share link (shows on the thank-you page)
  META_PIXEL_ID             -> Events Manager
  TESTIMONIALS              -> add real reviews when you get them; the Founding Client block disappears automatically

3) DEPLOY ON CLOUDFLARE PAGES
  Option A: Drag and drop (easiest)
    Workers & Pages > Create > Pages > "Upload assets" > drag this whole folder.
    Note: drag-and-drop does NOT run the /functions folder. Leads then go straight
    from the browser to GHL_WEBHOOK_URL in config.js. This works; just fill that field.

  Option B: Wrangler or GitHub (recommended; hides your webhook URL)
    npx wrangler pages deploy . --project-name yardculture
    (or connect a GitHub repo in Pages)
    Then Pages > your project > Settings > Variables and Secrets:
      add GHL_WEBHOOK_URL = <your webhook URL>, and redeploy.
    Once this works, you can clear GHL_WEBHOOK_URL in config.js.

  Custom domain: Pages project > Custom domains > add yardculturesocal.com (or similar).

4) TEST
  Open the site > submit with your own number > confirm the contact appears in GHL
  > confirm the thank-you page shows the calendar > Meta Events Manager > Test Events shows "Lead".

5) IMAGES
  The images load from your Higgsfield CDN. For permanence, save them into /img
  and change the IMG paths in config.js to "img/before.png", etc.

USE IN ADS AND BIO
  Link in bio:  https://yourdomain.com/?utm_source=instagram&utm_medium=bio
  Reel DMs:     https://yourdomain.com/?utm_source=instagram&utm_medium=dm&utm_campaign=yard
  Meta ads:     add UTM tags in the ad's URL parameters. Optimize for the "Lead" event.

HONESTY RULES (protects your ad account)
  - Scarcity: SPOTS_LEFT must be your real remaining capacity.
  - Countdown: counts to the real monthly reset of free design spots.
  - Testimonials: real clients only, with their permission.

AFTER-BOOKING PAGE (booked.html)
  GHL > Calendars > FREE 3D Backyard In-home Consultation > Edit > Forms & Payment (or Confirmation)
  > "Redirect to URL" = https://<your-domain>/booked.html
  Fill FB_GROUP_URL and CONSULTANT_NAME in config.js. GALLERY images show on the homepage and booked page.
