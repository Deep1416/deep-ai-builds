import { ProjectCard } from "@/features/projects/components/project-card";
import { SectionHeading } from "@/components/common/section-heading";
import { projects } from "@/features/projects/data";

export function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-border/60 py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Selected work"
          title="Featured Projects"
          description="Full products, not demos — built end to end across backend, frontend, AI, and deployment."
        />
        <div className="mt-14 space-y-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
