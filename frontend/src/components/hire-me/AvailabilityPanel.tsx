export default function AvailabilityPanel() {
  return (
    <div className="border border-black/10 bg-[#d9d2c6] p-6 md:p-8">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[#8a9b78]" />
        <span className="text-[9px] uppercase tracking-[0.18em] text-black/50">
          Availability
        </span>
      </div>

      <h2 className="font-display mt-5 text-3xl md:text-4xl">
        Taking on selected projects.
      </h2>

      <p className="mt-3 max-w-lg text-sm leading-6 text-black/50">
        Availability can change with active project schedules. Send your brief
        even if your timeline is still flexible.
      </p>
    </div>
  );
}
