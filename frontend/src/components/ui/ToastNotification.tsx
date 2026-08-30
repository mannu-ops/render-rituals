"use client";

import { CheckCircle2, AlertCircle, Info, Sparkles, X } from "lucide-react";

export interface ToastItem {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message?: string;
  duration?: number;
}

interface ToastNotificationProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export default function ToastNotification({ toasts, onDismiss }: ToastNotificationProps) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-[99999] flex flex-col gap-3 pointer-events-none max-w-md w-full px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isError = toast.type === "error";

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start justify-between gap-3.5 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl transition-all border animate-in slide-in-from-top-3 duration-300 ${
              isSuccess
                ? "bg-[#1E2227]/95 border-[#D49A6A]/40 text-[#F3F4F6] shadow-[0_10px_35px_rgba(212,154,106,0.15)]"
                : isError
                ? "bg-[#1E2227]/95 border-rose-500/40 text-[#F3F4F6] shadow-[0_10px_35px_rgba(239,68,68,0.15)]"
                : "bg-[#1E2227]/95 border-white/20 text-[#F3F4F6]"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  isSuccess
                    ? "bg-[#D49A6A]/15 border border-[#D49A6A]/40 text-[#D49A6A]"
                    : isError
                    ? "bg-rose-500/15 border border-rose-500/40 text-rose-400"
                    : "bg-white/10 text-white"
                }`}
              >
                {isSuccess ? <Sparkles size={18} /> : isError ? <AlertCircle size={18} /> : <Info size={18} />}
              </div>

              <div>
                <h4 className="font-display text-sm font-semibold text-[#F3F4F6] leading-tight">
                  {toast.title}
                </h4>
                {toast.message && (
                  <p className="text-xs text-[#8E98A5] mt-1 leading-relaxed">
                    {toast.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="text-[#8E98A5] hover:text-[#F3F4F6] transition-colors p-1 shrink-0 rounded-lg hover:bg-white/5 cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
