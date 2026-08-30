import { ButtonHTMLAttributes, ReactNode } from "react";

type AdminButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
};

export default function AdminButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: AdminButtonProps) {
  const base = "inline-flex items-center justify-center font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-black text-white hover:bg-black/80",
    secondary: "border border-black/15 bg-white text-black hover:bg-black/5",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-black/60 hover:bg-black/5 hover:text-black",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-md",
    md: "px-4 py-2.5 text-xs rounded-lg",
    lg: "px-6 py-3.5 text-sm rounded-lg",
  };

  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
