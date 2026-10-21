import { SectionHeading } from "@/components/common/section-heading";
import { SkillGroup } from "@/features/home/components/skill-group";
import { skillGroups } from "@/features/home/data";

export function SkillsSection() {
  return (
    <section id="skills" className="border-t border-border/60 py-28 md:py-36">
      <div className="container-page">
        <SectionHeading
          eyebrow="Toolkit"
          title="Technical depth across the stack"
          description="The technologies I use daily to design, build, test, and operate production software."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <SkillGroup key={group.title} title={group.title} items={group.items} delay={i * 50} />
          ))}
        </div>
      </div>
    </section>
  );
}
