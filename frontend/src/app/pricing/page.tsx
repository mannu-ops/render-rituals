import { PricingIntro, PricingGrid, PricingNote, PricingTable, PriceEstimator } from "@/components/pricing";
import { pricingPackages } from "@/data";

export const metadata = {
  title: "Pricing — Packages & Estimator",
  description: "Transparent pricing packages and project estimation for interior design, space planning, and 3D visualization.",
};

export default function PricingPage() {
  return (
    <main className="py-14 sm:py-18 md:py-20 bg-[#14171A] text-[#F3F4F6]">
      <div className="container-rituals space-y-12 sm:space-y-16">
        <PricingIntro />
        
        <div>
          <PricingGrid packages={pricingPackages} />
        </div>

        <div>
          <PriceEstimator />
        </div>

        <div>
          <PricingTable />
        </div>

        <div>
          <PricingNote />
        </div>
      </div>
    </main>
  );
}
