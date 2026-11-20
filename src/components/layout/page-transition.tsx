"use client";

import { useEffect, type ReactNode } from "react";

// Survives remounts: the first page load must not delay first paint, so only
// later client-side navigations fade in.
let hasNavigated = false;

export function PageTransition({ children }: { children: ReactNode }) {
  const animate = hasNavigated;
  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <div
      className={animate ? "animate-in duration-500 fade-in motion-reduce:animate-none" : undefined}
    >
      {children}
    </div>
  );
}
