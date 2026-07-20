import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { User } from '@/types';

const STORAGE_KEY = 'spamshield-user';

function formatNameFromEmail(email: string): string {
  const local = email.trim().split('@')[0] || 'user';
  return local
    .replace(/[._-]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ') || 'User';
}

function normalizeUser(partial: Partial<User> & { name?: string; email?: string }): User {
  const email = partial.email?.trim() || 'user@example.com';
  const name = partial.name?.trim() || formatNameFromEmail(email);

  return {
    name,
    email,
    joined: partial.joined || new Date().toISOString().slice(0, 10),
    totalEmails: partial.totalEmails ?? 0,
    avatarColor: partial.avatarColor || 'from-signal-500 to-violet-600',
  };
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (name: string, email: string) => User;
  loginWithGoogle: (name: string | undefined, email: string | undefined) => User;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    try {
      return normalizeUser(JSON.parse(stored) as Partial<User>);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = useCallback((name: string, email: string) => {
    const nextUser = normalizeUser({ name, email, totalEmails: 0 });
    setUser(nextUser);
    return nextUser;
  }, []);

  const loginWithGoogle = useCallback((name: string | undefined, email: string | undefined) => {
    const nextUser = normalizeUser({
      name: name?.trim() || formatNameFromEmail(email || 'user@gmail.com'),
      email: email?.trim() || 'user@gmail.com',
      totalEmails: 0,
    });
    setUser(nextUser);
    return nextUser;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((current) => {
      if (!current) return null;
      return normalizeUser({ ...current, ...updates });
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: Boolean(user), login, loginWithGoogle, logout, updateUser }),
    [login, loginWithGoogle, logout, updateUser, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
