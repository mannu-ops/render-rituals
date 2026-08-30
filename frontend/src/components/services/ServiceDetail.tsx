import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { services } from "@/data";

export default function ServiceDetail({ slug }: { slug: string }) {
  const service = services.find((item) => item.slug === slug || item.id === slug);

  if (!service) {
    return (
      <section className="pt-36 pb-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs text-black/45"
          >
            <ArrowLeft size={14} />
            Back to services
          </Link>
          <h1 className="font-display mt-14 text-6xl leading-none md:text-8xl">
            Service not found.
          </h1>
        </div>
      </section>
    );
  }

  const features = service.features ?? [
    "Discovery and requirement review",
    "Design direction and references",
    "Structured project deliverables",
    "Professional communication",
    "Revision stage",
  ];

  return (
    <article className="pt-32 md:pt-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-black/40 hover:text-black"
        >
          <ArrowLeft size={13} />
          All services
        </Link>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <p className="label-rituals">{service.category}</p>
            <h1 className="font-display mt-5 text-6xl leading-[0.82] md:text-8xl">
              {service.title}
            </h1>
          </div>

          <p className="max-w-md text-sm leading-7 text-black/50">
            {service.description}
          </p>
        </div>

        {service.coverImage && (
          <div className="mt-14 overflow-hidden bg-[#dedbd2]">
            <img
              src={service.coverImage}
              alt={service.title}
              className="aspect-[16/8] w-full object-cover"
            />
          </div>
        )}

        <div className="grid gap-12 py-20 md:grid-cols-[.55fr_1.45fr] md:py-28">
          <div>
            <p className="label-rituals">What&apos;s included</p>
            <div className="mt-8">
              <p className="label-rituals">Starting from</p>
              <p className="font-display mt-2 text-3xl">{service.price || service.startingPrice}</p>
            </div>
          </div>

          <div>
            <ul className="border-t border-black/10">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-4 border-b border-black/10 py-5 text-sm text-black/65"
                >
                  <Check size={16} className="mt-0.5 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/hire-me"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#171717] px-5 py-3.5 text-xs text-white"
            >
              Request this service
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
