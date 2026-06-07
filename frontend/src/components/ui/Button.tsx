"use client";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const variants = {
  primary:   "bg-primary-600 hover:bg-primary-500 text-white font-semibold shadow-sm",
  secondary: "bg-surface-800 hover:bg-surface-700 text-zinc-200 border border-surface-700",
  danger:    "bg-red-600 hover:bg-red-500 text-white font-semibold",
  ghost:     "bg-transparent hover:bg-surface-800 text-zinc-400 hover:text-zinc-200",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs rounded-md",
  md: "px-4 py-2 text-sm rounded-lg",
  lg: "px-5 py-2.5 text-sm rounded-lg",
};

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "primary", size = "md", loading, disabled, children, className = "", ...rest }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {loading && (
        <div className="w-3.5 h-3.5 rounded-full border-2 border-current/30 border-t-current animate-spin" />
      )}
      {children}
    </button>
  )
);
Button.displayName = "Button";
export default Button;
