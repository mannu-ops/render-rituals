import { ReactNode } from "react";

export type AdminTableColumn<T> = {
  key: string;
  label: string;
  render: (row: T) => ReactNode;
};

type AdminTableProps<T> = {
  columns: AdminTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T, index: number) => string;
  emptyMessage?: string;
};

export default function AdminTable<T>({
  columns,
  rows,
  getRowKey,
  emptyMessage = "Nothing to show yet.",
}: AdminTableProps<T>) {
  if (!rows.length) {
    return (
      <div className="py-12 text-center text-sm text-black/40">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[680px] border-collapse text-left">
        <thead>
          <tr className="border-b border-black/10">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-[9px] font-normal uppercase tracking-[0.13em] text-black/35 first:pl-0"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr
              key={getRowKey(row, index)}
              className="border-b border-black/5 last:border-0"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-4 py-4 text-xs text-black/60 first:pl-0"
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
