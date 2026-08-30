"use client";

import { useState } from "react";
import { Star, Plus, Edit2, Trash2, Check, X, Quote, ShieldCheck } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import { Testimonial } from "@/types";

export default function AdminTestimonialsPage() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useAdminData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formProject, setFormProject] = useState("");
  const [formQuote, setFormQuote] = useState("");
  const [formRating, setFormRating] = useState<number>(5);

  const openAddModal = () => {
    setEditingTestimonial(null);
    setFormName("");
    setFormRole("Residence Owner");
    setFormLocation("Noida Sector 128");
    setFormProject("Full 3BHK Spatial & 3D CGI");
    setFormQuote("The 3D visuals made it effortless to experience our home lighting warmth and materials before starting site execution.");
    setFormRating(5);
    setIsModalOpen(true);
  };

  const openEditModal = (t: Testimonial) => {
    setEditingTestimonial(t);
    setFormName(t.name);
    setFormRole(t.role || "Client");
    setFormLocation(t.location || "");
    setFormProject(t.project || "");
    setFormQuote(t.quote);
    setFormRating(t.rating || 5);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const testimonialData = {
      name: formName,
      role: formRole,
      location: formLocation,
      project: formProject,
      quote: formQuote,
      rating: formRating,
    };

    if (editingTestimonial && editingTestimonial.id) {
      updateTestimonial(editingTestimonial.id, testimonialData);
    } else {
      addTestimonial(testimonialData);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <span className="font-mono-spec text-[10px] uppercase tracking-widest text-[#D49A6A]">
            Social Proof & Trust
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#F3F4F6] mt-1">
            Testimonials & Reviews ({testimonials.length})
          </h1>
          <p className="text-xs text-[#8E98A5] mt-1">
            Manage client endorsements and star ratings displayed in the Reviews section.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D49A6A] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#14171A] shadow-lg shadow-[#D49A6A]/20 transition-all hover:bg-[#E5A97C] active:scale-[0.98] cursor-pointer"
        >
          <Plus size={16} />
          <span>Add New Review</span>
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="rounded-3xl border border-white/10 bg-[#1E2227] p-6 shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* Star Rating & Quote Icon */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-1 text-[#D49A6A]">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="#D49A6A" />
                  ))}
                </div>
                <Quote size={18} className="text-[#8E98A5]/30" />
              </div>

              {/* Quote Text */}
              <p className="mt-4 text-xs sm:text-sm text-[#D1D5DB] leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            {/* Client Info & Card Actions */}
            <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between">
              <div>
                <h2 className="font-display text-sm font-semibold text-[#F3F4F6]">
                  {t.name}
                </h2>
                <p className="text-[11px] text-[#8E98A5] mt-0.5">
                  {t.role} {t.location && `· ${t.location}`}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => openEditModal(t)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-[#14171A] text-[#F3F4F6] hover:border-[#D49A6A] hover:text-[#D49A6A] transition-colors"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (t.id && confirm(`Delete review from ${t.name}?`)) {
                      deleteTestimonial(t.id);
                    }
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-[#14171A] text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-[#1E2227] p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="font-display text-xl font-semibold text-[#F3F4F6]">
                  {editingTestimonial ? "Edit Client Review" : "Add Client Review"}
                </h2>
                <p className="text-xs text-[#8E98A5] mt-0.5">
                  Appears live in the Testimonials section.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[#8E98A5] hover:text-[#F3F4F6]"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Aarav Mehta"
                    className="w-full rounded-xl border border-white/10 bg-[#14171A] p-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                  />
                </div>

                <div>
                  <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
                    Role / Position
                  </label>
                  <input
                    type="text"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="e.g. Residence Owner / Architect"
                    className="w-full rounded-xl border border-white/10 bg-[#14171A] p-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="e.g. South Delhi / Noida"
                    className="w-full rounded-xl border border-white/10 bg-[#14171A] p-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                  />
                </div>

                <div>
                  <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
                    Rating (Stars)
                  </label>
                  <select
                    value={formRating}
                    onChange={(e) => setFormRating(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/10 bg-[#14171A] p-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★☆ (4 Stars)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
                  Client Quote / Endorsement *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formQuote}
                  onChange={(e) => setFormQuote(e.target.value)}
                  placeholder="What did the client say about your 3D renders or 2D floor plans?"
                  className="w-full rounded-xl border border-white/10 bg-[#14171A] p-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-xs font-medium text-[#8E98A5] hover:text-[#F3F4F6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#D49A6A] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#14171A] shadow-md hover:bg-[#E5A97C]"
                >
                  <Check size={14} />
                  <span>{editingTestimonial ? "Update Review" : "Save Review"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
