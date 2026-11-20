import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/common/json-ld";
import { getPost, getPosts } from "@/features/blog/data";
import { BlogPostPage } from "@/features/blog/pages/blog-post-page";
import { blogPostJsonLd, blogPostMetadata } from "@/features/blog/seo";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => getPosts().map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? blogPostMetadata(post) : {};
}

export default async function Page({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd data={blogPostJsonLd(post)} />
      <BlogPostPage post={post} />
    </>
  );
}
