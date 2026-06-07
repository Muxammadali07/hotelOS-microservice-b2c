"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

const ROLE_DESTINATIONS: Record<string, string> = {
  Receptionist:    "/reception",
  Manager:         "/manager",
  CleaningStaff:   "/housekeeping",
  MaintenanceStaff:"/maintenance",
  KitchenStaff:    "/kitchen",
  Server:          "/kitchen",
};

export default function LoginPage() {
  const router  = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await authApi.login({ email, password });
      if (user.role === "Client") { toast.error("Guest accounts are not permitted here."); return; }
      setUser(user);
      router.push(ROLE_DESTINATIONS[user.role] ?? "/manager");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Logo mark */}
        <div className="flex items-center gap-2.5 mb-10">
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-zinc-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21" />
            </svg>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">Velora</span>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white mb-1">Staff sign in</h1>
          <p className="text-zinc-500 text-sm">Enter your credentials to access the dashboard.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full mt-2 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading
              ? <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Signing in…</>
              : "Sign in"
            }
          </button>
        </form>

        {/* Role chips */}
        <div className="mt-10 flex flex-wrap gap-1.5">
          {["Reception", "Housekeeping", "Maintenance", "Kitchen", "Manager"].map((r) => (
            <span key={r} className="text-[10px] text-zinc-700 border border-surface-800 rounded-full px-2.5 py-0.5">{r}</span>
          ))}
        </div>

        <p className="text-zinc-700 text-xs text-center mt-6">
          Accounts are managed by your administrator.
        </p>
      </div>
    </div>
  );
}
