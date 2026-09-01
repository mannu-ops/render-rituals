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
    <div className="max-w-3xl">
      <p className="label-rituals">{eyebrow}</p>
      <h1 className="font-display mt-3.5 text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#F3F4F6]">
        {title}
      </h1>
      <p className="mt-4 sm:mt-5 max-w-2xl text-sm leading-relaxed text-[#8E98A5] sm:text-base">
        {description}
      </p>
    </div>
  );
}
