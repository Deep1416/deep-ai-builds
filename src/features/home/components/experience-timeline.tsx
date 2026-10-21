import { useEffect, useRef } from "react";
import { Reveal } from "@/components/motion/reveal";
import { experience } from "@/features/home/data";

// Highlights without a headline metric go last so the metric column stays unbroken.
const withMetricsFirst = <T extends { metric?: string }>(items: readonly T[]) =>
  [...items].sort((a, b) => Number(!a.metric) - Number(!b.metric));

export function ExperienceTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  // Scroll-linked progress: the line fills down to the viewport's focus line and
  // each dot lights once the line passes it. Writes straight to the DOM, so
  // scrolling never re-renders React.
  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;
    const dots = Array.from(list.querySelectorAll<HTMLElement>("[data-dot]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      const reach = reduced
        ? rect.height
        : Math.min(rect.height, Math.max(0, window.innerHeight * 0.6 - rect.top));
      fill.style.height = `${reach}px`;
      dots.forEach((dot) => {
        const dotY = dot.getBoundingClientRect().top - rect.top + dot.offsetHeight / 2;
        dot.dataset["lit"] = String(reach >= dotY);
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ol ref={listRef} className="relative mt-16 space-y-10 border-l border-border/70 pl-6 sm:pl-10">
      <span
        ref={fillRef}
        aria-hidden="true"
        className="absolute top-0 -left-px w-px bg-gradient-to-b from-primary via-primary to-accent-cyan"
      />
      {experience.map((job, i) => (
        <Reveal as="li" key={job.company} delay={i * 60} className="relative">
          <span
            data-dot
            data-lit="false"
            aria-hidden="true"
            className="absolute top-2 -left-[1.6rem] size-2.5 rounded-full bg-border ring-4 ring-background transition-all duration-500 data-[lit=true]:bg-primary data-[lit=true]:shadow-[0_0_14px_var(--primary)] sm:-left-[2.85rem]"
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
