import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const options = [
  {
    title: "Freelance project",
    text: "For clients who need a defined design or visualization deliverable.",
    href: "/services",
  },
  {
    title: "Design collaboration",
    text: "For studios, architects, brands or teams looking for creative support.",
    href: "/contact",
  },
  {
    title: "Full-time opportunity",
    text: "For companies or recruiters interested in bringing the designer onto their team.",
    href: "/contact",
  },
];

export default function HireOptions() {
  return (
    <section className="border-y border-black/10 py-20 md:py-28">
      <div className="container-rituals grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
        <p className="label-rituals">Ways to work together</p>

        <div className="grid gap-4 md:grid-cols-3">
          {options.map((option) => (
            <article key={option.title} className="border border-black/10 p-6">
              <h3 className="font-display text-3xl leading-none">
                {option.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-black/45">
                {option.text}
              </p>

              <Link
                href={option.href}
                className="group mt-8 inline-flex items-center gap-2 text-xs"
              >
                Learn more
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
