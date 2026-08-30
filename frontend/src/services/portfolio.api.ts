import type { Project, ProjectCategory } from "@/types";
import { projects as fallbackProjects } from "@/data";

export async function getProjects(): Promise<Project[]> {
  return fallbackProjects;
}

export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  return fallbackProjects.find((project) => project.slug === slug);
}

export async function getProjectsByCategory(
  category: ProjectCategory | "All",
): Promise<Project[]> {
  if (category === "All") return fallbackProjects;

  return fallbackProjects.filter(
    (project) => project.category === category,
  );
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return fallbackProjects.filter((project) => project.featured);
}
