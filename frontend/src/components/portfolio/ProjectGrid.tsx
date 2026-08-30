import type { Project } from "@/types";
import ProjectCard from "./ProjectCard";

type ProjectGridProps = {
  projects: Project[];
};

export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (!projects.length) {
    return (
      <div className="border border-black/10 px-6 py-16 text-center">
        <p className="text-sm text-black/45">
          No projects found for this selection.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-x-5 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id ?? project.slug}
          project={project}
          priority={index < 2}
        />
      ))}
    </div>
  );
}
