"use client";

import { services as defaultServices } from "@/data";
import { useAdminData } from "@/context/AdminDataContext";
import ServiceCard from "./ServiceCard";

export default function ServicesList() {
  const { services: liveServices } = useAdminData();
  const sourceServices = (liveServices && liveServices.length > 0 ? liveServices : defaultServices).filter(
    (s) => s.published !== false
  );

  return (
    <section className="pb-20 md:pb-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="border-b border-black/10">
          {sourceServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
