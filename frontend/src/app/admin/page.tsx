"use client";

import Link from "next/link";
import {
  FolderKanban,
  BriefcaseBusiness,
  MessageSquare,
  Star,
  Plus,
  ArrowUpRight,
  Sparkles,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Layers,
  Eye,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  const src = target.src;
  if (src.includes(":5000/images/")) {
    target.src = src.replace(/^http:\/\/localhost:5000/, "");
  }
};

export default function AdminDashboardPage() {
  const { projects, services, inquiries, testimonials, settings } = useAdminData();

  const newInquiries = inquiries.filter((i) => i.status === "new");
  const recentProjects = projects.slice(0, 4);

  const total3DViews = projects.reduce(
    (acc, p) => acc + (p.renders3D?.length || (p.gallery?.length || 3)),
    0
  );
  const total2DPlans = projects.reduce((acc, p) => acc + (p.plans2D?.length || 2), 0);

  return (
    <div className="space-y-8">
      {/* ========================================================= */}
      {/* 1. WELCOME HERO BANNER                                    */}
      {/* ========================================================= */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#1E2227] via-[#1A1E23] to-[#14171A] p-6 sm:p-8 shadow-2xl">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#D49A6A]/15 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/images/nikita-studio-avatar.jpg"
              alt="Nikita"
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl border-2 border-[#D49A6A] object-cover shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono-spec text-[9px] uppercase tracking-widest text-[#D49A6A]">
                  Solo Studio Lead
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#25D366]/10 px-2 py-0.5 text-[9.5px] font-medium text-[#25D366]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  Live Sync Active
                </span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#F3F4F6] mt-1">
                Welcome back, Nikita 👋
              </h1>
              <p className="text-xs sm:text-sm text-[#8E98A5] mt-1">
                Managing {projects.length} project suites with {total3DViews} 3D render angles & {total2DPlans} 2D CAD sheets.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/admin/projects"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#D49A6A] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#14171A] shadow-lg hover:bg-[#E5A97C] transition-all"
            >
              <Plus size={14} />
              <span>Add New Project</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-[#1E2227] px-4 py-2.5 text-xs font-medium text-[#F3F4F6] hover:border-[#D49A6A] transition-all"
            >
              <span>Preview Site</span>
              <ExternalLink size={13} className="text-[#D49A6A]" />
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. STATS OVERVIEW CARDS                                   */}
      {/* ========================================================= */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {/* Projects Stat */}
        <Link
          href="/admin/projects"
          className="group rounded-3xl border border-white/10 bg-[#1E2227] p-5 sm:p-6 transition-all hover:border-[#D49A6A]/50 hover:bg-[#252A30]"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#D49A6A]/15 text-[#D49A6A]">
              <FolderKanban size={18} />
            </div>
            <ArrowUpRight size={15} className="text-[#8E98A5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="font-display text-2xl sm:text-3xl font-bold text-[#F3F4F6] mt-4">
            {projects.length} Suites
          </p>
          <p className="font-mono-spec text-[10px] uppercase tracking-wider text-[#D49A6A] mt-1">
            {total3DViews} 3D · {total2DPlans} 2D Plans
          </p>
        </Link>

        {/* Services Stat */}
        <Link
          href="/admin/services"
          className="group rounded-3xl border border-white/10 bg-[#1E2227] p-5 sm:p-6 transition-all hover:border-[#D49A6A]/50 hover:bg-[#252A30]"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#D49A6A]/15 text-[#D49A6A]">
              <BriefcaseBusiness size={18} />
            </div>
            <ArrowUpRight size={15} className="text-[#8E98A5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="font-display text-2xl sm:text-3xl font-bold text-[#F3F4F6] mt-4">
            {services.length}
          </p>
          <p className="font-mono-spec text-[10px] uppercase tracking-wider text-[#8E98A5] mt-1">
            Core Disciplines
          </p>
        </Link>

        {/* Inquiries Stat */}
        <Link
          href="/admin/inquiries"
          className="group rounded-3xl border border-white/10 bg-[#1E2227] p-5 sm:p-6 transition-all hover:border-[#D49A6A]/50 hover:bg-[#252A30]"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#D49A6A]/15 text-[#D49A6A]">
              <MessageSquare size={18} />
            </div>
            {newInquiries.length > 0 && (
              <span className="rounded-full bg-[#D49A6A] px-2 py-0.5 font-mono-spec text-[9px] font-bold text-[#14171A]">
                {newInquiries.length} New
              </span>
            )}
          </div>
          <p className="font-display text-2xl sm:text-3xl font-bold text-[#F3F4F6] mt-4">
            {inquiries.length}
          </p>
          <p className="font-mono-spec text-[10px] uppercase tracking-wider text-[#8E98A5] mt-1">
            Client Proposals
          </p>
        </Link>

        {/* Testimonials Stat */}
        <Link
          href="/admin/testimonials"
          className="group rounded-3xl border border-white/10 bg-[#1E2227] p-5 sm:p-6 transition-all hover:border-[#D49A6A]/50 hover:bg-[#252A30]"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#D49A6A]/15 text-[#D49A6A]">
              <Star size={18} />
            </div>
            <ArrowUpRight size={15} className="text-[#8E98A5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="font-display text-2xl sm:text-3xl font-bold text-[#F3F4F6] mt-4">
            {testimonials.length}
          </p>
          <p className="font-mono-spec text-[10px] uppercase tracking-wider text-[#8E98A5] mt-1">
            5.0★ Client Reviews
          </p>
        </Link>
      </div>

      {/* ========================================================= */}
      {/* 3. RECENT INQUIRIES & QUICK ACTIONS SPLIT                 */}
      {/* ========================================================= */}
      <div className="grid gap-8 lg:grid-cols-[1.3fr_.7fr]">
        {/* Left: Recent Inquiries Feed */}
        <div className="rounded-3xl border border-white/10 bg-[#1E2227] p-6 sm:p-7 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#D49A6A]/15 text-[#D49A6A]">
                <MessageSquare size={14} />
              </div>
              <h2 className="font-display text-lg font-semibold text-[#F3F4F6]">
                Recent Client Inquiries
              </h2>
            </div>
            <Link
              href="/admin/inquiries"
              className="font-mono-spec text-xs text-[#D49A6A] hover:underline"
            >
              View All ({inquiries.length}) →
            </Link>
          </div>

          <div className="mt-4 divide-y divide-white/5">
            {inquiries.slice(0, 3).map((inq, idx) => (
              <div key={inq.id || `inq-${idx}`} className="py-4 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-sm font-semibold text-[#F3F4F6]">
                      {inq.name}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono-spec text-[9px] uppercase tracking-wider ${
                        inq.status === "new"
                          ? "bg-[#D49A6A]/20 text-[#D49A6A] border border-[#D49A6A]/40"
                          : inq.status === "in_discussion"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      }`}
                    >
                      {inq.status.replace("_", " ")}
                    </span>
                  </div>

                  <span className="font-mono-spec text-[10px] text-[#8E98A5]">
                    {inq.date}
                  </span>
                </div>

                <p className="font-mono-spec text-[11px] text-[#D49A6A] mt-1">
                  Service: {inq.service}
                </p>
                <p className="text-xs text-[#8E98A5] mt-1.5 line-clamp-2 leading-relaxed">
                  &ldquo;{inq.message}&rdquo;
                </p>

                <div className="mt-3 flex items-center gap-2">
                  {inq.phone && (
                    <a
                      href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#14171A] px-3 py-1 text-[11px] font-medium text-[#25D366] hover:border-[#25D366]/40"
                    >
                      <Phone size={11} />
                      <span>WhatsApp</span>
                    </a>
                  )}
                  <a
                    href={`mailto:${inq.email}?subject=Regarding your Render Rituals Project Inquiry`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#14171A] px-3 py-1 text-[11px] font-medium text-[#D49A6A] hover:border-[#D49A6A]/40"
                  >
                    <Mail size={11} />
                    <span>Email Reply</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Controls & Live Settings */}
        <div className="space-y-6">
          {/* Availability Card */}
          <div className="rounded-3xl border border-white/10 bg-[#1E2227] p-6 shadow-xl">
            <h3 className="font-display text-base font-semibold text-[#F3F4F6] mb-3">
              Studio Availability
            </h3>
            <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-[#14171A] p-4">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${settings.isAvailable ? "bg-[#25D366]" : "bg-[#EF4444]"}`} />
                  <span className={`relative inline-flex h-3 w-3 rounded-full ${settings.isAvailable ? "bg-[#25D366]" : "bg-[#EF4444]"}`} />
                </span>
                <div>
                  <p className="text-xs font-semibold text-[#F3F4F6]">
                    {settings.statusText}
                  </p>
                  <p className="text-[10px] text-[#8E98A5]">
                    Shown in header beacon on public website
                  </p>
                </div>
              </div>
              <Link
                href="/admin/settings"
                className="rounded-xl border border-white/10 bg-[#1E2227] px-3 py-1.5 text-xs text-[#D49A6A] hover:border-[#D49A6A]"
              >
                Change
              </Link>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="rounded-3xl border border-white/10 bg-[#1E2227] p-6 shadow-xl space-y-2.5">
            <h3 className="font-display text-base font-semibold text-[#F3F4F6] mb-3">
              Quick Shortcuts
            </h3>
            <Link
              href="/admin/projects"
              className="flex items-center justify-between rounded-2xl border border-white/5 bg-[#14171A] p-3.5 text-xs text-[#F3F4F6] hover:border-[#D49A6A]/50 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <FolderKanban size={15} className="text-[#D49A6A]" />
                <span>Manage 3D Views & 2D CAD Plans</span>
              </div>
              <ChevronRight size={14} className="text-[#8E98A5]" />
            </Link>

            <Link
              href="/admin/services"
              className="flex items-center justify-between rounded-2xl border border-white/5 bg-[#14171A] p-3.5 text-xs text-[#F3F4F6] hover:border-[#D49A6A]/50 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <BriefcaseBusiness size={15} className="text-[#D49A6A]" />
                <span>Update Pricing & Inclusions</span>
              </div>
              <ChevronRight size={14} className="text-[#8E98A5]" />
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center justify-between rounded-2xl border border-white/5 bg-[#14171A] p-3.5 text-xs text-[#F3F4F6] hover:border-[#D49A6A]/50 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#D49A6A]" />
                <span>Change WhatsApp or Email</span>
              </div>
              <ChevronRight size={14} className="text-[#8E98A5]" />
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. RECENT PROJECTS GALLERY PREVIEW                        */}
      {/* ========================================================= */}
      <div className="rounded-3xl border border-white/10 bg-[#1E2227] p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div>
            <h2 className="font-display text-lg sm:text-xl font-semibold text-[#F3F4F6]">
              Live Portfolio Project Suites
            </h2>
            <p className="text-xs text-[#8E98A5] mt-0.5">
              These {projects.length} project suites are currently active on your homepage.
            </p>
          </div>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 rounded-2xl bg-[#D49A6A] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#14171A]"
          >
            <Plus size={13} />
            <span>Manage All</span>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recentProjects.map((p, idx) => {
            const rendersCount = p.renders3D?.length || (p.gallery?.length || 3);
            const plansCount = p.plans2D?.length || 2;

            return (
              <div
                key={p.id || `recent-proj-${idx}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#14171A] transition-all hover:border-[#D49A6A]/50"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.coverImage || p.image}
                    alt={p.title}
                    onError={handleImageError}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-full border border-white/20 bg-black/70 px-2 py-0.5 font-mono-spec text-[8.5px] text-[#F3F4F6] backdrop-blur-md">
                    <span className="h-1 w-1 rounded-full bg-[#D49A6A]" />
                    <span>{p.category}</span>
                  </div>
                </div>
                <div className="p-3.5">
                  <h3 className="font-display text-sm font-semibold text-[#F3F4F6] truncate">
                    {p.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 font-mono-spec text-[9px] text-[#D49A6A]">
                    <span>{rendersCount} 3D</span>
                    <span>·</span>
                    <span className="text-[#F3F4F6]">{plansCount} 2D Plans</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
