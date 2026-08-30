import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down";
  icon?: LucideIcon;
};

export default function StatCard({
  label,
  value,
  change,
  trend,
  icon: Icon,
}: StatCardProps) {
  return (
    <article className="border border-black/10 bg-white/30 p-6">
      <div className="flex items-start justify-between">
        <p className="text-[9px] uppercase tracking-[0.14em] text-black/35">
          {label}
        </p>
        {Icon && <Icon size={16} className="text-black/30" />}
      </div>

      <p className="font-display mt-8 text-4xl leading-none">{value}</p>

      {change && (
        <div className="mt-5 flex items-center gap-2 text-xs text-black/40">
          {trend === "up" && <TrendingUp size={13} />}
          {trend === "down" && <TrendingDown size={13} />}
          <span>{change}</span>
        </div>
      )}
    </article>
  );
}
