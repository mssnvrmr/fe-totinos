import { z } from 'zod';

export const createIngredientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price is required'),
  stock: z.number().min(0, 'Stock is required'),
});

export type CreateIngredientFormData = z.infer<typeof createIngredientSchema>;