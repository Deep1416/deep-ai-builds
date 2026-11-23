import { site } from "@/config/site";

export type ContactMessage = { name: string; email: string; message: string };

/**
 * Where messages are posted. Set NEXT_PUBLIC_CONTACT_FORM_ENDPOINT and
 * NEXT_PUBLIC_CONTACT_FORM_ACCESS_KEY to use Web3Forms (or another provider that takes
 * an `access_key`). Without an access key it falls back to FormSubmit, which forwards
 * to the site email once the inbox owner has activated the form.
 */
const endpoint =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || `https://formsubmit.co/ajax/${site.email}`;
const accessKey = process.env.NEXT_PUBLIC_CONTACT_FORM_ACCESS_KEY;

export async function sendContactMessage({ name, email, message }: ContactMessage): Promise<void> {
  const fields = { name: name.trim(), email: email.trim(), message: message.trim() };
  const subject = `Portfolio enquiry from ${fields.name}`;
  // Each provider has its own names for the subject and the spam honeypot field.
  const providerFields = accessKey
    ? { access_key: accessKey, subject, botcheck: "" }
    : { _subject: subject, _template: "table", _honey: "" };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...fields, ...providerFields }),
  });

  const result: { success?: unknown } | null = await response.json().catch(() => null);
  const rejected = result?.success === false || result?.success === "false";
  if (!response.ok || rejected) throw new Error(`Contact form request failed (${response.status})`);
}
