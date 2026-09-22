import Container from "../ui/Container";
import GlassCard from "../ui/GlassCard";
import Button from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";

import { projects, projectsSection } from "../../constants/projects";

function FeaturedWorks() {
  return (
    <section id="portfolio" className="py-10 sm:py-14 lg:py-20">
      <Container>
        <GlassCard className="p-6 sm:p-8 lg:p-10">
          {/* Section Heading */}
          <SectionHeading
            eyebrow={projectsSection.eyebrow}
            title={projectsSection.title}
            description={projectsSection.description}
          />

          {/* Project List */}
          <div className="mt-8">
            <ul className="divide-y divide-white/5">
              {projects.map((project, index) => (
                <li key={project.id} id={project.href.slice(1)}>
                  <a
                    href={project.href}
                    className="
                      group
                      flex
                      items-center
                      justify-between
                      gap-4
                      py-4
                      transition-all
                      duration-300
                      sm:py-5
                    "
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <span
                        className="
                          shrink-0
                          text-[0.65rem]
                          font-bold
                          tracking-[0.16em]
                          text-white/25
                          transition-colors
                          duration-300
                          group-hover:text-cyan-300/60
                        "
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span
                        className="
                          truncate
                          font-display
                          text-lg
                          font-medium
                          text-white/80
                          transition-all
                          duration-300
                          group-hover:translate-x-1
                          group-hover:text-white
                          sm:text-xl
                        "
                      >
                        {project.title}
                      </span>
                    </div>

                    <span
                      aria-hidden="true"
                      className="
                        shrink-0
                        text-lg
                        text-cyan-300/40
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                        group-hover:text-cyan-200
                        group-hover:drop-shadow-[0_0_10px_rgba(36,215,232,0.4)]
                      "
                    >
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <Button href={projectsSection.ctaHref} className="w-full sm:w-auto">
              {projectsSection.ctaLabel}
            </Button>
          </div>
        </GlassCard>
      </Container>
    </section>
  );
}

export default FeaturedWorks;
