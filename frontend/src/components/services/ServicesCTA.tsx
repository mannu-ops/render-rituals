import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ServicesCTA() {
  return (
    <section className="bg-[#d9d2c6] py-20 md:py-28">
      <div className="container-rituals grid gap-8 lg:grid-cols-[.55fr_1.45fr]">
        <p className="label-rituals">Not sure what you need?</p>

        <div>
          <h2 className="font-display max-w-4xl text-5xl leading-[0.9] md:text-7xl">
            Tell me about the project. We&apos;ll figure out the scope together.
          </h2>

          <Link
            href="/hire-me"
            className="group mt-8 inline-flex items-center gap-3 rounded-full border border-black/15 px-5 py-3.5 text-xs"
          >
            Start a project brief
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
