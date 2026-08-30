import Image from "next/image";
import { ImageIcon } from "lucide-react";

type ImagePlaceholderProps = {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export default function ImagePlaceholder({
  src,
  alt,
  className = "",
  priority = false,
}: ImagePlaceholderProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-[#e7e1d7] ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex items-center justify-center overflow-hidden bg-[#e7e1d7] ${className}`}
    >
      <div className="flex flex-col items-center gap-3 text-black/20">
        <ImageIcon size={24} strokeWidth={1.2} />
        <span className="text-[9px] uppercase tracking-[0.2em]">Render Rituals</span>
      </div>
    </div>
  );
}
