"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

type AdminModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export default function AdminModal({
  open,
  onClose,
  title,
  children,
}: AdminModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-black/10 bg-[#f7f6f2] p-6 shadow-2xl md:p-8">
        <div className="flex items-center justify-between border-b border-black/10 pb-4">
          <h2 className="font-display text-2xl">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-black/50 hover:bg-black/5 hover:text-black"
          >
            <X size={18} />
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
