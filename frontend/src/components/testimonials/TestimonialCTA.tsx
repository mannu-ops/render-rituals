import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function TestimonialCTA() {
  return (
    <section className="bg-[#d9d2c6] py-20 md:py-28">
      <div className="container-rituals grid gap-8 lg:grid-cols-[.55fr_1.45fr]">
        <p className="label-rituals">Your project</p>

        <div>
          <h2 className="font-display max-w-4xl text-5xl leading-[0.9] md:text-7xl">
            Ready to make something worth talking about?
          </h2>

          <Link
            href="/hire-me"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#171717] px-5 py-3.5 text-xs text-white"
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
