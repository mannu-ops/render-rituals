"use client";

import { useState } from "react";
import {
  BriefcaseBusiness,
  Edit2,
  CheckCircle2,
  Clock,
  Sparkles,
  Eye,
  Layers,
  Check,
  X,
  Plus,
  Trash2,
  UploadCloud,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import { Service } from "@/types";
import { api } from "@/services/api";

export default function AdminServicesPage() {
  const { services, updateService, showToast } = useAdminData();
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Form State
  const [formPrice, setFormPrice] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formCoverImage, setFormCoverImage] = useState("");
  const [formFeatures, setFormFeatures] = useState<string[]>([]);
  const [formPublished, setFormPublished] = useState<boolean>(true);
  const [newFeatureText, setNewFeatureText] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setFormPrice(service.price || "");
    setFormDescription(service.description || "");
    setFormCoverImage(service.coverImage || "");
    setFormFeatures([...(service.features || [])]);
    setFormPublished(service.published !== false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await api.uploadImage(file);
      if (res && res.url) {
        setFormCoverImage(res.url);
        showToast({
          type: "success",
          title: "Cover Image Uploaded!",
          message: `${file.name} uploaded to Cloudinary CDN.`,
        });
      }
    } catch (err) {
      console.error("Upload error:", err);
      showToast({
        type: "error",
        title: "Upload Failed",
        message: "Could not upload image to Cloudinary.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddFeature = () => {
    if (newFeatureText.trim()) {
      setFormFeatures([...formFeatures, newFeatureText.trim()]);
      setNewFeatureText("");
    }
  };

  const handleRemoveFeature = (idx: number) => {
    setFormFeatures(formFeatures.filter((_, i) => i !== idx));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    updateService(editingService.id, {
      price: formPrice,
      description: formDescription,
      coverImage: formCoverImage,
      features: formFeatures,
      published: formPublished,
    });

    setEditingService(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
        <span className="font-mono-spec text-[10px] uppercase tracking-widest text-[#D49A6A]">
          Service Architecture
        </span>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#F3F4F6]">
          Services & Pricing Editor
        </h1>
        <p className="text-xs text-[#8E98A5]">
          Edit live rates, cover photos, turnaround commitments, and deliverables for your 2 core freelance disciplines.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {services.map((service, index) => {
          const is3D = service.id.includes("3d");
          const Icon = is3D ? Eye : Layers;

          return (
            <div
              key={service.id}
              className="card-luxury flex flex-col justify-between rounded-3xl p-6 sm:p-8 border border-white/10 bg-[#1A1D21] transition-all hover:border-[#D49A6A]/40"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#D49A6A]/15 border border-[#D49A6A]/30 text-[#D49A6A]">
                      <Icon size={18} />
                    </div>
                    <div>
                      <span className="font-mono-spec text-[9px] uppercase tracking-widest text-[#D49A6A]">
                        Service 0{index + 1}
                      </span>
                      <h3 className="font-display text-lg font-medium text-[#F3F4F6]">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openEditModal(service)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 text-[#8E98A5] hover:border-[#D49A6A] hover:text-[#D49A6A] transition-colors cursor-pointer"
                  >
                    <Edit2 size={14} />
                  </button>
                </div>

                {/* Cover Image Banner */}
                {service.coverImage && (
                  <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-[#14171A]">
                    <img
                      src={service.coverImage}
                      alt={service.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-2.5 right-2.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 text-[9px] font-mono-spec text-white backdrop-blur-md">
                      Cloudinary CDN
                    </div>
                  </div>
                )}

                {/* Live Price Tag */}
                <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/5 bg-[#14171A] p-4">
                  <div>
                    <span className="font-mono-spec text-[9px] uppercase tracking-wider text-[#8E98A5]">
                      Rate Tag
                    </span>
                    <p className="font-display text-xl font-bold text-[#D49A6A] mt-0.5">
                      {service.price}
                    </p>
                  </div>
                  {service.published !== false ? (
                    <span className="rounded-full bg-[#25D366]/10 border border-[#25D366]/30 px-2.5 py-1 text-[10px] font-medium text-[#25D366] flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#25D366] shadow-[0_0_6px_#25D366]" />
                      Active on Site
                    </span>
                  ) : (
                    <span className="rounded-full bg-stone-500/10 border border-white/10 px-2.5 py-1 text-[10px] font-medium text-[#8E98A5] flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#8E98A5]" />
                      Draft Mode
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#8E98A5]">
                  {service.description}
                </p>

                {/* Deliverables */}
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="font-mono-spec text-[9.5px] uppercase tracking-wider text-[#8E98A5] mb-2.5">
                    Live Inclusions ({service.features?.length || 0}):
                  </p>
                  <div className="space-y-2">
                    {service.features?.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#D1D5DB]">
                        <CheckCircle2 size={13} className="text-[#D49A6A] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Edit Trigger */}
              <div className="mt-6 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => openEditModal(service)}
                  className="w-full rounded-2xl bg-[#14171A] py-3 text-xs font-semibold text-[#F3F4F6] hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Configure Cover Image, Inclusions & Pricing →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* EDIT SERVICE MODAL WITH CLOUDINARY UPLOADER               */}
      {/* ========================================================= */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl border border-white/15 bg-[#1E2227] p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="font-display text-xl font-semibold text-[#F3F4F6]">
                  Edit {editingService.id.includes("3d") ? "3D Visualization" : "2D Space Planning"}
                </h2>
                <p className="text-xs text-[#8E98A5] mt-0.5">
                  Update live rates, cover image, and client deliverables.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[#8E98A5] hover:text-[#F3F4F6] cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-4">
              {/* Publish / Draft Status Toggle */}
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#14171A] p-4 transition-all hover:border-[#D49A6A]/40">
                <div className="flex items-center gap-3">
                  <span
                    className={`h-3 w-3 rounded-full transition-all ${
                      formPublished ? "bg-[#25D366] shadow-[0_0_8px_#25D366]" : "bg-[#8E98A5]"
                    }`}
                  />
                  <div>
                    <p className="font-display text-xs font-semibold text-[#F3F4F6]">
                      {formPublished ? "Published (Live on Website)" : "Draft Mode (Hidden from Public)"}
                    </p>
                    <p className="font-mono-spec text-[10px] text-[#8E98A5]">
                      {formPublished
                        ? "Service is visible on your public website and pricing section."
                        : "Saved in database but hidden from public visitors."}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFormPublished(!formPublished)}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                    formPublished ? "bg-[#25D366]" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-[#14171A] transition-transform ${
                      formPublished ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Cover Image Uploader */}
              <div>
                <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1.5">
                  Service Cover Photo (Cloudinary CDN)
                </label>

                {formCoverImage && (
                  <div className="relative mb-3 aspect-[16/8] overflow-hidden rounded-xl border border-white/15 bg-[#14171A]">
                    <img
                      src={formCoverImage}
                      alt="Service Cover Preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormCoverImage("")}
                      className="absolute top-2 right-2 rounded-full bg-black/70 p-1 text-[#8E98A5] hover:text-rose-400"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2">
                  <label className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#D49A6A]/40 bg-[#D49A6A]/5 p-3 text-xs font-semibold text-[#D49A6A] hover:bg-[#D49A6A]/10 transition-colors cursor-pointer">
                    {isUploading ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        <span>Uploading to Cloudinary...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud size={14} />
                        <span>Upload Photo From Computer</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isUploading}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <input
                    type="text"
                    value={formCoverImage}
                    onChange={(e) => setFormCoverImage(e.target.value)}
                    placeholder="Or paste Cloudinary URL directly..."
                    className="flex-1 rounded-xl border border-white/10 bg-[#14171A] p-2.5 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                  />
                </div>
              </div>

              {/* Rate */}
              <div>
                <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
                  Pricing / Rate Tag *
                </label>
                <input
                  type="text"
                  required
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                  placeholder="e.g. ₹3,500 – ₹6,000 / view"
                  className="w-full rounded-xl border border-white/10 bg-[#14171A] p-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1">
                  Service Description
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Explain why this service matters..."
                  className="w-full rounded-xl border border-white/10 bg-[#14171A] p-3 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                />
              </div>

              {/* Inclusions List */}
              <div>
                <label className="font-mono-spec block text-[10px] uppercase tracking-wider text-[#D1D5DB] mb-1.5">
                  Deliverables & Inclusions
                </label>

                <div className="space-y-2 mb-3">
                  {formFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl border border-white/5 bg-[#14171A] px-3 py-2 text-xs text-[#D1D5DB]"
                    >
                      <span className="truncate pr-2">{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-[#8E98A5] hover:text-[#EF4444] shrink-0 cursor-pointer"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeatureText}
                    onChange={(e) => setNewFeatureText(e.target.value)}
                    placeholder="Add deliverable (e.g. 4K Ultra-HD still renders)..."
                    className="flex-1 rounded-xl border border-white/10 bg-[#14171A] p-2.5 text-xs text-[#F3F4F6] outline-none focus:border-[#D49A6A]"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="rounded-xl border border-white/15 bg-[#1E2227] px-4 py-2.5 text-xs font-semibold text-[#D49A6A] hover:bg-white/10 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-xs font-medium text-[#8E98A5] hover:text-[#F3F4F6] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#D49A6A] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#14171A] shadow-md hover:bg-[#E5A97C] cursor-pointer"
                >
                  <Check size={14} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
