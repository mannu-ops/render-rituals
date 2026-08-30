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

          <h1 className="font-display mt-14 text-6xl leading-none md:text-8xl">
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
    <article className="pt-32 md:pt-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-black/40 hover:text-black"
        >
          <ArrowLeft size={13} />
          All work
        </Link>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <p className="label-rituals">{project.category}</p>
            <h1 className="font-display mt-5 text-6xl leading-[0.82] md:text-8xl">
              {project.title}
            </h1>
          </div>

          <p className="max-w-md text-sm leading-7 text-black/50 lg:pb-1">
            {project.description || project.excerpt ||
              "A considered interior concept developed through space planning, material direction and visual storytelling."}
          </p>
        </div>

        <div className="mt-14">
          <ProjectGallery
            images={galleryImages.map((src: string, idx: number) => ({
              src,
              alt: `${project.title} render ${idx + 1}`,
              className: idx === 0 ? "aspect-[16/9] md:col-span-2" : "aspect-[4/3]",
            }))}
          />
        </div>

        <div className="mt-10">
          <ProjectMeta items={metadata} />
        </div>

        <div className="grid gap-10 py-20 md:grid-cols-[.55fr_1.45fr] md:py-28">
          <p className="label-rituals">Project notes</p>
          <div className="max-w-3xl">
            <p className="font-display text-3xl leading-tight md:text-5xl">
              {project.description ||
                "A visual study of proportion, texture, light and the rituals of everyday life."}
            </p>
            <Link
              href="/hire-me"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#171717] px-5 py-3.5 text-xs text-white"
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
