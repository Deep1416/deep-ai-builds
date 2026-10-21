import { site } from "@/config/site";

export type ContactMessage = { name: string; email: string; message: string };

/**
 * Where messages are posted. Defaults to FormSubmit, which forwards the message to
 * the site email (the first submission asks the inbox owner to confirm once).
 * Override with VITE_CONTACT_FORM_ENDPOINT to use Formspree, Web3Forms, etc.
 */
const endpoint =
  import.meta.env.VITE_CONTACT_FORM_ENDPOINT || `https://formsubmit.co/ajax/${site.email}`;
const accessKey = import.meta.env.VITE_CONTACT_FORM_ACCESS_KEY;

export async function sendContactMessage({ name, email, message }: ContactMessage): Promise<void> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      _subject: `Portfolio enquiry from ${name.trim()}`,
      _template: "table",
      _honey: "",
      ...(accessKey && { access_key: accessKey }),
    }),
  });

  const result: { success?: unknown } | null = await response.json().catch(() => null);
  const rejected = result?.success === false || result?.success === "false";
  if (!response.ok || rejected) throw new Error(`Contact form request failed (${response.status})`);
}
