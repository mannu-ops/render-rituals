import { PricingIntro, PricingGrid, PricingNote, PricingTable, PriceEstimator } from "@/components/pricing";
import { pricingPackages } from "@/data";

export const metadata = {
  title: "Pricing — Packages & Estimator",
  description: "Transparent pricing packages and project estimation for interior design, space planning, and 3D visualization.",
};

export default function PricingPage() {
  return (
    <main className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <PricingIntro />
        
        <div className="mt-16">
          <PricingGrid packages={pricingPackages} />
        </div>

        <div className="mt-16">
          <PriceEstimator />
        </div>

        <div className="mt-16">
          <PricingTable />
        </div>

        <div className="mt-12">
          <PricingNote />
        </div>
      </div>
    </main>
  );
}
