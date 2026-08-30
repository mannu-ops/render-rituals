import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function PricingCTA() {
  return (
    <section className="bg-[#171717] py-20 text-white md:py-28">
      <div className="container-rituals flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="label-rituals text-white/35">Custom quote</p>
          <h2 className="font-display mt-5 max-w-4xl text-5xl leading-[0.9] md:text-7xl">
            Have a different brief?
          </h2>
        </div>

        <Link
          href="/hire-me"
          className="group inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-4 text-xs text-black"
        >
          Send project details
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
}
