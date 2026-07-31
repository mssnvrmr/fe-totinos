import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(9, 'Password must be at least 9 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;