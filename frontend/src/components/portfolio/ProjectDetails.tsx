import type { Project } from "@/types";

type ProjectDetailsProps = {
  project: Project;
};

export default function ProjectDetails({
  project,
}: ProjectDetailsProps) {
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
      <p className="label-rituals">Project notes</p>

      <div>
        <p className="max-w-2xl text-base leading-8 text-black/60">
          {project.description}
        </p>

        {project.services?.length ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {project.services.map((service) => (
              <span
                key={service}
                className="rounded-full border border-black/10 px-4 py-2 text-[10px] uppercase tracking-[0.08em] text-black/50"
              >
                {service}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
