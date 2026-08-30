export default function AvailabilityBadge({
  text = "Currently accepting selected projects",
}: {
  text?: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-2 text-[9px] uppercase tracking-[0.14em] text-black/50">
      <span className="h-1.5 w-1.5 rounded-full bg-[#8a9b78]" />
      {text}
    </div>
  );
}
