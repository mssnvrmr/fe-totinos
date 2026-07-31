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
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('jwt_token');
  });
  const [userName, setUserName] = useState<string | null>(() => {
    return localStorage.getItem('user_name');
  });
  const [role, setRole] = useState<UserRole | null>(() => {
    return localStorage.getItem('user_role') as UserRole | null;
  });

  const login = (newToken: string, name: string, role: UserRole): void => {
    localStorage.setItem('jwt_token', newToken);
    localStorage.setItem('user_name', name);
    localStorage.setItem('user_role', role);
    setToken(newToken);
    setUserName(name);
    setRole(role);
  };

  const logout = (): void => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_role');
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
