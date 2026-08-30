"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, Sparkles, KeyRound, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";

export default function AdminLoginPage() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated } = useAdminData();

  // If already authenticated, redirect safely inside useEffect
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    setTimeout(() => {
      const success = login(passcode);
      if (success) {
        router.push("/admin");
      } else {
        setError("Invalid Passcode. Please check and try again.");
        setIsSubmitting(false);
      }
    }, 400);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#14171A] p-4 text-[#F3F4F6] relative overflow-hidden">
      {/* Warm Ambient Glows */}
      <div className="pointer-events-none absolute -top-32 right-1/4 h-[450px] w-[450px] rounded-full bg-[#D49A6A]/15 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-[450px] w-[450px] rounded-full bg-[#8E98A5]/10 blur-[140px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-white/15 bg-[#1E2227]/90 p-7 sm:p-9 shadow-2xl backdrop-blur-2xl">
          {/* Top Brand & Security Icon */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D49A6A]/30 bg-[#D49A6A]/15 text-[#D49A6A] shadow-lg shadow-[#D49A6A]/10">
              <KeyRound size={26} />
            </div>

            <span className="font-mono-spec mt-4 text-[10px] uppercase tracking-widest text-[#D49A6A]">
              Render Rituals Studio
            </span>
            <h1 className="font-display mt-1 text-2xl sm:text-3xl font-semibold text-[#F3F4F6]">
              Admin Control Center
            </h1>
            <p className="mt-2 text-xs text-[#8E98A5] leading-relaxed">
              Enter your master studio passcode to manage projects, services, leads, and website settings.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="passcode"
                className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1.5"
              >
                Studio Master Passcode
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8E98A5]">
                  <Lock size={16} />
                </div>
                <input
                  id="passcode"
                  type={showPassword ? "text" : "password"}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter passcode..."
                  required
                  autoFocus
                  className="w-full rounded-2xl border border-white/10 bg-[#14171A] py-3.5 pl-10 pr-11 text-sm text-[#F3F4F6] placeholder-[#8E98A5] outline-none transition-all focus:border-[#D49A6A] focus:ring-1 focus:ring-[#D49A6A]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#8E98A5] hover:text-[#F3F4F6] cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {error && (
                <p className="font-mono-spec mt-2 text-[11px] text-[#EF4444] animate-shake">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D49A6A] py-3.5 text-xs font-bold uppercase tracking-wider text-[#14171A] shadow-lg shadow-[#D49A6A]/20 transition-all hover:bg-[#E5A97C] active:scale-[0.98] cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#14171A] border-t-transparent" />
              ) : (
                <>
                  <span>Unlock Studio Dashboard</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          {/* Helper Hint */}
          <div className="mt-6 border-t border-white/10 pt-4 text-center">
            <p className="font-mono-spec text-[10px] text-[#8E98A5]">
              Default PIN: <code className="rounded bg-black/40 px-1.5 py-0.5 text-[#D49A6A]">nikita2026</code> (Changeable in Settings)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
