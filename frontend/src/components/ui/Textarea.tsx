import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export default function Textarea({
  label,
  error,
  className = "",
  id,
  ...props
}: TextareaProps) {
  const textareaId =
    id ?? label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <label htmlFor={textareaId} className="block">
      <span className="label-rituals">
        {label}
        {props.required && <span className="ml-1 text-[#D49A6A]">*</span>}
      </span>

      <textarea
        {...props}
        id={textareaId}
        className={`mt-3 w-full resize-y border-b bg-transparent py-3 text-sm text-[#F3F4F6] leading-7 outline-none transition-colors placeholder:text-[#8E98A5]/40 focus:border-[#D49A6A] ${
          error ? "border-red-500" : "border-white/15"
        } ${className}`}
      />

      {error && <span className="mt-2 block text-xs text-red-400">{error}</span>}
    </label>
  );
}
