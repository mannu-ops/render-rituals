"use client";

import { useMemo, useState } from "react";
import PortfolioCard from "./PortfolioCard";
import PortfolioFilters from "./PortfolioFilters";
import { projects as defaultProjects } from "@/data";
import { Project } from "@/types";
import { useAdminData } from "@/context/AdminDataContext";

const defaultFilters = [
  { label: "All work", value: "all" },
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
  { label: "Visualization", value: "visualization" },
  { label: "Architecture", value: "architecture" },
];

export default function PortfolioGrid({
  projects = defaultProjects,
}: {
  projects?: Project[];
}) {
  const { projects: liveProjects } = useAdminData();
  const [activeFilter, setActiveFilter] = useState("all");

  const sourceProjects = (liveProjects && liveProjects.length > 0 ? liveProjects : projects).filter(
    (p) => p.published !== false
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return sourceProjects;

    return sourceProjects.filter(
      (project) =>
        project.category.toLowerCase() === activeFilter.toLowerCase(),
    );
  }, [activeFilter, sourceProjects]);

  return (
    <section className="pb-16 sm:pb-20 md:pb-24">
      <div className="container-rituals">
        <div className="mb-8 flex flex-col gap-5 border-y border-white/10 py-4 md:flex-row md:items-center md:justify-between">
          <p className="label-rituals">
            {filteredProjects.length} project
            {filteredProjects.length === 1 ? "" : "s"}
          </p>

          <PortfolioFilters
            filters={defaultFilters}
            activeFilter={activeFilter}
            onChange={setActiveFilter}
          />
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <PortfolioCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="border border-white/10 py-16 text-center rounded-2xl bg-[#1E2227]">
            <p className="font-display text-xl text-[#F3F4F6]">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
