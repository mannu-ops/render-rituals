"use client";

import { useState } from "react";
import {
  MessageSquare,
  Phone,
  Mail,
  Trash2,
  CheckCircle2,
  Clock,
  Archive,
  Search,
  Filter,
  Sparkles,
  ChevronDown,
  User,
} from "lucide-react";
import { useAdminData, Inquiry } from "@/context/AdminDataContext";

export default function AdminInquiriesPage() {
  const { inquiries, updateInquiryStatus, deleteInquiry } = useAdminData();
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus =
      selectedFilter === "All" ||
      (selectedFilter === "New Leads" && inq.status === "new") ||
      (selectedFilter === "In Discussion" && inq.status === "in_discussion") ||
      (selectedFilter === "Completed" && inq.status === "completed") ||
      (selectedFilter === "Archived" && inq.status === "archived");

    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
        <span className="font-mono-spec text-[10px] uppercase tracking-widest text-[#D49A6A]">
          Client Leads Pipeline
        </span>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#F3F4F6]">
          Project Inquiries ({inquiries.length})
        </h1>
        <p className="text-xs text-[#8E98A5]">
          Manage and reply to architectural rendering and space planning proposals submitted from your website.
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {["All", "New Leads", "In Discussion", "Completed", "Archived"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedFilter(tab)}
              className={`rounded-full px-4 py-2 font-mono-spec text-[10px] uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                selectedFilter === tab
                  ? "bg-[#D49A6A] text-[#14171A] font-bold"
                  : "border border-white/10 bg-[#1E2227] text-[#8E98A5] hover:text-[#F3F4F6]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={14} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E98A5]" />
          <input
            type="text"
            placeholder="Search leads by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-white/10 bg-[#1E2227] py-2 pl-9 pr-4 text-xs text-[#F3F4F6] placeholder-[#8E98A5] outline-none focus:border-[#D49A6A]"
          />
        </div>
      </div>

      {/* Inquiries Stream */}
      {filteredInquiries.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-[#1E2227] p-12 text-center">
          <MessageSquare size={32} className="mx-auto text-[#8E98A5]/40" />
          <p className="font-display text-base font-semibold text-[#F3F4F6] mt-3">
            No inquiries match this filter
          </p>
          <p className="text-xs text-[#8E98A5] mt-1">
            New contact submissions from the homepage will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInquiries.map((inq) => (
            <div
              key={inq.id}
              className={`rounded-3xl border p-6 sm:p-7 shadow-xl transition-all ${
                inq.status === "new"
                  ? "border-[#D49A6A]/50 bg-[#1E2227]"
                  : "border-white/10 bg-[#1E2227]/70"
              }`}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                {/* Client Info & Message */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#D49A6A]/15 text-[#D49A6A] font-bold text-sm">
                      {inq.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-display text-base sm:text-lg font-semibold text-[#F3F4F6]">
                          {inq.name}
                        </h2>
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-mono-spec text-[9px] uppercase tracking-wider ${
                            inq.status === "new"
                              ? "bg-[#D49A6A] text-[#14171A] font-bold"
                              : inq.status === "in_discussion"
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                              : inq.status === "completed"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-white/10 text-[#8E98A5]"
                          }`}
                        >
                          {inq.status.replace("_", " ")}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#8E98A5] mt-1">
                        <span>✉️ {inq.email}</span>
                        {inq.phone && <span>📱 {inq.phone}</span>}
                        <span>🗓️ {inq.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Service Requested */}
                  <div className="mt-4 rounded-xl border border-white/5 bg-[#14171A] p-3 inline-flex items-center gap-2">
                    <span className="font-mono-spec text-[9.5px] uppercase tracking-wider text-[#8E98A5]">
                      Service:
                    </span>
                    <span className="font-display text-xs font-semibold text-[#D49A6A]">
                      {inq.service}
                    </span>
                  </div>

                  {/* Project Proposal Brief */}
                  <div className="mt-4 rounded-2xl border border-white/5 bg-[#14171A] p-4">
                    <p className="font-mono-spec text-[9px] uppercase tracking-wider text-[#8E98A5] mb-1">
                      Project Brief & Requirements:
                    </p>
                    <p className="text-xs sm:text-sm text-[#F3F4F6] leading-relaxed whitespace-pre-wrap">
                      {inq.message}
                    </p>
                  </div>
                </div>

                {/* Right Side: Actions & Status Switcher */}
                <div className="flex flex-col gap-3 min-w-[200px] border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6">
                  <span className="font-mono-spec text-[9px] uppercase tracking-wider text-[#8E98A5]">
                    Quick Actions
                  </span>

                  {/* Direct Contact Triggers */}
                  {inq.phone && (
                    <a
                      href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(
                        inq.name
                      )},%20thank%20you%20for%20reaching%20out%20to%20Render%20Rituals%20regarding%20${encodeURIComponent(
                        inq.service
                      )}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2.5 text-xs font-bold text-[#14171A] shadow-md hover:bg-[#20bd5a] transition-colors"
                    >
                      <Phone size={13} />
                      <span>Chat on WhatsApp</span>
                    </a>
                  )}

                  <a
                    href={`mailto:${inq.email}?subject=Regarding your Render Rituals Project Proposal`}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#14171A] py-2.5 text-xs font-medium text-[#F3F4F6] hover:border-[#D49A6A] transition-colors"
                  >
                    <Mail size={13} className="text-[#D49A6A]" />
                    <span>Send Email</span>
                  </a>

                  {/* Status Dropdown */}
                  <div className="pt-2">
                    <label className="font-mono-spec block text-[9px] uppercase tracking-wider text-[#8E98A5] mb-1">
                      Update Lead Status
                    </label>
                    <select
                      value={inq.status}
                      onChange={(e) => updateInquiryStatus(inq.id, e.target.value as Inquiry["status"])}
                      className="w-full rounded-xl border border-white/10 bg-[#14171A] p-2 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                    >
                      <option value="new">🟢 New Lead</option>
                      <option value="in_discussion">🔵 In Discussion</option>
                      <option value="completed">✅ Completed / Booked</option>
                      <option value="archived">📦 Archived</option>
                    </select>
                  </div>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete inquiry from ${inq.name}?`)) {
                        deleteInquiry(inq.id);
                      }
                    }}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-transparent py-1.5 text-[11px] text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors cursor-pointer"
                  >
                    <Trash2 size={12} />
                    <span>Delete Proposal</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
