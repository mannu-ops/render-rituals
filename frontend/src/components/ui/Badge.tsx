import type { ReactNode } from "react";

export default function Badge({
  children,
  muted = false,
}: {
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1.5 text-[9px] uppercase tracking-[0.12em] ${
        muted
          ? "border-black/8 text-black/40"
          : "border-black/12 text-black/60"
      }`}
    >
      {children}
    </span>
  );
}
