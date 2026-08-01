import { z } from 'zod';

export const pizzaFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  ingredients: z.array(z.string()).min(1, 'At least one ingredient is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be 0 or greater'),
});

export type PizzaFormData = z.infer<typeof pizzaFormSchema>;
