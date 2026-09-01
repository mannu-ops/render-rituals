"use client";

import { useState } from "react";
import {
  Compass,
  Box,
  Eye,
  FileSpreadsheet,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Layers,
  Clock,
  ShieldCheck,
  Cpu,
  ChevronRight,
  SunMedium,
  Check,
} from "lucide-react";
import Link from "next/link";
import SmoothScrollLink from "@/components/ui/SmoothScrollLink";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    id: "01",
    number: "01",
    phase: "Step 01 · Planning",
    title: "Share Your Brief & Design Vision",
    subtitle: "Room dimensions, sketches, and reference photos",
    duration: "Day 01",
    icon: Compass,
    image: "https://res.cloudinary.com/dg3s2whrf/image/upload/v1788049603/render_rituals/portfolio/project-04.jpg",
    narrative:
      "You share your room dimensions, floor sketches, and design references. We discuss your preferred materials (wood, stone, textures) and lighting warmth (warm 2700K ambient glow) so we have complete clarity before modeling.",
    deliverables: [
      "Room Dimensions & Survey Review",
      "Material & Color Moodboard",
      "Lighting & Atmosphere Direction",
      "Fixed Timeline & Deliverable Plan",
    ],
    toolstack: ["WhatsApp Discussion", "Reference Moodboard", "Dimension Check"],
    highlight: "100% Clear Alignment",
  },
  {
    id: "02",
    number: "02",
    phase: "Step 02 · Layouts",
    title: "2D Space Planning & Furniture Layouts",
    subtitle: "Exact furniture dimensions and comfortable walking paths",
    duration: "Days 02 – 03",
    icon: Box,
    image: "/images/cad/plan-01.jpg",
    narrative:
      "Every inch matters. I create clear 2D CAD floor plans with exact furniture sizing, wide circulation pathways, and smart storage positioning so your contractors know exactly where everything goes.",
    deliverables: [
      "Dimensioned 2D Floor Plan (AutoCAD)",
      "Furniture Sizing & Placement Guide",
      "Walkway & Door Clearance Mapping",
      "Electrical & Switch Position Guide",
    ],
    toolstack: ["AutoCAD", "Dimension Sheets", "Scale 1:50 / 1:25"],
    highlight: "Contractor-Ready CAD",
  },
  {
    id: "03",
    number: "03",
    phase: "Step 03 · 3D Renders",
    title: "4K Photorealistic 3D Renders",
    subtitle: "See your finished room in realistic day and evening lighting",
    duration: "Days 03 – 04",
    icon: Eye,
    image: "https://res.cloudinary.com/dg3s2whrf/image/upload/v1788049597/render_rituals/portfolio/project-01.jpg",
    narrative:
      "Your room comes to life in stunning 4K resolution. Using realistic sunlight, soft evening lamps, and authentic fabric/wood textures, you experience the exact ambiance before starting site construction.",
    deliverables: [
      "4K Ultra-HD Photorealistic Renders",
      "Daylight & Natural Sunlight Passes",
      "Warm 2700K Evening Lighting Views",
      "Multiple Camera Perspectives",
    ],
    toolstack: ["3ds Max", "Corona Renderer", "Photoshop"],
    highlight: "Ultra-HD Photorealism",
  },
  {
    id: "04",
    number: "04",
    phase: "Step 04 · Handover",
    title: "Final Delivery & Contractor Handover",
    subtitle: "High-resolution render files and print-ready PDF drawings",
    duration: "Day 05",
    icon: FileSpreadsheet,
    image: "https://res.cloudinary.com/dg3s2whrf/image/upload/v1788049607/render_rituals/portfolio/project-06.jpg",
    narrative:
      "You receive the full project package in high resolution. All 4K images and dimensioned PDF drawings are ready to share with your clients, carpenters, and contractors for smooth on-site execution.",
    deliverables: [
      "Full Resolution 4K Render Files (JPEG/PNG)",
      "Contractor-Ready Dimensioned PDF Plans",
      "Material & Texture Reference Guide",
      "Revision Support & Final Wrap-up",
    ],
    toolstack: ["Print-Ready PDF", "4K Image Pack", "Fast WhatsApp Support"],
    highlight: "Ready for Execution",
  },
];

export default function ProcessPreview() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = steps[activeStepIndex];
  const Icon = currentStep.icon;

  return (
    <section
      id="process"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#14171A] border-t border-white/10 overflow-hidden"
    >
      {/* Warm Ambient Backdrops */}
      <div className="pointer-events-none absolute top-1/4 -left-40 h-[600px] w-[600px] rounded-full bg-[#D49A6A]/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-[500px] w-[500px] rounded-full bg-[#8E98A5]/10 blur-[140px]" />

      <div className="container-rituals relative z-10">
        {/* ========================================================= */}
        {/* 1. EDITORIAL SECTION HEADER                               */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-white/10 pb-8 sm:pb-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="h-2 w-2 rounded-full bg-[#D49A6A]" />
              <span className="label-rituals text-[#D49A6A]">
                Simple & Transparent Process
              </span>
              <span className="rounded-full border border-white/15 bg-[#1E2227] px-2.5 py-0.5 font-mono-spec text-[9px] text-[#F3F4F6]">
                4 Clear Steps
              </span>
            </div>

            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#F3F4F6] leading-[1.08]">
              How We Work Together in{" "}
              <span className="italic text-[#D49A6A] font-serif font-light">
                4 Simple Steps
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="rounded-2xl border border-white/10 bg-[#1A1D21] p-3 sm:px-4 sm:py-3 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D49A6A]/15 text-[#D49A6A]">
                <Clock size={16} />
              </div>
              <div>
                <p className="font-mono-spec text-[9px] uppercase tracking-wider text-[#8E98A5]">
                  Average Turnaround
                </p>
                <p className="font-display text-sm font-semibold text-[#F3F4F6]">
                  3 to 5 Working Days
                </p>
              </div>
            </div>

            <SmoothScrollLink
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D49A6A] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#14171A] hover:bg-[#E5A97C] transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>Start Your Project</span>
              <ArrowUpRight size={14} />
            </SmoothScrollLink>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. PROGRESS STEPPER NAVIGATION TABS                       */}
        {/* ========================================================= */}
        <div className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === activeStepIndex;
            const isCompleted = index < activeStepIndex;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStepIndex(index)}
                className={`group relative flex flex-col justify-between rounded-2xl p-4 sm:p-5 text-left transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? "bg-[#1E2227] border-[#D49A6A] shadow-xl shadow-[#D49A6A]/5"
                    : isCompleted
                    ? "bg-[#16181B] border-white/10 hover:border-white/20 text-[#8E98A5]"
                    : "bg-[#14171A] border-white/5 hover:border-white/15 text-[#8E98A5]"
                }`}
              >
                {/* Top Row: Step Index & Status */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg font-mono-spec text-[10px] sm:text-xs font-bold transition-colors ${
                        isActive
                          ? "bg-[#D49A6A] text-[#14171A]"
                          : isCompleted
                          ? "bg-[#25D366]/15 text-[#25D366]"
                          : "bg-white/5 text-[#8E98A5]"
                      }`}
                    >
                      {isCompleted ? <Check size={12} /> : step.number}
                    </span>
                    <span className="font-mono-spec text-[9px] uppercase tracking-wider text-[#8E98A5] hidden xs:inline">
                      {step.duration}
                    </span>
                  </div>

                  <span
                    className={`h-2 w-2 rounded-full transition-all ${
                      isActive
                        ? "bg-[#D49A6A] ring-4 ring-[#D49A6A]/20 scale-110"
                        : isCompleted
                        ? "bg-[#25D366]"
                        : "bg-white/15"
                    }`}
                  />
                </div>

                {/* Bottom Row: Phase Name & Title */}
                <div className="mt-4 sm:mt-5">
                  <span
                    className={`font-mono-spec text-[8.5px] uppercase tracking-widest block transition-colors ${
                      isActive ? "text-[#D49A6A]" : "text-[#8E98A5]"
                    }`}
                  >
                    {step.phase}
                  </span>
                  <h4
                    className={`font-display text-xs sm:text-sm font-medium mt-1 transition-colors line-clamp-1 ${
                      isActive ? "text-[#F3F4F6]" : "text-[#8E98A5] group-hover:text-[#F3F4F6]"
                    }`}
                  >
                    {step.title}
                  </h4>
                </div>

                {/* Active Underline Progress Bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute -bottom-px left-4 right-4 h-0.5 bg-[#D49A6A]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* 3. INTERACTIVE STEP DETAIL SHOWCASE (SPLIT STAGE)          */}
        {/* ========================================================= */}
        <div className="mt-8 sm:mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid gap-8 lg:grid-cols-12 rounded-2xl sm:rounded-3xl border border-white/10 bg-[#181B1F] p-5 sm:p-7 lg:p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Subtle Step Index Background Watermark */}
              <span className="pointer-events-none absolute -bottom-10 -right-4 font-display text-[120px] sm:text-[180px] font-bold text-white/[0.02] select-none leading-none">
                {currentStep.number}
              </span>

              {/* Left Column (7-cols): Narrative, Deliverables & Toolstack */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
                <div>
                  {/* Top Step Meta Badge */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="rounded-full bg-[#D49A6A]/15 border border-[#D49A6A]/30 px-3 py-1 font-mono-spec text-[9.5px] uppercase tracking-widest text-[#D49A6A] font-semibold">
                      {currentStep.phase}
                    </span>
                    <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono-spec text-[9.5px] text-[#8E98A5]">
                      Duration: {currentStep.duration}
                    </span>
                    <span className="rounded-full bg-[#25D366]/10 border border-[#25D366]/30 px-3 py-1 font-mono-spec text-[9.5px] text-[#25D366] font-medium">
                      ★ {currentStep.highlight}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-display text-xl sm:text-2xl font-normal text-[#F3F4F6] tracking-tight">
                    {currentStep.title}
                  </h3>
                  <p className="font-mono-spec text-xs text-[#D49A6A] mt-1 font-medium">
                    {currentStep.subtitle}
                  </p>

                  {/* Narrative Body */}
                  <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-[#D1D5DB]">
                    {currentStep.narrative}
                  </p>
                </div>

                {/* Deliverables Checklist (2-Column Grid) */}
                <div className="border-t border-white/10 pt-4">
                  <span className="font-mono-spec text-[9.5px] uppercase tracking-widest text-[#8E98A5] block mb-2.5">
                    Stage Deliverables & Inclusions:
                  </span>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {currentStep.deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-start gap-2 rounded-xl border border-white/5 bg-[#14171A]/80 p-2.5 text-xs"
                      >
                        <CheckCircle2 size={13} className="text-[#D49A6A] shrink-0 mt-0.5" />
                        <span className="text-[#D1D5DB] leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Software Toolstack Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="font-mono-spec text-[9px] uppercase tracking-wider text-[#8E98A5] mr-1">
                    Tools Used:
                  </span>
                  {currentStep.toolstack.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="rounded-lg border border-white/10 bg-[#14171A] px-2.5 py-1 font-mono-spec text-[9px] text-[#D1D5DB]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column (5-cols): Visual Render Presentation */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="group relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] max-h-[320px] overflow-hidden rounded-2xl border border-white/15 bg-[#14171A] shadow-2xl">
                  <img
                    src={currentStep.image}
                    alt={currentStep.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14171A] via-transparent to-transparent opacity-60" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 backdrop-blur-md">
                    <Icon size={13} className="text-[#D49A6A]" />
                    <span className="font-mono-spec text-[10px] uppercase tracking-wider text-[#F3F4F6]">
                      {currentStep.phase} Visual
                    </span>
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/15 bg-[#1E2227]/95 p-3 backdrop-blur-xl">
                    <p className="font-mono-spec text-[9px] uppercase tracking-wider text-[#D49A6A]">
                      Key Outcome
                    </p>
                    <p className="font-display text-xs text-[#F3F4F6] font-medium mt-0.5 truncate">
                      {currentStep.highlight} · Verified Milestone
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
