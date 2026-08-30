import Image from "next/image";

type PortfolioGalleryProps = {
  images: string[];
  title: string;
};

export default function PortfolioGallery({
  images,
  title,
}: PortfolioGalleryProps) {
  return (
    <div className="grid gap-4">
      {images.map((image, index) => (
        <div
          key={`${image}-${index}`}
          className="relative aspect-[16/10] overflow-hidden bg-black/5"
        >
          <Image
            src={image}
            alt={`${title} — view ${index + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
