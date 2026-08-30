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
    <div className={align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-5xl"}>
      {eyebrow && <p className="label-rituals">{eyebrow}</p>}

      <h1 className="font-display mt-5 text-6xl leading-[0.88] tracking-tight md:text-8xl">
        {title}
      </h1>

      {description && (
        <p className="mt-7 max-w-2xl text-sm leading-7 text-black/50 md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
