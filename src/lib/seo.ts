import type { Metadata } from "next";
import { site } from "@/config/site";

/** Absolute URL for a site path, or undefined until NEXT_PUBLIC_SITE_URL is configured. */
export function absoluteUrl(path: string): string | undefined {
  if (!site.url) return undefined;
  return path === "/" ? site.url : `${site.url}${path}`;
}

export const OG_IMAGE_PATH = "/og-image.png";
const OG_IMAGE_ALT = `${site.name} — Full Stack Developer & AI Engineer`;

type BuildMetadataOptions = {
  title: string;
  /** Title for og:/twitter: tags when it differs from the document title. */
  socialTitle?: string;
  description: string;
  path: string;
  ogType: "website" | "profile" | "article";
  keywords?: string[];
  article?: { publishedTime: string; modifiedTime?: string; tags: string[] };
  noindex?: boolean;
};

export function buildMetadata(options: BuildMetadataOptions): Metadata {
  const { title, description, path, ogType, article, noindex = false } = options;
  const socialTitle = options.socialTitle ?? title;
  const url = noindex ? undefined : absoluteUrl(path);
  const image = absoluteUrl(OG_IMAGE_PATH);
  const feed = absoluteUrl("/feed.xml");
  const images = image ? [{ url: image, width: 1200, height: 630, alt: OG_IMAGE_ALT }] : [];

  const openGraphBase = {
    siteName: site.name,
    locale: "en_US",
    title: socialTitle,
    description,
    images,
    ...(url && { url }),
  };

  return {
    title: { absolute: title },
    description,
    ...(options.keywords && { keywords: options.keywords }),
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
    alternates: {
      ...(url && { canonical: url }),
      ...(feed && {
        types: { "application/rss+xml": [{ url: feed, title: `${site.name} — Blog` }] },
      }),
    },
    openGraph:
      ogType === "article" && article
        ? {
            ...openGraphBase,
            type: "article",
            publishedTime: article.publishedTime,
            ...(article.modifiedTime && { modifiedTime: article.modifiedTime }),
            authors: [site.name],
            tags: article.tags,
          }
        : { ...openGraphBase, type: ogType === "article" ? "website" : ogType },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images,
    },
  };
}
