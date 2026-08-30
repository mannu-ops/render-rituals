import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AboutPreview() {
  return (
    <section className="py-24 md:py-36">
      <div className="container-rituals grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">
            About Me
          </p>
          <div className="mt-7 aspect-[4/5] overflow-hidden bg-[#dedbd2]">
            <img
              src="https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=1000&q=85"
              alt="Interior design workspace"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <p className="font-display max-w-4xl text-4xl leading-[1.05] tracking-tight md:text-6xl">
            I believe good interiors are not simply beautiful. They make life
            easier, feel natural to inhabit, and tell a quiet story about the
            people who use them.
          </p>
          <p className="mt-8 max-w-xl text-sm leading-7 text-black/55">
            I&apos;m Nikita Singh, an Interior Designer with experience across
            residential, commercial and architectural work — from early space
            planning to detailed visualization and technical documentation.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.16em]"
          >
            More About Me <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
