import type { Project } from "@/types";

export default function ProjectIntro({ project }: { project: Project }) {
  return (
    <section className="pt-36 pb-12 md:pt-48 md:pb-20">
      <div className="container-rituals">
        <p className="label-rituals">{project.category}</p>
        <h1 className="font-display mt-5 max-w-5xl text-6xl leading-[0.86] tracking-tight md:text-8xl">
          {project.title}
        </h1>
        <p className="mt-7 max-w-2xl text-sm leading-7 text-black/50 md:text-base">
          {project.description}
        </p>
      </div>
    </section>
  );
}
