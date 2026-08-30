import type { Project } from "@/types";

type ProjectMetaProps = {
  project: Project;
};

export default function ProjectMeta({ project }: ProjectMetaProps) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-y border-black/10 py-7 sm:grid-cols-4">
      <div>
        <dt className="text-[9px] uppercase tracking-[0.12em] text-black/35">
          Category
        </dt>
        <dd className="mt-2 text-sm">{project.category}</dd>
      </div>

      <div>
        <dt className="text-[9px] uppercase tracking-[0.12em] text-black/35">
          Year
        </dt>
        <dd className="mt-2 text-sm">{project.year}</dd>
      </div>

      <div>
        <dt className="text-[9px] uppercase tracking-[0.12em] text-black/35">
          Location
        </dt>
        <dd className="mt-2 text-sm">{project.location ?? "—"}</dd>
      </div>

      <div>
        <dt className="text-[9px] uppercase tracking-[0.12em] text-black/35">
          Services
        </dt>
        <dd className="mt-2 text-sm">
          {project.services?.length ? project.services.join(", ") : "—"}
        </dd>
      </div>
    </dl>
  );
}
