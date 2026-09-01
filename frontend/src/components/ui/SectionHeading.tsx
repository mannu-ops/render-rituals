import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between text-[#F3F4F6]">
      <div>
        {eyebrow && (
          <p className="label-rituals">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display mt-3.5 max-w-2xl text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.12] tracking-tight text-[#F3F4F6]">
          {title}
        </h2>
      </div>

      {description && (
        <p className="max-w-md text-sm leading-relaxed text-[#8E98A5]">{description}</p>
      )}

      {children}
    </div>
  );
}
