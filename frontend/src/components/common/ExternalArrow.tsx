import { ArrowUpRight } from "lucide-react";

export default function ExternalArrow({ size = 15 }: { size?: number }) {
  return (
    <ArrowUpRight
      size={size}
      aria-hidden="true"
      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    />
  );
}
