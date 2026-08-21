import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Segments of the headline. Strings are split into words; nodes animate as one unit. */
  segments: Array<string | { node: ReactNode; className?: string }>;
  className?: string;
  delay?: number;
  step?: number;
};

/** Staggered word-by-word entrance for headlines. */
export function WordReveal({ segments, className, delay = 120, step = 65 }: Props) {
  const units: Array<{ node: ReactNode; className?: string }> = [];

  for (const segment of segments) {
    if (typeof segment === "string") {
      for (const word of segment.split(/\s+/).filter(Boolean)) {
        units.push({ node: word });
      }
    } else {
      units.push(segment);
    }
  }

  return (
    <span className={className}>
      {units.map((unit, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span className="word-rise" style={{ animationDelay: `${delay + i * step}ms` }}>
            <span className={cn("inline-block", unit.className)}>{unit.node}</span>
          </span>
          {i < units.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </span>
  );
}
