import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function HireForCompanies() {
  return (
    <section className="bg-[#d9d2c6] py-20 md:py-28">
      <div className="container-rituals grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
        <p className="label-rituals">For studios & hiring teams</p>

        <div>
          <h2 className="font-display max-w-4xl text-5xl leading-[0.9] md:text-7xl">
            Looking for a designer, visualizer or creative collaborator?
          </h2>

          <p className="mt-7 max-w-2xl text-sm leading-7 text-black/50">
            Browse the portfolio, review the capabilities and get in touch
            about freelance collaboration, project-based work or a full-time
            opportunity.
          </p>

          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-3 rounded-full border border-black/15 px-5 py-3.5 text-xs"
          >
            View Profile & Resume
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
