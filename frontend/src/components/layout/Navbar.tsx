"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
  Phone,
  Mail,
  Layers,
  User,
  Wrench,
  Workflow,
  Star,
  ChevronRight,
} from "lucide-react";
import { CONTACT } from "@/data";
import { useAdminData } from "@/context/AdminDataContext";

const navItems = [
  {
    id: "work",
    label: "Portfolio",
    subtitle: "3D Visuals & 2D CAD Plans",
    icon: Layers,
    href: "/#work",
  },
  {
    id: "studio",
    label: "About Me",
    subtitle: "Background & Solo Practice",
    icon: User,
    href: "/#studio",
  },
  {
    id: "services",
    label: "What I Do",
    subtitle: "Photorealistic 3D & 2D Layouts",
    icon: Wrench,
    href: "/#services",
  },
  {
    id: "process",
    label: "Workflow",
    subtitle: "Brief to 4K Delivery in 4 Days",
    icon: Workflow,
    href: "/#process",
  },
  {
    id: "reviews",
    label: "Reviews",
    subtitle: "Testimonials from Architects",
    icon: Star,
    href: "/#reviews",
  },
];

export default function Navbar() {
  const { settings } = useAdminData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();
  const isManualScroll = useRef(false);
  const manualScrollTimer = useRef<NodeJS.Timeout | null>(null);

  // Custom frame-by-frame luxury momentum scroll engine
  const animatedSmoothScrollTo = (
    targetElement: HTMLElement,
    offset = -75,
    duration = 900
  ) => {
    const startY = window.scrollY || window.pageYOffset;
    const targetY = targetElement.getBoundingClientRect().top + startY + offset;
    const distance = targetY - startY;

    if (Math.abs(distance) < 5) return;

    let startTime: number | null = null;

    // Cinematic easeInOutCubic curve for organic glide
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  // 1. Cross-Page Scroll and Section Handling
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const targetHash =
      window.location.hash.replace("#", "") ||
      (typeof window !== "undefined"
        ? sessionStorage.getItem("pendingScrollSection")
        : null);

    if (targetHash) {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("pendingScrollSection");
      }
      isManualScroll.current = true;
      setActiveSection(targetHash);

      const timer = setTimeout(() => {
        const el = document.getElementById(targetHash);
        if (el) {
          animatedSmoothScrollTo(el, -75, 950);
        }
        manualScrollTimer.current = setTimeout(() => {
          isManualScroll.current = false;
        }, 1100);
      }, 250);

      return () => clearTimeout(timer);
    } else {
      setActiveSection("hero");
    }
  }, [pathname]);

  // 2. Hardware-level IntersectionObserver Scroll Spy (Homepage Only)
  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const onScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const sectionIds = [
      "hero",
      "work",
      "studio",
      "services",
      "process",
      "reviews",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScroll.current) return;

        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, curr) =>
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev
          );
          if (mostVisible.target.id) {
            setActiveSection(mostVisible.target.id);
          }
        }
      },
      {
        rootMargin: "-20% 0px -40% 0px",
        threshold: [0.1, 0.3, 0.5, 0.7],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [pathname]);

  const closeMobileDrawer = () => {
    const closeBtn = document.querySelector(
      ".mobile-menu-close"
    ) as HTMLElement | null;

    if (closeBtn) {
      closeBtn.click();
    }

    const checkbox = document.getElementById(
      "mobile-menu-state"
    ) as HTMLInputElement | null;

    if (checkbox && checkbox.checked) {
      checkbox.checked = false;
      checkbox.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };

  const scrollToSection = (sectionId: string) => {
    closeMobileDrawer();

    // If on sub-page (like project detail), save intent and navigate to homepage
    if (pathname !== "/") {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("pendingScrollSection", sectionId);
      }
      window.location.href = `/#${sectionId}`;
      return;
    }

    // On homepage: smooth scroll directly
    isManualScroll.current = true;
    setActiveSection(sectionId);

    if (manualScrollTimer.current) clearTimeout(manualScrollTimer.current);
    manualScrollTimer.current = setTimeout(() => {
      isManualScroll.current = false;
    }, 1200);

    setTimeout(() => {
      const target = document.getElementById(sectionId);
      if (target) {
        const topOffset = target.getBoundingClientRect().top + window.pageYOffset - 75;
        window.scrollTo({
          top: topOffset,
          behavior: "smooth",
        });
      } else {
        window.location.href = `/#${sectionId}`;
      }
    }, 100);
  };

  return (
    <>
      {/* NATIVE MOBILE MENU CHECKBOX */}
      <input
        type="checkbox"
        id="mobile-menu-state"
        className="mobile-menu-checkbox"
        aria-label="Toggle mobile navigation"
      />

      {/* TOP FLOATING HEADER */}
      <header
        className={`fixed top-0 inset-x-0 z-[9990] w-full px-3 sm:px-5 lg:px-8 transition-all duration-300 ${isScrolled
          ? "py-2 sm:py-2.5 lg:py-3.5"
          : "py-3 sm:py-4 lg:py-5"
          }`}
      >
        <div className="mx-auto w-full max-w-7xl">
          <nav
            className={`flex w-full items-center justify-between rounded-full border transition-all duration-300 ${isScrolled
              ? "border-white/15 bg-[#14171A]/95 px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2 shadow-2xl backdrop-blur-2xl"
              : "border-white/10 bg-[#1A1E23]/90 px-3 py-1.5 sm:px-5 sm:py-2.5 lg:px-6 lg:py-2.5 shadow-2xl backdrop-blur-xl"
              }`}
          >
            {/* BRAND */}
            <a
              href="/#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("hero");
              }}
              className="group flex items-center gap-2 sm:gap-2.5 lg:gap-3 text-left cursor-pointer select-none shrink"
            >
              <div
                className={`relative flex h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 shrink-0 items-center justify-center rounded-full border text-[10px] sm:text-[11px] lg:text-xs font-bold tracking-normal transition-all duration-300 ${pathname === "/" && activeSection === "hero"
                  ? "border-[#D49A6A] bg-[#D49A6A] text-[#14171A] shadow-[0_0_18px_rgba(212,154,106,0.45)]"
                  : "border-white/15 bg-[#252A30] text-[#F3F4F6] group-hover:border-[#D49A6A] group-hover:bg-[#D49A6A] group-hover:text-[#14171A]"
                  }`}
              >
                RR
              </div>

              <span className="font-display text-sm xs:text-base sm:text-lg lg:text-xl font-semibold leading-none text-[#F3F4F6] tracking-tight whitespace-nowrap">
                Render Rituals
              </span>
            </a>

            {/* DESKTOP NAVIGATION */}
            <div className="hidden items-center gap-1 xl:gap-1.5 lg:flex shrink-0">
              {navItems.map((item) => {
                const isActive = pathname === "/" && activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={`/#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    className="group relative flex items-center rounded-full px-3 py-1.5 xl:px-4 xl:py-2 font-sans text-xs xl:text-sm font-medium tracking-normal transition-colors duration-200 cursor-pointer select-none whitespace-nowrap"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="desktopActiveNavPill"
                        transition={{
                          type: "spring",
                          stiffness: 280,
                          damping: 28,
                          mass: 0.6,
                        }}
                        className="absolute inset-0 rounded-full bg-[#D49A6A] shadow-[0_2px_18px_rgba(212,154,106,0.45)]"
                      />
                    )}

                    <span
                      className={`relative z-10 transition-colors duration-200 ${isActive
                        ? "text-[#14171A] font-bold"
                        : "text-[#D1D5DB] group-hover:text-[#F3F4F6]"
                        }`}
                    >
                      {item.label}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 shrink-0">
              {/* Live Status Beacon (Visible on Laptop, Desktop & Ultrawide) */}
              <div
                className={`hidden lg:flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-300 ${settings.isAvailable !== false
                  ? "border-[#25D366]/30 bg-[#25D366]/10 text-[#25D366]"
                  : "border-[#EF4444]/30 bg-[#EF4444]/10 text-[#EF4444]"
                  }`}
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${settings.isAvailable !== false ? "bg-[#25D366]" : "bg-[#EF4444]"
                      }`}
                  />
                  <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${settings.isAvailable !== false ? "bg-[#25D366]" : "bg-[#EF4444]"
                      }`}
                  />
                </span>
                <span>{settings.statusText || (settings.isAvailable !== false ? "Available for Projects" : "Fully Booked")}</span>
              </div>

              {/* Desktop CTA */}
              <a
                href="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className={`group hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 xl:px-5 xl:py-2.5 font-sans text-xs xl:text-sm font-semibold tracking-normal transition-all duration-300 active:scale-95 cursor-pointer whitespace-nowrap ${pathname === "/" && activeSection === "contact"
                  ? "bg-[#F3F4F6] text-[#14171A] shadow-[0_0_25px_rgba(243,244,246,0.4)]"
                  : "bg-[#D49A6A] text-[#14171A] shadow-md hover:bg-[#E5A97C] hover:shadow-[0_0_20px_rgba(212,154,106,0.4)]"
                  }`}
              >
                <span>Consult Studio</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              {/* Mobile Menu Toggle Label */}
              <label
                htmlFor="mobile-menu-state"
                className="mobile-menu-toggle flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/20 bg-[#252A30] px-3 py-1.5 font-sans text-xs font-medium text-[#F3F4F6] hover:border-[#D49A6A] active:scale-90 lg:hidden shadow-lg cursor-pointer select-none whitespace-nowrap"
                aria-label="Open navigation menu"
              >
                <span className="font-sans text-xs font-semibold">
                  Menu
                </span>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-current">
                  <Menu size={13} />
                </div>
              </label>
            </div>
          </nav>
        </div>
      </header>

      {/* MOBILE CURTAIN OVERLAY */}
      <div
        id="mobile-curtain-overlay"
        className="mobile-curtain-overlay"
      >
        <label
          htmlFor="mobile-menu-state"
          className="mobile-menu-backdrop absolute inset-0 cursor-pointer"
          aria-label="Close navigation menu"
        />

        <div
          id="mobile-drawer-panel"
          className="relative z-10 flex max-h-[92dvh] w-full flex-col justify-between rounded-b-[2.5rem] border-b border-white/15 bg-gradient-to-b from-[#1A1E23] via-[#14171A] to-[#0F1113] p-6 pt-16 shadow-2xl text-[#F3F4F6] overflow-y-auto"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D49A6A] bg-[#D49A6A] text-[11px] font-bold text-[#14171A]">
                RR
              </div>
              <div>
                <p className="font-display text-base font-semibold text-[#F3F4F6] leading-tight">
                  Render Rituals
                </p>
                <p className="font-mono-spec text-[8.5px] uppercase tracking-widest text-[#8E98A5]">
                  3D Renders & 2D Plans
                </p>
              </div>
            </div>

            <label
              htmlFor="mobile-menu-state"
              className="mobile-menu-close flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[#252A30] text-[#F3F4F6] hover:bg-[#D49A6A] hover:text-[#14171A] active:scale-90 cursor-pointer shadow-lg transition-all"
              aria-label="Close navigation drawer"
            >
              <X size={18} />
            </label>
          </div>

          {/* Live Studio Availability Beacon (Mobile) */}
          <div
            className={`mt-4 flex items-center justify-between rounded-2xl border px-3.5 py-2.5 text-xs font-medium transition-colors ${settings.isAvailable !== false
              ? "border-[#25D366]/30 bg-[#25D366]/10 text-[#25D366]"
              : "border-[#EF4444]/30 bg-[#EF4444]/10 text-[#EF4444]"
              }`}
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span
                  className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${settings.isAvailable !== false ? "bg-[#25D366]" : "bg-[#EF4444]"
                    }`}
                />
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${settings.isAvailable !== false ? "bg-[#25D366]" : "bg-[#EF4444]"
                    }`}
                />
              </span>
              <span>{settings.statusText || (settings.isAvailable !== false ? "Taking New Projects (Available)" : "Fully Booked")}</span>
            </div>
            <span className="font-mono-spec text-[9px] uppercase tracking-wider text-white/40">Beacon</span>
          </div>

          {/* Navigation Directory */}
          <div className="my-4 flex flex-col gap-2">
            <span className="font-mono-spec text-[9px] uppercase tracking-widest text-[#8E98A5] px-1">
              Navigation Directory
            </span>

            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.id}
                  href={`/#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className="mobile-nav-link group flex w-full items-center justify-between rounded-2xl border border-white/5 bg-[#1E2227]/70 p-3.5 text-left text-[#F3F4F6] transition-all hover:border-white/20 active:bg-white/10 active:scale-[0.98] cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#D49A6A] transition-colors group-hover:bg-[#D49A6A] group-hover:text-[#14171A]">
                      <Icon size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display text-lg font-semibold leading-tight">
                        {item.label}
                      </span>
                      <span className="text-[11px] text-[#8E98A5] mt-0.5">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    size={18}
                    className="text-white/40 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </a>
              );
            })}
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col gap-2.5 border-t border-white/10 pt-4">
            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D49A6A] py-3.5 text-xs font-bold uppercase tracking-wider text-[#14171A] shadow-xl transition-transform active:scale-[0.98] cursor-pointer"
            >
              <Sparkles size={15} />
              <span>Hire Nikita · Start a Project</span>
            </a>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="https://wa.me/919305308296"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-[#1E2227] py-2.5 text-[11px] font-medium text-[#25D366] transition-all hover:border-[#25D366]/40 active:scale-95"
              >
                <Phone size={13} />
                <span>WhatsApp</span>
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-[#1E2227] py-2.5 text-[11px] font-medium text-[#D49A6A] transition-all hover:border-[#D49A6A]/40 active:scale-95"
              >
                <Mail size={13} />
                <span>Email Studio</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
