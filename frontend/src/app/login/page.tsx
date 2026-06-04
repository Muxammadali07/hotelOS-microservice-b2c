"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

const ROLE_DESTINATIONS: Record<string, string> = {
  Receptionist: "/reception",
  Manager: "/manager",
  CleaningStaff: "/housekeeping",
  MaintenanceStaff: "/maintenance",
  KitchenStaff: "/kitchen",
  Server: "/kitchen",
};

const ROLES = ["Reception", "Housekeeping", "Maintenance", "Kitchen", "Manager"];

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await authApi.login({ email, password });
      if (user.role === "Client") {
        toast.error("Guest accounts are not permitted here.");
        return;
      }
      setUser(user);
      toast.success(`Welcome back`);
      router.push(ROLE_DESTINATIONS[user.role] ?? "/manager");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-surface-800 shadow-2xl">

        {/* Left — visual panel */}
        <div className="hidden lg:flex flex-col justify-between bg-surface-950 p-10 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          {/* Logo */}
          <div className="relative flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">Velora</span>
          </div>

          {/* Headline */}
          <div className="relative">
            <p className="text-brand-400 text-xs font-medium tracking-[0.25em] uppercase mb-4">
              Staff Portal
            </p>
            <h1 className="text-3xl font-semibold text-white leading-tight mb-4">
              Everything your<br />
              team needs,<br />
              <span className="text-brand-400">in one place.</span>
            </h1>
            <p className="text-zinc-600 text-sm leading-relaxed max-w-xs">
              Manage rooms, bookings, housekeeping, maintenance, and more from a unified dashboard.
            </p>
          </div>

          {/* Role chips */}
          <div className="relative flex flex-wrap gap-2">
            {ROLES.map((role) => (
              <span key={role} className="text-xs text-zinc-600 border border-surface-700 rounded-full px-3 py-1">
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="flex flex-col justify-center bg-surface-900 p-10">
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21" />
              </svg>
            </div>
            <span className="text-white font-bold tracking-tight">Velora</span>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-1">Sign in to your account</h2>
            <p className="text-zinc-500 text-sm">Enter your credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label>Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@velora.com"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-1"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="text-zinc-700 text-xs text-center mt-8">
            Staff accounts are managed by your administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
