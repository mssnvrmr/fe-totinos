import type { UserRole } from '../constants/user-roles';

export interface User {
  username: string;
  phone: string;
  email: string;
  password: string;
  role: UserRole;
}