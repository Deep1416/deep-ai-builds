import { site } from "@/config/site";
import { blogMeta, getPosts } from "@/features/blog/data";

export const dynamic = "force-static";

const xmlEscape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  // Feed links must be absolute; there is no feed until NEXT_PUBLIC_SITE_URL is set.
  if (!site.url) return new Response("Not found", { status: 404 });

  const items = getPosts().map((post) =>
    [
      "    <item>",
      `      <title>${xmlEscape(post.title)}</title>`,
      `      <link>${site.url}/blog/${post.slug}</link>`,
      `      <guid isPermaLink="true">${site.url}/blog/${post.slug}</guid>`,
      `      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>`,
      `      <description>${xmlEscape(post.description)}</description>`,
      ...post.tags.map((tag) => `      <category>${xmlEscape(tag)}</category>`),
      "    </item>",
    ].join("\n"),
  );

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">`,
    "  <channel>",
    `    <title>${xmlEscape(`${site.name} — ${blogMeta.title}`)}</title>`,
    `    <link>${site.url}/blog</link>`,
    `    <description>${xmlEscape(blogMeta.description)}</description>`,
    "    <language>en</language>",
    `    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />`,
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
