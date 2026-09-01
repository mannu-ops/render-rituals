import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/data";
import ProjectGallery from "./ProjectGallery";
import ProjectMeta from "./ProjectMeta";

type ProjectDetailProps = {
  slug: string;
};

export default function ProjectDetail({ slug }: ProjectDetailProps) {
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <section className="pt-36 pb-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs text-black/50"
          >
            <ArrowLeft size={14} />
            Back to work
          </Link>

          <h1 className="font-display mt-8 text-3xl sm:text-4xl text-[#F3F4F6]">
            Project not found.
          </h1>
        </div>
      </section>
    );
  }

  const metadata = [
    { label: "Category", value: project.category },
    { label: "Year", value: String(project.year ?? "—") },
    { label: "Location", value: project.location ?? "—" },
    { label: "Scope", value: project.services?.join(", ") ?? "Design & visualization" },
  ];

  const galleryImages = project.gallery?.length ? project.gallery : [project.image];

  return (
    <article className="pt-24 md:pt-32 bg-[#14171A] text-[#F3F4F6]">
      <div className="container-rituals">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#8E98A5] hover:text-[#D49A6A]"
        >
          <ArrowLeft size={13} />
          All work
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <p className="label-rituals">{project.category}</p>
            <h1 className="font-display mt-3.5 text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#F3F4F6]">
              {project.title}
            </h1>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#8E98A5] lg:pb-1">
            {project.description || project.excerpt ||
              "A considered interior concept developed through space planning, material direction and visual storytelling."}
          </p>
        </div>

        <div className="mt-10 sm:mt-12">
          <ProjectGallery
            images={galleryImages.map((src: string, idx: number) => ({
              src,
              alt: `${project.title} render ${idx + 1}`,
              className: idx === 0 ? "aspect-[16/9] md:col-span-2" : "aspect-[4/3]",
            }))}
          />
        </div>

        <div className="mt-8 sm:mt-10">
          <ProjectMeta items={metadata} />
        </div>

        <div className="grid gap-8 py-14 md:grid-cols-[.45fr_1.55fr] md:py-20 border-t border-white/10 mt-12">
          <p className="label-rituals">Project notes</p>
          <div className="max-w-2xl">
            <p className="font-display text-xl sm:text-2xl md:text-3xl leading-snug text-[#F3F4F6]">
              {project.description ||
                "A visual study of proportion, texture, light and the rituals of everyday life."}
            </p>
            <Link
              href="/#contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#D49A6A] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#14171A] hover:bg-[#E5A97C]"
            >
              Discuss a similar project
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
