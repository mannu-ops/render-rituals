"use client";

import type { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <main key={pathname} className="animate-page-in">
      {children}
    </main>
  );
}
