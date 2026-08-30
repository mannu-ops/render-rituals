export default function LoadingSpinner({
  size = 18,
}: {
  size?: number;
}) {
  return (
    <span
      aria-label="Loading"
      role="status"
      className="inline-block animate-spin rounded-full border border-black/15 border-t-black"
      style={{ width: size, height: size }}
    />
  );
}
