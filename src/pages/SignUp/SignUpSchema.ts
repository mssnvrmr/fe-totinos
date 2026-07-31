import { z } from 'zod';
import { UserRolesEnum } from '../../constants/user-roles';

export const signUpSchema = z.object({
  username: z.string().trim().min(2, 'Username must have at least 2 characters'),
  phone: z.string().trim().regex(/^\+?[1-9]\d{7,14}$/, 'Enter a valid phone number'),
  email: z.email('Enter a valid email address'),
  password: z.string().min(8, 'Password must have at least 8 characters'),
  role: z.enum([
    UserRolesEnum.ADMIN,
    UserRolesEnum.USER
  ]),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type SignUpFormErrors = Partial<Record<keyof SignUpFormValues, string>>;