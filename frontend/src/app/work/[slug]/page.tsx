import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  Eye,
  Sliders,
  Box,
  SunMedium,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
  Maximize2,
  Clock,
  Compass,
} from "lucide-react";
import { projects } from "@/data/projects";
import { CONTACT, siteConfig } from "@/data/site";
import ProjectDualViewer from "@/components/portfolio/ProjectDualViewer";

export const dynamic = "force-dynamic";

async function getProjectData(slug: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/projects/${slug}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.slug) return data;
    }
  } catch (err) {
    // Graceful fallback to static data
  }
  return projects.find((item) => item.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectData(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Render Rituals Project`,
    description: project.excerpt || project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectData(slug);

  if (!project) notFound();

  const otherProjects = projects.filter((item) => item.slug !== slug).slice(0, 3);
  const rendersCount = project.renders3D?.length || (project.gallery?.length || 1);
  const plansCount = project.plans2D?.length || 1;

  const softwareList = Array.isArray(project.software)
    ? project.software
    : ["3ds Max", "Corona Renderer", "AutoCAD", "Photoshop"];

  return (
    <main className="min-h-screen bg-[#14171A] text-[#F3F4F6] pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Warm Ambient Glows */}
      <div className="pointer-events-none absolute top-0 right-10 h-[600px] w-[600px] rounded-full bg-[#D49A6A]/10 blur-[150px]" />
      <div className="pointer-events-none absolute top-1/3 left-0 h-[500px] w-[500px] rounded-full bg-[#8E98A5]/10 blur-[130px]" />

      <div className="container-rituals relative z-10">
        {/* ========================================================= */}
        {/* 1. TOP BREADCRUMB & BACK NAVIGATION                      */}
        {/* ========================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8 sm:mb-12">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 font-mono-spec text-xs uppercase tracking-wider text-[#8E98A5] hover:text-[#D49A6A] transition-colors"
          >
            <ArrowLeft
              size={15}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            <span>Back to All Works</span>
          </Link>

          <div className="flex items-center gap-2 font-mono-spec text-[10px] uppercase tracking-widest text-[#8E98A5]">
            <span className="flex items-center gap-1.5 text-[#D49A6A]">
              <Eye size={12} />
              <span>{rendersCount} 3D Perspectives</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5 text-[#F3F4F6]">
              <Layers size={12} className="text-[#D49A6A]" />
              <span>{plansCount} 2D CAD Plans</span>
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. EDITORIAL HERO HEADER                                  */}
        {/* ========================================================= */}
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="h-2 w-2 rounded-full bg-[#D49A6A]" />
            <span className="label-rituals text-[#D49A6A]">
              Complete Project Suite (3D + 2D)
            </span>
            <span className="rounded-full border border-white/15 bg-[#1E2227] px-2.5 py-0.5 font-mono-spec text-[9px] text-[#F3F4F6]">
              {project.year || "2026"}
            </span>
            <span className="rounded-full border border-[#D49A6A]/30 bg-[#D49A6A]/10 px-2.5 py-0.5 font-mono-spec text-[9px] text-[#D49A6A]">
              {project.category}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.04] tracking-tight text-[#F3F4F6]">
            {project.title}
          </h1>

          <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl leading-relaxed text-[#8E98A5] max-w-3xl">
            {project.excerpt ||
              project.description ||
              "A comprehensive project suite combining multiple 4K photorealistic 3D viewpoints with technical 2D space planning layouts ready for on-site execution."}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href={`https://wa.me/919305308296?text=Hi%20Nikita,%20I%20saw%20your%20project%20'${encodeURIComponent(
                project.title
              )}'%20and%20would%20like%20to%20discuss%20a%20similar%203D/2D%20package.`}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[#D49A6A] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#14171A] shadow-lg shadow-[#D49A6A]/20 transition-all hover:bg-[#E5A97C] active:scale-95"
            >
              <Phone size={14} />
              <span>Discuss Similar Project Package</span>
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#1E2227] px-6 py-3.5 text-xs font-medium uppercase tracking-wider text-[#F3F4F6] hover:border-[#D49A6A] hover:bg-white/5 transition-all"
            >
              <Mail size={14} className="text-[#D49A6A]" />
              <span>Request 3D + 2D Quote</span>
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. BENTO ARCHITECTURAL SPECS GRID                         */}
        {/* ========================================================= */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 border-y border-white/10 py-6 sm:py-8">
          <div className="p-2">
            <dt className="font-mono-spec text-[9.5px] uppercase tracking-widest text-[#8E98A5]">
              Location
            </dt>
            <dd className="font-display text-sm sm:text-base font-semibold text-[#F3F4F6] mt-1.5 flex items-center gap-1.5">
              <MapPin size={13} className="text-[#D49A6A] shrink-0" />
              <span>{project.location || "Noida / NCR"}</span>
            </dd>
          </div>

          <div className="p-2">
            <dt className="font-mono-spec text-[9.5px] uppercase tracking-widest text-[#8E98A5]">
              Client / Residence
            </dt>
            <dd className="font-display text-sm sm:text-base font-semibold text-[#F3F4F6] mt-1.5">
              {project.client || "Private Commission"}
            </dd>
          </div>

          <div className="p-2">
            <dt className="font-mono-spec text-[9.5px] uppercase tracking-widest text-[#8E98A5]">
              3D Render Views
            </dt>
            <dd className="font-display text-sm sm:text-base font-semibold text-[#D49A6A] mt-1.5 flex items-center gap-1.5">
              <Eye size={13} />
              <span>{rendersCount} Perspectives</span>
            </dd>
          </div>

          <div className="p-2">
            <dt className="font-mono-spec text-[9.5px] uppercase tracking-widest text-[#8E98A5]">
              2D CAD Drawings
            </dt>
            <dd className="font-display text-sm sm:text-base font-semibold text-[#F3F4F6] mt-1.5 flex items-center gap-1.5">
              <Layers size={13} className="text-[#D49A6A]" />
              <span>{plansCount} Technical Sheets</span>
            </dd>
          </div>

          <div className="p-2">
            <dt className="font-mono-spec text-[9.5px] uppercase tracking-widest text-[#8E98A5]">
              Atmosphere Tone
            </dt>
            <dd className="font-display text-sm sm:text-base font-semibold text-[#F3F4F6] mt-1.5 flex items-center gap-1.5">
              <SunMedium size={13} className="text-[#D49A6A] shrink-0" />
              <span>2700K Warm Daylight</span>
            </dd>
          </div>

          <div className="p-2">
            <dt className="font-mono-spec text-[9.5px] uppercase tracking-widest text-[#8E98A5]">
              Turnaround Delivery
            </dt>
            <dd className="font-display text-sm sm:text-base font-semibold text-[#F3F4F6] mt-1.5 flex items-center gap-1.5">
              <Clock size={13} className="text-[#25D366] shrink-0" />
              <span>3 – 5 Days</span>
            </dd>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. INTERACTIVE 3D & 2D MULTI-MEDIA VIEWER                 */}
        {/* ========================================================= */}
        <div className="mt-14 sm:mt-20">
          <ProjectDualViewer project={project} />
        </div>

        {/* ========================================================= */}
        {/* 5. ARCHITECTURAL CASE STUDY NARRATIVE & DETAILS           */}
        {/* ========================================================= */}
        <div className="mt-16 sm:mt-24 grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-start">
          {/* Left Column: Spatial Narrative */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D49A6A]" />
                <span className="label-rituals text-[#D49A6A]">Design Narrative</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F3F4F6]">
                About This Space & 3D/2D Synergy
              </h2>
              <div className="mt-5 space-y-4 text-sm sm:text-base leading-relaxed text-[#8E98A5]">
                <p>
                  {project.description ||
                    "This space was crafted to balance architectural minimalism with rich tactile materiality. Every 3D render is backed by dimensioned 2D CAD layouts to ensure that visual concepts translate seamlessly into real-world built spaces."}
                </p>
                <p>
                  By calibrating the spatial proportion in 2D and rendering realistic artificial lighting at 2700K in 3D, the client and contractors were able to make confident decisions on finishes, furniture clearances, and electrical points prior to starting on-site work.
                </p>
              </div>
            </div>

            {/* Scope of Deliverables */}
            <div className="rounded-3xl border border-white/10 bg-[#1E2227] p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-[#F3F4F6] mb-4">
                What Was Delivered in This Project
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "4K Ultra-HD 3D Renders (Multiple Perspectives)",
                  "Daylight & Evening Atmosphere Passes",
                  "AutoCAD Dimensional Floor & Spatial Layouts",
                  "Furniture Clearance & Walkway Planning",
                  "Material Palette & Texture Schedule",
                  "Contractor Execution Package Deck",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#D1D5DB]">
                    <CheckCircle2 size={15} className="text-[#D49A6A] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Software Pipeline & Freelance Guarantee Card */}
          <div className="space-y-6">
            {/* Software Pipeline Box */}
            <div className="rounded-3xl border border-white/10 bg-[#1E2227] p-6 sm:p-7">
              <p className="font-mono-spec text-[10px] uppercase tracking-widest text-[#D49A6A] mb-3">
                Software & Technical Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {softwareList.map((sw, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-white/10 bg-[#14171A] px-3.5 py-1.5 font-mono-spec text-xs text-[#F3F4F6]"
                  >
                    {sw}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Freelance Practice Card */}
            <div className="rounded-3xl border border-[#D49A6A]/30 bg-gradient-to-b from-[#1E2227] to-[#14171A] p-6 sm:p-7 shadow-xl">
              <div className="flex items-center gap-3">
                <img
                  src="/images/nikita-studio-avatar.jpg"
                  alt="Nikita"
                  className="h-12 w-12 rounded-full border border-[#D49A6A] object-cover"
                />
                <div>
                  <h4 className="font-display text-base font-semibold text-[#F3F4F6]">
                    Direct 1-on-1 Practice
                  </h4>
                  <p className="font-mono-spec text-[9px] uppercase tracking-wider text-[#D49A6A]">
                    Led by Nikita
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-[#8E98A5]">
                You work directly with me from brief to final delivery. Zero agency middlemen, clear milestones, and daily WhatsApp progress updates.
              </p>

              <a
                href={`https://wa.me/919305308296?text=Hi%20Nikita,%20I%20would%20like%20to%20discuss%20a%20new%203D/2D%20project.`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3 text-xs font-bold text-[#14171A] shadow-md hover:bg-[#20bd5a] transition-all"
              >
                <Phone size={14} />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 6. MORE SELECTED WORKS SHOWCASE                           */}
        {/* ========================================================= */}
        <div className="mt-24 sm:mt-32 border-t border-white/10 pt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="label-rituals text-[#D49A6A]">More Projects</span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F3F4F6] mt-1">
                Explore Related Works
              </h2>
            </div>
            <Link
              href="/#work"
              className="font-mono-spec text-xs text-[#D49A6A] hover:underline"
            >
              View All Works →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((other) => (
              <Link
                key={other.id}
                href={`/work/${other.slug}`}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-[#1E2227] shadow-xl transition-all hover:border-[#D49A6A]/50 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#14171A]">
                  <img
                    src={other.coverImage || other.image}
                    alt={other.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 font-mono-spec text-[9px] text-[#F3F4F6] backdrop-blur-md">
                    {other.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-display text-base sm:text-lg font-semibold text-[#F3F4F6] group-hover:text-[#D49A6A] transition-colors truncate">
                    {other.title}
                  </h3>
                  <p className="text-xs text-[#8E98A5] truncate mt-1">
                    {other.scope || other.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 7. BOTTOM DEDICATED PROPOSAL CTA                          */}
        {/* ========================================================= */}
        <div className="mt-20 sm:mt-28 rounded-3xl border border-[#D49A6A]/30 bg-gradient-to-r from-[#1E2227] via-[#1A1E23] to-[#14171A] p-8 sm:p-12 shadow-2xl text-center relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 right-1/4 h-64 w-64 rounded-full bg-[#D49A6A]/15 blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="label-rituals text-[#D49A6A]">Start A Project</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#F3F4F6] mt-2">
              Ready to visualize your space?
            </h2>
            <p className="text-sm sm:text-base text-[#8E98A5] mt-4 leading-relaxed">
              Send your room sketches, CAD plans, or moodboards to receive a detailed estimate and 3-5 day turnaround timeline.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`https://wa.me/919305308296?text=Hi%20Nikita,%20I%20would%20like%20to%20request%20a%20quote%20for%20a%20new%203D/2D%20project.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#D49A6A] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#14171A] shadow-lg hover:bg-[#E5A97C] transition-all"
              >
                <Phone size={14} />
                <span>Chat on WhatsApp</span>
              </a>

              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#14171A] px-7 py-3.5 text-xs font-medium uppercase tracking-wider text-[#F3F4F6] hover:border-[#D49A6A] transition-all"
              >
                <span>Submit Inquiry Form</span>
                <ArrowUpRight size={14} className="text-[#D49A6A]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
