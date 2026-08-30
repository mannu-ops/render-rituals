import type { Project, ProjectCategory } from "@/types";

export function filterProjects(
  projects: Project[],
  category: ProjectCategory | "All",
): Project[] {
  if (category === "All") return projects;

  return projects.filter((project) => project.category === category);
}

export function getProjectBySlug(
  projects: Project[],
  slug: string,
): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(projects: Project[]): Project[] {
  return projects.filter((project) => project.featured);
}
