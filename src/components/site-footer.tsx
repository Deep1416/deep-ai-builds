import { site } from "@/data/portfolio";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 py-12">
      <div className="container-page flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-base font-semibold">{site.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">Full Stack Developer &amp; AI Engineer</p>
        </div>
        <nav aria-label="Footer links" className="flex flex-wrap gap-6 text-sm">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer noopener"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${site.email}`}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Email
          </a>
        </nav>
      </div>
      <div className="container-page mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          Designed &amp; built with attention to performance, accessibility, and clean engineering.
        </p>
        <p>
          © {year} {site.name}
        </p>
      </div>
    </footer>
  );
}
