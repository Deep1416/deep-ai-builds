import { SectionHeading } from "@/components/section-heading";
import { SkillGroup } from "@/components/skill-group";
import { skillGroups } from "@/data/portfolio";

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24 border-t border-border/60 py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Toolkit"
          title="Technical depth across the stack"
          description="The technologies I use daily to design, build, test, and operate production software."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <SkillGroup key={group.title} title={group.title} items={group.items} delay={i * 50} />
          ))}
        </div>
      </div>
    </section>
  );
}
