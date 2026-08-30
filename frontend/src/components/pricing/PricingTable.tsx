import { pricingPackages } from "@/data";

export default function PricingTable() {
  return (
    <section className="border-y border-white/10 py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-10">
          <p className="label-rituals">At a glance</p>
          <h2 className="font-display mt-4 text-5xl leading-none text-[#F3F4F6] md:text-7xl">
            Compare <span className="italic text-[#D49A6A]">scopes</span>.
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-y border-white/10">
                <th className="py-4 pr-6 font-mono-spec text-[9px] font-normal uppercase tracking-[0.14em] text-[#8E98A5]">
                  Package
                </th>
                <th className="py-4 pr-6 font-mono-spec text-[9px] font-normal uppercase tracking-[0.14em] text-[#8E98A5]">
                  Starting Price
                </th>
                <th className="py-4 pr-6 font-mono-spec text-[9px] font-normal uppercase tracking-[0.14em] text-[#8E98A5]">
                  Scope Overview
                </th>
              </tr>
            </thead>

            <tbody>
              {pricingPackages.map((plan) => (
                <tr key={plan.id} className="border-b border-white/10 hover:bg-white/[0.02] transition-colors">
                  <td className="py-5 pr-6 font-display text-xl text-[#F3F4F6]">{plan.name}</td>
                  <td className="py-5 pr-6 text-sm text-[#D49A6A] font-semibold">{plan.priceLabel}</td>
                  <td className="py-5 pr-6 text-sm text-[#8E98A5]">{plan.description || plan.subtitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
