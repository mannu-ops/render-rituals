import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AboutCTA() {
  return (
    <section className="grid gap-6 border-t border-white/10 pt-12 sm:pt-16 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D49A6A]" />
          <span className="label-rituals text-[#D49A6A]">Let&apos;s Work Together</span>
        </div>
        <h2 className="font-display mt-3.5 max-w-2xl text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.12] tracking-tight text-[#F3F4F6]">
          Have a space in mind?
        </h2>
      </div>

      <Link
        href="/#contact"
        className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#D49A6A] px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#14171A] shadow-md transition-all duration-300 hover:bg-[#E5A97C] hover:shadow-[0_4px_25px_rgba(212,154,106,0.4)] active:scale-[0.98]"
      >
        <span>Initiate Project Consultation</span>
        <ArrowUpRight
          size={15}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </Link>
    </section>
  );
}
