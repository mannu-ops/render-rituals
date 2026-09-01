"use client";

import {
  ArrowUpRight,
  Sparkles,
  Mail,
  Clock,
  MessageSquare,
  PhoneCall,
  Send,
  CheckCircle2,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";
import { api } from "@/services/api";

export default function HomeCTA() {
  const { addInquiry, settings } = useAdminData();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lastSubmitted, setLastSubmitted] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "3D Visualization & Interior Architecture",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      service: formData.service,
      message: formData.message.trim(),
    };

    try {
      const res = await api.createInquiry(payload);

      if (res && (res.success || res.inquiry)) {
        // Also update local React state
        addInquiry(payload);
        setLastSubmitted(payload);
        setShowSuccessModal(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "3D Visualization & Interior Architecture",
          message: "",
        });
      } else {
        setSubmitError("Could not submit your project brief right now. Please try again or message directly on WhatsApp.");
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      setSubmitError("Network connection interrupted. Please try again or click the WhatsApp button below.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-[#0F1113] py-16 sm:py-20 lg:py-24 text-[#F3F4F6] border-t border-white/10">
      {/* Ambient Lighting Flares */}
      <div className="pointer-events-none absolute -top-32 right-1/4 h-[500px] w-[500px] rounded-full bg-[#D49A6A]/15 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-[500px] w-[500px] rounded-full bg-[#8E98A5]/10 blur-[140px]" />

      <div className="container-rituals relative z-10">
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D49A6A]" />
          <span className="label-rituals text-[#D49A6A]">Start Your Project</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
          {/* Left Column: Heading & Direct Channels */}
          <div>
            <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.08] tracking-tight text-[#F3F4F6]">
              Let&apos;s bring your <span className="italic text-[#D49A6A]">dream space</span> to life.
            </h2>
            <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-[#8E98A5]">
              Whether you are planning a new home interior, renovating a room, or require 4K 3D visualization for client presentations — share your requirements below for a clear proposal and timeline.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={`https://wa.me/${(settings.whatsapp || "919305308296").replace(/[^0-9]/g, "")}?text=Hi%20Nikita,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20discuss%20a%203D/2D%20project.`}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-[#25D366]/30 bg-[#16181B] p-4 transition-all hover:border-[#25D366] hover:bg-[#1E2227]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366]">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <span className="font-mono-spec text-[9px] uppercase tracking-wider text-[#8E98A5] block">
                      Quick WhatsApp Chat
                    </span>
                    <span className="font-medium text-sm text-[#F3F4F6] group-hover:text-[#25D366] transition-colors">
                      {settings.whatsapp || "+91 9305308296"}
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={15} className="text-[#25D366] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={`mailto:${settings.email || "iamnikita2911@gmail.com"}`}
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-[#16181B] p-4 transition-all hover:border-[#D49A6A]/50 hover:bg-[#1E2227]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D49A6A]/15 text-[#D49A6A]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="font-mono-spec text-[9px] uppercase tracking-wider text-[#8E98A5] block">
                      Studio Email
                    </span>
                    <span className="font-medium text-sm text-[#F3F4F6] group-hover:text-[#D49A6A] transition-colors">
                      {settings.email || "iamnikita2911@gmail.com"}
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={15} className="text-[#8E98A5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Micro Response Guarantee */}
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/5 bg-[#16181B] p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D49A6A]/10 text-[#D49A6A]">
                <Clock size={16} />
              </div>
              <p className="text-xs text-[#8E98A5]">
                <strong className="text-[#F3F4F6]">Direct Communication Guarantee:</strong> You will communicate directly with Nikita throughout your project lifecycle.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="card-luxury rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 bg-[#16191D]/90 backdrop-blur-xl">
            <div className="mb-6">
              <span className="font-mono-spec text-[9.5px] uppercase tracking-widest text-[#D49A6A]">
                Confidential Inquiry
              </span>
              <h3 className="font-display text-2xl font-normal text-[#F3F4F6] mt-1">
                Tell us about your space.
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-mono-spec text-[10px] uppercase tracking-wider text-[#8E98A5] block mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  disabled={isSubmitting}
                  placeholder="e.g. Aarav Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#14171A] px-4 py-3 text-sm text-[#F3F4F6] placeholder-[#8E98A5]/50 outline-none transition-all focus:border-[#D49A6A] focus:ring-1 focus:ring-[#D49A6A] disabled:opacity-60"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="font-mono-spec text-[10px] uppercase tracking-wider text-[#8E98A5] block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    disabled={isSubmitting}
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#14171A] px-4 py-3 text-sm text-[#F3F4F6] placeholder-[#8E98A5]/50 outline-none transition-all focus:border-[#D49A6A] focus:ring-1 focus:ring-[#D49A6A] disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="font-mono-spec text-[10px] uppercase tracking-wider text-[#8E98A5] block mb-1.5">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    disabled={isSubmitting}
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#14171A] px-4 py-3 text-sm text-[#F3F4F6] placeholder-[#8E98A5]/50 outline-none transition-all focus:border-[#D49A6A] focus:ring-1 focus:ring-[#D49A6A] disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono-spec text-[10px] uppercase tracking-wider text-[#8E98A5] block mb-1.5">
                  Service of Interest
                </label>
                <select
                  disabled={isSubmitting}
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#14171A] px-4 py-3 text-sm text-[#F3F4F6] outline-none transition-all focus:border-[#D49A6A] focus:ring-1 focus:ring-[#D49A6A] disabled:opacity-60"
                >
                  <option value="3D Interior & Architectural Visualization (4K)">3D Interior & Architectural Visualization (4K)</option>
                  <option value="2D Space Planning & Floor CAD Layouts">2D Space Planning & Floor CAD Layouts</option>
                  <option value="Complete 3D Render & 2D Plan Package">Complete 3D Render & 2D Plan Package</option>
                </select>
              </div>

              <div>
                <label className="font-mono-spec text-[10px] uppercase tracking-wider text-[#8E98A5] block mb-1.5">
                  Project Scope & Brief *
                </label>
                <textarea
                  rows={3}
                  required
                  disabled={isSubmitting}
                  placeholder="Describe your room dimensions, project location, design mood, or timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#14171A] px-4 py-3 text-sm text-[#F3F4F6] placeholder-[#8E98A5]/50 outline-none transition-all focus:border-[#D49A6A] focus:ring-1 focus:ring-[#D49A6A] disabled:opacity-60"
                />
              </div>

              {/* Error Alert Box */}
              {submitError && (
                <div className="flex items-start gap-2.5 rounded-2xl border border-rose-500/40 bg-rose-500/10 p-3.5 text-xs text-rose-300 animate-in fade-in">
                  <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-400" />
                  <span>{submitError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full flex items-center justify-center gap-2.5 rounded-full bg-[#D49A6A] py-3.5 text-xs font-semibold uppercase tracking-wider text-[#14171A] shadow-md transition-all duration-300 hover:bg-[#E5A97C] hover:shadow-[0_4px_25px_rgba(212,154,106,0.4)] active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin text-[#14171A]" />
                    <span>Transmitting Brief to Nikita...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Project Brief</span>
                    <Send size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* LUXURY CONFIRMATION POPUP MODAL                           */}
      {/* ========================================================= */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg rounded-3xl border border-[#D49A6A]/40 bg-[#1A1D21] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-[#F3F4F6] animate-in zoom-in-95 duration-300">
            {/* Ambient gold glow */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-[#D49A6A]/20 blur-[60px]" />

            {/* Close X */}
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-5 right-5 h-8 w-8 rounded-full border border-white/10 flex items-center justify-center text-[#8E98A5] hover:text-white hover:border-white/30 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Icon Header */}
            <div className="flex items-center gap-3.5 mb-5">
              <div className="h-14 w-14 rounded-2xl bg-[#D49A6A]/15 border border-[#D49A6A]/40 flex items-center justify-center text-[#D49A6A] shadow-lg shadow-[#D49A6A]/10">
                <Sparkles size={26} />
              </div>
              <div>
                <span className="font-mono-spec text-[9.5px] uppercase tracking-widest text-[#D49A6A]">
                  Render Rituals Studio
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-normal text-[#F3F4F6]">
                  Project Brief Received!
                </h3>
              </div>
            </div>

            {/* Message Body */}
            <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed mb-6">
              Thank you, <strong className="text-[#F3F4F6]">{lastSubmitted?.name}</strong>. Your spatial project requirements have been successfully delivered to Nikita at Render Rituals.
            </p>

            {/* Summary Card */}
            <div className="rounded-2xl border border-white/10 bg-[#14171A] p-4 space-y-2.5 mb-6">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#8E98A5]">Scope:</span>
                <span className="font-medium text-[#D49A6A] truncate max-w-[250px]">
                  {lastSubmitted?.service}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#8E98A5]">Contact:</span>
                <span className="font-mono-spec text-[#F3F4F6]">
                  {lastSubmitted?.email}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#8E98A5]">Response Time:</span>
                <span className="font-medium text-[#25D366]">Within 24 Hours Guaranteed</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${(settings.whatsapp || "919305308296").replace(/[^0-9]/g, "")}?text=Hi%20Nikita,%20I%20just%20submitted%20a%20project%20brief%20(${encodeURIComponent(lastSubmitted?.service || "")})%20on%20Render%20Rituals.`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3 text-xs font-bold text-[#14171A] hover:bg-[#20bd5a] transition-all shadow-md"
              >
                <MessageSquare size={15} />
                <span>Open Instant WhatsApp Chat</span>
              </a>

              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-xs font-medium text-[#F3F4F6] hover:bg-white/10 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
