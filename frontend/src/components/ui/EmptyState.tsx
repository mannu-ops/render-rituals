import { SearchX } from "lucide-react";

export default function EmptyState({
  title = "Nothing here yet",
  description = "This section will be populated from the admin panel.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center border border-dashed border-black/10 px-6 text-center">
      <SearchX size={24} strokeWidth={1.2} className="text-black/30" />
      <h3 className="font-display mt-5 text-2xl">{title}</h3>
      <p className="mt-2 max-w-sm text-xs leading-6 text-black/40">
        {description}
      </p>
    </div>
  );
}
