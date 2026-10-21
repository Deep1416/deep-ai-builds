import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function BackLink({ to, children }: { to: "/" | "/blog"; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-foreground"
    >
      <ArrowLeft className="size-3.5" aria-hidden="true" /> {children}
    </Link>
  );
}
