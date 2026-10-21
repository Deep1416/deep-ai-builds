// Post-build step: bakes per-route <head> tags into static HTML, and writes
// sitemap.xml + robots.txt. Reuses the same SEO builders as the client router.
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

try {
  const { site } = await server.ssrLoadModule("/src/config/site.ts");
  const { headToHtml } = await server.ssrLoadModule("/src/lib/seo.ts");
  const { homeHead } = await server.ssrLoadModule("/src/features/home/seo.ts");
  const { blogIndexHead, blogPostHead } = await server.ssrLoadModule("/src/features/blog/seo.ts");
  const { sortedPosts } = await server.ssrLoadModule("/src/features/blog/data.ts");

  const template = await readFile(path.join(dist, "index.html"), "utf8");

  const pages = [
    { route: "/", head: homeHead() },
    { route: "/blog", head: blogIndexHead() },
    ...sortedPosts.map((post) => ({ route: `/blog/${post.slug}`, head: blogPostHead(post) })),
  ];

  for (const { route, head } of pages) {
    const { title, tags } = headToHtml(head);
    const html = template
      .replace(/<title[^>]*>.*?<\/title>/s, `<title data-prerender>${title}</title>`)
      .replace("<!--prerender-head-->", tags);
    const file =
      route === "/" ? path.join(dist, "index.html") : path.join(dist, route, "index.html");
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html);
  }
  console.log(`prerender: wrote head tags for ${pages.length} routes`);

  if (!site.url) {
    console.warn(
      "prerender: VITE_SITE_URL is not set — skipped sitemap.xml and the robots.txt Sitemap line.",
    );
  } else {
    const urls = [
      { path: "/", changefreq: "monthly", priority: "1.0" },
      { path: "/blog", changefreq: "weekly", priority: "0.8" },
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
    const sitemap = [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
      ...urls,
      `</urlset>`,
      "",
    ].join("\n");
    await writeFile(path.join(dist, "sitemap.xml"), sitemap);

    const robots = await readFile(path.join(dist, "robots.txt"), "utf8");
    await writeFile(
      path.join(dist, "robots.txt"),
      `${robots.trimEnd()}\n\nSitemap: ${site.url}/sitemap.xml\n`,
    );
    console.log("prerender: wrote sitemap.xml and updated robots.txt");
  }
} finally {
  await server.close();
}
