import type { LucideIcon } from "lucide-react";

export function IconBadge({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="inline-flex size-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
      <Icon className="size-5" aria-hidden="true" />
    </span>
  );
}
