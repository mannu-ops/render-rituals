"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  ArrowRight,
  KeyRound,
  Eye,
  EyeOff,
  Mail,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  X,
  AlertCircle,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import { api } from "@/services/api";

export default function AdminLoginPage() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forgot Password Modal States
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState<"request" | "verify" | "success">("request");
  const [adminEmailInput, setAdminEmailInput] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");
  const [targetEmail, setTargetEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPasscode, setNewPasscode] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccessMsg, setForgotSuccessMsg] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  const router = useRouter();
  const { login, authenticateDirectly, isAuthenticated } = useAdminData();

  // If already authenticated, redirect safely inside useEffect
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  // Resend OTP countdown timer
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setInterval(() => {
      setResendCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCountdown]);

  // Standard Login Submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const success = await login(passcode);
      if (success) {
        router.push("/admin");
      } else {
        setError("Invalid Passcode. Please check and try again.");
        setIsSubmitting(false);
      }
    } catch {
      setError("Authentication error. Please check server connection.");
      setIsSubmitting(false);
    }
  };

  // Step 1: Send OTP to Admin Email
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setForgotLoading(true);
    setForgotError("");
    setForgotSuccessMsg("");

    try {
      const res = await api.requestPasswordResetOtp(adminEmailInput.trim() || undefined);
      if (res && res.success) {
        setMaskedEmail(res.maskedEmail || "registered admin email");
        setTargetEmail(res.targetEmail || adminEmailInput);
        setForgotSuccessMsg(`Verification code sent to ${res.maskedEmail || "your email"}`);
        setForgotStep("verify");
        setResendCountdown(60);
      } else {
        setForgotError(res?.message || "Failed to send reset code. Please check SMTP configuration.");
      }
    } catch (err: any) {
      setForgotError(err?.message || "Connection error. Make sure the backend server is running.");
    } finally {
      setForgotLoading(false);
    }
  };

  // Step 2: Verify OTP and Reset Passcode
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotError("");

    if (otpCode.trim().length !== 6) {
      setForgotError("Please enter the complete 6-digit OTP code.");
      setForgotLoading(false);
      return;
    }

    if (newPasscode.length < 4) {
      setForgotError("New passcode must be at least 4 characters long.");
      setForgotLoading(false);
      return;
    }

    if (newPasscode !== confirmPasscode) {
      setForgotError("New passcodes do not match.");
      setForgotLoading(false);
      return;
    }

    try {
      const res = await api.resetPasswordWithOtp({
        email: targetEmail,
        otp: otpCode.trim(),
        newPasscode: newPasscode,
      });

      if (res && res.success) {
        // Update auth state in context
        authenticateDirectly(res.token, newPasscode);
        setForgotStep("success");
        setTimeout(() => {
          setIsForgotModalOpen(false);
          router.push("/admin");
        }, 1800);
      } else {
        setForgotError(res?.message || "Failed to reset passcode. Invalid OTP.");
      }
    } catch (err: any) {
      setForgotError(err?.message || "Failed to reset passcode. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  const openForgotModal = () => {
    setIsForgotModalOpen(true);
    setForgotStep("request");
    setForgotError("");
    setForgotSuccessMsg("");
    setOtpCode("");
    setNewPasscode("");
    setConfirmPasscode("");
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

          {/* Login Form */}
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="passcode"
                  className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB]"
                >
                  Studio Master Passcode
                </label>
                <button
                  type="button"
                  onClick={openForgotModal}
                  className="font-mono-spec text-[10px] text-[#D49A6A] hover:text-[#E5A97C] transition-colors underline-offset-2 hover:underline cursor-pointer"
                >
                  Forgot Passcode?
                </button>
              </div>

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

          {/* Quick Action Footer */}
          <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between">
            <p className="font-mono-spec text-[10px] text-[#8E98A5]">
              Default PIN: <code className="rounded bg-black/40 px-1.5 py-0.5 text-[#D49A6A]">nikita2026</code>
            </p>
            <button
              type="button"
              onClick={openForgotModal}
              className="font-mono-spec text-[10px] text-[#8E98A5] hover:text-[#D49A6A] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw size={11} />
              <span>Reset via OTP</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* FORGOT PASSWORD MODAL (EMAIL OTP VERIFICATION & RESET)        */}
      {/* ============================================================ */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-[#D49A6A]/30 bg-[#1A1E24] p-6 sm:p-8 shadow-2xl">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsForgotModalOpen(false)}
              className="absolute right-5 top-5 rounded-full p-2 text-[#8E98A5] transition-colors hover:bg-white/5 hover:text-[#F3F4F6] cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D49A6A]/30 bg-[#D49A6A]/10 text-[#D49A6A]">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#F3F4F6]">Reset Admin Passcode</h3>
                <p className="text-xs text-[#8E98A5]">Secure verification via Admin Email OTP</p>
              </div>
            </div>

            {/* Error Message */}
            {forgotError && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
                <AlertCircle size={15} className="shrink-0" />
                <span>{forgotError}</span>
              </div>
            )}

            {/* ============================================== */}
            {/* STEP 1: REQUEST OTP CODE                        */}
            {/* ============================================== */}
            {forgotStep === "request" && (
              <div className="mt-6 space-y-4">
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Click below to receive a 6-digit security OTP on the registered studio admin email to verify your identity.
                </p>

                <div className="rounded-2xl border border-white/10 bg-[#14171A] p-3.5 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#8E98A5]">
                    <Mail size={14} className="text-[#D49A6A]" />
                    <span>Registered Admin Notification Email</span>
                  </div>
                  <input
                    type="email"
                    value={adminEmailInput}
                    onChange={(e) => setAdminEmailInput(e.target.value)}
                    placeholder="temp83725@gmail.com (Leave blank for default)"
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-xs text-[#F3F4F6] placeholder-[#6B7280] outline-none focus:border-[#D49A6A]"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={forgotLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#D49A6A] py-3.5 text-xs font-bold uppercase tracking-wider text-[#14171A] shadow-lg shadow-[#D49A6A]/20 transition-all hover:bg-[#E5A97C] active:scale-[0.98] cursor-pointer disabled:opacity-50"
                >
                  {forgotLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#14171A] border-t-transparent" />
                  ) : (
                    <>
                      <Mail size={15} />
                      <span>Send 6-Digit Security OTP</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* ============================================== */}
            {/* STEP 2: ENTER OTP & NEW PASSCODE                */}
            {/* ============================================== */}
            {forgotStep === "verify" && (
              <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
                {forgotSuccessMsg && (
                  <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-400">
                    <CheckCircle2 size={15} className="shrink-0" />
                    <span>{forgotSuccessMsg}</span>
                  </div>
                )}

                {/* OTP Input */}
                <div>
                  <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1.5">
                    Enter 6-Digit Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="123456"
                    required
                    autoFocus
                    className="w-full rounded-2xl border border-[#D49A6A]/40 bg-[#14171A] py-3 text-center font-mono text-2xl font-bold tracking-[8px] text-[#D49A6A] placeholder-[#6B7280] outline-none focus:border-[#D49A6A] focus:ring-1 focus:ring-[#D49A6A]"
                  />
                </div>

                {/* New Passcode */}
                <div>
                  <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1.5">
                    New Master Passcode
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPasscode}
                      onChange={(e) => setNewPasscode(e.target.value)}
                      placeholder="At least 4 characters..."
                      required
                      className="w-full rounded-2xl border border-white/10 bg-[#14171A] py-3 pl-4 pr-10 text-xs text-[#F3F4F6] placeholder-[#8E98A5] outline-none focus:border-[#D49A6A]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#8E98A5] hover:text-[#F3F4F6] cursor-pointer"
                    >
                      {showNewPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Confirm New Passcode */}
                <div>
                  <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1.5">
                    Confirm New Passcode
                  </label>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={confirmPasscode}
                    onChange={(e) => setConfirmPasscode(e.target.value)}
                    placeholder="Re-type new passcode..."
                    required
                    className="w-full rounded-2xl border border-white/10 bg-[#14171A] py-3 px-4 text-xs text-[#F3F4F6] placeholder-[#8E98A5] outline-none focus:border-[#D49A6A]"
                  />
                </div>

                {/* Resend & Actions */}
                <div className="flex items-center justify-between pt-1">
                  {resendCountdown > 0 ? (
                    <span className="font-mono-spec text-[10px] text-[#8E98A5]">
                      Resend code in <strong className="text-[#D49A6A]">{resendCountdown}s</strong>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={forgotLoading}
                      className="font-mono-spec text-[10px] text-[#D49A6A] hover:underline cursor-pointer"
                    >
                      Resend Code
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setForgotStep("request")}
                    className="font-mono-spec text-[10px] text-[#8E98A5] hover:text-[#F3F4F6] cursor-pointer"
                  >
                    Change Email
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#D49A6A] py-3.5 text-xs font-bold uppercase tracking-wider text-[#14171A] shadow-lg shadow-[#D49A6A]/20 transition-all hover:bg-[#E5A97C] active:scale-[0.98] cursor-pointer disabled:opacity-50"
                >
                  {forgotLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#14171A] border-t-transparent" />
                  ) : (
                    <>
                      <KeyRound size={15} />
                      <span>Verify & Reset Passcode</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ============================================== */}
            {/* STEP 3: SUCCESS STATE                           */}
            {/* ============================================== */}
            {forgotStep === "success" && (
              <div className="mt-6 flex flex-col items-center py-6 text-center space-y-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-base font-bold text-[#F3F4F6]">Passcode Reset Successfully!</h4>
                <p className="text-xs text-[#9CA3AF]">
                  Your new master passcode is active. Redirecting to studio dashboard...
                </p>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#D49A6A] border-t-transparent mt-2" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
