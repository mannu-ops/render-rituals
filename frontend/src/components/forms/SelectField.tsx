import { SelectHTMLAttributes } from "react";

type SelectFieldProps = {
  label: string;
  options: readonly string[];
  error?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "children">;

export default function SelectField({
  label,
  options,
  error,
  id,
  ...props
}: SelectFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <label
        htmlFor={fieldId}
        className="mb-2 block font-mono-spec text-[10px] uppercase tracking-[0.14em] text-[#8E98A5]"
      >
        {label}
      </label>

      <select
        id={fieldId}
        {...props}
        className={[
          "w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-[#F3F4F6] outline-none focus:border-[#D49A6A] cursor-pointer",
          error ? "border-red-400" : "",
          props.className ?? "",
        ].join(" ")}
      >
        <option value="" className="bg-[#1E2227] text-[#8E98A5]">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-[#1E2227] text-[#F3F4F6]">
            {option}
          </option>
        ))}
      </select>

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
