"use client";

import { ArrowUpRight, CheckCircle2, Eye, Layers, Clock, Sparkles, Phone } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import SmoothScrollLink from "@/components/ui/SmoothScrollLink";

export default function ServicesPreview() {
  const { services } = useAdminData();
  const visibleServices = services.filter((s) => s.published !== false);

  return (
    <section id="services" className="relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-center py-16 sm:py-20 lg:py-28 bg-[#181B1F] border-t border-white/10 text-[#F3F4F6]">
      {/* Warm Ambient Glows */}
      <div className="pointer-events-none absolute -top-24 right-10 h-[450px] w-[450px] rounded-full bg-[#D49A6A]/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-[450px] w-[450px] rounded-full bg-[#8E98A5]/10 blur-[130px]" />

      <div className="container-rituals relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D49A6A]" />
              <span className="label-rituals text-[#D49A6A]">Freelance Craft</span>
            </div>
            <h2 className="font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#F3F4F6]">
              What I <span className="italic text-[#D49A6A]">Specialize In</span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-[#8E98A5] font-mono-spec uppercase tracking-wider">
            2 Core Disciplines · Direct Freelance Collaboration · Fast Turnaround
          </p>
        </div>

        {/* 2 Core Services Cards (Stacked on Mobile, 2-Columns on Desktop) */}
        <div className="mt-8 sm:mt-12 lg:mt-16 grid gap-6 sm:gap-8 lg:grid-cols-2">
          {visibleServices.map((service, index) => {
            const is3D = service.id.includes("3d");
            const Icon = is3D ? Eye : Layers;

            return (
              <div
                key={service.id}
                className="card-luxury flex flex-col justify-between rounded-3xl p-5 xs:p-6 sm:p-8 lg:p-10 border border-white/15 bg-[#1E2227] shadow-2xl transition-all duration-500 hover:border-[#D49A6A]/60"
              >
                <div>
                  {/* Top Header & Tag */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 sm:pb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-[#D49A6A]/15 border border-[#D49A6A]/30 text-[#D49A6A] shrink-0">
                        <Icon size={20} className="sm:w-[22px] sm:h-[22px]" />
                      </div>
                      <div>
                        <span className="font-mono-spec text-[9px] sm:text-[10px] uppercase tracking-widest text-[#D49A6A]">
                          Service 0{index + 1}
                        </span>
                        <h3 className="font-display text-xl xs:text-2xl sm:text-3xl font-medium text-[#F3F4F6] mt-0.5">
                          {is3D ? "3D Visualization & Renders" : "2D Space Planning & Layouts"}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Image Preview Banner with Floating Badges */}
                  {service.coverImage ? (
                    <div className="relative mt-5 sm:mt-6 aspect-[16/9] sm:aspect-[16/8] overflow-hidden rounded-2xl border border-white/10 bg-[#14171A]">
                      <img
                        src={service.coverImage}
                        alt={service.title}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1E2227] via-transparent to-transparent opacity-80" />

                      {/* Top Floating Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-[#14171A]/90 px-3 py-1 text-[10px] font-medium text-[#F3F4F6] backdrop-blur-md">
                        <Icon size={12} className="text-[#D49A6A]" />
                        <span>{is3D ? "4K CGI Renders" : "Contractor Ready CAD"}</span>
                      </div>

                      {/* Turnaround Badge */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full border border-[#D49A6A]/40 bg-[#D49A6A]/15 px-2.5 py-1 text-[10px] font-medium text-[#D49A6A] backdrop-blur-md">
                        <Clock size={11} />
                        <span>{is3D ? "3-5 Days" : "2-4 Days"}</span>
                      </div>
                    </div>
                  ) : null}

                  {/* Description */}
                  <p className="mt-5 sm:mt-6 text-xs xs:text-sm leading-relaxed text-[#8E98A5]">
                    {service.description}
                  </p>

                  {/* Deliverables Inclusions (2-Column Grid on Mobile) */}
                  <div className="mt-5 sm:mt-6 border-t border-white/10 pt-5 sm:pt-6">
                    <p className="font-mono-spec text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8E98A5] mb-3">
                      What You Will Receive:
                    </p>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:space-y-0 sm:grid sm:grid-cols-1 sm:gap-2.5">
                      {service.features.slice(0, 4).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#D1D5DB]">
                          <CheckCircle2 size={13} className="text-[#D49A6A] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action & Pricing */}
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 border-t border-white/10 pt-5 sm:pt-6">
                  <div>
                    <span className="font-mono-spec text-[8.5px] sm:text-[9px] uppercase tracking-wider text-[#8E98A5] block">
                      Starting Investment
                    </span>
                    <p className="font-display text-xl sm:text-2xl font-semibold text-[#F3F4F6] mt-0.5">
                      {service.price}
                    </p>
                  </div>

                  <div className="flex flex-col xs:flex-row items-stretch sm:items-center gap-2">
                    <SmoothScrollLink
                      href="#contact"
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#D49A6A] px-5 py-3 sm:px-6 sm:py-3.5 text-xs font-semibold uppercase tracking-wider text-[#14171A] shadow-md transition-all duration-300 hover:bg-[#E5A97C] active:scale-[0.98] cursor-pointer"
                    >
                      <Sparkles size={14} />
                      <span>Hire for {is3D ? "3D Renders" : "2D Plans"}</span>
                      <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </SmoothScrollLink>

                    <a
                      href={`https://wa.me/919305308296?text=Hi%20Nikita,%20I%20am%20interested%20in%20your%20${is3D ? "3D%20Rendering" : "2D%20Space%20Planning"}%20services.`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-[#14171A] px-4 py-3 sm:py-3.5 text-xs font-medium text-[#25D366] hover:border-[#25D366]/40 active:scale-[0.98] cursor-pointer"
                    >
                      <Phone size={13} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
