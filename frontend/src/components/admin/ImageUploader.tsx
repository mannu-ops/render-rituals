"use client";

import { ChangeEvent, useState } from "react";
import { Image as ImageIcon, Upload, X } from "lucide-react";

type ImageUploaderProps = {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
};

export default function ImageUploader({
  value = "",
  onChange,
  label = "Upload Project Cover / Image",
}: ImageUploaderProps) {
  const [preview, setPreview] = useState(value);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange(url);
    }
  };

  return (
    <div className="space-y-2">
      <span className="label-rituals">{label}</span>
      {preview ? (
        <div className="relative aspect-[16/9] max-w-md overflow-hidden rounded-lg border border-black/10 bg-[#dedbd2]">
          <img src={preview} alt="Upload preview" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => {
              setPreview("");
              onChange("");
            }}
            className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white hover:bg-black"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="flex aspect-[16/9] max-w-md cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-black/20 bg-white p-6 text-center hover:border-black/50 transition-colors">
          <Upload size={24} className="text-black/30" />
          <span className="mt-2 text-xs font-medium text-black/60">Click to select image file</span>
          <span className="mt-1 text-[10px] text-black/35">JPG, PNG, WebP up to 10MB</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
      )}
    </div>
  );
}
