"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/types";
import Badge from "../ui/Badge";

const categories: Array<"All" | ProjectCategory> = [
  "All",
  "Residential",
  "Commercial",
  "Visualization",
  "Drafting",
  "Concept",
];

export default function ProjectFilters({
  projects,
  onChange,
}: {
  projects: Project[];
  onChange: (filtered: Project[]) => void;
}) {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const counts = useMemo(() => {
    return categories.reduce<Record<string, number>>((result, category) => {
      result[category] =
        category === "All"
          ? projects.length
          : projects.filter((project) => project.category === category).length;
      return result;
    }, {});
  }, [projects]);

  function selectCategory(category: (typeof categories)[number]) {
    setActive(category);

    onChange(
      category === "All"
        ? projects
        : projects.filter((project) => project.category === category),
    );
  }

  return (
    <div className="mb-10 flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => selectCategory(category)}
          className={`rounded-full transition-opacity ${
            active === category ? "opacity-100" : "opacity-55 hover:opacity-100"
          }`}
        >
          <Badge muted={active !== category}>
            {category} · {counts[category]}
          </Badge>
        </button>
      ))}
    </div>
  );
}
