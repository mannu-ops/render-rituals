import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ServiceCTA() {
  return (
    <div className="border border-black/10 bg-[#d9d2c6] p-7 md:p-10">
      <p className="text-[10px] uppercase tracking-[0.2em] text-black/45">
        Ready when you are
      </p>
      <h2 className="font-display mt-4 max-w-2xl text-4xl leading-none md:text-6xl">
        Tell me what you&apos;re imagining.
      </h2>
      <Link
        href="/hire-me"
        className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#171717] px-5 py-3.5 text-sm text-white"
      >
        Get a Project Quote
        <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
