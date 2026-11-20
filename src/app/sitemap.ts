import type { MetadataRoute } from "next";
import { sortedPosts } from "@/features/blog/data";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Absolute URLs are required; nothing to list until NEXT_PUBLIC_SITE_URL is set.
  if (!site.url) return [];
  const latest = sortedPosts[0]?.updated ?? sortedPosts[0]?.date;

  return [
    { url: site.url, lastModified: latest, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/blog`, lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    ...sortedPosts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: post.updated ?? post.date,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
