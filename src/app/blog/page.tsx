import { JsonLd } from "@/components/common/json-ld";
import { BlogIndexPage } from "@/features/blog/pages/blog-index-page";
import { blogIndexJsonLd, blogIndexMetadata } from "@/features/blog/seo";

export const metadata = blogIndexMetadata;

export default function Page() {
  return (
    <>
      <JsonLd data={blogIndexJsonLd} />
      <BlogIndexPage />
    </>
  );
}
