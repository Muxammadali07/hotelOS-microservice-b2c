import { create } from "zustand";
import type { AuthUser, Role } from "@/types";

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
  hydrate: () => void;
  hasRole: (...roles: Role[]) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,

  setUser: (user) => {
    localStorage.setItem("velora_token", user.token);
    localStorage.setItem("velora_user", JSON.stringify(user));
    set({ user });
  },

  clearUser: () => {
    localStorage.removeItem("velora_token");
    localStorage.removeItem("velora_user");
    set({ user: null });
  },

  hydrate: () => {
    try {
      const raw = localStorage.getItem("velora_user");
      if (raw) {
        const user: AuthUser = JSON.parse(raw);
        if (new Date(user.expiresAt) > new Date()) {
          set({ user, isLoading: false });
          return;
        }
      }
    } catch {
      // ignore corrupt storage
    }
    set({ isLoading: false });
  },

  hasRole: (...roles) => {
    const { user } = get();
    return user !== null && roles.includes(user.role);
  },
}));
