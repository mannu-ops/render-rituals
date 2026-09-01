import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function TestimonialCTA() {
  return (
    <section className="bg-[#0F1113] py-16 sm:py-20 md:py-24 text-[#F3F4F6] border-t border-white/10">
      <div className="container-rituals grid gap-8 lg:grid-cols-[.4fr_1.6fr]">
        <p className="label-rituals">Your project</p>

        <div>
          <h2 className="font-display max-w-2xl text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.12] tracking-tight text-[#F3F4F6]">
            Ready to make something <span className="italic text-[#D49A6A]">worth talking about</span>?
          </h2>

          <Link
            href="/#contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#D49A6A] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#14171A] hover:bg-[#E5A97C]"
          >
            Start a project
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
