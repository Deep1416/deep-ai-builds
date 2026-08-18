import { ArrowUpRight, Github, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectPreview } from "@/components/project-preview";
import { Reveal } from "@/components/reveal";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;

  return (
    <Reveal as="article" className="surface-card overflow-hidden p-5 sm:p-8">
      <div className={cn("grid items-center gap-8 lg:grid-cols-2 lg:gap-12")}>
        <div className={cn("order-1", flip && "lg:order-2")}>
          <div className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className="h-px w-8 bg-border" />
            <span>{project.subtitle}</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold sm:text-3xl md:text-4xl">{project.name}</h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">{project.description}</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.name} key features`}>
            {project.features.map((feature) => (
              <li
                key={feature}
                className="rounded-full border border-border/70 bg-background/50 px-3 py-1 text-xs text-muted-foreground"
              >
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/25 bg-primary/8 p-4">
            <TrendingUp className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-sm font-medium">{project.metric}</p>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2" aria-label={`${project.name} tech stack`}>
            {project.tech.map((t) => (
              <li key={t} className="font-mono text-xs text-muted-foreground">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button variant="subtle" asChild>
              <a href={project.caseStudyUrl ?? project.github ?? "#projects"}>
                View Case Study <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
            {project.github ? (
              <Button variant="quiet" asChild>
                <a href={project.github} target="_blank" rel="noreferrer noopener">
                  <Github aria-hidden="true" /> GitHub
                </a>
              </Button>
            ) : null}
            {project.liveUrl ? (
              <Button variant="quiet" asChild>
                <a href={project.liveUrl} target="_blank" rel="noreferrer noopener">
                  Live Demo <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            ) : null}
          </div>
        </div>

        <div className={cn("order-2", flip && "lg:order-1")}>
          <ProjectPreview variant={project.preview} />
        </div>
      </div>
    </Reveal>
  );
}
