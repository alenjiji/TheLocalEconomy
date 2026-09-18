/**
 * WhatsApp alert for every website enquiry.
 *
 * Netlify runs a function named `submission-created` on its own, once for every
 * verified form submission — nothing calls this. It sends the business a
 * WhatsApp message through the official WhatsApp Cloud API.
 *
 * It does nothing until these are set in Netlify (Site configuration →
 * Environment variables), so the site works — and email notifications work —
 * without any of it:
 *
 *   WHATSAPP_TOKEN            A permanent access token for the Cloud API.
 *   WHATSAPP_PHONE_NUMBER_ID  The ID of the number the alert is sent FROM.
 *                             This is a number registered to the API, not the
 *                             business's own WhatsApp number.
 *   WHATSAPP_NOTIFY_TO        Who is alerted, digits only: 918086441054.
 *   WHATSAPP_TEMPLATE         Optional. Defaults to `new_website_enquiry`.
 *   WHATSAPP_TEMPLATE_LANG    Optional. Defaults to `en`.
 *
 * WhatsApp only lets a business start a conversation with an approved
 * template, so one has to be created in WhatsApp Manager first, with four
 * body variables in this order:
 *
 *   New website enquiry from {{1}} ({{2}}).
 *   Interested in: {{3}}
 *   Message: {{4}}
 *
 * The email alert does not come from here: switch it on in Netlify under
 * Forms → Form notifications → Add notification → Email notification.
 */

const clip = (s, n) => {
  const t = String(s ?? "").replace(/\s+/g, " ").trim();
  return t.length > n ? `${t.slice(0, n - 1)}…` : t;
};

export default async (req) => {
  let submission;
  try {
    ({ payload: submission } = await req.json());
  } catch {
    return new Response("Bad payload", { status: 400 });
  }

  if (submission?.form_name !== "contact") return new Response("Not the enquiry form");

  const {
    WHATSAPP_TOKEN: token,
    WHATSAPP_PHONE_NUMBER_ID: phoneNumberId,
    WHATSAPP_NOTIFY_TO: to,
    WHATSAPP_TEMPLATE: template = "new_website_enquiry",
    WHATSAPP_TEMPLATE_LANG: lang = "en",
  } = process.env;

  if (!token || !phoneNumberId || !to) {
    console.log("WhatsApp alert skipped: WHATSAPP_* variables are not set.");
    return new Response("WhatsApp alert not configured");
  }

  const d = submission.data ?? {};
  // A template variable may not be empty, and may not contain line breaks.
  const params = [
    clip(d.name, 60) || "—",
    clip(d.phone, 30) || "—",
    clip(d.interest, 60) || "—",
    clip(d.message, 500) || "—",
  ];

  const res = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: template,
        language: { code: lang },
        components: [
          { type: "body", parameters: params.map((text) => ({ type: "text", text })) },
        ],
      },
    }),
  });

  if (!res.ok) {
    // Logged, not thrown: the enquiry is already saved in Netlify and emailed,
    // and a failed alert should not mark the submission as failed.
    console.error("WhatsApp alert failed", res.status, await res.text());
    return new Response("WhatsApp alert failed", { status: 502 });
  }

  return new Response("WhatsApp alert sent");
};
