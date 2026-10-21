import { site } from "@/config/site";

type MetaTag =
  { title: string } | { name: string; content: string } | { property: string; content: string };
type LinkTag = { rel: string; href: string; type?: string; title?: string };
type ScriptTag = { type: "application/ld+json"; children: string };

/** Shape consumed by TanStack Router's `head()` and by scripts/prerender.mjs. */
export type PageHead = { meta: MetaTag[]; links: LinkTag[]; scripts: ScriptTag[] };

/** Absolute URL for a site path, or undefined until VITE_SITE_URL is configured. */
export function absoluteUrl(path: string): string | undefined {
  if (!site.url) return undefined;
  return path === "/" ? site.url : `${site.url}${path}`;
}

export const OG_IMAGE_PATH = "/og-image.png";
const OG_IMAGE_ALT = `${site.name} — Full Stack Developer & AI Engineer`;
const ROBOTS_INDEXABLE =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

type BuildHeadOptions = {
  title: string;
  /** Title for og:/twitter: tags when it differs from the document title. */
  socialTitle?: string;
  description: string;
  path: string;
  ogType: "website" | "profile" | "article";
  extraMeta?: MetaTag[];
  jsonLd?: object[];
  noindex?: boolean;
};

export function buildHead(options: BuildHeadOptions): PageHead {
  const { title, description, path, ogType, extraMeta = [], jsonLd = [] } = options;
  const socialTitle = options.socialTitle ?? title;
  const url = options.noindex ? undefined : absoluteUrl(path);
  const image = absoluteUrl(OG_IMAGE_PATH);
  const feed = absoluteUrl("/feed.xml");

  const meta: MetaTag[] = [
    { title },
    { name: "description", content: description },
    { name: "robots", content: options.noindex ? "noindex, nofollow" : ROBOTS_INDEXABLE },
    { property: "og:site_name", content: site.name },
    { property: "og:locale", content: "en_US" },
    { property: "og:title", content: socialTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: ogType },
    ...(url ? [{ property: "og:url", content: url }] : []),
    ...(image
      ? [
          { property: "og:image", content: image },
          { property: "og:image:width", content: "1200" },
          { property: "og:image:height", content: "630" },
          { property: "og:image:alt", content: OG_IMAGE_ALT },
          { name: "twitter:image", content: image },
          { name: "twitter:image:alt", content: OG_IMAGE_ALT },
        ]
      : []),
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: socialTitle },
    { name: "twitter:description", content: description },
    ...extraMeta,
  ];

  return {
    meta,
    links: [
      ...(url ? [{ rel: "canonical", href: url }] : []),
      ...(feed
        ? [
            {
              rel: "alternate",
              type: "application/rss+xml",
              title: `${site.name} — Blog`,
              href: feed,
            },
          ]
        : []),
    ],
    scripts: jsonLd.map((schema) => ({
      type: "application/ld+json" as const,
      children: JSON.stringify(schema),
    })),
  };
}

const escapeAttr = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const escapeText = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;");

/** Serialises a PageHead to static tags for the prerendered HTML. */
export function headToHtml(head: PageHead): { title: string; tags: string } {
  let title = "";
  const tags: string[] = [];
  for (const m of head.meta) {
    if ("title" in m) {
      title = m.title;
      continue;
    }
    const key =
      "name" in m ? `name="${escapeAttr(m.name)}"` : `property="${escapeAttr(m.property)}"`;
    tags.push(`<meta data-prerender ${key} content="${escapeAttr(m.content)}" />`);
  }
  for (const l of head.links) {
    const extra = [
      l.type && `type="${escapeAttr(l.type)}"`,
      l.title && `title="${escapeAttr(l.title)}"`,
    ]
      .filter(Boolean)
      .join(" ");
    tags.push(
      `<link data-prerender rel="${escapeAttr(l.rel)}" ${extra} href="${escapeAttr(l.href)}" />`.replace(
        "  ",
        " ",
      ),
    );
  }
  // JSON-LD is permanent (no data-prerender): the client router does not render it, see routeHead().
  for (const s of head.scripts) {
    const json = s.children.replace(/</g, "\\u003c");
    tags.push(`<script type="${s.type}">${json}</script>`);
  }
  return { title: escapeText(title), tags: tags.join("\n    ") };
}

/**
 * Head for TanStack Router. Structured data is excluded: it is baked into the
 * static HTML at build time, and rendering it again client-side breaks hydration.
 */
export const routeHead = ({ meta, links }: PageHead) => ({ meta, links });
