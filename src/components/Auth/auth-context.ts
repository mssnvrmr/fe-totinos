import { createContext } from 'react';
import type { UserRole } from '../../constants/user-roles';

export interface AuthContextType {
  token: string | null;
  userId: string | null;
  userEmail: string | null;
  userName: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (newToken: string, name: string, role: UserRole) => void;
  updateUserName: (name: string) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
