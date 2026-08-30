import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { PricingPackage } from "@/types";

type PricingCardProps = {
  plan: PricingPackage | {
    id?: string;
    slug?: string;
    name: string;
    price: number | string;
    priceLabel?: string;
    subtitle?: string;
    description?: string;
    popular?: boolean;
    features: string[];
  };
};

export default function PricingCard({ plan }: PricingCardProps) {
  const planId = plan.id || (plan as { slug?: string }).slug || plan.name.toLowerCase().replace(/\s+/g, "-");
  const displayPrice = plan.priceLabel || (typeof plan.price === "number" ? `From ₹${plan.price.toLocaleString("en-IN")}` : plan.price);

  return (
    <article
      className={`card-luxury relative flex h-full flex-col rounded-2xl p-6 md:p-8 ${
        plan.popular ? "border-[#D49A6A]/40 shadow-xl" : "border-white/10"
      }`}
    >
      {plan.popular && (
        <span className="absolute right-5 top-5 rounded-full bg-[#D49A6A] px-3 py-1 font-mono-spec text-[9px] uppercase tracking-[0.12em] text-[#14171A] font-semibold">
          Recommended
        </span>
      )}

      <p className="label-rituals">{plan.subtitle || "Starting package"}</p>
      <h2 className="font-display mt-4 text-4xl leading-none text-[#F3F4F6] md:text-5xl">
        {plan.name}
      </h2>

      {plan.description && (
        <p className="mt-4 text-sm leading-relaxed text-[#8E98A5]">{plan.description}</p>
      )}

      <div className="mt-8 border-y border-white/10 py-6">
        <p className="label-rituals">Starting Price</p>
        <p className="font-display mt-2 text-4xl text-[#F3F4F6]">{displayPrice}</p>
      </div>

      <ul className="mt-5 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-xs leading-5 text-[#D1D5DB]">
            <Check size={14} className="mt-0.5 shrink-0 text-[#D49A6A]" />
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href={`/hire-me?package=${planId}`}
        className="group mt-auto flex items-center justify-between pt-9 text-xs font-medium uppercase tracking-[0.1em] text-[#D49A6A] hover:text-[#E5A97C]"
      >
        <span>Request a quote</span>
        <ArrowUpRight
          size={15}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </Link>
    </article>
  );
}
