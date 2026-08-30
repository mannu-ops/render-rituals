import type { InputHTMLAttributes } from "react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function Checkbox({
  label,
  className = "",
  ...props
}: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-xs leading-6 text-black/55">
      <input
        {...props}
        type="checkbox"
        className={`mt-1 h-4 w-4 accent-black ${className}`}
      />
      <span>{label}</span>
    </label>
  );
}
