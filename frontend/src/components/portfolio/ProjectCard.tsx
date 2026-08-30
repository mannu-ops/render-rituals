import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export default function ProjectCard({
  project,
  priority = false,
}: ProjectCardProps) {
  return (
    <article className="group">
      <Link href={`/work/${project.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>

        <div className="mt-4 flex items-start justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.12em] text-black/40">
              {project.category} · {project.year}
            </p>
            <h3 className="mt-2 font-display text-2xl leading-none">
              {project.title}
            </h3>
          </div>

          <span className="mt-1 text-xs text-black/35 transition-transform duration-300 group-hover:translate-x-1">
            ↗
          </span>
        </div>
      </Link>
    </article>
  );
}
