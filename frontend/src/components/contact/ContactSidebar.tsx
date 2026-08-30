import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ContactSidebar() {
  return (
    <div className="space-y-12">
      <div>
        <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">
          What happens next?
        </p>
        <ol className="mt-6 space-y-6">
          {[
            ["01", "You send the brief", "Share your project, requirements and approximate budget."],
            ["02", "We discuss it", "I review the scope and get in touch to understand the project better."],
            ["03", "You receive a quote", "The final scope, deliverables, timeline and price are agreed before starting."],
          ].map(([number, title, description]) => (
            <li key={number} className="flex gap-4">
              <span className="pt-1 text-[10px] text-black/30">{number}</span>
              <div>
                <h3 className="font-display text-xl">{title}</h3>
                <p className="mt-1 text-xs leading-6 text-black/45">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="border border-black/10 bg-[#d9d2c6] p-6">
        <p className="text-[9px] uppercase tracking-[0.18em] text-black/40">
          Prefer email?
        </p>
        <p className="font-display mt-3 text-2xl">
          hello@renderrituals.com
        </p>
        <Link
          href="mailto:hello@renderrituals.com"
          className="group mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em]"
        >
          Write an email
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}
