import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { UserRolesEnum, type UserRole } from '../../constants/user-roles';

interface AuthContextType {
  token: string | null;
  userName: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (newToken: string, name: string, role: UserRole) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AUTH_KEYS = ['jwt_token', 'user_name', 'user_role'] as const;

function clearStoredAuth(): void {
  AUTH_KEYS.forEach((key) => localStorage.removeItem(key));
}

/** Tokens issued before role was added to the JWT payload fail admin checks with 403. */
function readTokenPayload(token: string): { role?: string } | null {
  try {
    const [, payload] = token.split('.');
    if (!payload) return null;
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
    return JSON.parse(atob(padded)) as { role?: string };
  } catch {
    return null;
  }
}

function getValidStoredToken(): string | null {
  const token = localStorage.getItem('jwt_token');
  if (!token) return null;

  const payload = readTokenPayload(token);
  if (!payload?.role) {
    clearStoredAuth();
    return null;
  }

  return token;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(getValidStoredToken);
  const [userName, setUserName] = useState<string | null>(() =>
    localStorage.getItem('user_name'),
  );
  const [role, setRole] = useState<UserRole | null>(
    () => localStorage.getItem('user_role') as UserRole | null,
  );

  const login = (newToken: string, name: string, role: UserRole): void => {
    localStorage.setItem('jwt_token', newToken);
    localStorage.setItem('user_name', name);
    localStorage.setItem('user_role', role);
    setToken(newToken);
    setUserName(name);
    setRole(role);
  };

  const logout = async (): Promise<void> => {
    clearStoredAuth();
    setToken(null);
    setUserName(null);
    setRole(null);
  };

  const isAuthenticated = !!token;
  const isAdmin = role === UserRolesEnum.ADMIN;

  return (
    <AuthContext.Provider
      value={{ token, userName, role, isAuthenticated, isAdmin, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
