"use client";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const variants = {
  primary: "bg-brand-600 hover:bg-brand-500 text-white font-semibold shadow-sm shadow-brand-600/20",
  secondary: "bg-surface-800 hover:bg-surface-700 text-zinc-200 border border-surface-700",
  danger: "bg-red-600 hover:bg-red-500 text-white font-semibold",
  ghost: "bg-transparent hover:bg-surface-800 text-zinc-400 hover:text-zinc-200",
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
        <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  )
);
Button.displayName = "Button";
export default Button;
