import { site } from "@/config/site";
import { OG_IMAGE_PATH, absoluteUrl, buildMetadata } from "@/lib/seo";

const personId = absoluteUrl("/#person");
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  image: absoluteUrl(OG_IMAGE_PATH),
  name: site.name,
  jobTitle: "Full Stack Developer & AI Engineer",
  description: site.summary,
  url: absoluteUrl("/"),
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gwalior",
    addressRegion: "Madhya Pradesh",
    addressCountry: "IN",
  },
  sameAs: [site.github, site.linkedin],
  knowsAbout: [
    "Full Stack Development",
    "Generative AI",
    "LLM Applications",
    "Voice AI Automation",
    "Python",
    "FastAPI",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Redis",
    "AWS",
    "GCP",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: `${site.name} — Portfolio`,
  url: absoluteUrl("/"),
  inLanguage: "en",
  description: site.seo.description,
  author: personId ? { "@id": personId } : { "@type": "Person", name: site.name },
};

export const homeMetadata = buildMetadata({
  title: site.seo.title,
  description: site.seo.description,
  path: "/",
  ogType: "profile",
});

export const homeJsonLd = [personSchema, websiteSchema];
