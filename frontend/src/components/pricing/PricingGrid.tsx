import { pricingPackages } from "@/data";
import PricingCard from "./PricingCard";
import { PricingPackage } from "@/types";

export default function PricingGrid({
  packages = pricingPackages,
}: {
  packages?: PricingPackage[];
}) {
  return (
    <section className="pb-20 md:pb-28">
      <div className="mx-auto max-w-[1440px] grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <PricingCard key={pkg.id} plan={pkg} />
        ))}
      </div>
    </section>
  );
}
