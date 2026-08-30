import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function WorkCTA() {
  return (
    <section className="border-t border-black/10 py-24 md:py-32">
      <div className="container-rituals flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label-rituals">Have a project?</p>
          <h2 className="font-display mt-4 max-w-3xl text-5xl leading-[0.9] md:text-7xl">
            Let&apos;s make something considered.
          </h2>
        </div>

        <Link
          href="/hire-me"
          className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#171717] px-5 py-3.5 text-xs text-white"
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
