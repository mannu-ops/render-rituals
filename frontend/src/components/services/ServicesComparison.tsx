import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/data";

export default function ServicesComparison() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-10">
          <p className="label-rituals">Quick comparison</p>
          <h2 className="font-display mt-4 text-5xl leading-none md:text-7xl">
            Pick the right starting point.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.slice(0, 3).map((service) => (
            <article
              key={service.id}
              className="flex flex-col border border-black/10 p-6 md:p-7"
            >
              <p className="label-rituals">{service.category}</p>
              <h3 className="font-display mt-5 text-3xl">{service.title}</h3>
              <p className="mt-3 min-h-14 text-sm leading-6 text-black/45">
                {service.shortDescription || service.description}
              </p>

              <div className="mt-7 border-t border-black/10 pt-5">
                {(service.features ?? []).slice(0, 4).map((feature) => (
                  <div
                    key={feature}
                    className="flex gap-2 py-2 text-xs text-black/55"
                  >
                    <Check size={14} className="mt-0.5 shrink-0 text-black/40" />
                    {feature}
                  </div>
                ))}
              </div>

              <Link
                href={`/services`}
                className="group mt-auto inline-flex items-center gap-2 pt-7 text-xs font-medium uppercase tracking-[0.1em]"
              >
                View details
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
