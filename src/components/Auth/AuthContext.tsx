import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { UserRolesEnum, type UserRole } from '../../constants/user-roles';
import { AuthContext } from './auth-context';

interface AuthProviderProps {
  children: ReactNode;
}

const AUTH_KEYS = ['jwt_token', 'user_name', 'user_role'] as const;

function clearStoredAuth(): void {
  AUTH_KEYS.forEach((key) => localStorage.removeItem(key));
}

type TokenPayload = { id?: string; email?: string; role?: string };

/** Tokens issued before role was added to the JWT payload fail admin checks with 403. */
function readTokenPayload(token: string): TokenPayload | null {
  try {
    const [, payload] = token.split('.');
    if (!payload) return null;
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
    return JSON.parse(atob(padded)) as TokenPayload;
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

function getUserIdFromToken(token: string | null): string | null {
  if (!token) return null;
  return readTokenPayload(token)?.id ?? null;
}

function getUserEmailFromToken(token: string | null): string | null {
  if (!token) return null;
  return readTokenPayload(token)?.email ?? null;
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

  const updateUserName = (name: string): void => {
    localStorage.setItem('user_name', name);
    setUserName(name);
  };

  const logout = async (): Promise<void> => {
    clearStoredAuth();
    setToken(null);
    setUserName(null);
    setRole(null);
  };

  const userId = getUserIdFromToken(token);
  const userEmail = getUserEmailFromToken(token);
  const isAuthenticated = !!token;
  const isAdmin = role === UserRolesEnum.ADMIN;

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        userEmail,
        userName,
        role,
        isAuthenticated,
        isAdmin,
        login,
        updateUserName,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
