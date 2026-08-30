"use client";

import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MobileNav({ open, onClose }: Props) {
  if (!open) return null;

  const links = [
    ["Work", "/work"],
    ["Services", "/services"],
    ["About", "/about"],
    ["Pricing", "/pricing"],
  ];

  return (
    <div className="fixed inset-0 z-[60] bg-[#171717] p-5 text-white sm:p-7">
      <div className="flex items-center justify-between">
        <Link href="/" onClick={onClose} className="font-display text-xl">
          Render Rituals.
        </Link>
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="mt-24 flex flex-col">
        {links.map(([label, href], index) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className="border-b border-white/10 py-5 font-display text-4xl"
          >
            <span className="mr-4 text-[10px] text-white/30">0{index + 1}</span>
            {label}
          </Link>
        ))}
      </nav>

      <Link
        href="/hire-me"
        onClick={onClose}
        className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3.5 text-xs text-[#171717]"
      >
        Hire Me
        <ArrowUpRight size={15} />
      </Link>
    </div>
  );
}
