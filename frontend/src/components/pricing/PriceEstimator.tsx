"use client";

import { useMemo, useState } from "react";
import { formatINR } from "@/lib/utils";
import { services } from "@/data";

export default function PriceEstimator() {
  const [serviceId, setServiceId] = useState(services[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);

  const service = services.find((item) => item.id === serviceId);

  const estimate = useMemo(() => {
    if (!service) return 0;
    const priceStr = service.startingPrice || service.price || "0";
    const basePrice = parseInt(priceStr.replace(/[^0-9]/g, ""), 10) || 3500;
    return basePrice * Math.max(1, quantity);
  }, [service, quantity]);

  return (
    <section className="bg-[#181B1F] py-20 md:py-28 rounded-3xl border border-white/10 my-10">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
        <div>
          <p className="label-rituals">Quick estimate</p>
          <h2 className="font-display mt-4 text-5xl leading-[0.9] md:text-6xl text-[#F3F4F6]">
            Get a rough <span className="italic text-[#D49A6A]">starting number</span>.
          </h2>
        </div>

        <div className="border border-white/10 bg-[#1E2227] rounded-2xl p-6 md:p-8 shadow-xl">
          <label className="block">
            <span className="label-rituals">Service</span>
            <select
              value={serviceId}
              onChange={(event) => setServiceId(event.target.value)}
              className="mt-3 w-full border-b border-white/15 bg-transparent py-3 text-sm text-[#F3F4F6] outline-none cursor-pointer focus:border-[#D49A6A]"
            >
              {services.map((item) => (
                <option key={item.id} value={item.id} className="bg-[#1E2227] text-[#F3F4F6]">
                  {item.title} ({item.price})
                </option>
              ))}
            </select>
          </label>

          <label className="mt-7 block">
            <span className="label-rituals">Units / views / room count</span>
            <input
              type="number"
              min={1}
              max={20}
              value={quantity}
              onChange={(event) =>
                setQuantity(Math.max(1, Number(event.target.value) || 1))
              }
              className="mt-3 w-full border-b border-white/15 bg-transparent py-3 text-sm text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
            />
          </label>

          <div className="mt-8 border-t border-white/10 pt-7">
            <p className="label-rituals">Estimated from</p>
            <p className="font-display mt-2 text-4xl text-[#D49A6A] font-semibold">{formatINR(estimate)}</p>
            <p className="mt-2 text-xs leading-relaxed text-[#8E98A5]">
              This is only a planning estimate. A final quote is prepared after
              reviewing your specific project brief.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
