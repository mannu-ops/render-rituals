import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CustomQuote() {
  return (
    <section className="bg-[#14171A] py-16 sm:py-20 md:py-24 text-[#F3F4F6] border-t border-white/10">
      <div className="container-rituals">
        <p className="label-rituals">
          Need something custom?
        </p>
        <div className="mt-5 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="font-display max-w-2xl text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.12] tracking-tight text-[#F3F4F6]">
            Your project doesn&apos;t have to fit inside a package.
          </h2>
          <Link
            href="/#contact"
            className="group flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#D49A6A] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#14171A] hover:bg-[#E5A97C]"
          >
            Request Custom Quote
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
