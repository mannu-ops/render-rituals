import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center"
      aria-label="Render Rituals home"
    >
      <span className="font-display text-xl leading-none tracking-[-0.045em] transition-opacity group-hover:opacity-65">
        Render Rituals
      </span>
    </Link>
  );
}
