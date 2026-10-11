import { getLocation } from "@/lib/locations";
import { getBookingTypes } from "@/lib/group-bookings";

/*
  Group booking enquiries. Sends a plain-text email to the location's inbox via Resend.
  Needs RESEND_API_KEY and ENQUIRY_FROM (an address on a domain verified in Resend).
  ENQUIRY_TO optionally overrides the recipient (handy for testing).
  Without the key it answers 503 { fallback: true } and the form falls back to the visitor's email app.
*/

const MAX_LEN = 2000;

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const loc = getLocation(String(data.location ?? ""));
  const type = loc && getBookingTypes(loc.slug).find((t) => t.id === data.type);
  if (!loc || !type) {
    return Response.json({ error: "Unknown location or booking type." }, { status: 400 });
  }

  const lines: string[] = [];
  for (const field of type.fields) {
    const raw = data[field.name];
    const value = Array.isArray(raw) ? raw.map(String).join(", ") : String(raw ?? "").trim();
    if (field.required && !value) {
      return Response.json({ error: `${field.label} is required.` }, { status: 400 });
    }
    if (value.length > MAX_LEN) {
      return Response.json({ error: `${field.label} is too long.` }, { status: 400 });
    }
    lines.push(`${field.label}: ${value || "-"}`);
  }

  const email = String(data.email ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM;
  if (!key || !from) {
    return Response.json({ fallback: true }, { status: 503 });
  }

  const name = String(data.name ?? "").trim();
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [process.env.ENQUIRY_TO || loc.email],
      reply_to: email,
      subject: `${type.title} enquiry from ${name} (Dublin Calling ${loc.name})`,
      text: `New ${type.title.toLowerCase()} enquiry from the website (${loc.name}).\n\n${lines.join("\n")}\n`,
    }),
  });

  if (!res.ok) {
    return Response.json({ fallback: true }, { status: 502 });
  }
  return Response.json({ ok: true });
}
