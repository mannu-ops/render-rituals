import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PortfolioProject } from "./PortfolioCard";

export default function PortfolioFeatured({
  project,
}: {
  project: PortfolioProject;
}) {
  return (
    <section className="border-y border-black/10 py-20 md:py-28">
      <div className="container-rituals">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="label-rituals">Featured project</p>
            <h2 className="font-display mt-4 text-5xl leading-none md:text-7xl">
              {project.title}
            </h2>
          </div>

          <Link
            href={`/portfolio/${project.slug}`}
            className="group hidden items-center gap-2 text-xs md:inline-flex"
          >
            View project
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <Link href={`/portfolio/${project.slug}`} className="group block">
          <div className="relative aspect-[16/9] overflow-hidden bg-black/5">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </Link>

        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-[10px] uppercase tracking-[0.12em] text-black/35">
          <span>{project.category}</span>
          {project.year && <span>{project.year}</span>}
          {project.location && <span>{project.location}</span>}
        </div>
      </div>
    </section>
  );
}
