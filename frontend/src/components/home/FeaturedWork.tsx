import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data";
import { ImagePlaceholder, Reveal } from "@/components/common";

export default function FeaturedWork() {
  const featured = projects.slice(0, 3);

  return (
    <section className="border-t border-black/10 py-20 md:py-28">
      <div className="container-rituals">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="label-rituals">Selected work</p>
            <h2 className="font-display mt-4 text-5xl leading-none md:text-7xl">
              A few rituals.
            </h2>
          </div>

          <Link
            href="/work"
            className="group hidden items-center gap-2 text-xs md:inline-flex"
          >
            View all work
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={index * 80} className={index === 0 ? "md:col-span-2" : ""}>
              <Link href={`/work/${project.slug}`} className="group block">
                <ImagePlaceholder
                  src={project.coverImage}
                  alt={project.title}
                  className={index === 0 ? "aspect-[16/8]" : "aspect-[4/3]"}
                />
                <div className="mt-4 flex items-start justify-between gap-5">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl">{project.title}</h3>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-black/35">
                      {project.category}
                    </p>
                  </div>
                  <ArrowUpRight size={16} className="mt-1 text-black/35" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Link
          href="/work"
          className="group mt-8 inline-flex items-center gap-2 text-xs md:hidden"
        >
          View all work
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
}
