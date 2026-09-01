"use client";

import Link from "next/link";
import SmoothScrollLink from "@/components/ui/SmoothScrollLink";
import { ArrowDown, ArrowUpRight, Compass, Sparkles, Layers, Eye, Sliders, Box, SunMedium } from "lucide-react";
import { siteConfig } from "@/data";
import { useAdminData } from "@/context/AdminDataContext";
import { motion } from "framer-motion";
import TransparentAvatar from "./TransparentAvatar";

const tickerItems = [
  "Interior Architecture",
  "Cast Concrete & Slate Visuals",
  "Photorealistic 3D Renders",
  "Material Direction & Tactility",
  "2D Space Planning",
  "Turnkey Visual Storytelling",
  "Atmospheric Lighting Calibrations",
];

const spatialSpecs = [
  { icon: SunMedium, label: "Lighting", value: "2700K Atmospheric Daylight" },
  { icon: Box, label: "Materiality", value: "Cast Concrete & Smoked Walnut" },
  { icon: Layers, label: "Fidelity", value: "4K Photorealistic CGI" },
];

export default function Hero() {
  const { stats } = useAdminData();
  const stat1 = stats?.[0] || { value: "50+", label: "Projects Completed" };
  const stat2 = stats?.[1] || { value: "1-on-1", label: "Direct Freelance Work" };
  const stat3 = stats?.[2] || { value: "3-5 Days", label: "Fast Turnaround" };

  return (
    <section id="hero" className="relative w-full min-h-[auto] lg:min-h-screen flex flex-col justify-between pt-20 pb-4 sm:pt-24 sm:pb-6 bg-[#14171A] overflow-hidden">
      {/* Warm Amber & Slate Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 right-10 h-[450px] w-[450px] rounded-full bg-[#D49A6A]/12 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full bg-[#8E98A5]/10 blur-[100px]" />

      <div className="container-rituals flex-1 flex flex-col justify-center my-auto w-full">
        {/* Main Hero Split Grid */}
        <div className="grid gap-6 lg:gap-8 py-2 lg:grid-cols-[1.1fr_.9fr] lg:items-center my-auto">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="flex flex-col justify-center text-center lg:text-left items-center lg:items-start">
            <div className="mb-2.5 sm:mb-3 flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-[#1E2227]/90 pl-1.5 pr-3.5 py-1 backdrop-blur-md">
                <img
                  src="/images/nikita-studio-avatar.jpg"
                  alt="Nikita Render Rituals"
                  className="h-5 w-5 rounded-full object-cover border border-[#D49A6A]"
                />
                <span className="font-mono-spec text-[9px] sm:text-[10px] uppercase tracking-wider text-[#F3F4F6]">
                  Render Rituals · <span className="text-[#D49A6A]">3D & 2D Specialist</span>
                </span>
              </div>
            </div>

            <h1 className="font-display text-[1.75rem] xs:text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-[3.1rem] font-normal leading-[1.14] tracking-tight text-[#F3F4F6]">
              Photorealistic <span className="italic text-[#D49A6A]">3D Renders</span> & Practical <span className="italic text-[#D49A6A]">2D Floor Plans</span>
            </h1>

            {/* Mobile Only: Compact 3D Avatar Showcase */}
            <div className="my-4 w-full flex justify-center lg:hidden">
              <TransparentAvatar />
            </div>

            <p className="mt-2 sm:mt-3 max-w-xl text-xs sm:text-sm lg:text-[15px] leading-relaxed text-[#8E98A5]">
              Render Rituals specializes in two core crafts: creating photorealistic 4K 3D renders so you can experience your space before it&apos;s built, and drafting clean 2D floor layouts ready for contractor execution.
            </p>

            {/* 2 Core Services Focus Pills */}
            <div className="mt-3 sm:mt-4 flex flex-wrap justify-center lg:justify-start gap-2">
              <div className="flex items-center gap-1.5 rounded-full border border-[#D49A6A]/30 bg-[#D49A6A]/10 px-3 py-1.5 text-[10.5px] sm:text-xs text-[#D49A6A] font-medium">
                <Eye size={12} className="shrink-0" />
                <span>1. 3D Visualization & 4K Renders</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-[#1E2227] px-3 py-1.5 text-[10.5px] sm:text-xs text-[#F3F4F6] font-medium">
                <Layers size={12} className="text-[#D49A6A] shrink-0" />
                <span>2. 2D Space Planning & CAD Layouts</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <SmoothScrollLink
                href="#work"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[#D49A6A] px-6 py-3.5 sm:px-7 sm:py-3.5 text-xs font-semibold uppercase tracking-wider text-[#14171A] shadow-md transition-all duration-300 hover:bg-[#E5A97C] hover:shadow-[0_8px_25px_rgba(212,154,106,0.35)] active:scale-[0.98] cursor-pointer"
              >
                <span>View My Portfolio</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#contact"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border border-white/15 bg-[#1E2227] px-6 py-3.5 sm:px-6 sm:py-3.5 text-xs font-medium uppercase tracking-wider text-[#F3F4F6] backdrop-blur-md transition-all duration-300 hover:border-[#D49A6A] hover:bg-white/10 active:scale-[0.98] cursor-pointer"
              >
                <span>Hire Me for a Project</span>
              </SmoothScrollLink>
            </div>

            {/* Micro Stats Row */}
            <div className="mt-5 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-3 border-t border-white/10 pt-3.5 sm:pt-4 w-full text-left">
              <div>
                <p className="font-display text-lg xs:text-xl sm:text-2xl font-semibold text-[#F3F4F6]">{stat1.value}</p>
                <p className="font-mono-spec text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-wider text-[#D1D5DB] mt-0.5 font-medium leading-tight">{stat1.label}</p>
              </div>
              <div className="border-l border-white/10 pl-2.5 sm:pl-5">
                <p className="font-display text-lg xs:text-xl sm:text-2xl font-semibold text-[#F3F4F6]">{stat2.value}</p>
                <p className="font-mono-spec text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-wider text-[#D1D5DB] mt-0.5 font-medium leading-tight">{stat2.label}</p>
              </div>
              <div className="border-l border-white/10 pl-2.5 sm:pl-5">
                <p className="font-display text-lg xs:text-xl sm:text-2xl font-semibold text-[#F3F4F6]">{stat3.value}</p>
                <p className="font-mono-spec text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-wider text-[#D1D5DB] mt-0.5 font-medium leading-tight">{stat3.label}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Floating 3D Character (Desktop) */}
          <div className="relative lg:pl-4 hidden lg:block">
            <TransparentAvatar />
          </div>
        </div>

        {/* Bottom Ticker & Scroll Indicator */}
        <div className="mt-2 sm:mt-3 flex flex-col gap-1.5 border-t border-white/10 pt-2.5 pb-1">
          <div className="flex items-center justify-between font-mono-spec text-[9px] sm:text-[9.5px] uppercase tracking-[0.2em] text-[#8E98A5]">
            <div className="flex items-center gap-2">
              <ArrowDown size={11} className="animate-bounce text-[#D49A6A]" />
              <span>Scroll to discover space & materiality</span>
            </div>
            <span className="hidden md:inline">Index / 01</span>
          </div>

          {/* Marquee Ticker */}
          <div className="flex overflow-hidden whitespace-nowrap py-0.5">
            <div className="flex animate-marquee gap-6 font-display text-sm sm:text-base tracking-wide text-white/35">
              {tickerItems.concat(tickerItems).map((item, idx) => (
                <span key={idx} className="flex items-center gap-6">
                  <span>{item}</span>
                  <span className="text-[#D49A6A] text-[10px]">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
