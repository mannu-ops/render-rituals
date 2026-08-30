import type { ResumeEducation } from "@/types";

type ResumeEducationProps = {
  items: ResumeEducation[];
};

export default function ResumeEducation({
  items,
}: ResumeEducationProps) {
  return (
    <section className="grid gap-8 md:grid-cols-[1fr_2fr]">
      <p className="label-rituals">Education</p>

      <div className="divide-y divide-black/10">
        {items.map((item) => (
          <article
            key={item.id ?? `${item.institution}-${item.period}`}
            className="grid gap-3 py-7 first:pt-0 md:grid-cols-[150px_1fr]"
          >
            <p className="text-xs text-black/35">{item.period}</p>

            <div>
              <h3 className="font-display text-2xl leading-none">
                {item.qualification}
              </h3>
              <p className="mt-2 text-sm text-black/50">
                {item.institution}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
