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

interface NavItem { href: string; label: string }

interface Props {
  title: string;
  navItems: NavItem[];
  allowedRoles: Role[];
  children: React.ReactNode;
}

export default function DashboardLayout({ title, navItems, allowedRoles, children }: Props) {
  const { user, isLoading, clearUser } = useAuthStore();
  const pathname = usePathname();
  const router   = useRouter();

  const isAllowed    = !isLoading && !!user && allowedRoles.includes(user.role as Role);
  const needsRedirect = !isLoading && !isAllowed;

  useEffect(() => { if (needsRedirect) router.push("/login"); }, [needsRedirect, router]);

  const [showMenu,     setShowMenu]     = useState(false);
  const [showChangePw, setShowChangePw] = useState(false);
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [pwLoading, setPwLoading] = useState(false);

  if (isLoading || !user) return null;

  const logout = () => { clearUser(); router.push("/login"); };

  const handleChangePw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmPassword) { toast.error("Passwords don't match"); return; }
    if (pwForm.newPassword.length < 8) { toast.error("Minimum 8 characters"); return; }
    setPwLoading(true);
    try {
      await authApi.changePassword(user.id, pwForm.currentPassword, pwForm.newPassword);
      toast.success("Password updated");
      setShowChangePw(false);
      setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* ── Top navigation bar ─────────────────────────────────────── */}
      <header className="sticky top-0 z-30 h-13 bg-surface-950 border-b border-surface-800">
        <div className="flex items-center h-13 px-5 gap-5 max-w-screen-2xl mx-auto">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-6 h-6 rounded-md bg-primary-500 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-zinc-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21" />
              </svg>
            </div>
            <span className="text-white font-bold text-sm tracking-tight">Velora</span>
          </Link>

          {/* Divider + role */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-px h-4 bg-surface-700" />
            <span className="text-zinc-500 text-xs font-medium">{title}</span>
          </div>

          {/* Nav tabs */}
          <nav className="flex items-center gap-0.5 flex-1 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link key={item.href} href={item.href}
                  className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-all ${
                    active
                      ? "bg-primary-500/10 text-primary-400 font-medium"
                      : "text-zinc-500 hover:text-zinc-200 hover:bg-surface-800"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User area */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowMenu((v) => !v)}
              className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-lg hover:bg-surface-800 transition-colors group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs text-zinc-300 leading-tight">{user.email}</p>
                <p className="text-[10px] text-zinc-600 leading-tight">{user.role}</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-primary-500/15 flex items-center justify-center text-primary-400 text-xs font-bold uppercase">
                {user.email.charAt(0)}
              </div>
              <svg className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                <div className="absolute right-0 top-full mt-1.5 w-44 bg-surface-900 border border-surface-800 rounded-xl shadow-2xl z-20 py-1 overflow-hidden">
                  <button
                    onClick={() => { setShowMenu(false); setShowChangePw(true); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-zinc-400 hover:text-zinc-200 hover:bg-surface-800 transition-colors"
                  >
                    Change password
                  </button>
                  <div className="mx-3 my-1 h-px bg-surface-800" />
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-surface-800 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── Page content ───────────────────────────────────────────── */}
      <main className="max-w-screen-2xl mx-auto px-5 py-6">
        {children}
      </main>

      {/* ── Change password modal ───────────────────────────────────── */}
      <Modal open={showChangePw} onClose={() => setShowChangePw(false)} title="Change Password">
        <form onSubmit={handleChangePw} className="space-y-4">
          <div><label>Current Password</label><input type="password" value={pwForm.currentPassword} onChange={(e) => setPwForm((f) => ({ ...f, currentPassword: e.target.value }))} required /></div>
          <div><label>New Password</label><input type="password" value={pwForm.newPassword} onChange={(e) => setPwForm((f) => ({ ...f, newPassword: e.target.value }))} minLength={8} required /></div>
          <div><label>Confirm New Password</label><input type="password" value={pwForm.confirmPassword} onChange={(e) => setPwForm((f) => ({ ...f, confirmPassword: e.target.value }))} minLength={8} required /></div>
          <div className="flex gap-3 justify-end pt-1">
            <Button variant="ghost" type="button" onClick={() => setShowChangePw(false)}>Cancel</Button>
            <Button type="submit" loading={pwLoading}>Update</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
