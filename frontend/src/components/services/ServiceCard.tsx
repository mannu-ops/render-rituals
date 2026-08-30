import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ImagePlaceholder } from "../common";

type Service = {
  slug: string;
  name: string;
  shortDescription?: string;
  description?: string;
  startingPrice?: string;
  coverImage?: string;
  features?: string[];
};

export default function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group grid gap-7 border-t border-black/10 py-8 md:grid-cols-[60px_1fr_1fr_auto] md:items-center"
    >
      <span className="text-[10px] text-black/25">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div>
        <h2 className="font-display text-3xl leading-none md:text-4xl">
          {service.name}
        </h2>
        <p className="mt-3 max-w-md text-sm leading-6 text-black/45">
          {service.shortDescription ?? service.description}
        </p>
      </div>

      <div className="hidden md:block">
        {service.startingPrice && (
          <>
            <p className="label-rituals">Starting from</p>
            <p className="mt-2 text-sm text-black/60">{service.startingPrice}</p>
          </>
        )}
      </div>

      <div className="flex items-center justify-between gap-5 md:block">
        <div className="md:hidden">
          {service.startingPrice && (
            <span className="text-xs text-black/50">{service.startingPrice}</span>
          )}
        </div>
        <ArrowUpRight
          size={18}
          className="text-black/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </div>

      <div className="hidden">
        <ImagePlaceholder src={service.coverImage} alt={service.name} />
      </div>
    </Link>
  );
}
