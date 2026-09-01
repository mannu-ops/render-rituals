"use client";

import { useState } from "react";
import {
  Eye,
  Layers,
  Sparkles,
  Maximize2,
  CheckCircle2,
  SunMedium,
  Compass,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react";
import { Project, Render3DItem, Plan2DItem } from "@/types/project";

interface ProjectDualViewerProps {
  project: Project;
}

export default function ProjectDualViewer({ project }: ProjectDualViewerProps) {
  const [activeTab, setActiveTab] = useState<"3d" | "2d">("3d");
  const [selected3DIndex, setSelected3DIndex] = useState(0);
  const [selected2DIndex, setSelected2DIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const renders3D: Render3DItem[] =
    project.renders3D && project.renders3D.length > 0
      ? project.renders3D
      : (project.gallery && project.gallery.length > 0 ? project.gallery : (project.coverImage || project.image ? [project.coverImage || project.image] : [])).map(
          (img, i) => ({
            id: `r-${i}`,
            title: `Perspective 0${i + 1}`,
            image: img,
            tag: i === 0 ? "4K Master View" : "Atmospheric Pass",
            description: "Photorealistic render showcasing spatial depth, natural light diffusion, and material pairing.",
          })
        );

  const plans2D: Plan2DItem[] =
    project.plans2D && project.plans2D.length > 0
      ? project.plans2D
      : [
          {
            id: "p-def-1",
            title: "Master Space Planning & Furniture Layout",
            image: "/images/cad/plan-01.jpg",
            sheetType: "Contractor Space Plan",
            scale: "1:50",
            description: "Zoning, pathway clearances, and furniture orientation drafted in AutoCAD.",
          },
        ];

  const current3D = renders3D[selected3DIndex] || renders3D[0];
  const current2D = plans2D[selected2DIndex] || plans2D[0];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    const src = target.src;
    if (src.includes(":5000/images/")) {
      target.src = src.replace(/^http:\/\/localhost:5000/, "");
    }
  };

  return (
    <div className="space-y-8">
      {/* ========================================================= */}
      {/* 1. INTERACTIVE 3D / 2D SWITCHER PILL                      */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono-spec text-[10px] uppercase tracking-widest text-[#D49A6A]">
            Project Media Suite
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F3F4F6] mt-0.5">
            Explore 3D Renders & 2D Plans
          </h2>
        </div>

        {/* Dual Mode Switcher */}
        <div className="inline-flex items-center rounded-full border border-white/15 bg-[#1E2227] p-1 sm:p-1.5 shadow-xl w-full sm:w-auto justify-center">
          <button
            type="button"
            onClick={() => setActiveTab("3d")}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 text-[10.5px] sm:text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 flex-1 sm:flex-initial ${
              activeTab === "3d"
                ? "bg-[#D49A6A] text-[#14171A] shadow-md shadow-[#D49A6A]/20"
                : "text-[#8E98A5] hover:text-[#F3F4F6]"
            }`}
          >
            <Eye size={13} className={`shrink-0 ${activeTab === "3d" ? "text-[#14171A]" : "text-[#D49A6A]"}`} />
            <span className="whitespace-nowrap">3D CGI Renders ({renders3D.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("2d")}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 text-[10.5px] sm:text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 flex-1 sm:flex-initial ${
              activeTab === "2d"
                ? "bg-[#D49A6A] text-[#14171A] shadow-md shadow-[#D49A6A]/20"
                : "text-[#8E98A5] hover:text-[#F3F4F6]"
            }`}
          >
            <Layers size={13} className={`shrink-0 ${activeTab === "2d" ? "text-[#14171A]" : "text-[#D49A6A]"}`} />
            <span className="whitespace-nowrap">2D CAD Plans ({plans2D.length})</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. 3D RENDERS SHOWCASE TAB                                */}
      {/* ========================================================= */}
      {activeTab === "3d" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Main 4K Showcase Stage */}
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#1E2227] shadow-2xl">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#14171A]">
              <img
                src={current3D.image}
                alt={current3D.title}
                onError={handleImageError}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14171A]/90 via-transparent to-transparent pointer-events-none" />

              {/* Top View Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3.5 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D49A6A]" />
                <span className="font-mono-spec text-[10px] text-[#F3F4F6]">
                  {current3D.tag || "4K Photorealistic Perspective"}
                </span>
              </div>

              {/* Fullscreen Trigger */}
              <button
                type="button"
                onClick={() => setLightboxImage(current3D.image)}
                className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-[#F3F4F6] backdrop-blur-md hover:bg-[#D49A6A] hover:text-[#14171A] transition-all cursor-pointer"
                title="View Fullscreen"
              >
                <Maximize2 size={14} />
              </button>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <div className="max-w-2xl">
                  <span className="font-mono-spec text-[9px] uppercase tracking-widest text-[#D49A6A]">
                    Perspective 0{selected3DIndex + 1} of 0{renders3D.length}
                  </span>
                  <h3 className="font-display text-lg sm:text-2xl font-semibold text-[#F3F4F6] mt-0.5">
                    {current3D.title}
                  </h3>
                  {current3D.description && (
                    <p className="text-xs sm:text-sm text-[#D1D5DB] mt-1 line-clamp-2">
                      {current3D.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 3D Perspectives Thumbnail Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {renders3D.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => setSelected3DIndex(idx)}
                className={`group relative overflow-hidden rounded-2xl border-2 transition-all cursor-pointer ${
                  selected3DIndex === idx
                    ? "border-[#D49A6A] shadow-lg shadow-[#D49A6A]/20 scale-[0.98]"
                    : "border-white/10 opacity-70 hover:opacity-100 hover:border-white/30"
                }`}
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#14171A]">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={handleImageError}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-2.5 bg-[#1E2227]">
                  <p className="font-display text-xs font-semibold text-[#F3F4F6] truncate">
                    {item.title}
                  </p>
                  <p className="font-mono-spec text-[9px] text-[#D49A6A] truncate mt-0.5">
                    {item.tag || `View 0${idx + 1}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. 2D CAD & SPACE PLANS TAB                               */}
      {/* ========================================================= */}
      {activeTab === "2d" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Main 2D Drawing Stage */}
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#181B1F] shadow-2xl">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0F1113] p-4 sm:p-8 flex items-center justify-center">
              <img
                src={current2D.image}
                alt={current2D.title}
                onError={handleImageError}
                className="max-h-full max-w-full rounded-xl object-contain border border-white/10 shadow-lg"
              />

              {/* Scale & Sheet Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/80 px-3.5 py-1.5 backdrop-blur-md">
                <Layers size={13} className="text-[#D49A6A]" />
                <span className="font-mono-spec text-[10px] text-[#F3F4F6]">
                  {current2D.sheetType || "2D Space Planning"} {current2D.scale && `· Scale ${current2D.scale}`}
                </span>
              </div>

              {/* Fullscreen Trigger */}
              <button
                type="button"
                onClick={() => setLightboxImage(current2D.image)}
                className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/80 text-[#F3F4F6] backdrop-blur-md hover:bg-[#D49A6A] hover:text-[#14171A] transition-all cursor-pointer"
                title="Inspect CAD Sheet"
              >
                <ZoomIn size={15} />
              </button>

              {/* Bottom Sheet Caption */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <div className="rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur-md max-w-xl">
                  <span className="font-mono-spec text-[9px] uppercase tracking-widest text-[#D49A6A]">
                    CAD Sheet 0{selected2DIndex + 1} of 0{plans2D.length}
                  </span>
                  <h3 className="font-display text-base sm:text-xl font-semibold text-[#F3F4F6] mt-0.5">
                    {current2D.title}
                  </h3>
                  {current2D.description && (
                    <p className="text-xs text-[#8E98A5] mt-1">
                      {current2D.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 2D Plan Sheets Thumbnail Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {plans2D.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => setSelected2DIndex(idx)}
                className={`group relative overflow-hidden rounded-2xl border-2 transition-all cursor-pointer ${
                  selected2DIndex === idx
                    ? "border-[#D49A6A] shadow-lg shadow-[#D49A6A]/20 scale-[0.98]"
                    : "border-white/10 opacity-70 hover:opacity-100 hover:border-white/30"
                }`}
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#14171A] p-2 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={handleImageError}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="p-2.5 bg-[#1E2227]">
                  <p className="font-display text-xs font-semibold text-[#F3F4F6] truncate">
                    {item.title}
                  </p>
                  <p className="font-mono-spec text-[9px] text-[#D49A6A] truncate mt-0.5">
                    {item.sheetType || `Sheet 0${idx + 1}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. FULLSCREEN LIGHTBOX MODAL                              */}
      {/* ========================================================= */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl animate-in fade-in"
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-[#D49A6A] hover:text-[#14171A] transition-all cursor-pointer"
          >
            <X size={20} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-[95vw] overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
          >
            <img
              src={lightboxImage}
              alt="Expanded view"
              onError={handleImageError}
              className="max-h-[90vh] max-w-[95vw] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
