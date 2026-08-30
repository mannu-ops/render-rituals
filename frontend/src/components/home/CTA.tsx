import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-[#d9d2c6] py-24 md:py-36">
      <div className="container-rituals">
        <p className="text-[10px] uppercase tracking-[0.24em] text-black/45">
          Have a space in mind?
        </p>
        <h2 className="font-display mt-5 max-w-5xl text-6xl leading-[0.9] tracking-tight md:text-8xl">
          Let&apos;s turn your idea into a place.
        </h2>
        <Link
          href="/hire-me"
          className="group mt-10 inline-flex items-center gap-4 rounded-full bg-[#171717] px-6 py-4 text-sm text-white"
        >
          Start a Project
          <ArrowUpRight
            size={17}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
}
