import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  userName: string | null;
  isAuthenticated: boolean;
  login: (newToken: string, name: string) => void;
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

  const login = (newToken: string, name: string): void => {
    localStorage.setItem('jwt_token', newToken);
    localStorage.setItem('user_name', name);
    setToken(newToken);
    setUserName(name);
  };

  const logout = (): void => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_name');
    setToken(null);
    setUserName(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ token, userName, isAuthenticated, login, logout }}
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
