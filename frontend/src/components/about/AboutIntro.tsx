type AboutIntroProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export default function AboutIntro({
  eyebrow = "About Render Rituals",
  title = "Designing spaces with intention.",
  description = "Render Rituals is an independent spatial design and architectural CGI practice focused on tactile materials, clear planning, and photorealistic visual storytelling.",
}: AboutIntroProps) {
  return (
    <div className="max-w-5xl">
      <div className="flex items-center gap-2 mb-3">
        <span className="h-1.5 w-1.5 rounded-full bg-[#D49A6A]" />
        <span className="label-rituals text-[#D49A6A]">{eyebrow}</span>
      </div>

      <h1 className="font-display mt-4 text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#F3F4F6]">
        {title}
      </h1>

      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#8E98A5] sm:text-base">
        {description}
      </p>
    </div>
  );
}
