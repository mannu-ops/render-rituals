import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "dark" | "light" | "outline" | "ghost";
  href?: string;
};

const variants = {
  dark: "bg-[#D49A6A] text-[#14171A] font-semibold hover:bg-[#E5A97C] shadow-md",
  light: "bg-[#252A30] text-[#F3F4F6] border border-white/10 hover:bg-[#2D333B] hover:border-white/20",
  outline: "border border-white/15 text-[#F3F4F6] bg-white/5 hover:border-[#D49A6A] hover:text-[#D49A6A]",
  ghost: "text-[#8E98A5] hover:text-[#F3F4F6] hover:bg-white/5",
};

export default function Button({
  children,
  variant = "dark",
  href,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full px-5 py-3.5 text-xs transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}
