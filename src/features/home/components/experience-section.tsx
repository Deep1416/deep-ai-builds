import { ExperienceTimeline } from "@/features/home/components/experience-timeline";
import { SectionHeading } from "@/components/common/section-heading";

export function ExperienceSection() {
  return (
    <section id="experience" className="border-t border-border/60 bg-surface/25 py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Experience"
          title="Shipping production systems since day one"
          description="Three years across AI backend engineering, product frontends, and developer mentorship."
        />
        <ExperienceTimeline />
      </div>
    </section>
  );
}
