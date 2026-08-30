"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-auto bg-[#f4f1eb] p-6 md:p-9">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-5 top-5 rounded-full p-2 text-black/45 transition-colors hover:bg-black/5 hover:text-black"
        >
          <X size={18} />
        </button>

        {title && (
          <h2 className="font-display pr-10 text-3xl leading-none md:text-4xl">
            {title}
          </h2>
        )}

        <div className={title ? "mt-8" : ""}>{children}</div>
      </div>
    </div>
  );
}
