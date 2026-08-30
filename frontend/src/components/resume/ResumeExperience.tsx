import type { ResumeExperience } from "@/types";

type ResumeExperienceProps = {
  items: ResumeExperience[];
};

export default function ResumeExperience({
  items,
}: ResumeExperienceProps) {
  return (
    <section className="grid gap-8 md:grid-cols-[1fr_2fr]">
      <p className="label-rituals">Experience</p>

      <div className="divide-y divide-black/10">
        {items.map((item) => (
          <article
            key={item.id ?? `${item.company}-${item.period}`}
            className="grid gap-3 py-7 first:pt-0 md:grid-cols-[150px_1fr]"
          >
            <p className="text-xs text-black/35">{item.period}</p>

            <div>
              <h3 className="font-display text-3xl leading-none">
                {item.role}
              </h3>
              <p className="mt-2 text-xs uppercase tracking-[0.1em] text-black/45">
                {item.company}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-black/50">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
