import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { InstagramIcon } from "@/components/common/InstagramIcon";

const navigation = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export default function FooterNav() {
  return (
    <footer className="bg-[#171717] py-16 text-white md:py-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_.6fr_.6fr]">
          <div>
            <p className="label-rituals text-white/30">Render Rituals</p>
            <h2 className="font-display mt-5 max-w-3xl text-5xl leading-[0.88] md:text-7xl">
              Spaces designed with intention.
            </h2>
          </div>

          <div>
            <p className="label-rituals text-white/30">Explore</p>
            <nav className="mt-5 flex flex-col gap-3">
              {navigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit text-sm text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="label-rituals text-white/30">Connect</p>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href="mailto:iamnikita2911@gmail.com"
                className="inline-flex w-fit items-center gap-2 text-sm text-white/60 hover:text-white"
              >
                <Mail size={14} />
                Email
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 text-sm text-white/60 hover:text-white"
              >
                <InstagramIcon size={14} />
                Instagram
              </a>
              <Link
                href="/hire-me"
                className="group mt-4 inline-flex w-fit items-center gap-2 text-xs text-white"
              >
                Start a project
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.12em] text-white/25 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Render Rituals</span>
          <span>Interior Design · Architecture · Visualization</span>
        </div>
      </div>
    </footer>
  );
}
