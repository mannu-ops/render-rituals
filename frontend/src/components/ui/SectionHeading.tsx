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
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && (
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-black/40">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display mt-4 max-w-3xl text-5xl leading-[0.95] tracking-tight md:text-7xl">
          {title}
        </h2>
      </div>

      {description && (
        <p className="max-w-sm text-sm leading-7 text-black/50">{description}</p>
      )}

      {children}
    </div>
  );
}
