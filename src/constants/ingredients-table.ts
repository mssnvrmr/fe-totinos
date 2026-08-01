import type { Ingredient } from '../interfaces/Ingredient';
import type { DataTableColumn } from '../components/CustomDataTable/CustomDataTable';

type IngredientField = Exclude<keyof Ingredient, 'id'>;

export const ingredientsTableColumns: DataTableColumn<IngredientField | 'actions'>[] = [
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
