"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import type { Role } from "@/types";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { authApi } from "@/lib/api";
import toast from "react-hot-toast";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface Props {
  title: string;
  navItems: NavItem[];
  allowedRoles: Role[];
  children: React.ReactNode;
}

export default function DashboardLayout({ title, navItems, allowedRoles, children }: Props) {
  const { user, isLoading, clearUser } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const isAllowed = !isLoading && !!user && allowedRoles.includes(user.role as Role);
  const needsRedirect = !isLoading && !isAllowed;

  useEffect(() => {
    if (needsRedirect) router.push("/login");
  }, [needsRedirect, router]);

  const [showChangePw, setShowChangePw] = useState(false);
  const [changePwForm, setChangePwForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [changePwLoading, setChangePwLoading] = useState(false);

  if (isLoading || !user) return null;

  const logout = () => {
    clearUser();
    router.push("/login");
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (changePwForm.newPassword !== changePwForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (changePwForm.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setChangePwLoading(true);
    try {
      await authApi.changePassword(user.id, changePwForm.currentPassword, changePwForm.newPassword);
      toast.success("Password updated");
      setShowChangePw(false);
      setChangePwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setChangePwLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 flex flex-col bg-surface-950 border-r border-surface-800">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-surface-800">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
              </svg>
            </div>
            <div>
              <span className="text-white font-bold text-sm tracking-tight">Velora</span>
              <p className="text-zinc-600 text-[10px] font-medium tracking-widest uppercase leading-none mt-0.5">{title}</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  active
                    ? "bg-brand-600/10 text-brand-400 font-medium"
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-surface-800"
                }`}
              >
                <span className={`shrink-0 ${active ? "text-brand-400" : "text-zinc-600"}`}>
                  {item.icon}
                </span>
                {item.label}
                {active && <span className="ml-auto w-1 h-1 rounded-full bg-brand-500" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-surface-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-brand-600/20 flex items-center justify-center shrink-0">
              <span className="text-brand-400 text-xs font-bold uppercase">
                {user.email.charAt(0)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-zinc-300 truncate">{user.email}</p>
              <p className="text-[10px] text-zinc-600 font-medium">{user.role}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowChangePw(true)}
              className="flex-1 text-xs text-zinc-600 hover:text-zinc-300 transition-colors text-left"
            >
              Change password
            </button>
            <button
              onClick={logout}
              className="text-xs text-zinc-600 hover:text-red-400 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="p-7 max-w-screen-xl">{children}</div>
      </main>

      <Modal open={showChangePw} onClose={() => setShowChangePw(false)} title="Change Password">
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label>Current Password</label>
            <input type="password" value={changePwForm.currentPassword}
              onChange={(e) => setChangePwForm((f) => ({ ...f, currentPassword: e.target.value }))} required />
          </div>
          <div>
            <label>New Password</label>
            <input type="password" value={changePwForm.newPassword}
              onChange={(e) => setChangePwForm((f) => ({ ...f, newPassword: e.target.value }))} minLength={8} required />
          </div>
          <div>
            <label>Confirm New Password</label>
            <input type="password" value={changePwForm.confirmPassword}
              onChange={(e) => setChangePwForm((f) => ({ ...f, confirmPassword: e.target.value }))} minLength={8} required />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" type="button" onClick={() => setShowChangePw(false)}>Cancel</Button>
            <Button type="submit" loading={changePwLoading}>Update Password</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
