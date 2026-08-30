import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ImagePlaceholder } from "../common";

type ProjectCardProps = {
  project: {
    slug: string;
    title: string;
    category: string;
    year?: string | number;
    coverImage?: string;
    location?: string;
  };
  featured?: boolean;
};

export default function ProjectCard({
  project,
  featured = false,
}: ProjectCardProps) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <ImagePlaceholder
        src={project.coverImage}
        alt={project.title}
        className={featured ? "aspect-[16/9]" : "aspect-[4/3]"}
      />

      <div className="mt-4 flex items-start justify-between gap-5">
        <div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[9px] uppercase tracking-[0.14em] text-black/35">
            <span>{project.category}</span>
            {project.year && <span>{project.year}</span>}
            {project.location && <span>{project.location}</span>}
          </div>

          <h2 className="font-display mt-2 text-2xl leading-none md:text-3xl">
            {project.title}
          </h2>
        </div>

        <ArrowUpRight
          size={17}
          className="mt-1 shrink-0 text-black/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </div>
    </Link>
  );
}
