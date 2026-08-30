import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types";

export default function RelatedProjects({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <section className="border-t border-black/10 pt-16 md:pt-24">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">
            Continue Exploring
          </p>
          <h2 className="font-display mt-4 text-4xl md:text-5xl">
            More selected work.
          </h2>
        </div>
        <Link
          href="/work"
          className="hidden items-center gap-2 text-xs uppercase tracking-[0.14em] md:flex"
        >
          All Work <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
          <Link key={project.slug} href={`/work/${project.slug}`} className="group">
            <div className="aspect-[4/3] overflow-hidden bg-[#dedbd2]">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-3 flex justify-between gap-3">
              <div>
                <span className="text-[9px] uppercase tracking-[0.12em] text-black/35">
                  {project.category}
                </span>
                <h3 className="font-display text-xl">{project.title}</h3>
              </div>
              <ArrowUpRight size={15} className="mt-1 text-black/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
