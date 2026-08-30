import type { Service } from "@/types";

export default function ServiceDeliverables({
  service,
}: {
  service: Service;
}) {
  const items = service.deliverables?.length ? service.deliverables : service.features;

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[.5fr_1.5fr]">
          <p className="label-rituals">What you receive</p>

          <div className="border-t border-black/10">
            {items.map((item: string, index: number) => (
              <div
                key={item}
                className="grid grid-cols-[45px_1fr] border-b border-black/10 py-5"
              >
                <span className="text-[10px] text-black/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl md:text-2xl">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
