import type { Project } from "@/types";

export default function ProjectIntro({ project }: { project: Project }) {
  return (
    <section className="pt-24 pb-10 sm:pt-28 sm:pb-12 md:pt-32 bg-[#14171A] text-[#F3F4F6]">
      <div className="container-rituals">
        <p className="label-rituals">{project.category}</p>
        <h1 className="font-display mt-3.5 max-w-4xl text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#F3F4F6]">
          {project.title}
        </h1>
        <p className="mt-4 sm:mt-5 max-w-2xl text-sm leading-relaxed text-[#8E98A5] sm:text-base">
          {project.description}
        </p>
      </div>
    </section>
  );
}
