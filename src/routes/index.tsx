import { createFileRoute } from "@tanstack/react-router";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { TechMarquee } from "@/components/tech-marquee";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import { AiEngineeringSection } from "@/components/sections/ai-engineering";
import { SkillsSection } from "@/components/sections/skills";
import { ImpactSection } from "@/components/sections/impact";
import { AchievementsSection } from "@/components/sections/achievements";
import { ContactSection } from "@/components/sections/contact";
import { site } from "@/data/portfolio";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Full Stack Developer & AI Engineer",
  description: site.summary,
  url: site.url,
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: site.seo.title },
      { name: "description", content: site.seo.description },
      { property: "og:title", content: site.seo.title },
      { property: "og:description", content: site.seo.description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: site.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: site.seo.title },
      { name: "twitter:description", content: site.seo.description },
    ],
    links: [{ rel: "canonical", href: site.url }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(personSchema) }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <SiteNav />
      <main>
        <HeroSection />
        <TechMarquee />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <AiEngineeringSection />
        <SkillsSection />
        <ImpactSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
