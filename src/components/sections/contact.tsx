import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/data/portfolio";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-border/60 py-24 md:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 glow-hero" />
      <div className="container-page relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Have an interesting problem to solve?"
            description="I'm interested in opportunities involving full-stack engineering, backend systems, Generative AI, developer platforms, and scalable product development."
          />
          <Reveal delay={100}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button variant="hero" size="xl" asChild>
                <a href={`mailto:${site.email}`}>
                  <Mail aria-hidden="true" /> Send Me an Email
                </a>
              </Button>
              <Button variant="subtle" size="xl" asChild>
                <a href={site.linkedin} target="_blank" rel="noreferrer noopener">
                  <Linkedin aria-hidden="true" /> LinkedIn
                </a>
              </Button>
              <Button variant="subtle" size="xl" asChild>
                <a href={site.github} target="_blank" rel="noreferrer noopener">
                  <Github aria-hidden="true" /> GitHub
                </a>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
