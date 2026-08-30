import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type ExperienceCTAProps = {
  title?: string;
  description?: string;
};

export default function ExperienceCTA({
  title = "Looking for a designer?",
  description = "For freelance projects, collaborations or hiring opportunities, get in touch and share the brief.",
}: ExperienceCTAProps) {
  return (
    <section className="border-t border-black/10 pt-10">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="label-rituals">Next step</p>
          <h2 className="font-display mt-4 max-w-2xl text-5xl leading-[0.95] md:text-7xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-black/50">
            {description}
          </p>
        </div>

        <Link
          href="/contact"
          className="group inline-flex w-fit items-center gap-3 rounded-full bg-black px-6 py-4 text-xs text-white"
        >
          Get in touch
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
}
