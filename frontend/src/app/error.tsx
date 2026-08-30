"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error Caught:", error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#0F1113] px-6 text-[#F3F4F6] overflow-hidden">
      {/* Ambient Lighting Flare */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-rose-500/10 blur-[140px]" />

      <div className="relative z-10 max-w-lg text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-mono-spec text-rose-400 mb-6">
          <AlertCircle size={14} />
          <span>System Recovery Mode</span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-normal tracking-tight text-[#F3F4F6]">
          Something went <span className="italic text-rose-400">unexpectedly</span>.
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-[#8E98A5]">
          A temporary rendering error occurred. The application state has been preserved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#D49A6A] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#14171A] hover:bg-[#E5A97C] shadow-lg shadow-[#D49A6A]/20 transition-all cursor-pointer"
          >
            <RotateCcw size={15} />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-xs font-semibold text-[#F3F4F6] hover:bg-white/10 transition-all cursor-pointer"
          >
            <Home size={15} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
