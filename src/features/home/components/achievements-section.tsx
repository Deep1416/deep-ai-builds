import { Award, GraduationCap, Trophy } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { IconBadge } from "@/components/common/icon-badge";
import { SectionHeading } from "@/components/common/section-heading";
import { achievements, education } from "@/features/home/data";

const icons = [Trophy, Award, GraduationCap] as const;

export function AchievementsSection() {
  return (
    <section id="achievements" className="border-t border-border/60 bg-surface/25 py-24 md:py-32">
      <div className="container-page">
        <SectionHeading eyebrow="Recognition" title="Achievements" />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {achievements.map((item, i) => {
            const Icon = icons[i % icons.length] ?? Trophy;
            return (
              <Reveal key={item.title} delay={i * 70} className="surface-card h-full p-6">
                <IconBadge icon={Icon} />
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={80} className="mt-14">
          <h3 className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Education
          </h3>
          <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-border/70 pt-5">
            <div>
              <p className="text-lg font-semibold">{education.degree}</p>
              <p className="mt-1 text-sm text-muted-foreground">{education.institute}</p>
            </div>
            <p className="font-mono text-xs tracking-wider text-muted-foreground">
              {education.period} · {education.score}
            </p>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            A Civil Engineering degree turned into a software career — self-taught fundamentals,
            300+ DSA problems, and three years of shipping production systems.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
