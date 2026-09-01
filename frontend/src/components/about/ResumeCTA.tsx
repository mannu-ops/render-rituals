import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";

export default function ResumeCTA({
  resumeUrl = "/resume.pdf",
}: {
  resumeUrl?: string;
}) {
  return (
    <section className="py-14 sm:py-18 md:py-20 bg-[#14171A] text-[#F3F4F6]">
      <div className="container-rituals flex flex-col gap-8 border-t border-white/10 pt-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label-rituals">For recruiters & clients</p>
          <h2 className="font-display mt-3.5 max-w-2xl text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.12] tracking-tight text-[#F3F4F6]">
            Want the complete professional profile?
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-full bg-[#D49A6A] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#14171A] hover:bg-[#E5A97C]"
          >
            Download Resume
            <ArrowDownToLine size={14} />
          </a>

          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#1E2227] px-6 py-3.5 text-xs font-medium uppercase tracking-wider text-[#F3F4F6] hover:border-[#D49A6A]"
          >
            Get in touch
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
