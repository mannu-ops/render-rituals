import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "Nothing here yet",
  description = "Content will appear here once it has been added.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center border border-dashed border-black/10 px-6 text-center">
      <Inbox size={22} strokeWidth={1.2} className="text-black/25" />
      <h3 className="font-display mt-5 text-2xl">{title}</h3>
      <p className="mt-2 max-w-md text-xs leading-6 text-black/40">
        {description}
      </p>
    </div>
  );
}
