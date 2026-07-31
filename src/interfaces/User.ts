import type { UserRole } from '../constants/user-roles';

export interface User {
  id: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  role: UserRole;
}