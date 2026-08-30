type ExperienceIntroProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export default function ExperienceIntro({
  eyebrow = "Experience",
  title = "A practice built around detail.",
  description = "A selection of professional experience, responsibilities and project-focused skills across interior design and visualization.",
}: ExperienceIntroProps) {
  return (
    <div className="max-w-4xl">
      <p className="label-rituals">{eyebrow}</p>
      <h1 className="font-display mt-5 text-6xl leading-[0.92] tracking-[-0.04em] md:text-8xl">
        {title}
      </h1>
      <p className="mt-7 max-w-2xl text-sm leading-7 text-black/50 md:text-base">
        {description}
      </p>
    </div>
  );
}
