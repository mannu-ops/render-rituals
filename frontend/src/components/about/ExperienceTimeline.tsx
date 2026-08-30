type Experience = {
  period: string;
  role: string;
  company: string;
  description?: string;
};

const fallbackExperience: Experience[] = [
  {
    period: "2024 — Present",
    role: "Interior Designer",
    company: "Render Rituals",
    description:
      "Independent interior design, visualization and client-focused project work.",
  },
  {
    period: "Previous",
    role: "Interior Design Experience",
    company: "Professional Practice",
    description:
      "Project development, design coordination, presentations and visualization.",
  },
  {
    period: "Earlier",
    role: "Design Education",
    company: "Academic / Training",
    description:
      "Foundation in spatial design, materials, visual communication and design thinking.",
  },
];

export default function ExperienceTimeline({
  items = fallbackExperience,
}: {
  items?: Experience[];
}) {
  return (
    <section className="border-y border-black/10 py-20 md:py-28">
      <div className="container-rituals grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
        <p className="label-rituals">Experience</p>

        <div className="border-t border-black/10">
          {items.map((item) => (
            <article
              key={`${item.period}-${item.role}`}
              className="grid gap-4 border-b border-black/10 py-7 md:grid-cols-[.35fr_1fr]"
            >
              <p className="text-[10px] uppercase tracking-[0.12em] text-black/35">
                {item.period}
              </p>

              <div>
                <h3 className="font-display text-3xl leading-none">
                  {item.role}
                </h3>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-black/40">
                  {item.company}
                </p>
                {item.description && (
                  <p className="mt-4 max-w-xl text-sm leading-7 text-black/50">
                    {item.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
