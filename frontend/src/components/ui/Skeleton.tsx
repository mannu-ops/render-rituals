export default function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-black/[0.06] ${className}`}
    />
  );
}
