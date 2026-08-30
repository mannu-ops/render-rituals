"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/data";
import { useAdminData } from "@/context/AdminDataContext";
import SmoothScrollLink from "@/components/ui/SmoothScrollLink";

const navLinks = [
  { label: "Portfolio", href: "#work" },
  { label: "About Me", href: "#studio" },
  { label: "What I Do", href: "#services" },
  { label: "Workflow", href: "#process" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact Studio", href: "#contact" },
];

export default function Footer() {
  const { settings } = useAdminData();

  return (
    <footer className="relative w-full border-t border-white/10 bg-[#0F1113] py-12 sm:py-16 text-[#F3F4F6]">
      <div className="container-rituals">
        {/* Main 3-Column Clean Footer Grid */}
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] lg:gap-14">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D49A6A] bg-[#D49A6A] text-[11px] font-bold text-[#14171A]">
                RR
              </div>
              <span className="font-display text-xl font-semibold tracking-tight text-[#F3F4F6]">
                {settings.siteName || siteConfig.name}
              </span>
            </div>

            <p className="mt-3.5 max-w-sm text-xs sm:text-sm leading-relaxed text-[#8E98A5]">
              Independent spatial planning & photorealistic 3D visualization practice led by Nikita. Bringing architectural ideas to life with precision and atmosphere.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-[#8E98A5]">
              <MapPin size={13} className="text-[#D49A6A] shrink-0" />
              <span>{settings.location || "Noida, Uttar Pradesh · Available Worldwide"}</span>
            </div>
          </div>

          {/* Quick Navigation Directory (2 Columns) */}
          <div>
            <p className="font-mono-spec text-[10px] uppercase tracking-widest text-[#D49A6A]">
              Directory
            </p>
            <nav className="mt-3.5 grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link) => (
                <SmoothScrollLink
                  key={link.href}
                  href={link.href}
                  className="w-fit text-[#8E98A5] transition-colors hover:text-[#F3F4F6] py-1 cursor-pointer"
                >
                  {link.label}
                </SmoothScrollLink>
              ))}
            </nav>
          </div>

          {/* Direct Freelance Contact */}
          <div>
            <p className="font-mono-spec text-[10px] uppercase tracking-widest text-[#D49A6A]">
              Direct Contacts
            </p>
            <div className="mt-3.5 flex flex-col gap-2.5 text-xs text-[#8E98A5]">
              <a
                href={`https://wa.me/${(settings.whatsapp || "919305308296").replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-[#25D366] py-0.5"
              >
                <Phone size={13} className="text-[#25D366] shrink-0" />
                <span>{settings.whatsapp || "+91 9305308296"} (WhatsApp)</span>
              </a>

              <a
                href={`mailto:${settings.email || "iamnikita2911@gmail.com"}`}
                className="flex items-center gap-2 transition-colors hover:text-[#D49A6A] py-0.5"
              >
                <Mail size={13} className="text-[#D49A6A] shrink-0" />
                <span>{settings.email || "iamnikita2911@gmail.com"}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 border-t border-white/10 pt-5 font-mono-spec text-[9px] sm:text-[9.5px] uppercase tracking-wider text-[#8E98A5]">
          <p>© {new Date().getFullYear()} {settings.siteName || siteConfig.name}. Independent Freelance Practice.</p>
          <p className="text-white/40">3D Visualization & 2D Space Planning</p>
        </div>
      </div>
    </footer>
  );
}
