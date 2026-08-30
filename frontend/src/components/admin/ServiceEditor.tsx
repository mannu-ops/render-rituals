"use client";

import { useState } from "react";
import { Service } from "@/types";
import AdminButton from "./AdminButton";

type ServiceEditorProps = {
  initialData?: Partial<Service>;
  onSave: (data: Partial<Service>) => void;
  onCancel: () => void;
};

export default function ServiceEditor({
  initialData,
  onSave,
  onCancel,
}: ServiceEditorProps) {
  const [formData, setFormData] = useState<Partial<Service>>({
    title: initialData?.title || "",
    name: initialData?.name || "",
    category: initialData?.category || "Design",
    price: initialData?.price || "From ₹10,000",
    startingPrice: initialData?.startingPrice || "₹10,000",
    description: initialData?.description || "",
    features: initialData?.features || ["Space Planning", "3D Renders"],
    published: initialData?.published ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      name: formData.title,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="label-rituals">Service Title</span>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-sm outline-none focus:border-black"
          />
        </label>

        <label className="block">
          <span className="label-rituals">Category</span>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-sm outline-none cursor-pointer"
          >
            <option value="Design">Design</option>
            <option value="Visualization">Visualization</option>
            <option value="Planning">Planning</option>
            <option value="Creative">Creative</option>
          </select>
        </label>

        <label className="block">
          <span className="label-rituals">Starting Price Display</span>
          <input
            type="text"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value, startingPrice: e.target.value })}
            className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-sm outline-none focus:border-black"
            placeholder="e.g. From ₹15,000"
          />
        </label>
      </div>

      <label className="block">
        <span className="label-rituals">Description</span>
        <textarea
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-sm outline-none focus:border-black"
        />
      </label>

      <div className="flex items-center justify-between rounded-xl border border-black/10 p-3 bg-black/[0.02]">
        <div>
          <p className="text-xs font-semibold text-black/90">
            {formData.published ? "Published (Live on Website)" : "Draft Mode (Hidden)"}
          </p>
          <p className="text-[11px] text-black/50">
            {formData.published
              ? "Service is visible on your services pricing page."
              : "Hidden from visitors."}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFormData({ ...formData, published: !formData.published })}
          className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
            formData.published ? "bg-emerald-600" : "bg-black/20"
          }`}
        >
          <span
            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
              formData.published ? "translate-x-4.5" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-black/10">
        <AdminButton type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </AdminButton>
        <AdminButton type="submit" variant="primary">
          Save Service
        </AdminButton>
      </div>
    </form>
  );
}
