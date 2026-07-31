import type { Ingredient } from '../interfaces/Ingredient';

type IngredientField = Exclude<keyof Ingredient, 'id'>;

export type IngredientsTableColumn = {
  id: IngredientField | 'actions';
  label: string;
  align: 'left' | 'center' | 'right' | 'inherit' | 'justify';
};

export const ingredientsTableColumns: IngredientsTableColumn[] = [
  {
    id: 'name',
    label: 'Name',
    align: 'center',
  },
  {
    id: 'price',
    label: 'Price',
    align: 'center',
  },
  {
    id: 'stock',
    label: 'Stock',
    align: 'center',
  },
  {
    id: 'actions',
    label: 'Actions',
    align: 'center',
  },
];
