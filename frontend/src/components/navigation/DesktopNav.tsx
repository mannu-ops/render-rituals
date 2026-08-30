"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
];

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
      {links.map((link) => {
        const active =
          pathname === link.href || pathname.startsWith(`${link.href}/`);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={[
              "relative text-[10px] uppercase tracking-[0.14em] transition-colors",
              active ? "text-black" : "text-black/45 hover:text-black",
            ].join(" ")}
          >
            {link.label}
            {active && (
              <span className="absolute -bottom-2 left-0 h-px w-full bg-black" />
            )}
          </Link>
        );
      })}

      <Link
        href="/hire-me"
        className="group inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-[10px] uppercase tracking-[0.12em] text-white"
      >
        Hire me
        <ArrowUpRight
          size={13}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </Link>
    </nav>
  );
}
