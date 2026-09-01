type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-4xl"}>
      {eyebrow && <p className="label-rituals">{eyebrow}</p>}

      <h1 className="font-display mt-3.5 text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#F3F4F6]">
        {title}
      </h1>

      {description && (
        <p className="mt-4 sm:mt-5 max-w-2xl text-sm leading-relaxed text-[#8E98A5] sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
