import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="bg-[#171717] py-20 text-white md:py-28">
      <div className="container-rituals">
        <p className="label-rituals text-white/35">Prefer email?</p>
        <div className="mt-5 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display max-w-4xl text-5xl leading-[0.88] md:text-7xl">
            Start with a simple hello.
          </h2>

          <Link
            href="mailto:hello@renderrituals.com"
            className="group inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3.5 text-xs text-black"
          >
            Email Render Rituals
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
