import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Card({ children, className = "", ...rest }: Props) {
  return (
    <div
      className={`bg-surface-900 border border-surface-800 rounded-2xl p-6 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

const accentBar = {
  brand: "border-l-brand-500",
  green: "border-l-emerald-500",
  blue: "border-l-sky-500",
  red: "border-l-red-500",
};

const valueColors = {
  brand: "text-brand-400",
  green: "text-emerald-400",
  blue: "text-sky-400",
  red: "text-red-400",
};

export function StatCard({
  label,
  value,
  color = "brand",
}: {
  label: string;
  value: string | number;
  color?: "brand" | "green" | "blue" | "red";
}) {
  return (
    <div
      className={`bg-surface-900 border border-surface-800 border-l-4 ${accentBar[color]} rounded-xl px-5 py-4`}
    >
      <p className={`text-2xl font-bold tabular-nums ${valueColors[color]}`}>{value}</p>
      <p className="text-xs text-zinc-500 mt-1 font-medium tracking-wide uppercase">{label}</p>
    </div>
  );
}
