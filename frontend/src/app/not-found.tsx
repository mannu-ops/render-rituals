import Link from "next/link";
import { Sparkles, ArrowLeft, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#0F1113] px-6 text-[#F3F4F6] overflow-hidden">
      {/* Ambient Lighting Flares */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-[#D49A6A]/15 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 h-[500px] w-[500px] rounded-full bg-[#8E98A5]/10 blur-[140px]" />

      <div className="relative z-10 max-w-lg text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D49A6A]/30 bg-[#D49A6A]/10 px-3.5 py-1 text-xs font-mono-spec text-[#D49A6A] mb-6">
          <Compass size={14} />
          <span>404 · Uncharted Space</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#F3F4F6]">
          Perspective <span className="italic text-[#D49A6A]">Not Found</span>
        </h1>

        <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#8E98A5]">
          The spatial page, architectural CAD sheet, or portfolio perspective you are looking for does not exist or has been relocated.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#D49A6A] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#14171A] hover:bg-[#E5A97C] shadow-lg shadow-[#D49A6A]/20 transition-all cursor-pointer"
          >
            <Home size={15} />
            <span>Return to Studio Home</span>
          </Link>

          <Link
            href="/#work"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-xs font-semibold text-[#F3F4F6] hover:bg-white/10 transition-all cursor-pointer"
          >
            <Sparkles size={15} className="text-[#D49A6A]" />
            <span>Explore 3D & 2D Works</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
