type StatusType = "published" | "draft" | "new" | "reviewed" | "contacted" | "archived" | string;

export default function StatusBadge({ status }: { status: StatusType }) {
  const styles: Record<string, string> = {
    published: "bg-emerald-100 text-emerald-800 border-emerald-200",
    new: "bg-amber-100 text-amber-800 border-amber-200",
    reviewed: "bg-blue-100 text-blue-800 border-blue-200",
    contacted: "bg-purple-100 text-purple-800 border-purple-200",
    draft: "bg-stone-200 text-stone-700 border-stone-300",
    archived: "bg-stone-100 text-stone-500 border-stone-200",
  };

  const activeStyle = styles[status.toLowerCase()] || "bg-stone-100 text-stone-700 border-stone-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.08em] ${activeStyle}`}
    >
      {status}
    </span>
  );
}
