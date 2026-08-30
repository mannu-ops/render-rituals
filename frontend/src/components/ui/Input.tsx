import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({
  label,
  error,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/[^a-z0-9]+/g, "-") : undefined);

  return (
    <div className="block">
      {label && (
        <label htmlFor={inputId} className="label-rituals">
          {label}
          {props.required && <span className="ml-1 text-[#D49A6A]">*</span>}
        </label>
      )}

      <input
        {...props}
        id={inputId}
        className={`mt-3 w-full border-b bg-transparent py-3 text-sm text-[#F3F4F6] outline-none transition-colors placeholder:text-[#8E98A5]/40 focus:border-[#D49A6A] ${
          error ? "border-red-500" : "border-white/15"
        } ${className}`}
      />

      {error && <span className="mt-2 block text-xs text-red-400">{error}</span>}
    </div>
  );
}

