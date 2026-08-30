import type { SelectHTMLAttributes } from "react";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: SelectOption[];
  error?: string;
};

export default function Select({
  label,
  options,
  error,
  className = "",
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <label htmlFor={selectId} className="block">
      <span className="label-rituals">
        {label}
        {props.required && <span className="ml-1 text-black/30">*</span>}
      </span>

      <select
        {...props}
        id={selectId}
        className={`mt-3 w-full border-b bg-transparent py-3 text-sm outline-none transition-colors focus:border-black/50 ${
          error ? "border-red-500" : "border-black/15"
        } ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <span className="mt-2 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
