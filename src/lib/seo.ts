import { site } from "@/config/site";

type MetaTag =
  { title: string } | { name: string; content: string } | { property: string; content: string };
type LinkTag = { rel: string; href: string };
type ScriptTag = { type: "application/ld+json"; children: string };

/** Shape consumed by TanStack Router's `head()` and by scripts/prerender.mjs. */
export type PageHead = { meta: MetaTag[]; links: LinkTag[]; scripts: ScriptTag[] };

/** Absolute URL for a site path, or undefined until VITE_SITE_URL is configured. */
export function absoluteUrl(path: string): string | undefined {
  if (!site.url) return undefined;
  return path === "/" ? site.url : `${site.url}${path}`;
}

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
  const url = absoluteUrl(path);

  const meta: MetaTag[] = [
    { title },
    { name: "description", content: description },
    ...(options.noindex ? [{ name: "robots", content: "noindex" }] : []),
    { property: "og:title", content: socialTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: ogType },
    ...(url ? [{ property: "og:url", content: url }] : []),
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: socialTitle },
    { name: "twitter:description", content: description },
    ...extraMeta,
  ];

  return {
    meta,
    links: url ? [{ rel: "canonical", href: url }] : [],
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
    tags.push(`<link data-prerender rel="${escapeAttr(l.rel)}" href="${escapeAttr(l.href)}" />`);
  }
  for (const s of head.scripts) {
    const json = s.children.replace(/</g, "\\u003c");
    tags.push(`<script data-prerender type="${s.type}">${json}</script>`);
  }
  return { title: escapeText(title), tags: tags.join("\n    ") };
}
