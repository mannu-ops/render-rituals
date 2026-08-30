import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types";

export type PortfolioProject = Project;

export default function PortfolioCard({
  project,
}: {
  project: Project;
}) {
  return (
    <article className="group">
      <Link href={`/portfolio/${project.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-[#1E2227]">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#D49A6A] text-[#14171A] opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 shadow-md">
            <ArrowUpRight size={15} />
          </span>
        </div>

        <div className="mt-4 flex items-start justify-between gap-5">
          <div>
            <p className="label-rituals">{project.category}</p>
            <h3 className="font-display mt-2 text-3xl leading-none text-[#F3F4F6] group-hover:text-[#D49A6A] transition-colors">
              {project.title}
            </h3>
          </div>

          <div className="shrink-0 text-right">
            {project.year && (
              <p className="font-mono-spec text-[10px] text-[#8E98A5]">{project.year}</p>
            )}
            {project.location && (
              <p className="mt-1 font-mono-spec text-[10px] text-[#8E98A5]">
                {project.location}
              </p>
            )}
          </div>
        </div>

        {project.excerpt && (
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#8E98A5]">
            {project.excerpt}
          </p>
        )}
      </Link>
    </article>
  );
}
