import { site } from "@/config/site";
import { absoluteUrl, buildHead } from "@/lib/seo";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
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

export const homeHead = () =>
  buildHead({
    title: site.seo.title,
    description: site.seo.description,
    path: "/",
    ogType: "profile",
    jsonLd: [personSchema],
  });
