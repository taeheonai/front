'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = { 
  id: string; 
  email?: string; 
  name: string;
  company_id: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (u: User) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (u) => set({ user: u, isAuthenticated: true }),
      clear: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-store-v1', // localStorage key
      partialize: (s) => ({ user: s.user, isAuthenticated: s.isAuthenticated }),
      version: 1,
    }
  )
);