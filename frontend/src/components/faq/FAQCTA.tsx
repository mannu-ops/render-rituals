import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function FAQCTA() {
  return (
    <section className="bg-[#171717] py-20 text-white md:py-28">
      <div className="container-rituals grid gap-8 lg:grid-cols-[.55fr_1.45fr]">
        <p className="label-rituals text-white/35">Still have a question?</p>

        <div>
          <h2 className="font-display max-w-4xl text-5xl leading-[0.9] md:text-7xl">
            Let&apos;s talk about the project directly.
          </h2>

          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3.5 text-xs text-black"
          >
            Contact Render Rituals
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
