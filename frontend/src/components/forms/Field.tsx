import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  error?: string;
  hint?: string;
};

export function Field({
  label,
  error,
  hint,
  id,
  ...props
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <label
        htmlFor={fieldId}
        className="mb-2 block font-mono-spec text-[10px] uppercase tracking-[0.14em] text-[#8E98A5]"
      >
        {label}
      </label>

      <input
        id={fieldId}
        {...props}
        className={[
          "w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-[#F3F4F6] outline-none transition-colors placeholder:text-[#8E98A5]/40 focus:border-[#D49A6A]",
          error ? "border-red-400" : "",
          props.className ?? "",
        ].join(" ")}
      />

      {error ? (
        <p className="mt-2 text-xs text-red-400">{error}</p>
      ) : hint ? (
        <p className="mt-2 text-xs text-[#8E98A5]/60">{hint}</p>
      ) : null}
    </div>
  );
}

export function TextareaField({
  label,
  error,
  hint,
  id,
  ...props
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <label
        htmlFor={fieldId}
        className="mb-2 block font-mono-spec text-[10px] uppercase tracking-[0.14em] text-[#8E98A5]"
      >
        {label}
      </label>

      <textarea
        id={fieldId}
        rows={4}
        {...props}
        className={[
          "w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-[#F3F4F6] leading-relaxed outline-none transition-colors placeholder:text-[#8E98A5]/40 focus:border-[#D49A6A]",
          error ? "border-red-400" : "",
          props.className ?? "",
        ].join(" ")}
      />

      {error ? (
        <p className="mt-2 text-xs text-red-400">{error}</p>
      ) : hint ? (
        <p className="mt-2 text-xs text-[#8E98A5]/60">{hint}</p>
      ) : null}
    </div>
  );
}

export default Field;
