import { Brain, Layers, Server } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { IconBadge } from "@/components/common/icon-badge";
import { SectionHeading } from "@/components/common/section-heading";
import { aboutCards, aboutParagraphs } from "@/features/home/data";

const icons = { layers: Layers, brain: Brain, server: Server } as const;

export function AboutSection() {
  return (
    <section id="about" className="py-28 md:py-36">
      <div className="container-page">
        <SectionHeading eyebrow="About" title="About Me" />

        <div className="mt-16 grid gap-x-12 gap-y-8 lg:grid-cols-2">
          {aboutParagraphs.map((paragraph, i) => (
            <Reveal key={i} delay={i * 70} className={i === 0 ? "lg:col-span-2" : ""}>
              <p
                className={
                  i === 0
                    ? "max-w-4xl text-xl leading-relaxed text-foreground/90 md:text-2xl md:leading-relaxed"
                    : "text-base leading-relaxed text-muted-foreground"
                }
              >
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {aboutCards.map((card, i) => {
            const Icon = icons[card.icon];
            return (
              <Reveal key={card.title} delay={i * 80} className="surface-card p-6">
                <IconBadge icon={Icon} />
                <h3 className="mt-5 text-lg font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
