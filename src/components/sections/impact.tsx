import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { impactNumbers } from "@/data/portfolio";

export function ImpactSection() {
  return (
    <section className="scroll-mt-24 border-t border-border/60 py-24 md:py-32">
      <div className="container-page">
        <SectionHeading eyebrow="Impact" title="Engineering in Numbers" />
        <dl className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {impactNumbers.map((item, i) => (
            <Reveal key={item.label} delay={i * 50} className="border-t border-border/70 pt-5">
              <dt className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                <Counter value={item.value} suffix={item.suffix} />
              </dt>
              <dd className="mt-2 text-sm text-muted-foreground">{item.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
