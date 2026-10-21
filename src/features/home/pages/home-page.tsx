import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { CursorGlow } from "@/components/motion/cursor-glow";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { BlogSection } from "@/features/blog/components/blog-section";
import { ContactSection } from "@/features/contact/components/contact-section";
import { AboutSection } from "@/features/home/components/about-section";
import { AchievementsSection } from "@/features/home/components/achievements-section";
import { AiEngineeringSection } from "@/features/home/components/ai-engineering-section";
import { ExperienceSection } from "@/features/home/components/experience-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { ImpactSection } from "@/features/home/components/impact-section";
import { PageLoader } from "@/features/home/components/page-loader";
import { SkillsSection } from "@/features/home/components/skills-section";
import { TechMarquee } from "@/features/home/components/tech-marquee";
import { ProjectsSection } from "@/features/projects/components/projects-section";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <PageLoader />
      <CursorGlow />
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
        <BlogSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
