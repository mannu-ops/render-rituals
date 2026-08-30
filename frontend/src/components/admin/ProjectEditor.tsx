"use client";

import { useState } from "react";
import { Project } from "@/types";
import AdminButton from "./AdminButton";
import ImageUploader from "./ImageUploader";

type ProjectEditorProps = {
  initialData?: Partial<Project>;
  onSave: (data: Partial<Project>) => void;
  onCancel: () => void;
};

export default function ProjectEditor({
  initialData,
  onSave,
  onCancel,
}: ProjectEditorProps) {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    category: initialData?.category || "Residential",
    year: initialData?.year || new Date().getFullYear().toString(),
    location: initialData?.location || "India",
    excerpt: initialData?.excerpt || "",
    description: initialData?.description || "",
    image: initialData?.image || "",
    services: initialData?.services || ["Interior Design", "3D Visualization"],
    published: initialData?.published ?? true,
    featured: initialData?.featured ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="label-rituals">Project Title</span>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-sm outline-none focus:border-black"
            placeholder="e.g. Quiet Residence"
          />
        </label>

        <label className="block">
          <span className="label-rituals">Category</span>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-sm outline-none cursor-pointer"
          >
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Visualization">Visualization</option>
            <option value="Architecture">Architecture</option>
          </select>
        </label>

        <label className="block">
          <span className="label-rituals">Year</span>
          <input
            type="text"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-sm outline-none focus:border-black"
          />
        </label>

        <label className="block">
          <span className="label-rituals">Location</span>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-sm outline-none focus:border-black"
          />
        </label>
      </div>

      <label className="block">
        <span className="label-rituals">Short Excerpt</span>
        <input
          type="text"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-sm outline-none focus:border-black"
          placeholder="Brief 1-sentence summary"
        />
      </label>

      <label className="block">
        <span className="label-rituals">Full Description</span>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-sm outline-none focus:border-black"
          placeholder="Detailed case study background, concept, and solutions..."
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-center justify-between rounded-xl border border-black/10 p-3 bg-black/[0.02]">
          <div>
            <p className="text-xs font-semibold text-black/90">
              {formData.published ? "Published (Live)" : "Draft Mode"}
            </p>
            <p className="text-[11px] text-black/50">
              {formData.published ? "Visible on website" : "Hidden from public"}
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

        <div className="flex items-center justify-between rounded-xl border border-black/10 p-3 bg-black/[0.02]">
          <div>
            <p className="text-xs font-semibold text-black/90">
              {formData.featured ? "Featured ⭐" : "Standard"}
            </p>
            <p className="text-[11px] text-black/50">
              {formData.featured ? "Highlighted on Homepage" : "Regular showcase"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, featured: !formData.featured })}
            className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
              formData.featured ? "bg-amber-500" : "bg-black/20"
            }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                formData.featured ? "translate-x-4.5" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      <ImageUploader
        value={formData.image}
        onChange={(url) => setFormData({ ...formData, image: url })}
      />

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-black/10">
        <AdminButton type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </AdminButton>
        <AdminButton type="submit" variant="primary">
          Save Project
        </AdminButton>
      </div>
    </form>
  );
}
