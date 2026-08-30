import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";

export default function ResumeCTA({
  resumeUrl = "/resume.pdf",
}: {
  resumeUrl?: string;
}) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-rituals flex flex-col gap-8 border-t border-black/10 pt-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label-rituals">For recruiters & clients</p>
          <h2 className="font-display mt-4 max-w-3xl text-5xl leading-[0.9] md:text-7xl">
            Want the complete professional profile?
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href={resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-5 py-3.5 text-xs text-white"
          >
            Download Resume
            <ArrowDownToLine size={14} />
          </a>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-3.5 text-xs"
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
