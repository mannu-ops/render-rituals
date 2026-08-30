import { CircleHelp } from "lucide-react";

const notes = [
  "Displayed prices are starting prices, not fixed project quotes.",
  "Final pricing depends on scope, area, complexity, deliverables and timeline.",
  "Additional revisions, urgent timelines or extra deliverables may change the quote.",
  "A custom package can be prepared when a project needs a different combination of services.",
];

export default function PricingNotes() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-rituals grid gap-10 lg:grid-cols-[.5fr_1.5fr]">
        <div className="flex items-start gap-3">
          <CircleHelp size={17} className="mt-0.5 text-black/35" />
          <p className="label-rituals">Good to know</p>
        </div>

        <div className="border-t border-black/10">
          {notes.map((note, index) => (
            <div
              key={note}
              className="grid grid-cols-[35px_1fr] gap-4 border-b border-black/10 py-5"
            >
              <span className="text-[10px] text-black/30">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="max-w-2xl text-sm leading-7 text-black/55">
                {note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
