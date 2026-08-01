import type { Pizza } from '../interfaces/Pizza';
import type { DataTableColumn } from '../components/CustomDataTable/CustomDataTable';

type PizzaField = Exclude<keyof Pizza, 'id'>;

export const pizzasTableColumns: DataTableColumn<PizzaField | 'actions'>[] = [
  {
    id: 'name',
    label: 'Name',
    align: 'center',
  },
  {
    id: 'ingredients',
    label: 'Ingredients',
    align: 'center',
  },
  {
    id: 'description',
    label: 'Description',
    align: 'center',
  },
  {
    id: 'price',
    label: 'Price',
    align: 'center',
  },
  {
    id: 'actions',
    label: 'Actions',
    align: 'center',
  },
];
