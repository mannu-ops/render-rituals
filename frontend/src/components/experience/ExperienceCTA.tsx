import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type ExperienceCTAProps = {
  title?: string;
  description?: string;
};

export default function ExperienceCTA({
  title = "Looking for a designer?",
  description = "For freelance projects, collaborations or hiring opportunities, get in touch and share the brief.",
}: ExperienceCTAProps) {
  return (
    <section className="border-t border-white/10 pt-12 sm:pt-16 bg-[#14171A] text-[#F3F4F6]">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="label-rituals">Next step</p>
          <h2 className="font-display mt-3.5 max-w-2xl text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.12] tracking-tight text-[#F3F4F6]">
            {title}
          </h2>
          <p className="mt-4 sm:mt-5 max-w-xl text-sm leading-relaxed text-[#8E98A5]">
            {description}
          </p>
        </div>

        <Link
          href="/#contact"
          className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#D49A6A] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#14171A] hover:bg-[#E5A97C]"
        >
          Get in touch
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
}
