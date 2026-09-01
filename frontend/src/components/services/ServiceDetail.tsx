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
          <h1 className="font-display mt-8 text-3xl sm:text-4xl text-[#F3F4F6]">
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
    <article className="pt-24 md:pt-32 bg-[#14171A] text-[#F3F4F6]">
      <div className="container-rituals">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#8E98A5] hover:text-[#D49A6A]"
        >
          <ArrowLeft size={13} />
          All services
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <p className="label-rituals">{service.category}</p>
            <h1 className="font-display mt-3.5 text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#F3F4F6]">
              {service.title}
            </h1>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#8E98A5]">
            {service.description}
          </p>
        </div>

        {service.coverImage && (
          <div className="mt-10 sm:mt-12 overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#1E2227]">
            <img
              src={service.coverImage}
              alt={service.title}
              className="aspect-[16/8] max-h-[500px] w-full object-cover"
            />
          </div>
        )}

        <div className="grid gap-8 py-14 md:grid-cols-[.45fr_1.55fr] md:py-20 border-t border-white/10 mt-12">
          <div>
            <p className="label-rituals">What&apos;s included</p>
            <div className="mt-6">
              <p className="label-rituals">Starting from</p>
              <p className="font-display mt-1.5 text-2xl sm:text-3xl font-semibold text-[#D49A6A]">{service.price || service.startingPrice}</p>
            </div>
          </div>

          <div>
            <ul className="border-t border-white/10">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-3 border-b border-white/10 py-4 text-xs sm:text-sm text-[#D1D5DB]"
                >
                  <Check size={16} className="mt-0.5 shrink-0 text-[#D49A6A]" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/#contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#D49A6A] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#14171A] hover:bg-[#E5A97C]"
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
