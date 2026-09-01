"use client";

import Link from "next/link";
import SmoothScrollLink from "@/components/ui/SmoothScrollLink";
import { ArrowUpRight, Sparkles, SunMedium, Box, Compass, Layers, CheckCircle2, Sliders, ShieldCheck, Flame, Eye, Clock } from "lucide-react";
import { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import { motion, AnimatePresence } from "framer-motion";

const freelanceStrengths = [
  {
    number: "01",
    icon: Sparkles,
    title: "Direct 1-on-1 Collaboration",
    subtitle: "No Middlemen or Agency Markups",
    desc: "You talk directly with me. Every note, revision, and detail is handled with personal care and prompt communication.",
    specs: ["Fast WhatsApp/Email updates", "Direct creative alignment", "Flexible revisions"],
  },
  {
    number: "02",
    icon: Eye,
    title: "Photorealistic 3D CGI",
    subtitle: "4K High-Res Visual Storytelling",
    desc: "I build 3D spaces with natural sunlight, 2700K evening lighting, and genuine wood/stone textures so you can see the finished look.",
    specs: ["4K Ultra-HD resolution", "Accurate physical lighting", "Day & night camera variations"],
  },
  {
    number: "03",
    icon: Layers,
    title: "Practical 2D Floor Plans",
    subtitle: "Contractor-Ready CAD Drawings",
    desc: "Dimensioned room layouts with furniture clearances and circulation paths that give your carpenters and contractors exact clarity.",
    specs: ["Exact furniture dimensions", "Ergonomic walking space", "Clear PDF/CAD exports"],
  },
  {
    number: "04",
    icon: Clock,
    title: "Fast & Reliable Delivery",
    subtitle: "3 to 5 Working Days Turnaround",
    desc: "Timelines you can count on. Whether you have a tight client presentation or a fast-track site meeting, I deliver on schedule.",
    specs: ["Structured milestones", "Prompt revision rounds", "100% on-time commitment"],
  },
];

export default function StudioIntro() {
  const { settings } = useAdminData();
  const [activeRitual, setActiveRitual] = useState<number>(0);

  return (
    <section id="studio" className="relative w-full overflow-hidden bg-[#111315] py-16 sm:py-20 lg:py-24 text-[#F3F4F6] border-t border-white/10">
      {/* Warm Ambient Radial Glows */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-[500px] w-[500px] rounded-full bg-[#D49A6A]/12 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-[500px] w-[500px] rounded-full bg-[#8E98A5]/10 blur-[140px]" />

      <div className="container-rituals relative z-10">
        {/* Top Header Grid with 3D Studio Avatar Showcase */}
        <div className="grid gap-10 lg:grid-cols-[.42fr_.58fr] lg:items-center border-b border-white/10 pb-12 sm:pb-16">
          {/* Avatar Visual Card with 3D Waving Character & Interactive Holographic Badges */}
          <div className="relative flex justify-center">
            <div className="group relative aspect-square w-full max-w-[340px] sm:max-w-[380px] overflow-hidden rounded-3xl border border-white/15 bg-[#1E2227] shadow-2xl transition-all duration-700 hover:border-[#D49A6A]/60">
              <img
                src="/images/nikita-waving-avatar.jpg"
                alt="Nikita — Render Rituals 3D & 2D Specialist"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14171A] via-transparent to-transparent opacity-60" />

              {/* Floating "Hi! I'm Nikita" Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-[#1E2227]/95 px-3 py-1.5 backdrop-blur-xl shadow-xl">
                <span className="text-xs animate-bounce">👋</span>
                <span className="font-mono-spec text-[10px] uppercase tracking-wider text-[#F3F4F6]">
                  Hi! I&apos;m <span className="text-[#D49A6A] font-semibold">Nikita</span>
                </span>
              </div>

              {/* Floating 3D Service Hologram Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-[#D49A6A]/50 bg-[#1E2227]/95 px-3 py-1.5 backdrop-blur-xl shadow-xl">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#D49A6A]/20 text-[#D49A6A]">
                  <Box size={10} />
                </div>
                <span className="font-display text-[11px] font-semibold text-[#D49A6A]">
                  3D Renders
                </span>
              </div>

              {/* Floating verified status badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/20 bg-[#14171A]/95 p-3.5 backdrop-blur-xl">
                <div>
                  <p className="font-display text-sm font-medium text-[#F3F4F6]">
                    Nikita
                  </p>
                  <p className="font-mono-spec text-[9px] uppercase tracking-wider text-[#D49A6A]">
                    3D Visualizer & 2D Space Planner
                  </p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-[#D49A6A]/15 border border-[#D49A6A]/30 px-2.5 py-1 text-[9px] font-medium text-[#D49A6A]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D49A6A] animate-pulse" />
                  <span>Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Narrative */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D49A6A]" />
              <span className="label-rituals text-[#D49A6A]">About Render Rituals</span>
            </div>

            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.12] tracking-tight text-[#F3F4F6]">
              Independent 3D & 2D specialist for <span className="italic text-[#D49A6A]">designers, architects & homeowners</span>.
            </h2>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg leading-relaxed text-[#8E98A5]">
              Render Rituals is an independent practice founded by Nikita, based in Noida (Delhi NCR) and working with clients across India and globally. I focus purely on two crafts: creating photorealistic 3D interior renders and drafting clean 2D floor plans. When you work with me, you collaborate directly with the artist — fast, dedicated, and hassle-free.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <SmoothScrollLink
                href="#contact"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#D49A6A] px-7 py-3.5 sm:py-4 text-xs font-semibold uppercase tracking-wider text-[#14171A] shadow-md transition-all duration-300 hover:bg-[#E5A97C] active:scale-[0.98] cursor-pointer"
              >
                <span>Hire For Your Project</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </SmoothScrollLink>
              <a
                href={`https://wa.me/${(settings.whatsapp || "919305308296").replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 sm:py-4 text-xs font-medium uppercase tracking-wider text-[#F3F4F6] backdrop-blur-md transition-all hover:border-[#25D366] hover:text-[#25D366]"
              >
                <span>WhatsApp Nikita</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Freelance Value Pillar Cards */}
        <div className="mt-12 sm:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {freelanceStrengths.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isHighlighted = activeRitual === idx;

            return (
              <div
                key={pillar.title}
                onMouseEnter={() => setActiveRitual(idx)}
                className={`card-luxury-dark group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-500 cursor-pointer ${isHighlighted ? "border-[#D49A6A]/60 shadow-2xl bg-[#1A1D22]" : "hover:border-white/20"
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl transition-all duration-300 shadow-inner ${isHighlighted ? "bg-[#D49A6A] text-[#14171A]" : "bg-white/5 text-[#D49A6A] group-hover:bg-[#D49A6A] group-hover:text-[#14171A]"
                      }`}>
                      <Icon size={20} className="sm:w-[22px] sm:h-[22px]" />
                    </span>
                    <span className="font-mono-spec text-[10px] sm:text-[11px] text-white/30">
                      /{pillar.number}
                    </span>
                  </div>

                  <h3 className="font-display mt-6 sm:mt-7 text-xl sm:text-2xl font-medium tracking-wide text-[#F3F4F6]">
                    {pillar.title}
                  </h3>

                  <p className="mt-1 font-mono-spec text-[9px] sm:text-[10px] uppercase tracking-wider text-[#D49A6A]">
                    {pillar.subtitle}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-[#8E98A5]">
                    {pillar.desc}
                  </p>

                  {/* Micro Specs List */}
                  <div className="mt-5 sm:mt-6 space-y-2 border-t border-white/10 pt-4">
                    {pillar.specs.map((item, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 font-mono-spec text-[9px] sm:text-[10px] text-[#D1D5DB]/80">
                        <span className="h-1 w-1 rounded-full bg-[#D49A6A]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`mt-6 sm:mt-8 h-px w-full bg-gradient-to-r from-[#D49A6A] to-transparent transition-opacity duration-300 ${isHighlighted ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                  }`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

