import { ImagePlaceholder } from "../common";

type ProjectGalleryProps = {
  images?: Array<{
    src?: string;
    alt: string;
    className?: string;
  }>;
};

export default function ProjectGallery({ images = [] }: ProjectGalleryProps) {
  const gallery = images.length
    ? images
    : [
        { alt: "Project visualization", className: "aspect-[4/3]" },
        { alt: "Project material study", className: "aspect-[4/3]" },
        { alt: "Project spatial view", className: "aspect-[16/9] md:col-span-2" },
      ];

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {gallery.map((image, index) => (
        <ImagePlaceholder
          key={`${image.alt}-${index}`}
          src={image.src}
          alt={image.alt}
          className={image.className ?? "aspect-[4/3]"}
        />
      ))}
    </div>
  );
}
