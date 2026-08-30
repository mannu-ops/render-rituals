"use client";

import { useState } from "react";
import { PricingPackage } from "@/types";
import AdminButton from "./AdminButton";

type PricingEditorProps = {
  initialData?: Partial<PricingPackage>;
  onSave: (data: Partial<PricingPackage>) => void;
  onCancel: () => void;
};

export default function PricingEditor({
  initialData,
  onSave,
  onCancel,
}: PricingEditorProps) {
  const [formData, setFormData] = useState<Partial<PricingPackage>>({
    name: initialData?.name || "",
    title: initialData?.title || "",
    subtitle: initialData?.subtitle || "",
    description: initialData?.description || "",
    price: initialData?.price || 5000,
    priceLabel: initialData?.priceLabel || "From ₹5,000",
    features: initialData?.features || ["Scope analysis", "Digital deliverables"],
    popular: initialData?.popular || false,
    published: initialData?.published ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      title: formData.name,
      priceLabel: `From ₹${Number(formData.price).toLocaleString("en-IN")}`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="label-rituals">Package Name</span>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-sm outline-none focus:border-black"
          />
        </label>

        <label className="block">
          <span className="label-rituals">Base Price (INR)</span>
          <input
            type="number"
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-sm outline-none focus:border-black"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="label-rituals">Subtitle / Short Note</span>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-sm outline-none focus:border-black"
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

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={formData.popular}
          onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
          className="rounded border-black/20 text-black focus:ring-black"
        />
        <span className="text-xs text-black/70">Mark as Popular / Recommended package</span>
      </label>

      <div className="flex items-center justify-between rounded-xl border border-black/10 p-3 bg-black/[0.02]">
        <div>
          <p className="text-xs font-semibold text-black/90">
            {formData.published ? "Published (Live on Website)" : "Draft Mode (Hidden)"}
          </p>
          <p className="text-[11px] text-black/50">
            {formData.published
              ? "Pricing tier is displayed on the pricing page."
              : "Hidden from pricing page."}
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
          Save Package
        </AdminButton>
      </div>
    </form>
  );
}
