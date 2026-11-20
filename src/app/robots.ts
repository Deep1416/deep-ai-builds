import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const sitemap = absoluteUrl("/sitemap.xml");
  return {
    rules: ["Googlebot", "Bingbot", "Twitterbot", "facebookexternalhit", "*"].map((userAgent) => ({
      userAgent,
      allow: "/",
    })),
    ...(sitemap && { sitemap }),
  };
}
