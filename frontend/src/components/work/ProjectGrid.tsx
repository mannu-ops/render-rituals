"use client";

import { useMemo, useState } from "react";
import { projects as defaultProjects } from "@/data";
import { useAdminData } from "@/context/AdminDataContext";
import { EmptyState, Reveal } from "../common";
import WorkFilters from "./WorkFilters";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid() {
  const { projects: liveProjects } = useAdminData();
  const sourceProjects = (liveProjects && liveProjects.length > 0 ? liveProjects : defaultProjects).filter(
    (p) => p.published !== false
  );

  const categories = [
    "All",
    ...Array.from(new Set(sourceProjects.map((project) => project.category))),
  ];

  const [active, setActive] = useState("All");

  const filteredProjects = useMemo(() => {
    if (active === "All") return sourceProjects;
    return sourceProjects.filter((project) => project.category === active);
  }, [active, sourceProjects]);

  return (
    <section className="pb-20 md:pb-28">
      <div className="container-rituals">
        <div className="flex flex-col gap-6 border-y border-black/10 py-5 md:flex-row md:items-center md:justify-between">
          <p className="label-rituals">Filter projects</p>
          <WorkFilters
            categories={categories}
            active={active}
            onChange={setActive}
          />
        </div>

        {filteredProjects.length > 0 ? (
          <div className="mt-10 grid gap-x-5 gap-y-14 md:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <Reveal
                key={project.slug}
                delay={(index % 4) * 70}
                className={index === 0 ? "md:col-span-2" : ""}
              >
                <ProjectCard project={project} featured={index === 0} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <EmptyState
              title="No projects in this category"
              description="Try another filter to explore the portfolio."
            />
          </div>
        )}
      </div>
    </section>
  );
}
