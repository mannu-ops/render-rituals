import { Check, Clock3, IndianRupee } from "lucide-react";
import type { Service } from "./ServicesGrid";

export default function ServiceDetails({ service }: { service: Service }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_.65fr]">
      <div>
        <p className="max-w-2xl text-lg leading-8 text-black/60 md:text-xl">
          {service.description}
        </p>

        <div className="mt-12">
          <h2 className="font-display text-3xl">What&apos;s included</h2>
          <ul className="mt-6 divide-y divide-black/10 border-y border-black/10">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-center gap-4 py-4 text-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/5">
                  <Check size={14} />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <aside className="h-fit border border-black/10 p-6 md:p-8">
        <p className="text-[9px] uppercase tracking-[0.18em] text-black/40">
          Project details
        </p>

        <div className="mt-8 space-y-7">
          <div className="flex items-start gap-4">
            <IndianRupee size={17} className="mt-0.5 text-black/45" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-black/40">
                Starting price
              </p>
              <p className="mt-1 text-sm">{service.startingPrice}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Clock3 size={17} className="mt-0.5 text-black/45" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-black/40">
                Typical delivery
              </p>
              <p className="mt-1 text-sm">{service.delivery}</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
