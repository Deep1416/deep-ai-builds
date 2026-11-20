import type { Metadata } from "next";
import { NotFound } from "@/components/feedback/not-found";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `Page not found — ${site.name}` },
  description: "The page you are looking for does not exist or has moved.",
  robots: { index: false, follow: false },
};

export default NotFound;
