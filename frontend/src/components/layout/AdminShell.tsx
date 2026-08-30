import type { PropsWithChildren } from "react";

export default function AdminShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-[#efede7] text-[#171717]">
      {children}
    </div>
  );
}
