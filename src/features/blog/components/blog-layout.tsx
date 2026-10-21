import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { CursorGlow } from "@/components/motion/cursor-glow";
import { ScrollProgress } from "@/components/motion/scroll-progress";

export function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <CursorGlow />
      <ScrollProgress />
      <main className="container-page pt-28 pb-24">{children}</main>
      <SiteFooter />
    </div>
  );
}
