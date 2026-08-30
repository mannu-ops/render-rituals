import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CustomQuote() {
  return (
    <section className="bg-[#171717] py-20 text-white md:py-28">
      <div className="container-rituals">
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">
          Need something custom?
        </p>
        <div className="mt-5 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="font-display max-w-4xl text-5xl leading-[0.92] tracking-tight md:text-7xl">
            Your project doesn&apos;t have to fit inside a package.
          </h2>
          <Link
            href="/hire-me"
            className="group flex w-fit shrink-0 items-center gap-3 rounded-full bg-white px-6 py-4 text-sm text-[#171717]"
          >
            Request Custom Quote
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
