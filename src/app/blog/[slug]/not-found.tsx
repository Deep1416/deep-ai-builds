import type { Metadata } from "next";
import { site } from "@/config/site";
import { PostNotFound } from "@/features/blog/components/post-not-found";

export const metadata: Metadata = {
  title: { absolute: `Article unavailable — ${site.name}` },
  robots: { index: false },
};

export default PostNotFound;
