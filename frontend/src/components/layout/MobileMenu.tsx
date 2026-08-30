"use client";

import Link from "next/link";
import { X } from "lucide-react";

const links = [
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#171717] px-6 py-6 text-white">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Render Rituals</span>
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="mt-20 flex flex-col">
        {links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="flex items-center gap-5 border-b border-white/10 py-5"
          >
            <span className="text-[10px] text-white/30">0{index + 1}</span>
            <span className="font-display text-4xl">{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
