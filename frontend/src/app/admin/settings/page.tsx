"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Phone,
  Mail,
  MapPin,
  Lock,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useAdminData();

  // Settings state
  const [phone, setPhone] = useState(settings.phone);
  const [email, setEmail] = useState(settings.email);
  const [location, setLocation] = useState(settings.location);
  const [isAvailable, setIsAvailable] = useState(settings.isAvailable);
  const [statusText, setStatusText] = useState(settings.statusText);

  // Sync settings when loaded from backend API
  useEffect(() => {
    if (settings) {
      setPhone(settings.phone || "");
      setEmail(settings.email || "");
      setLocation(settings.location || "");
      setIsAvailable(settings.isAvailable ?? true);
      setStatusText(settings.statusText || "");
    }
  }, [settings]);

  // Security state
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passError, setPassError] = useState("");
  const [passSuccess, setPassSuccess] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      phone,
      email,
      whatsapp: phone.replace(/[^0-9]/g, ""),
      location,
      isAvailable,
      statusText: isAvailable ? "Available for Projects" : "Fully Booked",
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");
    setPassSuccess("");

    if (currentPass !== settings.adminPasscode) {
      setPassError("Current passcode is incorrect.");
      return;
    }

    if (newPass.length < 4) {
      setPassError("New passcode must be at least 4 characters.");
      return;
    }

    if (newPass !== confirmPass) {
      setPassError("New passcodes do not match.");
      return;
    }

    updateSettings({ adminPasscode: newPass });
    setPassSuccess("Passcode updated successfully!");
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
    setTimeout(() => setPassSuccess(""), 4000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
        <span className="font-mono-spec text-[10px] uppercase tracking-widest text-[#D49A6A]">
          Studio Configuration
        </span>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#F3F4F6]">
          Studio Settings & Security
        </h1>
        <p className="text-xs text-[#8E98A5]">
          Manage contact channels, live availability status, and admin login credentials.
        </p>
      </div>

      {savedSuccess && (
        <div className="flex items-center gap-2 rounded-2xl border border-[#25D366]/40 bg-[#25D366]/10 p-4 text-xs font-semibold text-[#25D366]">
          <Check size={16} />
          <span>Studio settings updated and synchronized with live website!</span>
        </div>
      )}

      {/* 1. Direct Contact Channels */}
      <form onSubmit={handleSaveSettings} className="rounded-3xl border border-white/10 bg-[#1E2227] p-6 sm:p-8 shadow-xl space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h2 className="font-display text-lg font-semibold text-[#F3F4F6]">
            Live Contact Channels
          </h2>
          <p className="text-xs text-[#8E98A5] mt-0.5">
            These details appear in your public navbar, contact form, and footer.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
              WhatsApp & Mobile Number
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#25D366]">
                <Phone size={14} />
              </div>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9305308296"
                className="w-full rounded-xl border border-white/10 bg-[#14171A] py-3 pl-9 pr-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
              />
            </div>
          </div>

          <div>
            <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
              Studio Email Address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#D49A6A]">
                <Mail size={14} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="iamnikita2911@gmail.com"
                className="w-full rounded-xl border border-white/10 bg-[#14171A] py-3 pl-9 pr-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
            Studio Location
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#D49A6A]">
              <MapPin size={14} />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Noida, Uttar Pradesh, India · Remote Worldwide"
              className="w-full rounded-xl border border-white/10 bg-[#14171A] py-3 pl-9 pr-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
            />
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="rounded-2xl border border-white/5 bg-[#14171A] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="font-display text-sm font-semibold text-[#F3F4F6] block">
              Live Studio Availability Beacon
            </span>
            <span className="text-xs text-[#8E98A5] mt-0.5 block">
              Controls the green/red status beacon in the desktop navbar and footer.
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsAvailable(!isAvailable)}
            className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
              isAvailable
                ? "bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366]"
                : "bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#EF4444]"
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${isAvailable ? "bg-[#25D366] animate-pulse" : "bg-[#EF4444]"}`} />
            <span>{isAvailable ? "Taking New Projects (Available)" : "Fully Booked"}</span>
          </button>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#D49A6A] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#14171A] shadow-md hover:bg-[#E5A97C] cursor-pointer"
          >
            <Check size={14} />
            <span>Save & Apply Settings</span>
          </button>
        </div>
      </form>

      {/* 2. Passcode Security */}
      <form onSubmit={handleUpdatePassword} className="rounded-3xl border border-white/10 bg-[#1E2227] p-6 sm:p-8 shadow-xl space-y-4">
        <div className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Lock size={18} className="text-[#D49A6A]" />
            <h2 className="font-display text-lg font-semibold text-[#F3F4F6]">
              Change Studio Admin Passcode
            </h2>
          </div>
          <p className="text-xs text-[#8E98A5] mt-0.5">
            Default master PIN is <code className="text-[#D49A6A]">nikita2026</code>. You can change it here anytime.
          </p>
        </div>

        {passError && (
          <p className="font-mono-spec text-xs text-[#EF4444]">{passError}</p>
        )}
        {passSuccess && (
          <p className="font-mono-spec text-xs text-[#25D366]">{passSuccess}</p>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
              Current Passcode
            </label>
            <input
              type="password"
              required
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-[#14171A] p-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
            />
          </div>

          <div>
            <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
              New Passcode
            </label>
            <input
              type="password"
              required
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-[#14171A] p-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
            />
          </div>

          <div>
            <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
              Confirm New Passcode
            </label>
            <input
              type="password"
              required
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-[#14171A] p-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-[#14171A] px-6 py-2.5 text-xs font-semibold text-[#D49A6A] hover:border-[#D49A6A] cursor-pointer"
          >
            <Lock size={13} />
            <span>Update Master Passcode</span>
          </button>
        </div>
      </form>
    </div>
  );
}
