"use client";

import { ArrowUpRight, Sparkles, MapPin, Calendar, Tag, Layers, Compass, Eye } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";

export default function FeaturedProjects() {
  const { projects } = useAdminData();
  const [selectedCategory, setSelectedCategory] = useState<string>("All Works");

  const categories = ["All Works", "3D Visualization", "2D Floor Plans"];
  const publicProjects = projects.filter((p) => p.published !== false);

  const filteredProjects =
    selectedCategory === "All Works"
      ? publicProjects.slice(0, 4)
      : publicProjects
          .filter((p) => {
            if (selectedCategory === "3D Visualization") {
              return (
                (p.renders3D && p.renders3D.length > 0) ||
                p.category === "Visualization" ||
                p.category === "Residential" ||
                p.category === "Commercial"
              );
            }
            if (selectedCategory === "2D Floor Plans") {
              return (
                (p.plans2D && p.plans2D.length > 0) ||
                p.category === "Planning" ||
                p.category === "Space Planning" ||
                p.category === "Architecture"
              );
            }
            return true;
          })
          .slice(0, 4);

  return (
    <section id="work" className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#14171A] border-t border-white/10">
      <div className="container-rituals">
        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D49A6A]" />
              <span className="label-rituals text-[#D49A6A]">Freelance Portfolio</span>
            </div>
            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#F3F4F6]">
              Selected 3D & <span className="italic text-[#D49A6A]">2D Works</span>
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-2 font-mono-spec text-[10px] uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-[#D49A6A] text-[#14171A] font-semibold shadow-md"
                    : "border border-white/10 bg-[#1E2227] text-[#8E98A5] hover:border-[#D49A6A]/40 hover:text-[#F3F4F6]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Architectural Gallery Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-12">
          {filteredProjects.map((project, index) => {
            const colSpan = index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : index === 2 ? "lg:col-span-5" : "lg:col-span-7";
            const aspectClass = index === 0 ? "aspect-[16/11]" : "aspect-[4/3]";
            const rendersCount = project.renders3D?.length || (project.gallery?.length || 3);
            const plansCount = project.plans2D?.length || 2;
            const displayImage =
              selectedCategory === "2D Floor Plans" && project.plans2D && project.plans2D.length > 0
                ? project.plans2D[0].image
                : (project.coverImage || project.image);
            const badgeText =
              selectedCategory === "2D Floor Plans"
                ? `${plansCount} CAD Floor Plans`
                : selectedCategory === "3D Visualization"
                ? `${rendersCount} 3D Perspectives`
                : `${project.category} · 3D & 2D Suite`;

            return (
              <div
                key={project.slug}
                className={colSpan}
              >
                <Link href={`/portfolio/${project.slug}`} className="group block">
                  <div className={`relative ${aspectClass} overflow-hidden rounded-3xl border border-white/10 bg-[#1E2227] shadow-xl transition-all duration-700 group-hover:shadow-3xl group-hover:border-[#D49A6A]/50`}>
                    <img
                      src={displayImage}
                      alt={project.title}
                      onError={(e) => {
                        const target = e.currentTarget;
                        const src = target.src;
                        if (src.includes(":5000/images/")) {
                          target.src = src.replace(/^http:\/\/localhost:5000/, "");
                        }
                      }}
                      className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14171A]/95 via-black/30 to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-85" />

                    {/* Floating Top Category Pill */}
                    <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3.5 py-1.5 text-[10px] font-medium text-[#F3F4F6] backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D49A6A]" />
                      <span className="font-mono-spec uppercase tracking-wider">{badgeText}</span>
                    </div>

                    {/* Quick Action Badge */}
                    <div className="absolute bottom-5 right-5 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#D49A6A] text-[#14171A] opacity-90 sm:opacity-0 shadow-xl transition-all duration-300 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 translate-y-0 sm:translate-y-2">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  {/* Metadata Row */}
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono-spec text-[10px] uppercase tracking-wider text-[#8E98A5]">
                        <span className="flex items-center gap-1">
                          <MapPin size={11} className="text-[#D49A6A]" />
                          {project.location}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-[#D49A6A]">
                          <Eye size={11} />
                          {rendersCount} 3D Views
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-[#F3F4F6]">
                          <Layers size={11} className="text-[#D49A6A]" />
                          {plansCount} 2D Plans
                        </span>
                      </div>
                      <h3 className="font-display mt-2 text-2xl font-medium tracking-tight text-[#F3F4F6] transition-colors group-hover:text-[#D49A6A] md:text-3xl">
                        {project.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#8E98A5]">
                        {project.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* View All Projects CTA */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-[#1E2227] px-8 py-4.5 text-xs font-semibold uppercase tracking-wider text-[#F3F4F6] shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#D49A6A] hover:bg-[#D49A6A] hover:text-[#14171A] active:scale-[0.98]"
          >
            <span>Explore Complete Spatial Archive</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

