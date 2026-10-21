import { Reveal } from "@/components/motion/reveal";
import { experience } from "@/features/home/data";

// Highlights without a headline metric go last so the metric column stays unbroken.
const withMetricsFirst = <T extends { metric?: string }>(items: readonly T[]) =>
  [...items].sort((a, b) => Number(!a.metric) - Number(!b.metric));

export function ExperienceTimeline() {
  return (
    <ol className="relative mt-14 space-y-10 border-l border-border/70 pl-6 sm:pl-10">
      {experience.map((job, i) => (
        <Reveal as="li" key={job.company} delay={i * 60} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-2 -left-[1.6rem] size-2.5 rounded-full bg-primary ring-4 ring-background sm:-left-[2.85rem]"
          />
          <div className="surface-card p-5 sm:p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <div>
                <h3 className="text-xl font-semibold sm:text-2xl">{job.company}</h3>
                <p className="mt-1 text-sm text-primary">{job.role}</p>
              </div>
              <p className="font-mono text-xs tracking-wider text-muted-foreground">{job.period}</p>
            </div>
            <ul className="mt-6 space-y-3">
              {withMetricsFirst(job.highlights).map((h) => (
                <li
                  key={h.text}
                  className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4"
                >
                  {h.metric ? (
                    <span className="font-display shrink-0 text-sm font-semibold text-foreground sm:w-40">
                      {h.metric}
                    </span>
                  ) : (
                    <span aria-hidden="true" className="hidden shrink-0 sm:block sm:w-40" />
                  )}
                  <span className="text-sm leading-relaxed text-muted-foreground">{h.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
