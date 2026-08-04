import { z } from 'zod';

export const itemFormSchema = z.object({
  id: z.string().optional(),
  pizza: z.string().min(1, 'Pizza is required'),
  extras: z.array(z.string()).optional(),
  quantity: z.number().int().positive(),
});

export type ItemFormData = z.infer<typeof itemFormSchema>;
