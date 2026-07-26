import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/site-content";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-t border-white/10 bg-[#090e17]/60 py-16 sm:py-24"
    >
      <Container>
        <div id="projects-heading">
          <SectionHeading
            eyebrow="Projects"
            heading="Selected systems and case studies"
            description="Examples of the operational problems we solve and the outcomes we build toward."
          />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
