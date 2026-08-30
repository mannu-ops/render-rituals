"use client";

import { Menu } from "lucide-react";

export default function MobileMenuButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open navigation menu"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 md:hidden"
    >
      <Menu size={18} />
    </button>
  );
}
