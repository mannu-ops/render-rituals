import type { ResumeTraining } from "@/types";

type ResumeTrainingProps = {
  items: ResumeTraining[];
};

export default function ResumeTraining({
  items,
}: ResumeTrainingProps) {
  if (!items.length) return null;

  return (
    <section className="grid gap-8 md:grid-cols-[1fr_2fr]">
      <p className="label-rituals">Training</p>

      <div className="divide-y divide-black/10">
        {items.map((item) => (
          <article
            key={item.id ?? `${item.title}-${item.period}`}
            className="grid gap-3 py-7 first:pt-0 md:grid-cols-[150px_1fr]"
          >
            <p className="text-xs text-black/35">{item.period}</p>

            <div>
              <h3 className="font-display text-2xl leading-none">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-black/50">
                {item.institution}
              </p>
              {item.description && (
                <p className="mt-3 text-sm leading-6 text-black/45">
                  {item.description}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
