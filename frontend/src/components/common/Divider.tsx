export default function Divider({
  className = "",
}: {
  className?: string;
}) {
  return <div aria-hidden="true" className={`h-px w-full bg-black/10 ${className}`} />;
}
