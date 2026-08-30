import { ReactNode } from "react";

export type Column<T> = {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
};

export default function DataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = "No items found.",
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="border border-black/10 p-12 text-center text-sm text-black/45">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-black/10 bg-white">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-black/10 bg-[#f4f1eb]">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`px-4 py-3.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/50 ${
                  col.className || ""
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5">
          {data.map((item) => (
            <tr key={keyExtractor(item)} className="hover:bg-black/[0.02]">
              {columns.map((col, idx) => (
                <td key={idx} className={`px-4 py-4 ${col.className || ""}`}>
                  {col.cell
                    ? col.cell(item)
                    : col.accessorKey
                    ? String(item[col.accessorKey] ?? "")
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
