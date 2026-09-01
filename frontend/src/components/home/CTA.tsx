import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-[#0F1113] py-16 sm:py-20 md:py-24 text-[#F3F4F6] border-t border-white/10">
      <div className="container-rituals">
        <p className="label-rituals">
          Have a space in mind?
        </p>
        <h2 className="font-display mt-4 max-w-3xl text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.08] tracking-tight text-[#F3F4F6]">
          Let&apos;s turn your idea into a <span className="italic text-[#D49A6A]">reality</span>.
        </h2>
        <Link
          href="/#contact"
          className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#D49A6A] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#14171A] hover:bg-[#E5A97C]"
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
