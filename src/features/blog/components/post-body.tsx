import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { headingId } from "@/features/blog/heading-id";

const text = "text-base leading-[1.8] text-muted-foreground";

type HastNode = { type: string; value?: string; children?: HastNode[] };
const plainText = (node: HastNode | undefined): string =>
  node?.type === "text" ? (node.value ?? "") : (node?.children ?? []).map(plainText).join("");

/** Maps Markdown elements onto the article's typography. */
const components: Components = {
  h2: ({ node, children }) => (
    <h2 id={headingId(plainText(node))} className="pt-6 text-xl font-semibold sm:text-2xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => <h3 className="pt-4 text-lg font-semibold">{children}</h3>,
  p: ({ children }) => <p className={text}>{children}</p>,
  ul: ({ children }) => <ul className="space-y-3 pl-5">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal space-y-3 pl-5">{children}</ol>,
  li: ({ children }) => <li className={`list-disc ${text} [ol>&]:list-decimal`}>{children}</li>,
  a: ({ href, children }) => (
    <a href={href} className="text-primary underline underline-offset-4 hover:text-foreground">
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-primary/60 pl-5 italic [&>p]:text-foreground/90">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre className="overflow-x-auto rounded-xl border border-border/70 bg-surface/70 p-5 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-[13px] [&>code]:leading-relaxed">
      {children}
    </pre>
  ),
  code: ({ children }) => (
    <code className="rounded bg-surface/70 px-1.5 py-0.5 font-mono text-[0.9em] text-foreground/90">
      {children}
    </code>
  ),
  img: ({ src, alt }) => (
    // Markdown images have no known dimensions, so next/image can't size them.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt ?? ""}
      loading="lazy"
      className="rounded-xl border border-border/70"
    />
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm text-muted-foreground [&_td]:border-b [&_td]:border-border/60 [&_td]:py-2 [&_td]:pr-4 [&_th]:border-b [&_th]:border-border [&_th]:py-2 [&_th]:pr-4 [&_th]:text-foreground">
        {children}
      </table>
    </div>
  ),
};

export function PostBody({ markdown }: { markdown: string }) {
  return (
    <Markdown remarkPlugins={[remarkGfm]} components={components}>
      {markdown}
    </Markdown>
  );
}
