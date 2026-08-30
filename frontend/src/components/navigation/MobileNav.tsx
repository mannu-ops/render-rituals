"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, X } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#f5f3ef] md:hidden">
      <div className="flex h-20 items-center justify-between border-b border-black/10 px-5">
        <Link
          href="/"
          onClick={onClose}
          className="font-display text-xl tracking-[-0.04em]"
        >
          Render Rituals
        </Link>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex h-[calc(100vh-5rem)] flex-col px-5 py-10">
        <nav className="flex flex-col" aria-label="Mobile navigation">
          {links.map((link, index) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(`${link.href}/`));

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={[
                  "flex items-center justify-between border-b border-black/10 py-4 font-display text-4xl leading-none",
                  active ? "text-black" : "text-black/35",
                ].join(" ")}
              >
                <span>
                  <span className="mr-4 align-middle font-sans text-[9px] text-black/25">
                    0{index + 1}
                  </span>
                  {link.label}
                </span>

                {active && <span className="text-xl">↗</span>}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <Link
            href="/hire-me"
            onClick={onClose}
            className="group flex w-full items-center justify-between rounded-full bg-black px-6 py-4 text-xs text-white"
          >
            Start a project
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
