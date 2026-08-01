import { z } from 'zod';

export const ingredientFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price must be 0 or greater'),
  stock: z.number().min(0, 'Stock must be 0 or greater'),
});

export type IngredientFormData = z.infer<typeof ingredientFormSchema>;
