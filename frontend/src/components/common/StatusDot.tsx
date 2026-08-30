export default function StatusDot({
  label,
  active = true,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-black/45">
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-emerald-600" : "bg-black/20"
        }`}
      />
      {label}
    </span>
  );
}
