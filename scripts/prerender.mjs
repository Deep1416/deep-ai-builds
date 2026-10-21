// Post-build step. For every route it writes static HTML containing the
// server-rendered page plus its <head> tags (for crawlers and no-JS visitors; the
// client app replaces the markup on load), then
// emits 404.html, sitemap.xml, feed.xml and the robots.txt sitemap line.
// Reuses the same SEO builders and components as the client app.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";

const root = process.cwd();
const dist = path.join(root, "dist");

const server = await createServer({
  root,
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true },
});

const xmlEscape = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// React hoists <title>/<meta>/<link> to the front of the markup. We already emit
// those via headToHtml, so drop them from the body.
function stripHoistedHead(html) {
  const hoisted = /^(?:<title\b[^>]*>[\s\S]*?<\/title>|<(?:meta|link)\b[^>]*\/?>)/;
  let rest = html;
  for (let m = rest.match(hoisted); m; m = rest.match(hoisted)) rest = rest.slice(m[0].length);
  return rest;
}

try {
  const { site } = await server.ssrLoadModule("/src/config/site.ts");
  const { headToHtml, buildHead } = await server.ssrLoadModule("/src/lib/seo.ts");
  const { homeHead } = await server.ssrLoadModule("/src/features/home/seo.ts");
  const { blogIndexHead, blogPostHead } = await server.ssrLoadModule("/src/features/blog/seo.ts");
  const { sortedPosts, blogMeta } = await server.ssrLoadModule("/src/features/blog/data.ts");
  const { renderPage } = await server.ssrLoadModule("/src/app/prerender.tsx");

  const template = await readFile(path.join(dist, "index.html"), "utf8");

  const pages = [
    { route: "/", head: homeHead(), file: "index.html" },
    { route: "/blog", head: blogIndexHead(), file: "blog/index.html" },
    ...sortedPosts.map((post) => ({
      route: `/blog/${post.slug}`,
      head: blogPostHead(post),
      file: `blog/${post.slug}/index.html`,
    })),
    {
      route: "/404",
      head: buildHead({
        title: `Page not found — ${site.name}`,
        description: "The page you are looking for does not exist or has moved.",
        path: "/404",
        ogType: "website",
        noindex: true,
      }),
      file: "404.html",
    },
  ];

  for (const { route, head, file } of pages) {
    const { title, tags } = headToHtml(head);
    const body = stripHoistedHead(await renderPage(route === "/404" ? "/__not-found__" : route));
    const html = template
      .replace(/<title[^>]*>.*?<\/title>/s, `<title data-prerender>${title}</title>`)
      .replace("<!--prerender-head-->", tags)
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    const target = path.join(dist, file);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, html);
  }
  console.log(`prerender: wrote ${pages.length} static pages (content + head)`);

  if (!site.url) {
    console.warn(
      "prerender: VITE_SITE_URL is not set — skipped sitemap.xml, feed.xml and the robots.txt Sitemap line.",
    );
  } else {
    const latest = sortedPosts[0]?.updated ?? sortedPosts[0]?.date;
    const entries = [
      { path: "/", lastmod: latest, changefreq: "monthly", priority: "1.0" },
      { path: "/blog", lastmod: latest, changefreq: "weekly", priority: "0.8" },
      ...sortedPosts.map((post) => ({
        path: `/blog/${post.slug}`,
        lastmod: post.updated ?? post.date,
        changefreq: "yearly",
        priority: "0.7",
      })),
    ].map((e) =>
      [
        "  <url>",
        `    <loc>${site.url}${e.path === "/" ? "" : e.path}</loc>`,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
        `    <changefreq>${e.changefreq}</changefreq>`,
        `    <priority>${e.priority}</priority>`,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n"),
    );
    await writeFile(
      path.join(dist, "sitemap.xml"),
      [
        `<?xml version="1.0" encoding="UTF-8"?>`,
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
        ...entries,
        `</urlset>`,
        "",
      ].join("\n"),
    );

    const items = sortedPosts.map((post) =>
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
    await writeFile(
      path.join(dist, "feed.xml"),
      [
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
      ].join("\n"),
    );

    const robots = await readFile(path.join(dist, "robots.txt"), "utf8");
    await writeFile(
      path.join(dist, "robots.txt"),
      `${robots.trimEnd()}\n\nSitemap: ${site.url}/sitemap.xml\n`,
    );
    console.log("prerender: wrote sitemap.xml, feed.xml and updated robots.txt");
  }
} finally {
  await server.close();
}
