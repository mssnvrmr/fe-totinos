import { z } from 'zod';
import { UserRolesEnum } from '../../constants/user-roles';

export const createUserSchema = z
  .object({
    id: z.string().optional(),
    username: z.string().trim().min(2, 'Username must have at least 2 characters'),
    phone: z
      .string()
      .trim()
      .min(9, 'Phone must have at least 9 characters')
      .regex(/^\+?[1-9]\d{7,14}$/, 'Enter a valid phone number'),
    email: z.email('Enter a valid email address'),
    password: z.string(),
    role: z.enum([
      UserRolesEnum.ADMIN,
      UserRolesEnum.USER
    ]),
  })
  .superRefine((data, ctx) => {
    const isEditMode = !!data.id;
    if (!isEditMode && data.password.length < 8) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password must have at least 8 characters',
        path: ['password'],
      });
      return;
    }
    if (isEditMode && data.password.length > 0 && data.password.length < 8) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password must have at least 8 characters',
        path: ['password'],
      });
    }
  });

export type CreateUserFormData = z.infer<typeof createUserSchema>;
