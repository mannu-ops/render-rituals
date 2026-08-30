import { ReactNode } from "react";

type AdminHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export default function AdminHeader({
  eyebrow = "Studio admin",
  title,
  description,
  actions,
}: AdminHeaderProps) {
  return (
    <header className="mb-10 flex flex-col gap-6 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-[9px] uppercase tracking-[0.16em] text-black/35">
          {eyebrow}
        </p>
        <h1 className="font-display mt-3 text-5xl leading-none tracking-[-0.03em] md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-sm leading-6 text-black/45">
            {description}
          </p>
        )}
      </div>

      {actions && <div className="shrink-0">{actions}</div>}
    </header>
  );
}
