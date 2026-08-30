"use client";

import type { ReactNode } from "react";
import { useState } from "react";

export default function Tooltip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}

      {visible && (
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-[#171717] px-2.5 py-1.5 text-[9px] text-white"
        >
          {label}
        </span>
      )}
    </span>
  );
}
