/** Stable anchor id for an article heading, e.g. "1. Stream first" -> "stream-first". */
export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/^\d+\.\s*/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
