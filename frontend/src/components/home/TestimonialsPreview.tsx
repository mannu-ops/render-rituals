"use client";

import { Star, Sparkles, Quote, ShieldCheck, CheckCircle2, Award } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";

const metrics = [
  { label: "On-Time Milestone Delivery", value: "100%" },
  { label: "Spatial & CGI Projects", value: "50+" },
  { label: "Contractor Drawing Precision", value: "98%" },
  { label: "Average Client Rating", value: "5.0 ★" },
];

export default function TestimonialsPreview() {
  const { testimonials } = useAdminData();
  return (
    <section id="reviews" className="relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-center py-16 sm:py-20 lg:py-28 bg-[#181B1F] border-t border-white/10">
      <div className="container-rituals">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D49A6A]" />
              <span className="label-rituals text-[#D49A6A]">Client Endorsements</span>
            </div>
            <h2 className="font-display text-3xl xs:text-4xl font-normal tracking-tight text-[#F3F4F6] sm:text-5xl md:text-6xl lg:text-7xl">
              Words From Our <span className="italic text-[#D49A6A]">Collaborators</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono-spec text-xs text-[#8E98A5]">
            <div className="flex text-[#D49A6A]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-[#D49A6A] sm:w-[15px] sm:h-[15px]" />
              ))}
            </div>
            <span className="text-[#F3F4F6] font-medium text-xs sm:text-sm">5.0 Client Rating</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 sm:mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, idx) => (
            <figure
              key={item.id || `${item.name}-${idx}`}
              className="card-luxury flex flex-col justify-between rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-500 hover:shadow-3xl hover:border-[#D49A6A]/50"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="rounded-full bg-[#252A30] border border-white/10 px-3 py-1 font-mono-spec text-[8px] sm:text-[9px] uppercase tracking-wider text-[#D49A6A] font-medium">
                    {item.scope}
                  </span>
                  <Quote size={18} className="text-[#D49A6A]/70 sm:w-5 sm:h-5" />
                </div>

                <blockquote className="font-display mt-6 sm:mt-7 text-lg sm:text-xl font-normal leading-relaxed text-[#F3F4F6]">
                  “{item.quote}”
                </blockquote>
              </div>

              <figcaption className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-3.5 border-t border-white/10 pt-4 sm:pt-5">
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-[#D49A6A] text-xs sm:text-sm font-bold text-[#14171A] shadow-md">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-sm text-[#F3F4F6] leading-none">
                    {item.name}
                  </p>
                  <p className="mt-1 font-mono-spec text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8E98A5]">
                    {item.role} · {item.location}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Micro Trust Metrics Row */}
        <div className="mt-12 sm:mt-14 grid grid-cols-2 gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-white/10 bg-[#14171A] p-5 sm:p-6 md:p-8 sm:grid-cols-4">
          {metrics.map((m, idx) => (
            <div key={idx} className="text-center sm:text-left p-2">
              <p className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-[#F3F4F6]">
                {m.value}
              </p>
              <p className="font-mono-spec text-[8px] sm:text-[10px] uppercase tracking-wider text-[#8E98A5] mt-0.5 sm:mt-1">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

