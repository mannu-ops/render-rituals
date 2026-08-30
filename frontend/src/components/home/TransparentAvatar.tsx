"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Layers, Sparkles, Box } from "lucide-react";
import Link from "next/link";
import SmoothScrollLink from "@/components/ui/SmoothScrollLink";

export default function TransparentAvatar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = "/images/nikita-waving-white-bg.jpg";
      img.onload = () => {
        try {
          const canvas = canvasRef.current;
          if (!canvas) return;

          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;

          const ctx = canvas.getContext("2d", { willReadFrequently: true });
          if (!ctx) return;

          ctx.drawImage(img, 0, 0);
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const d = imgData.data;

          // Smart background cutout: Remove pure white background while preserving warm golden holographic rays
          for (let i = 0; i < d.length; i += 4) {
            const r = d[i];
            const g = d[i + 1];
            const b = d[i + 2];

            const minVal = Math.min(r, g, b);
            const maxVal = Math.max(r, g, b);
            const colorDiff = maxVal - minVal;

            // If pixel is plain neutral white background
            if (minVal > 240 && colorDiff < 16) {
              d[i + 3] = 0; // 100% transparent
            } else if (minVal > 218 && colorDiff < 22) {
              // Antialiased edge
              const alpha = (240 - minVal) / 22;
              d[i + 3] = Math.max(0, Math.min(255, Math.round(alpha * 255)));
            }
          }

          ctx.putImageData(imgData, 0, 0);
          setLoaded(true);
        } catch (e) {
          setLoaded(false);
        }
      };
      img.onerror = () => {
        setLoaded(false);
      };
    } catch (err) {
      setLoaded(false);
    }
  }, []);

  return (
    <div className="relative flex items-center justify-center py-4 lg:py-0">
      {/* Warm Ambient Solar Backlight Glow */}
      <div className="pointer-events-none absolute h-[380px] w-[380px] sm:h-[480px] sm:w-[480px] rounded-full bg-[#D49A6A]/25 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-10 h-[300px] w-[300px] rounded-full bg-[#8E98A5]/15 blur-[90px]" />

      {/* Floating 3D Character with gentle levitation animation */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ y: [0, -12, 0] }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="relative z-10 flex flex-col items-center w-full min-h-[350px] sm:min-h-[420px] lg:min-h-[480px] justify-center"
      >
        {/* The Cutout Canvas - ZERO WHITE FLASH */}
        <div className="relative w-full flex justify-center">
          <canvas
            ref={canvasRef}
            className={`h-auto w-full max-w-[280px] xs:max-w-[340px] sm:max-w-[440px] md:max-w-[480px] lg:max-w-[540px] drop-shadow-[0_25px_55px_rgba(0,0,0,0.85)] transition-opacity duration-300 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ imageRendering: "auto" }}
          />
        </div>

        {/* Floating Top "Hi!" Speech Bubble */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute -top-3 left-1 sm:-top-4 sm:left-4 flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/20 bg-[#1E2227]/95 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-xl shadow-2xl hover:border-[#D49A6A]/50 transition-colors"
        >
          <span className="text-sm sm:text-base animate-bounce">👋</span>
          <span className="font-mono-spec text-[9px] sm:text-[11px] uppercase tracking-wider text-[#F3F4F6]">
            Hi! I&apos;m <span className="text-[#D49A6A] font-semibold">Nikita</span>
          </span>
        </motion.div>

        {/* Floating 3D Visualization Hologram Badge */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="absolute top-[20%] right-0 sm:-right-4 flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#D49A6A]/50 bg-[#1E2227]/95 px-2.5 py-1 sm:px-4 sm:py-2 backdrop-blur-xl shadow-2xl hover:scale-105 transition-all"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#D49A6A] animate-pulse" />
          <span className="font-mono-spec text-[8.5px] sm:text-[10.5px] text-[#F3F4F6]">
            4K Photorealistic CGI
          </span>
        </motion.div>

        {/* Floating 2D Space Planning Blueprint Badge */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="absolute bottom-[22%] -left-1 sm:-left-6 flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/20 bg-[#14171A]/95 px-2.5 py-1 sm:px-4 sm:py-2 backdrop-blur-xl shadow-2xl hover:scale-105 transition-all"
        >
          <Layers size={13} className="text-[#D49A6A]" />
          <span className="font-mono-spec text-[8.5px] sm:text-[10.5px] text-[#F3F4F6]">
            2D Architectural Layouts
          </span>
        </motion.div>

        {/* Floating Bottom Status Pill */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="absolute -bottom-3 sm:-bottom-5 flex items-center justify-between gap-3 sm:gap-4 rounded-full border border-white/20 bg-[#1E2227]/95 px-4 py-2 sm:px-5 sm:py-2.5 backdrop-blur-2xl shadow-2xl"
        >
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#25D366]" />
            </span>
            <span className="font-mono-spec text-[8.5px] sm:text-[10px] uppercase tracking-wider text-[#F3F4F6] truncate">
              Open for Freelance Work
            </span>
          </div>
          <SmoothScrollLink
            href="#contact"
            className="group shrink-0 flex items-center gap-1 font-mono-spec text-[8.5px] sm:text-[10px] uppercase tracking-wider text-[#D49A6A] font-semibold hover:text-[#E5A97C] transition-colors cursor-pointer"
          >
            <span>Hire Nikita</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </SmoothScrollLink>
        </motion.div>
      </motion.div>
    </div>
  );
}
