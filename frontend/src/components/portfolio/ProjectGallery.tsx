"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ProjectGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  const previous = () => {
    setActive((current) =>
      current === null ? null : (current - 1 + images.length) % images.length,
    );
  };

  const next = () => {
    setActive((current) =>
      current === null ? null : (current + 1) % images.length,
    );
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActive(index)}
            className={`group overflow-hidden bg-[#dedbd2] text-left ${
              index === 0 ? "md:col-span-2 md:aspect-[16/8]" : "aspect-[4/3]"
            }`}
          >
            <img
              src={image}
              alt={`${title} — image ${index + 1}`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
            />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[160] flex items-center justify-center bg-black/90 p-5"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label="Close gallery"
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white"
          >
            <X size={19} />
          </button>

          <button
            type="button"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();
              previous();
            }}
            className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white md:left-8"
          >
            <ChevronLeft size={20} />
          </button>

          <img
            src={images[active]}
            alt={`${title} — enlarged`}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[88vh] max-w-[88vw] object-contain"
          />

          <button
            type="button"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              next();
            }}
            className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white md:right-8"
          >
            <ChevronRight size={20} />
          </button>

          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/55">
            {active + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
