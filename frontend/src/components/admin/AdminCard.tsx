import { ReactNode } from "react";

type AdminCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
};

export default function AdminCard({
  title,
  description,
  children,
  action,
  className = "",
}: AdminCardProps) {
  return (
    <section
      className={[
        "border border-black/10 bg-white/30",
        className,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-5 border-b border-black/10 px-6 py-5">
        <div>
          <h2 className="font-display text-2xl leading-none">{title}</h2>
          {description && (
            <p className="mt-2 text-xs leading-5 text-black/40">
              {description}
            </p>
          )}
        </div>

        {action}
      </div>

      <div className="p-6">{children}</div>
    </section>
  );
}
