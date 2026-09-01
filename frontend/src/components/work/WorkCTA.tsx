import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function WorkCTA() {
  return (
    <section className="border-t border-white/10 py-16 sm:py-20 md:py-24 bg-[#111315] text-[#F3F4F6]">
      <div className="container-rituals flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label-rituals">Have a project?</p>
          <h2 className="font-display mt-3.5 max-w-2xl text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.12] tracking-tight text-[#F3F4F6]">
            Let&apos;s make something <span className="italic text-[#D49A6A]">considered</span>.
          </h2>
        </div>

        <Link
          href="/#contact"
          className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#D49A6A] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#14171A] hover:bg-[#E5A97C]"
        >
          Start a Project
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
}
